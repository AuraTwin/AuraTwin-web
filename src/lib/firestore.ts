import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  setDoc,
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
  confidence: number;
}

export interface UserProfile {
  name: string;
  surname: string;
  email: string;
  app_key: string;
  created_at: Timestamp;
}

export interface WellbeingReport {
  generated_at: Timestamp;
  content: string;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', uid, 'profile', 'data');
  const snap = await getDoc(docRef);
  return snap.exists() ? (snap.data() as UserProfile) : null;
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

export async function saveReport(uid: string, content: string): Promise<void> {
  const docRef = doc(db, 'users', uid, 'last_report', 'data');
  await setDoc(docRef, {
    generated_at: Timestamp.now(),
    content,
  });
}

export async function getLastReport(uid: string): Promise<WellbeingReport | null> {
  const docRef = doc(db, 'users', uid, 'last_report', 'data');
  const snap = await getDoc(docRef);
  return snap.exists() ? (snap.data() as WellbeingReport) : null;
}

