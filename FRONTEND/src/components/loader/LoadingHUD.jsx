import { Lock } from "lucide-react";

export const LoadingHUD = ({ 
  isLoaded, 
  displayProgress, 
  isPausedAtCritical, 
  handleUnlock, 
  setIsHovered, 
  setIsLebronHovered,
  overlayRef,
  buttonRef 
}) => {
  return (
    <div ref={overlayRef} className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
      <div className="max-w-2xl w-full text-center">
        {!isLoaded ? (
          <div className="space-y-8 max-w-md mx-auto">
            <h1 className="text-white text-3xl font-black tracking-[0.5em] uppercase opacity-60 animate-pulse">
              {isPausedAtCritical ? "Checking Core Vitals" : "Initializing"}
            </h1>
            <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FDB927] transition-all duration-300 ease-out shadow-[0_0_15px_#FDB927]"
                style={{ width: `${displayProgress}%` }}
              />
            </div>
            <p className="text-[#FDB927]/40 text-[10px] font-bold tracking-[0.3em] uppercase">
              {isPausedAtCritical ? "Critical Sync In Progress" : `Core Sync ${Math.round(displayProgress)}%`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8 pointer-events-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <button
                ref={buttonRef}
                onClick={handleUnlock}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative px-12 py-6 bg-white/5 border border-white/10 rounded-full backdrop-blur-3xl transition-all duration-700 hover:bg-[#FDB927]/5 hover:border-[#FDB927]/30 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden shadow-2xl"
              >
                <div className="relative z-10 flex items-center gap-5">
                  <div className="p-3 bg-[#FDB927]/10 rounded-full group-hover:bg-[#FDB927]/20 transition-colors shadow-inner">
                    <Lock size={20} className="text-[#FDB927]" />
                  </div>
                  <span className="text-white text-xl font-black tracking-[0.4em] uppercase">Enter Experience</span>
                </div>
              </button>

              <span className="text-white/20 text-xs font-black tracking-[0.5em] uppercase italic">Or</span>

              <button
                onClick={() => window.open("https://www.youtube.com/watch?v=vpXhz8MUwEw", "_blank")}
                onMouseEnter={() => { setIsHovered(true); setIsLebronHovered(true); }}
                onMouseLeave={() => { setIsHovered(false); setIsLebronHovered(false); }}
                className="group relative px-10 py-5 bg-white/2 border border-white/5 rounded-full backdrop-blur-3xl transition-all duration-700 hover:bg-white/10 text-white/50 hover:text-white"
              >
                <span className="relative z-10 text-sm font-bold tracking-[0.3em] uppercase">2018 Lebron</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};