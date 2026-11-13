import React from 'react';

export const LunarRoverPlate: React.FC = () => (
  <figure className="relic-card relative rounded-xl overflow-hidden border border-slate-800 bg-[#080C15]">
    <svg
      viewBox="0 0 640 420"
      className="w-full h-auto block"
      role="img"
      aria-label="Archival technical illustration of Apollo 17 Lunar Roving Vehicle LRV-003 parked on Taurus-Littrow lunar regolith"
    >
      <defs>
        <linearGradient id="moonSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04060D" />
          <stop offset="100%" stopColor="#0B1322" />
        </linearGradient>
        <linearGradient id="moonGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B4252" />
          <stop offset="100%" stopColor="#1B202C" />
        </linearGradient>
      </defs>

      <rect width="640" height="420" fill="url(#moonSky)" />
      {/* Distant Earth crescent in lunar black sky */}
      <circle cx="520" cy="76" r="14" fill="#38BDF8" opacity="0.85" />
      <path d="M515 63 A14 14 0 0 1 515 89 A10 14 0 0 0 515 63 Z" fill="#04060D" opacity="0.65" />

      {/* Stars */}
      <circle cx="90" cy="54" r="1.5" fill="#E2E8F0" className="animate-star-twinkle" />
      <circle cx="190" cy="88" r="1.2" fill="#E2E8F0" className="animate-star-twinkle" style={{ animationDelay: '1.1s' }} />
      <circle cx="310" cy="40" r="1.5" fill="#E2E8F0" className="animate-star-twinkle" style={{ animationDelay: '2.2s' }} />
      <circle cx="430" cy="96" r="1.2" fill="#E2E8F0" className="animate-star-twinkle" style={{ animationDelay: '0.6s' }} />

      {/* Taurus-Littrow mountain massif */}
      <path d="M0 245 L95 170 L215 210 L355 150 L500 205 L640 165 L640 280 L0 280 Z" fill="#1F2737" />
      <path d="M0 258 L140 218 L290 240 L440 205 L640 245 L640 290 L0 290 Z" fill="#2A3346" />

      {/* Lunar Surface */}
      <path d="M0 265 Q320 248 640 265 L640 420 L0 420 Z" fill="url(#moonGround)" />
      <ellipse cx="110" cy="340" rx="48" ry="12" fill="#141822" opacity="0.7" />
      <ellipse cx="525" cy="355" rx="64" ry="15" fill="#141822" opacity="0.6" />

      {/* Rover Shadow */}
      <ellipse cx="325" cy="318" rx="140" ry="20" fill="#090D16" opacity="0.75" />

      {/* LRV-003 Chassis */}
      <rect x="220" y="232" width="210" height="18" rx="4" fill="#CBD5E1" />
      <rect x="235" y="218" width="160" height="16" rx="2" fill="#94A3B8" />
      {/* Gold thermal foil forward electronics */}
      <rect x="355" y="202" width="46" height="24" rx="2" fill="#F59E0B" opacity="0.88" />
      <line x1="355" y1="214" x2="401" y2="214" stroke="#B45309" strokeWidth="1.5" />

      {/* Astronaut Seats */}
      <path d="M250 185 L268 185 L278 220 L252 220 Z" fill="#475569" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d="M286 185 L304 185 L314 220 L288 220 Z" fill="#475569" stroke="#CBD5E1" strokeWidth="1.5" />

      {/* High-gain Mesh Dish Antenna + Live Signal Ripples */}
      <line x1="388" y1="202" x2="396" y2="128" stroke="#E2E8F0" strokeWidth="2.5" />
      <ellipse cx="398" cy="120" rx="34" ry="16" transform="rotate(-18 398 120)" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
      <ellipse cx="398" cy="120" rx="24" ry="10" transform="rotate(-18 398 120)" fill="none" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="398" y1="120" x2="410" y2="104" stroke="#E2E8F0" strokeWidth="2" />
      <circle cx="410" cy="104" r="14" fill="none" stroke="#22D3EE" strokeWidth="1.4" className="animate-radio-ripple" />
      <circle cx="410" cy="104" r="22" fill="none" stroke="#22D3EE" strokeWidth="1" className="animate-radio-ripple" style={{ animationDelay: '1.2s' }} />

      {/* TV Camera Mast */}
      <line x1="364" y1="202" x2="352" y2="150" stroke="#94A3B8" strokeWidth="2.5" />
      <rect x="336" y="138" width="26" height="15" rx="2" fill="#E2E8F0" />
      <circle cx="338" cy="145" r="4" fill="#22D3EE" className="animate-star-twinkle" />

      {/* Duct-Tape Fender Repair on Rear Left */}
      <path d="M202 226 Q230 205 262 224" fill="none" stroke="#9CA3AF" strokeWidth="6" strokeLinecap="round" />
      <rect x="220" y="210" width="16" height="8" fill="#64748B" />

      {/* Piano-wire mesh wheels */}
      {[235, 405].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="282" r="34" fill="#1E293B" stroke="#CBD5E1" strokeWidth="3.5" />
          <circle cx={cx} cy="282" r="26" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx={cx} cy="282" r="10" fill="#F59E0B" />
          <line x1={cx - 32} y1="282" x2={cx + 32} y2="282" stroke="#475569" strokeWidth="1" />
          <line x1={cx} y1="248" x2={cx} y2="316" stroke="#475569" strokeWidth="1" />
        </g>
      ))}
    </svg>
    <figcaption className="px-4 py-2.5 bg-[#0A0F1B] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
      <span>LRV-003 · Taurus-Littrow Valley</span>
      <span className="text-amber-300">Apollo 17 · Dec 1972</span>
    </figcaption>
  </figure>
);

export const LaserRetroreflectorPlate: React.FC<{ pulseActive: boolean }> = ({ pulseActive }) => (
  <figure className="relic-card relic-card-emerald relative rounded-xl overflow-hidden border border-slate-800 bg-[#080C15]">
    <svg
      viewBox="0 0 640 400"
      className="w-full h-auto block"
      role="img"
      aria-label="Apollo 11 Lunar Laser Ranging Retroreflector prism array on Tranquility Base reflecting a 532nm green laser beam"
    >
      <defs>
        <linearGradient id="lrrrSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#03050A" />
          <stop offset="100%" stopColor="#0C1424" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#lrrrSky)" />
      {/* Regolith horizon */}
      <path d="M0 295 Q320 278 640 295 L640 400 L0 400 Z" fill="#232938" />

      {/* Array Stand & Frame */}
      <line x1="250" y1="270" x2="232" y2="328" stroke="#94A3B8" strokeWidth="5" />
      <line x1="390" y1="270" x2="408" y2="328" stroke="#94A3B8" strokeWidth="5" />
      <g transform="translate(195, 130) skewY(-8)">
        <rect x="0" y="0" width="250" height="150" rx="6" fill="#334155" stroke="#94A3B8" strokeWidth="2.5" />
        <rect x="14" y="14" width="222" height="122" rx="3" fill="#0F172A" />
        {/* 10x6 visible prism cells grid */}
        {Array.from({ length: 10 }).map((_, col) =>
          Array.from({ length: 5 }).map((__, row) => (
            <circle
              key={`${col}-${row}`}
              cx={28 + col * 21.5}
              cy={28 + row * 22}
              r="7.5"
              fill={pulseActive ? '#34D399' : '#1E293B'}
              fillOpacity={pulseActive ? 0.55 : 0.9}
              stroke={pulseActive ? '#6EE7B7' : '#475569'}
              strokeWidth="1.2"
            />
          ))
        )}
      </g>

      {/* Incoming & Reflected 532nm Green Laser Beams with Traveling Photon Pulse */}
      <line
        x1="40"
        y1="30"
        x2="318"
        y2="188"
        stroke="#10B981"
        strokeWidth={pulseActive ? '4' : '1.6'}
        strokeOpacity={pulseActive ? '0.95' : '0.42'}
        strokeDasharray="10 8"
        className="animate-laser-flow"
      />
      <line
        x1="318"
        y1="188"
        x2="40"
        y2="46"
        stroke="#34D399"
        strokeWidth={pulseActive ? '3.5' : '1.2'}
        strokeOpacity={pulseActive ? '0.9' : '0.32'}
        strokeDasharray="10 8"
        className="animate-laser-flow"
      />
      {pulseActive && (
        <>
          <circle cx="318" cy="188" r="18" fill="#10B981" opacity="0.35" />
          <circle cx="318" cy="188" r="24" fill="none" stroke="#6EE7B7" strokeWidth="2" className="animate-radio-ripple" />
        </>
      )}

      <text x="26" y="372" fill="#94A3B8" fontSize="12" fontFamily="monospace">
        532 nm Nd:YAG BEAM · APACHE POINT → TRANQUILITY BASE
      </text>
    </svg>
    <figcaption className="px-4 py-2.5 bg-[#0A0F1B] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
      <span>LRRR Array · 100 Quartz Corner Cubes</span>
      <span className="text-emerald-300">Active Since 1969</span>
    </figcaption>
  </figure>
);

export const OpportunityMarsPlate: React.FC = () => (
  <figure className="relic-card relic-card-amber relative rounded-xl overflow-hidden border border-slate-800 bg-[#140B09]">
    <svg
      viewBox="0 0 640 420"
      className="w-full h-auto block"
      role="img"
      aria-label="Archival illustration of Mars Exploration Rover Opportunity in Perseverance Valley under dusty amber twilight"
    >
      <defs>
        <linearGradient id="marsSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E100C" />
          <stop offset="65%" stopColor="#5C2818" />
          <stop offset="100%" stopColor="#853B20" />
        </linearGradient>
        <linearGradient id="marsSand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B2F1B" />
          <stop offset="100%" stopColor="#2B140C" />
        </linearGradient>
      </defs>

      <rect width="640" height="420" fill="url(#marsSky)" />
      {/* Dim dust-choked sun & drifting Martian dust motes */}
      <circle cx="485" cy="110" r="24" fill="#FDBA74" opacity="0.22" />
      <circle cx="485" cy="110" r="10" fill="#FED7AA" opacity="0.55" />
      <circle cx="135" cy="145" r="2.2" fill="#FDBA74" className="animate-dust-drift" />
      <circle cx="240" cy="185" r="1.8" fill="#FDBA74" className="animate-dust-drift" style={{ animationDelay: '1.8s' }} />
      <circle cx="380" cy="155" r="2.0" fill="#FED7AA" className="animate-dust-drift" style={{ animationDelay: '3.1s' }} />
      <circle cx="515" cy="190" r="1.6" fill="#FDBA74" className="animate-dust-drift" style={{ animationDelay: '4.4s' }} />

      {/* Distant crater rim */}
      <path d="M0 245 L160 210 L320 228 L510 198 L640 225 L640 280 L0 280 Z" fill="#471E12" />
      <path d="M0 262 Q320 246 640 264 L640 420 L0 420 Z" fill="url(#marsSand)" />

      {/* Rover Shadow */}
      <ellipse cx="310" cy="336" rx="135" ry="18" fill="#180A06" opacity="0.7" />

      {/* Solar Array Wings (coated in reddish dust) */}
      <polygon points="150,248 250,224 275,244 175,268" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
      <polygon points="365,224 475,248 450,268 340,244" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
      {/* Dust haze overlay on panels */}
      <polygon points="150,248 250,224 275,244 175,268" fill="#B45309" opacity="0.35" />
      <polygon points="365,224 475,248 450,268 340,244" fill="#B45309" opacity="0.35" />

      {/* Warm Electronics Box */}
      <rect x="255" y="218" width="110" height="42" rx="4" fill="#D97706" />
      <rect x="268" y="226" width="84" height="26" rx="2" fill="#92400E" />

      {/* Pancam Mast */}
      <line x1="335" y1="218" x2="335" y2="146" stroke="#CBD5E1" strokeWidth="4" />
      <rect x="310" y="132" width="50" height="18" rx="3" fill="#E2E8F0" />
      <circle cx="324" cy="141" r="4" fill="#0F172A" />
      <circle cx="346" cy="141" r="4" fill="#0F172A" />

      {/* Rocker-Bogie Suspension & 6 Wheels */}
      {[225, 310, 395].map((cx) => (
        <g key={cx}>
          <line x1="310" y1="262" x2={cx} y2="306" stroke="#94A3B8" strokeWidth="3.5" />
          <circle cx={cx} cy="312" r="21" fill="#1E293B" stroke="#CBD5E1" strokeWidth="3" />
          <circle cx={cx} cy="312" r="8" fill="#D97706" />
        </g>
      ))}
    </svg>
    <figcaption className="px-4 py-2.5 bg-[#120B09] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
      <span>MER-B Opportunity · Perseverance Valley</span>
      <span className="text-amber-300">Sol 5111 · 5,498 Sols</span>
    </figcaption>
  </figure>
);

export const VikingLanderPlate: React.FC = () => (
  <figure className="relic-card relic-card-amber relative rounded-xl overflow-hidden border border-slate-800 bg-[#120B0A]">
    <svg
      viewBox="0 0 640 400"
      className="w-full h-auto block"
      role="img"
      aria-label="Archival illustration of Viking 1 Lander resting on Chryse Planitia Mars"
    >
      <defs>
        <linearGradient id="vikingSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1C110E" />
          <stop offset="100%" stopColor="#6D331E" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#vikingSky)" />
      <path d="M0 245 Q320 228 640 248 L640 400 L0 400 Z" fill="#542718" />
      {/* Martian basalt rocks */}
      <polygon points="70,320 110,295 148,318 122,334" fill="#3B1A10" />
      <polygon points="480,335 535,305 572,330 530,348" fill="#3B1A10" />

      {/* Lander Body */}
      <ellipse cx="320" cy="316" rx="125" ry="15" fill="#1A0B07" opacity="0.65" />
      <line x1="250" y1="240" x2="210" y2="306" stroke="#CBD5E1" strokeWidth="5" />
      <line x1="390" y1="240" x2="430" y2="306" stroke="#CBD5E1" strokeWidth="5" />
      <line x1="320" y1="244" x2="320" y2="312" stroke="#94A3B8" strokeWidth="5" />
      {/* Footpads */}
      <ellipse cx="208" cy="308" rx="18" ry="6" fill="#94A3B8" />
      <ellipse cx="320" cy="314" rx="18" ry="6" fill="#94A3B8" />
      <ellipse cx="432" cy="308" rx="18" ry="6" fill="#94A3B8" />

      {/* Hexagonal Science Deck & RTG covers */}
      <polygon points="225,210 415,210 435,242 205,242" fill="#E2E8F0" />
      <rect x="215" y="196" width="44" height="22" rx="3" fill="#64748B" />
      <rect x="380" y="196" width="44" height="22" rx="3" fill="#64748B" />

      {/* Drifting Martian dust motes */}
      <circle cx="150" cy="140" r="1.8" fill="#FDBA74" className="animate-dust-drift" />
      <circle cx="445" cy="165" r="2.0" fill="#FED7AA" className="animate-dust-drift" style={{ animationDelay: '2.4s' }} />

      {/* High-gain parabolic dish + gentle telemetry ripple */}
      <line x1="278" y1="210" x2="255" y2="122" stroke="#CBD5E1" strokeWidth="3.5" />
      <ellipse cx="248" cy="112" rx="46" ry="16" transform="rotate(-24 248 112)" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
      <circle cx="248" cy="96" r="12" fill="none" stroke="#FBBF24" strokeWidth="1.2" className="animate-radio-ripple" />

      {/* Imaging cylinder cameras */}
      <rect x="312" y="168" width="16" height="42" fill="#94A3B8" />
      <rect x="352" y="168" width="16" height="42" fill="#94A3B8" />
    </svg>
    <figcaption className="px-4 py-2.5 bg-[#120B09] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
      <span>Viking 1 · Chryse Planitia (“Plains of Gold”)</span>
      <span className="text-amber-300">Touchdown July 20, 1976</span>
    </figcaption>
  </figure>
);

export const VoyagerInterstellarPlate: React.FC = () => (
  <figure className="relic-card relative rounded-xl overflow-hidden border border-slate-800 bg-[#050810]">
    <svg
      viewBox="0 0 640 420"
      className="w-full h-auto block"
      role="img"
      aria-label="Archival illustration of Voyager 1 spacecraft cruising through the interstellar medium"
    >
      <rect width="640" height="420" fill="#050810" />
      {/* Heliopause faint cosmic boundary glow */}
      <ellipse cx="320" cy="210" rx="280" ry="180" fill="url(#voyagerGlow)" opacity="0.22" />
      <defs>
        <radialGradient id="voyagerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#050810" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Twinkling background stars */}
      <circle cx="70" cy="60" r="1.6" fill="#F8FAFC" className="animate-star-twinkle" />
      <circle cx="145" cy="160" r="1.2" fill="#38BDF8" className="animate-star-twinkle" style={{ animationDelay: '1.3s' }} />
      <circle cx="520" cy="70" r="2.1" fill="#FDE68A" className="animate-star-twinkle" style={{ animationDelay: '2.1s' }} />
      <circle cx="560" cy="310" r="1.5" fill="#F8FAFC" className="animate-star-twinkle" style={{ animationDelay: '0.7s' }} />
      <circle cx="95" cy="330" r="1.3" fill="#F8FAFC" className="animate-star-twinkle" style={{ animationDelay: '1.9s' }} />

      {/* Gently sailing Voyager 1 spacecraft */}
      <g className="animate-space-float">
        {/* 13m Magnetometer Boom */}
        <line x1="340" y1="225" x2="590" y2="355" stroke="#64748B" strokeWidth="2.5" strokeDasharray="6 3" />
        {/* RTG Boom */}
        <line x1="280" y1="230" x2="115" y2="310" stroke="#94A3B8" strokeWidth="4" />
        <rect x="85" y="295" width="44" height="18" rx="3" transform="rotate(-24 107 304)" fill="#334155" stroke="#F59E0B" strokeWidth="1.2" />

        {/* Science Scan Platform Boom */}
        <line x1="330" y1="195" x2="465" y2="128" stroke="#CBD5E1" strokeWidth="3.5" />
        <rect x="458" y="106" width="38" height="28" rx="3" fill="#475569" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="484" cy="118" r="5" fill="#22D3EE" className="animate-star-twinkle" />

        {/* Central Decagonal Bus + Golden Record */}
        <polygon points="270,185 350,185 370,228 250,228" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
        <circle cx="310" cy="210" r="16" fill="#F59E0B" stroke="#FDE68A" strokeWidth="2" />
        <circle cx="310" cy="210" r="4" fill="#78350F" />

        {/* 3.7m High-Gain Parabolic Dish */}
        <ellipse cx="305" cy="142" rx="108" ry="44" transform="rotate(-12 305 142)" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2.5" />
        <ellipse cx="305" cy="142" rx="88" ry="34" transform="rotate(-12 305 142)" fill="#F1F5F9" />
        {/* Feed Horn Tripod */}
        <line x1="250" y1="150" x2="292" y2="95" stroke="#64748B" strokeWidth="2" />
        <line x1="360" y1="130" x2="292" y2="95" stroke="#64748B" strokeWidth="2" />
        <line x1="305" y1="175" x2="292" y2="95" stroke="#64748B" strokeWidth="2" />
        <circle cx="292" cy="95" r="7" fill="#334155" />
        <circle cx="292" cy="95" r="16" fill="none" stroke="#22D3EE" strokeWidth="1.2" className="animate-radio-ripple" />
      </g>
    </svg>
    <figcaption className="px-4 py-2.5 bg-[#0A0F1B] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
      <span>Voyager 1 · Interstellar Medium</span>
      <span className="text-cyan-300">164.5 AU · Launched 1977</span>
    </figcaption>
  </figure>
);
