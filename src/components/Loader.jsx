import React from 'react'

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 overflow-hidden">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-600 border-t-emerald-400"></div>

        {/* Optional loading text */}
        {text && (
          <p className="text-slate-300 text-sm font-medium animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  )
}

export default Loader