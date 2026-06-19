// Prestige progress circle
export default function BottomRightNew({ prestige, prestigeProgress, onPrestige }) {
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (prestigeProgress / 100) * circumference

  return (
    <div className="p-8 border border-purple-500/30 rounded-2xl bg-gradient-to-br from-purple-900/50 to-transparent backdrop-blur-sm">
      <div className="text-center">
        {/* Circular Progress */}
        <svg width="120" height="120" className="mx-auto mb-4">
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* Center icon */}
          <text x="60" y="65" textAnchor="middle" fill="#a855f7" fontSize="24">
            ◉
          </text>
        </svg>

        {/* Percentage */}
        <div className="text-3xl font-bold text-white mb-2">{prestigeProgress.toFixed(1)}%</div>
        <div className="text-xs text-slate-400 uppercase tracking-wider">Prestige Progress</div>

        {/* Next Level Info */}
        <div className="text-xs text-purple-400 mt-3">
          +37.8% Next Prestige
        </div>

        {/* Prestige Button */}
        <button
          onClick={onPrestige}
          className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg font-bold uppercase text-sm transition-all transform hover:scale-105"
        >
          Prestige ◉
        </button>
      </div>
    </div>
  )
}
