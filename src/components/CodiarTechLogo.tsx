export default function CodiarTechLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <a
      href="https://www.instagram.com/codiar_tech"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 border border-[#C69D4A]/30 hover:border-[#C69D4A]/70 transition-all duration-300 group ${className}`}
      title="تم تطوير الموقع من قبل شركة كوديار تك"
    >
      {/* Stylized 3D Codiar Tech Hexagonal Badge */}
      <svg viewBox="0 0 120 120" className="w-6 h-6 flex-shrink-0 drop-shadow" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ctBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="ctOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>
        {/* Left Wing Bracket < in Blue */}
        <path d="M52 18 L24 45 L12 60 L24 75 L52 102 L52 86 L32 60 L52 34 Z" fill="url(#ctBlue)" stroke="#0369A1" strokeWidth="2" />
        {/* Right Wing Bracket > in Orange */}
        <path d="M68 18 L96 45 L108 60 L96 75 L68 102 L68 86 L88 60 L68 34 Z" fill="url(#ctOrange)" stroke="#C2410C" strokeWidth="2" />
        {/* Central Core */}
        <rect x="54" y="24" width="12" height="72" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        {/* Central Code / Tech Dot Icons */}
        <circle cx="60" cy="40" r="2.5" fill="#38BDF8" />
        <rect x="57" y="52" width="6" height="6" rx="1.5" fill="#FFFFFF" />
        <circle cx="60" cy="74" r="2.5" fill="#FB923C" />
      </svg>

      <div className="flex flex-col text-right">
        <span className="text-[10px] text-gray-300 font-medium group-hover:text-white transition-colors">
          تم تطوير الموقع من قبل
        </span>
        <span className="text-xs font-bold text-[#E0BE6C] tracking-wide group-hover:text-amber-300 transition-colors">
          شركة كوديار تك • CODIAR TECH
        </span>
      </div>
    </a>
  );
}
