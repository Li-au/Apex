// New game layout component matching the mockup design
export default function GameLayout({
  children,
  header,
  leftSidebar,
  rightSidebar,
  mainContent,
  bottomLeft,
  bottomRight,
  bottomCenter,
}) {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {header}
      </div>

      {/* Main Content Area */}
      <div className="fixed top-24 left-0 right-0 bottom-0 flex">
        {/* Left Sidebar */}
        <div className="w-32 border-r border-purple-500/30">
          {leftSidebar}
        </div>

        {/* Center Content */}
        <div className="flex-1 overflow-auto">
          {mainContent}
        </div>

        {/* Right Sidebar */}
        <div className="w-32 border-l border-purple-500/30">
          {rightSidebar}
        </div>
      </div>

      {/* Bottom Left */}
      <div className="fixed bottom-0 left-32 z-30">
        {bottomLeft}
      </div>

      {/* Bottom Center */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-30">
        {bottomCenter}
      </div>

      {/* Bottom Right */}
      <div className="fixed bottom-0 right-32 z-30">
        {bottomRight}
      </div>
    </div>
  )
}
