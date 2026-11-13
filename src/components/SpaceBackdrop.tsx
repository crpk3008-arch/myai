import React from 'react';

const BACKGROUND_STARS = [
  { left: '4%', top: '8%', size: 2, delay: '0s', duration: '4.4s', color: 'bg-slate-100' },
  { left: '12%', top: '22%', size: 1.5, delay: '1.1s', duration: '5.2s', color: 'bg-cyan-200' },
  { left: '19%', top: '62%', size: 2, delay: '2.3s', duration: '4.8s', color: 'bg-slate-200' },
  { left: '24%', top: '34%', size: 1.5, delay: '0.6s', duration: '3.9s', color: 'bg-amber-200' },
  { left: '31%', top: '81%', size: 2, delay: '1.7s', duration: '5.5s', color: 'bg-slate-100' },
  { left: '38%', top: '14%', size: 1.5, delay: '2.8s', duration: '4.1s', color: 'bg-cyan-100' },
  { left: '44%', top: '49%', size: 1.5, delay: '0.9s', duration: '5.8s', color: 'bg-slate-300' },
  { left: '53%', top: '74%', size: 2, delay: '1.4s', duration: '4.6s', color: 'bg-cyan-200' },
  { left: '61%', top: '18%', size: 2.5, delay: '0.3s', duration: '5.0s', color: 'bg-amber-100' },
  { left: '67%', top: '42%', size: 1.5, delay: '2.1s', duration: '4.3s', color: 'bg-slate-200' },
  { left: '74%', top: '86%', size: 2, delay: '1.9s', duration: '5.4s', color: 'bg-slate-100' },
  { left: '79%', top: '27%', size: 1.5, delay: '0.4s', duration: '4.7s', color: 'bg-cyan-200' },
  { left: '85%', top: '57%', size: 2, delay: '2.6s', duration: '4.9s', color: 'bg-amber-200' },
  { left: '91%', top: '12%', size: 2, delay: '1.2s', duration: '3.8s', color: 'bg-slate-100' },
  { left: '95%', top: '69%', size: 1.5, delay: '0.8s', duration: '5.3s', color: 'bg-cyan-100' },
  { left: '8%', top: '90%', size: 1.5, delay: '2.0s', duration: '4.5s', color: 'bg-slate-200' },
  { left: '48%', top: '6%', size: 1.5, delay: '1.6s', duration: '4.0s', color: 'bg-slate-100' },
  { left: '58%', top: '93%', size: 2, delay: '0.5s', duration: '5.1s', color: 'bg-amber-100' },
];

export const SpaceBackdrop: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      data-testid="animated-space-backdrop"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Slowly breathing deep-space nebula clouds */}
      <div
        className="animate-nebula-drift absolute -top-24 left-[12%] w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_70%)]"
      />
      <div
        className="animate-nebula-drift absolute top-[45%] right-[8%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12),transparent_70%)]"
        style={{ animationDelay: '-7s' }}
      />

      {/* Twinkling background starfield */}
      {BACKGROUND_STARS.map((star, idx) => (
        <span
          key={idx}
          className={`animate-star-twinkle absolute rounded-full ${star.color}`}
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}

      {/* Occasional shooting stars across the upper sky */}
      <div
        className="animate-shooting-star hidden sm:block absolute top-[14%] right-[12%] w-24 h-[1.5px] bg-gradient-to-r from-cyan-300 via-slate-100 to-transparent rounded-full"
      />
      <div
        className="animate-shooting-star hidden sm:block absolute top-[38%] right-[24%] w-20 h-[1.5px] bg-gradient-to-r from-amber-300 via-slate-100 to-transparent rounded-full"
        style={{ animationDelay: '4.5s', animationDuration: '11s' }}
      />

      {/* Tiny distant drifting probe gliding across deep space */}
      <div className="animate-orbit-glide hidden md:flex items-center gap-1 absolute top-[22%] left-0 opacity-50">
        <svg viewBox="0 0 28 14" className="w-7 h-3.5" fill="none">
          <rect x="11" y="4" width="6" height="6" rx="1" fill="#E2E8F0" />
          <rect x="2" y="5" width="8" height="4" rx="0.5" fill="#38BDF8" opacity="0.8" />
          <rect x="18" y="5" width="8" height="4" rx="0.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="14" cy="2.5" r="1.2" fill="#FBBF24" />
        </svg>
      </div>
    </div>
  );
};
