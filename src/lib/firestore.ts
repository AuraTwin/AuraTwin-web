import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { db as _db } from './firebase';
import type { Firestore } from 'firebase/firestore';

// These helpers are only called from authenticated client-side code,
// so db is always initialized by the time they run.
const db = _db as Firestore;

export interface EmotionLog {
  timestamp: Timestamp;
  emotion_label: string;
  confidence_score: number;
}

export interface UserProfile {
  name: string;
  surname: string;
  email: string;
  app_key: string;
  created_at: Timestamp;
}

export interface WellbeingReport {
  id: string;
  generated_at: Timestamp;
  content: string;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', uid, 'profile', 'data');
  const snap = await getDoc(docRef);
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const docRef = doc(db, 'users', uid, 'profile', 'data');
  await setDoc(docRef, data, { merge: true });
}

export async function getEmotionLogs(uid: string, days = 14): Promise<EmotionLog[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const colRef = collection(db, 'users', uid, 'emotions');
  const q = query(
    colRef,
    where('timestamp', '>=', Timestamp.fromDate(since)),
    orderBy('timestamp', 'asc')
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as EmotionLog);
}

/** Adds a new report document to the user's reports subcollection. Returns the new doc ID. */
export async function addReport(uid: string, content: string): Promise<string> {
  const colRef = collection(db, 'users', uid, 'reports');
  const docRef = await addDoc(colRef, {
    generated_at: Timestamp.now(),
    content,
  });
  return docRef.id;
}

/** Returns all reports for the user, newest first. */
export async function getAllReports(uid: string): Promise<WellbeingReport[]> {
  const colRef = collection(db, 'users', uid, 'reports');
  const q = query(colRef, orderBy('generated_at', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as WellbeingReport));
}

/**
 * Deletes all Firestore data belonging to a user before account removal.
 * Order: subcollections first, then profile doc, then app_key lookup.
 * Runs in parallel where possible to minimise latency.
 */
export async function deleteUserData(uid: string, appKey: string): Promise<void> {
  const [emotionsSnap, reportsSnap] = await Promise.all([
    getDocs(collection(db, 'users', uid, 'emotions')),
    getDocs(collection(db, 'users', uid, 'reports')),
  ]);

  await Promise.all([
    ...emotionsSnap.docs.map((d) => deleteDoc(d.ref)),
    ...reportsSnap.docs.map((d) => deleteDoc(d.ref)),
  ]);

  await deleteDoc(doc(db, 'users', uid, 'profile', 'data'));

  if (appKey) {
    await deleteDoc(doc(db, 'app_keys', appKey)).catch(() => {
      // Security rules may block client-side deletion of app_keys —
      // silently skip; the orphaned key cannot be used after Auth is removed.
    });
  }
}

/**
 * Generates a new App Key, writes it to app_keys/{newKey} and updates the
 * user profile — then deletes the old app_keys entry.
 * Order matters: new key is live before old one is deleted, so there is no
 * window where neither key exists.
 */
export async function rotateAppKey(uid: string, oldKey: string): Promise<string> {
  const uuid = crypto.randomUUID().replace(/-/g, '').toUpperCase();
  const newKey = `ATV-${uuid.slice(0, 4)}-${uuid.slice(4, 8)}`;
  const now = Timestamp.now();

  await setDoc(doc(db, 'app_keys', newKey), { uid, created_at: now });
  await setDoc(doc(db, 'users', uid, 'profile', 'data'), { app_key: newKey }, { merge: true });
  await deleteDoc(doc(db, 'app_keys', oldKey));

  return newKey;
}

/*
 * Firestore Structure
 * ───────────────────
 * app_keys/{app_key}               → { uid, created_at }          (AWS lookup)
 *
 * users/{uid}/
 *   profile/data                   → { name, surname, email, app_key, created_at }
 *   reports/{autoId}               → { generated_at, content }
 *   emotions/{autoId}              → { timestamp, emotion_label, confidence_score }
 *                                     ↑ written by AWS via Firebase Admin SDK
 */

