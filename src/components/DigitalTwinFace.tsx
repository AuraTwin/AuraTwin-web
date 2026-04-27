'use client';

import { useId } from 'react';

interface DigitalTwinFaceProps {
  wellbeingScore: number;
  size?: number;
  className?: string;
}

export default function DigitalTwinFace({ wellbeingScore, size, className }: DigitalTwinFaceProps) {
  const s = Math.max(0, Math.min(100, wellbeingScore));
  const id = useId().replace(/:/g, '');

  // ── Palette ────────────────────────────────────────────────────────────────
  const palette =
    s > 70
      ? { base: '#22c55e', light: '#4ade80', dark: '#16a34a', blush: '#86efac', bg: '#dcfce7', bgDark: '#052e16', glow: 'rgba(34,197,94,0.15)' }
      : s >= 40
        ? { base: '#eab308', light: '#facc15', dark: '#ca8a04', blush: '#fde047', bg: '#fef9c3', bgDark: '#422006', glow: 'rgba(234,179,8,0.15)' }
        : { base: '#ef4444', light: '#f87171', dark: '#dc2626', blush: '#fca5a5', bg: '#fee2e2', bgDark: '#450a0a', glow: 'rgba(239,68,68,0.15)' };

  // Hair color
  const hair = { base: '#4a3728', light: '#6b4f3a', dark: '#2e1f14' };

  // ── Eyebrows ───────────────────────────────────────────────────────────────
  let leftBrow: string;
  let rightBrow: string;
  if (s >= 80) {
    leftBrow = 'M 28 29 Q 35 24 44 28';
    rightBrow = 'M 56 28 Q 65 24 72 29';
  } else if (s >= 60) {
    leftBrow = 'M 29 30 Q 35 26 43 29';
    rightBrow = 'M 57 29 Q 65 26 71 30';
  } else if (s >= 40) {
    leftBrow = 'M 29 30 Q 35 28 43 30';
    rightBrow = 'M 57 30 Q 65 28 71 30';
  } else if (s >= 20) {
    leftBrow = 'M 28 28 Q 35 30 44 32';
    rightBrow = 'M 56 32 Q 65 30 72 28';
  } else {
    leftBrow = 'M 27 27 Q 35 30 45 33';
    rightBrow = 'M 55 33 Q 65 30 73 27';
  }

  // ── Mouth ──────────────────────────────────────────────────────────────────
  let mouthD: string;
  let mouthFill = 'none';
  let mouthStroke = palette.dark;
  let mouthStrokeW = 2.2;
  let showTeeth = false;

  if (s >= 80) {
    mouthD = 'M 32 58 Q 40 72 50 74 Q 60 72 68 58';
    mouthFill = palette.dark;
    mouthStrokeW = 2;
    showTeeth = true;
  } else if (s >= 60) {
    mouthD = 'M 35 60 Q 42 70 50 71 Q 58 70 65 60';
    mouthFill = palette.dark;
    mouthStrokeW = 1.8;
  } else if (s >= 40) {
    mouthD = 'M 38 64 Q 50 66 62 64';
  } else if (s >= 20) {
    mouthD = 'M 36 68 Q 50 60 64 68';
  } else {
    mouthD = 'M 34 70 Q 50 58 66 70';
    mouthStrokeW = 2.5;
  }

  // ── Eye sizing ─────────────────────────────────────────────────────────────
  const eyeRx = 7;
  const eyeRy = s < 20 ? 5 : 7.5;
  const irisR = s < 20 ? 3 : 3.5;
  const pupilR = 2;
  const eyeY = 42;
  const showDroop = s < 20;

  // ── Score-based wrapper animation class ────────────────────────────────────
  const wrapperAnim =
    s < 20 ? 'animate-wobble' : s >= 60 ? 'animate-bounce-soft' : 'animate-breathe';

  const isFill = size === undefined;

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-500${className ? ` ${className}` : ''}`}
      style={!isFill ? { width: size, height: size } : undefined}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`,
          transform: 'scale(1.4)',
        }}
      />

      <svg
        width={isFill ? '100%' : size}
        height={isFill ? '100%' : size}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Digital twin face — score ${s}`}
        className={`relative z-10 transition-all duration-500 ${wrapperAnim}`}
      >
        <defs>
          {/* Face 3-D gradient */}
          <radialGradient id={`${id}-face`} cx="45%" cy="38%" r="55%">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="100%" stopColor={palette.base} />
          </radialGradient>

          {/* Depth shadow */}
          <radialGradient id={`${id}-shadow`} cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor={palette.dark} stopOpacity="0.35" />
            <stop offset="100%" stopColor={palette.dark} stopOpacity="0" />
          </radialGradient>

          {/* Eye white gradient */}
          <radialGradient id={`${id}-eyeW`} cx="45%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </radialGradient>

          {/* Iris gradient */}
          <radialGradient id={`${id}-iris`} cx="40%" cy="35%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>

          {/* Specular highlight */}
          <radialGradient id={`${id}-spec`} cx="50%" cy="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.95" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          {/* Hair gradient */}
          <linearGradient id={`${id}-hair`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={hair.light} />
            <stop offset="100%" stopColor={hair.base} />
          </linearGradient>

          {/* Ear gradient — matches face */}
          <radialGradient id={`${id}-ear`} cx="50%" cy="40%">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="100%" stopColor={palette.base} />
          </radialGradient>

          {/* Shoulder gradient */}
          <linearGradient id={`${id}-shoulder`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Soft glow filter */}
          <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
          </filter>
        </defs>

        {/* ── Neck + Shoulders ────────────────────────────────────────────── */}
        <path
          d="M 35 88 L 35 100 Q 35 108 22 112 L 10 116 Q 5 118 5 120 L 95 120 Q 95 118 90 116 L 78 112 Q 65 108 65 100 L 65 88"
          fill={`url(#${id}-shoulder)`}
          className="transition-all duration-500"
        />
        {/* Neck */}
        <rect x="39" y="83" width="22" height="12" rx="4" fill={`url(#${id}-face)`} className="transition-all duration-500" />
        {/* Neck shadow */}
        <rect x="39" y="83" width="22" height="5" rx="2" fill={palette.dark} opacity="0.15" />

        {/* ── Ears ────────────────────────────────────────────────────────── */}
        {/* Left ear */}
        <ellipse cx="10" cy="50" rx="6" ry="9" fill={`url(#${id}-ear)`} className="transition-all duration-500" />
        <ellipse cx="10.5" cy="50" rx="3" ry="5.5" fill={palette.dark} opacity="0.2" />
        {/* Right ear */}
        <ellipse cx="90" cy="50" rx="6" ry="9" fill={`url(#${id}-ear)`} className="transition-all duration-500" />
        <ellipse cx="89.5" cy="50" rx="3" ry="5.5" fill={palette.dark} opacity="0.2" />

        {/* ── Main face ───────────────────────────────────────────────────── */}
        <circle cx="50" cy="48" r="38" fill={`url(#${id}-face)`} className="transition-all duration-500" />

        {/* Depth shadow on lower half */}
        <circle cx="50" cy="48" r="38" fill={`url(#${id}-shadow)`} />

        {/* Top highlight for 3-D roundness */}
        <ellipse cx="46" cy="30" rx="22" ry="12" fill="white" opacity="0.18" />

        {/* ── Hair ────────────────────────────────────────────────────────── */}
        {/* Clean hair cap — outer arc over head, inner arc is the hairline */}
        <path
          d="M 12 46 Q 14 10 50 8 Q 86 10 88 46 Q 82 24 64 22 Q 56 18 50 18 Q 44 18 36 22 Q 18 24 12 46 Z"
          fill={`url(#${id}-hair)`}
        />
        {/* Hair shine */}
        <path
          d="M 33 13 Q 42 10 50 12"
          stroke={hair.light}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />

        {/* ── Eyebrows ────────────────────────────────────────────────────── */}
        <path d={leftBrow} stroke={palette.dark} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d={rightBrow} stroke={palette.dark} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />

        {/* ── Left Eye ────────────────────────────────────────────────────── */}
        <g className="animate-blink" style={{ transformOrigin: '37px 42px' }}>
          <ellipse cx="37" cy={eyeY} rx={eyeRx} ry={eyeRy} fill={`url(#${id}-eyeW)`} />
          <circle cx="37" cy={eyeY} r={irisR} fill={`url(#${id}-iris)`} />
          <circle cx="37" cy={eyeY} r={pupilR} fill="#0f172a" />
          <circle cx="35" cy={eyeY - 1.5} r="1.4" fill={`url(#${id}-spec)`} />
          <ellipse cx="37" cy={eyeY} rx={eyeRx} ry={eyeRy} fill="none" stroke={palette.dark} strokeWidth="0.8" opacity="0.3" />
        </g>

        {/* ── Right Eye ───────────────────────────────────────────────────── */}
        <g className="animate-blink" style={{ transformOrigin: '63px 42px' }}>
          <ellipse cx="63" cy={eyeY} rx={eyeRx} ry={eyeRy} fill={`url(#${id}-eyeW)`} />
          <circle cx="63" cy={eyeY} r={irisR} fill={`url(#${id}-iris)`} />
          <circle cx="63" cy={eyeY} r={pupilR} fill="#0f172a" />
          <circle cx="61" cy={eyeY - 1.5} r="1.4" fill={`url(#${id}-spec)`} />
          <ellipse cx="63" cy={eyeY} rx={eyeRx} ry={eyeRy} fill="none" stroke={palette.dark} strokeWidth="0.8" opacity="0.3" />
        </g>

        {/* ── Droopy eyelids (exhausted) ──────────────────────────────────── */}
        {showDroop && (
          <>
            <path
              d={`M ${37 - eyeRx - 1} ${eyeY - eyeRy + 1} Q 37 ${eyeY - 1} ${37 + eyeRx + 1} ${eyeY - eyeRy + 1}`}
              fill={palette.base}
              stroke={palette.dark}
              strokeWidth="0.6"
            />
            <path
              d={`M ${63 - eyeRx - 1} ${eyeY - eyeRy + 1} Q 63 ${eyeY - 1} ${63 + eyeRx + 1} ${eyeY - eyeRy + 1}`}
              fill={palette.base}
              stroke={palette.dark}
              strokeWidth="0.6"
            />
          </>
        )}

        {/* ── Blush cheeks ────────────────────────────────────────────────── */}
        <circle cx="23" cy="54" r="7" fill={palette.blush} opacity={s >= 60 ? 0.35 : 0.15} className="transition-opacity duration-500" />
        <circle cx="77" cy="54" r="7" fill={palette.blush} opacity={s >= 60 ? 0.35 : 0.15} className="transition-opacity duration-500" />

        {/* ── Nose ────────────────────────────────────────────────────────── */}
        <path d="M 49 50 Q 50 54 51 50" stroke={palette.dark} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />

        {/* ── Mouth ───────────────────────────────────────────────────────── */}
        <path
          d={mouthD}
          fill={mouthFill}
          stroke={mouthStroke}
          strokeWidth={mouthStrokeW}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500"
        />

        {/* Teeth for big smile */}
        {showTeeth && (
          <path d="M 38 60 Q 43 58 50 58 Q 57 58 62 60" fill="white" opacity="0.85" />
        )}
      </svg>
    </div>
  );
}
