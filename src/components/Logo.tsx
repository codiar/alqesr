export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  light?: boolean;
}

export default function Logo({
  className = '',
  size = 'md',
  showText = true,
  light = false
}: LogoProps) {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Royal Crest Emblem */}
      <div className={`relative ${sizeMap[size]} flex-shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle Outer Glow / Circle */}
          <circle cx="100" cy="100" r="94" fill={light ? '#FFFFFF' : '#083B38'} stroke="url(#goldGradient)" strokeWidth="3" />
          <circle cx="100" cy="100" r="88" fill="none" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="4 3" opacity="0.7" />

          {/* 5 Golden Stars at the top */}
          <g fill="url(#goldGradient)" filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.3))">
            {/* Star 1 (Leftmost) */}
            <path d="M56 36 L58 42 L64 42 L59 46 L61 52 L56 48 L51 52 L53 46 L48 42 L54 42 Z" transform="scale(0.8) translate(14, 5)" />
            {/* Star 2 */}
            <path d="M78 30 L80 36 L86 36 L81 40 L83 46 L78 42 L73 46 L75 40 L70 36 L76 36 Z" transform="scale(0.85) translate(12, 3)" />
            {/* Star 3 (Center - Highest) */}
            <path d="M100 25 L102.5 32 L110 32 L104 37 L106.5 44 L100 39.5 L93.5 44 L96 37 L90 32 L97.5 32 Z" transform="scale(0.95) translate(5, 0)" />
            {/* Star 4 */}
            <path d="M122 30 L124 36 L130 36 L125 40 L127 46 L122 42 L117 46 L119 40 L114 36 L120 36 Z" transform="scale(0.85) translate(18, 3)" />
            {/* Star 5 (Rightmost) */}
            <path d="M144 36 L146 42 L152 42 L147 46 L149 52 L144 48 L139 52 L141 46 L136 42 L142 42 Z" transform="scale(0.8) translate(28, 5)" />
          </g>

          {/* Ornate Islamic Arabesque Crown / Flourish */}
          <path
            d="M100 48 C92 48 88 56 84 56 C78 56 74 52 70 55 C66 58 66 65 72 68 C76 70 82 66 86 70 C90 74 95 80 100 80 C105 80 110 74 114 70 C118 66 124 70 128 68 C134 65 134 58 130 55 C126 52 122 56 116 56 C112 56 108 48 100 48 Z"
            fill={light ? '#083B38' : '#14B8A6'}
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
          />

          {/* Central Calligraphy Square Border */}
          <rect
            x="50"
            y="65"
            width="100"
            height="80"
            rx="8"
            fill={light ? '#FAF8F4' : '#0B4743'}
            stroke="url(#goldGradient)"
            strokeWidth="2.5"
          />
          <rect
            x="56"
            y="71"
            width="88"
            height="68"
            rx="4"
            fill="none"
            stroke={light ? '#083B38' : '#2DD4BF'}
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* Square Kufic Motif Stylized representation of "القصر الملكي" */}
          <g stroke={light ? '#083B38' : '#5EEAD4'} strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
            {/* Upper line: القصر */}
            <path d="M62 82 H138 M62 82 V92 M74 82 V98 H126 M90 90 V102 M102 82 V102 M114 82 V102 M126 90 H138 V110" />
            {/* Lower line: الملكي */}
            <path d="M62 126 H138 M62 116 H80 V126 M92 112 H108 V126 M120 114 H138 V126 M76 106 H124" />
          </g>

          {/* Center text clear emblem overlay */}
          <text
            x="100"
            y="94"
            textAnchor="middle"
            fontFamily="'Cairo', sans-serif"
            fontWeight="900"
            fontSize="15"
            fill="url(#goldGradient)"
            letterSpacing="1"
          >
            القصر
          </text>
          <text
            x="100"
            y="114"
            textAnchor="middle"
            fontFamily="'Cairo', sans-serif"
            fontWeight="900"
            fontSize="15"
            fill="url(#goldGradient)"
            letterSpacing="1"
          >
            الملكي
          </text>

          {/* Lower Arabesque Swirl */}
          <path
            d="M75 148 C85 145 92 154 100 154 C108 154 115 145 125 148 C120 155 110 158 100 158 C90 158 80 155 75 148 Z"
            fill="url(#goldGradient)"
          />

          {/* VIP Emblem Banner at Bottom */}
          <text
            x="100"
            y="178"
            textAnchor="middle"
            fontFamily="'Marcellus', 'Times New Roman', serif"
            fontWeight="bold"
            fontSize="21"
            fill="url(#goldGradient)"
            letterSpacing="4"
          >
            VIP
          </text>

          {/* Linear Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFB55D" />
              <stop offset="35%" stopColor="#FFF3CA" />
              <stop offset="70%" stopColor="#C69D4A" />
              <stop offset="100%" stopColor="#99732A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1">
            <span className={`font-black tracking-tight leading-none ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
            } ${light ? 'text-[#FAF7F2]' : 'text-[#083B38]'}`}>
              قاعة القصر الملكي
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded font-bold bg-[#C69D4A]/20 text-[#C69D4A] border border-[#C69D4A]/40">
              VIP
            </span>
          </div>
          <span className={`text-[11px] font-medium tracking-wide ${
            light ? 'text-[#DFB55D]' : 'text-[#8C6D2B]'
          }`}>
            خلي يومك مميز معنا • كربلاء
          </span>
        </div>
      )}
    </div>
  );
}
