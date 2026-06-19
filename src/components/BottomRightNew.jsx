// Prestige progress circle matching mockup
export default function BottomRightNew({ prestige, prestigeProgress, onPrestige }) {
  const circumference = 2 * Math.PI * 55
  const strokeDashoffset = circumference - (prestigeProgress / 100) * circumference

  return (
    <div className="p-8 border-2 border-purple-500/40 rounded-3xl bg-gradient-to-br from-purple-900/40 to-purple-900/10 backdrop-blur-md">
      <div className="text-center">
        {/* Circular Progress */}
        <svg width="160" height="160" className="mx-auto mb-6">
          {/* Background Circle */}
          <circle
            cx="80"
            cy="80"
            r="55"
            fill="none"
            stroke="#1e293b"
            strokeWidth="3"
            opacity="0.5"
          />

          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r="55"
            fill="none"
            stroke="url(#prestigeGradient)"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s ease',
              transform: 'rotate(-90deg)',
              transformOrigin: '80px 80px'
            }}
          />

          <defs>
            <linearGradient id="prestigeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Center Icon */}
          <text x="80" y="88" textAnchor="middle" fill="#a855f7" fontSize="32" fontWeight="bold">
            ◉
          </text>
        </svg>

        {/* Percentage */}
        <div className="text-4xl font-bold text-white mb-3">{prestigeProgress.toFixed(1)}%</div>
        <div className="text-xs uppercase tracking-widest text-slate-500 font-light mb-4">
          Prestige Progress
        </div>

        {/* Next Level Info */}
        <div className="text-xs text-purple-300 font-light mb-6">
          +37.8% NEXT PRESTIGE
        </div>

        {/* Prestige Button */}
        <button
          onClick={onPrestige}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-600 hover:to-purple-700 border-2 border-purple-500/50 rounded-xl font-bold uppercase text-sm transition-all transform hover:scale-105 text-white"
        >
          Prestige ◉
        </button>
      </div>
    </div>
  )
}
