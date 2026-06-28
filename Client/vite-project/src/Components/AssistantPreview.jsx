
// import React, { useState } from 'react'
// import {CiMicrophoneOn} from 'react-icons/ci'
// const themes = {
//     dark: {
//         bg: "bg-[#050816]",

//         overlay:
//             "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_40%))]",
//         orb:
//             "from_cyan-400 via-purple-500 to-pink-500",

//         cardBorder:
//             "border border-white/10",

//         text: "text-white",

//         subtext: "text-white/65",
//         listening:
//             "text-emerald-500",
//         speaking:
//             "text-purple-500",
//         wave: "bg-emerald-500",
//         button:
//             "from-purple-500 to-violet-500",
//         minGlow:
//             "shadow-[0_0_60px_rgba(168,85,247,0.45)]",
//     },
//     light: {
//         bg: "bg-gradient-to-br from-white via-[#f8f8fc] to-[#e0e0e0]",
//         overlay:
//             "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_40%))]",
//         orb:
//             "from_cyan-400 via-purple-500 to-pink-500",

//         cardBorder:
//             "border border-blue-300",

//         text: "text-[#081028]",

//         subtext: "text-[#475569]",

//         listening:
//             "text-blue-500",

//         speaking:
//             "text-purple-500",

//         wave: "bg-blue-500",

//         button:
//             "from-blue-500 to-cyan-500",
//         minGlow:
//             "shadow-[0_0_70px_rgba(59,130,246,0.35)]",
//     },

//     glass: {
//         bg: "bg-black/20 backdrop-blur-[45px]",

//         overlay:
//             "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_45%)]",

//         orb:
//             "from-cyan-200 via-violet-300 to-fuchsia-300",

//         cardBorder:
//             "border border-white/20",

//         text: "text-white",

//         subtext: "text-white/70",

//         listening:
//             "text-cyan-200",

//         wave: "bg-cyan-200",

//         speaking:
//             "text-violet-300",
//         button:
//             "from-cyan-300 to-violet-300",
//         minGlow:
//             "shadow-[0_0_60px_rgba(139,92,246,0.25)]",

//     },

//     neon: {

//         bg: "bg-[#03120d]",


//         overlay: "bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.25),transparent_45%)]",

//         orb: "from-cyan-300 via-purple-500 to-pink-300",

//         cardBorder: "border border-purple-500/30",

//         text: "text-emerald-50",
//         subtext: "text-emerald-100/70",

//         listening: "text-emerald-300",

//         wave: "bg-emerald-300",
//         button: "from-emerald-500 to-green-500",
//         minGlow: "shadow-[0_0_70px_rgba(16,185,129,0.35)]",

//     }

// }
// export default function AssistantPreview({ user }) {

//     const [theme, setTheme] = useState("dark");
//     const current = themes[theme];
//     return (

//         <div className="flex items-center justify-center px-3 sm:px-5 py-10 sm:py-14">
//             <div
//                 className={`
//       relative
//       w-[250px] h-[450px]
//       sm:w-[330px] sm:h-[500px]
//       md:w-[400px] md:h-[600px]
//       rounded-[32px]
//       sm:rounded-[42px]
//       overflow-hidden
//       transition-all
//       duration-500
//       ${current.bg}
//       ${current.cardBorder}
//       shadow-[0_20px_80px_rgba(0,0,0,0.28)]
//     `}
//             >
//                 <div className={`absolute inset-0 ${current.overlay}`} />
//                 <div className='absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex items-center gap-2'>

        
//                     <button
//                         onClick={() => setTheme("dark")}
//                         className={`w-5 h-5 rounded-full bg-purple-500 border-2 transition-all cursor-pointer
//       ${theme === "dark"
//                                 ? "border-white scale-125 shadow-lg shadow-purple-500/50"
//                                 : "border-white/20"
//                             }`}
//                     />

//                     {/* Light Theme */}
//                     <button
//                         onClick={() => setTheme("light")}
//                         className={`w-5 h-5 rounded-full bg-cyan-400 border-2 transition-all cursor-pointer
//       ${theme === "light"
//                                 ? "border-white scale-125 shadow-lg shadow-cyan-400/50"
//                                 : "border-white/20"
//                             }`}
//                     />

//                     {/* Neon Theme */}
//                     <button
//                         onClick={() => setTheme("neon")}
//                         className={`w-5 h-5 rounded-full bg-emerald-400 border-2 transition-all cursor-pointer
//       ${theme === "neon"
//                                 ? "border-white scale-125 shadow-lg shadow-emerald-400/50"
//                                 : "border-white/20"
//                             }`}
//                     />

//                     <button
//                         onClick={() => setTheme("glass")}
//                         className={`w-10 h-10 rounded-full
//     bg-white/15 backdrop-blur-xl
//     border transition-all duration-300 cursor-pointer
//     ${theme === "glass"
//                                 ? "border-white scale-110 shadow-lg shadow-white/20"
//                                 : "border-white/20 hover:bg-white/20"
//                             }`}
//                     >
//                         <div className="w-4 h-4 mx-auto rounded-full bg-gradient-to-br from-white/80 to-white/20" />
//                     </button>
//                 </div>
//                 <div className='relative z-20 flex-col items-center 
// justify-between h-full px-5 py-6 sm:px-7 sm:py-8'>

//                     <div className='relative mt-1'>

//                         <div className={`absolute inset-0 scale-[2] rounded-full blur-[80px] bg-gradient-to-r ${current.orb} opacity-60`} />

//                         <div className={` relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br ${current.orb} shadow-[0_0_120px_rgba(255,255,255,0.15)] 
//         animate-pulse before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:blur-xl`} />

//                         <div className='text-center'>
//                             <h2 className={`text-[20px] sm:text-[24px] 
//                  md:text-[30px]font-semibold ${current.text}`}>
//                                 Hello! I'm Shifra AI</h2>
//                             <p className={`mt-4 text-[12px] sm:text-[14px] md:text-[16px] leading-6 sm:leading-7 max-w-[280px] mx-auto ${current.sub}`}>

//                                 Your smart virtual AI assistant for your website
//                                 <br />
//                                 Ask Anything About Your Website
//                             </p>
//                             <div className='mt-6 sm:mt-8'>
//                                 <p className={` text-sm sm:text-base 
//                     font-medium ${current.listening}`}> Listening...</p>

//                                 <div className='flex items-end justify-center gap-1
//                     sm:gap-1.5 mt-3 sm:mt-4'>

//                                     <span className={` w-1 h-3 rounded-full ${current.wave} animate-pulse`} />

//                                     <span className={` w-1 h-5 rounded-full ${current.wave} animate-pulse`} />

//                                     <span className={` w-1 h-7 rounded-full ${current.wave} animate-pulse`} />
//                                     <span className={` w-1 h-6 rounded-full ${current.wave} animate-pulse`} />
//                                     <span className={` w-1 h-4 rounded-full ${current.wave} animate-pulse`} />
//                                     <span className={` w-1 h-2 rounded-full ${current.wave} animate-pulse`} />

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='relative mb-1'>
//                         <div className={`absolute inset-0 rounded-full blur-2xl opacity-50 ${current.wave}`}/>
//                         <button className={`relative w-12 h-12 sm:w-15 sm:h-15 md:w-18 md:h-18 rounded-full bg-gradient-to-br ${current.button}  ${current.minGlow}  flex items-center justify-center `}>
//                             <CiMicrophoneOn className='text-[#000000b9] size={25}' />

//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
          

        
//     )

// }


import React, { useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";

const themes = {
  dark: {
    bg: "bg-[#050816]",
    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_40%)]",
    orb: "from-cyan-400 via-purple-500 to-pink-500",
    cardBorder: "border border-white/10",
    text: "text-white",
    subtext: "text-white/65",
    listening: "text-emerald-500",
    speaking: "text-purple-500",
    wave: "bg-emerald-500",
    button: "from-purple-500 to-violet-500",
    minGlow: "shadow-[0_0_60px_rgba(168,85,247,0.45)]",
  },

  light: {
    bg: "bg-gradient-to-br from-white via-[#f8f8fc] to-[#e0e0e0]",
    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_40%)]",
    orb: "from-cyan-400 via-purple-500 to-pink-500",
    cardBorder: "border border-blue-300",
    text: "text-[#081028]",
    subtext: "text-[#475569]",
    listening: "text-blue-500",
    speaking: "text-purple-500",
    wave: "bg-blue-500",
    button: "from-blue-500 to-cyan-500",
    minGlow: "shadow-[0_0_70px_rgba(59,130,246,0.35)]",
  },

  glass: {
    bg: "bg-white/10 backdrop-blur-[45px]",
    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_45%)]",
    orb: "from-cyan-200 via-violet-300 to-fuchsia-300",
    cardBorder: "border border-white/20",
    text: "text-white",
    subtext: "text-white/70",
    listening: "text-cyan-200",
    wave: "bg-cyan-200",
    speaking: "text-violet-300",
    button: "from-cyan-300 to-violet-300",
    minGlow: "shadow-[0_0_60px_rgba(139,92,246,0.25)]",
  },

  neon: {
    bg: "bg-[#03120d]",
    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.25),transparent_45%)]",
    orb: "from-cyan-300 via-purple-500 to-pink-300",
    cardBorder: "border border-purple-500/30",
    text: "text-emerald-50",
    subtext: "text-emerald-100/70",
    listening: "text-emerald-300",
    wave: "bg-emerald-300",
    speaking: "text-purple-300",
    button: "from-emerald-500 to-green-500",
    minGlow: "shadow-[0_0_70px_rgba(16,185,129,0.35)]",
  },
};

export default function AssistantPreview() {
  const [theme, setTheme] = useState("dark");
  const current = themes[theme];

  return (
    <div className="flex items-center justify-center px-3 sm:px-5 py-10 sm:py-14">
      <div
        className={`
          relative
          w-[250px] h-[450px]
          sm:w-[330px] sm:h-[500px]
          md:w-[400px] md:h-[600px]
          rounded-[32px]
          sm:rounded-[42px]
          overflow-hidden
          transition-all duration-500
          ${current.bg}
          ${current.cardBorder}
          shadow-[0_20px_80px_rgba(0,0,0,0.28)]
        `}
      >
        {/* Overlay */}
        <div className={`absolute inset-0 ${current.overlay}`} />

        {/* Theme Switcher */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex items-center gap-2">
          <button
            onClick={() => setTheme("dark")}
            className={`w-5 h-5 rounded-full bg-purple-500 border-2 transition-all cursor-pointer ${
              theme === "dark"
                ? "border-white scale-125 shadow-lg shadow-purple-500/50"
                : "border-white/20"
            }`}
          />

          <button
            onClick={() => setTheme("light")}
            className={`w-5 h-5 rounded-full bg-cyan-400 border-2 transition-all cursor-pointer ${
              theme === "light"
                ? "border-white scale-125 shadow-lg shadow-cyan-400/50"
                : "border-white/20"
            }`}
          />

          <button
            onClick={() => setTheme("neon")}
            className={`w-5 h-5 rounded-full bg-emerald-400 border-2 transition-all cursor-pointer ${
              theme === "neon"
                ? "border-white scale-125 shadow-lg shadow-emerald-400/50"
                : "border-white/20"
            }`}
          />

          <button
            onClick={() => setTheme("glass")}
            className={`w-10 h-10 rounded-full bg-white/15 backdrop-blur-xl border transition-all duration-300 cursor-pointer ${
              theme === "glass"
                ? "border-white scale-110 shadow-lg shadow-white/20"
                : "border-white/20 hover:bg-white/20"
            }`}
          >
            <div className="w-4 h-4 mx-auto rounded-full bg-gradient-to-br from-white/80 to-white/20" />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-between h-full px-5 py-6 sm:px-7 sm:py-8">
          <div className="relative mt-1 text-center">
            <div
              className={`absolute inset-0 scale-[2] rounded-full blur-[80px] bg-gradient-to-r ${current.orb} opacity-60`}
            />

            <div
              className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br ${current.orb} shadow-[0_0_120px_rgba(255,255,255,0.15)] animate-pulse before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:blur-xl`}
            />

            <h2
              className={`mt-6 text-[20px] sm:text-[24px] md:text-[30px] font-semibold ${current.text}`}
            >
              Hello! I'm Shifra AI
            </h2>

            <p
              className={`mt-4 text-[12px] sm:text-[14px] md:text-[16px] leading-6 sm:leading-7 max-w-[280px] mx-auto ${current.subtext}`}
            >
              Your smart virtual AI assistant for your website
              <br />
              Ask Anything About Your Website
            </p>

            <div className="mt-6 sm:mt-8">
              <p
                className={`text-sm sm:text-base font-medium ${current.listening}`}
              >
                Listening...
              </p>

              <div className="flex items-end justify-center gap-1 sm:gap-1.5 mt-3 sm:mt-4">
                <span
                  className={`w-1 h-3 rounded-full ${current.wave} animate-pulse`}
                />
                <span
                  className={`w-1 h-5 rounded-full ${current.wave} animate-pulse`}
                />
                <span
                  className={`w-1 h-7 rounded-full ${current.wave} animate-pulse`}
                />
                <span
                  className={`w-1 h-6 rounded-full ${current.wave} animate-pulse`}
                />
                <span
                  className={`w-1 h-4 rounded-full ${current.wave} animate-pulse`}
                />
                <span
                  className={`w-1 h-2 rounded-full ${current.wave} animate-pulse`}
                />
              </div>
            </div>
          </div>

          {/* Mic Button */}
          <div className="relative mb-1">
            <div
              className={`absolute inset-0 rounded-full blur-2xl opacity-50 ${current.wave}`}
            />

            <button
              className={`relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${current.button} ${current.minGlow} flex items-center justify-center`}
            >
              <CiMicrophoneOn
                size={28}
                className="text-[#000000b9]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
