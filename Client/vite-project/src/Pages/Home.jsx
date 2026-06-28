import React from 'react'
import { useNavigate } from 'react-router-dom';
import AssistantPreview from '../Components/AssistantPreview';
import OIP from "../assets/OIP.jpeg"
const STEPS = [

  {
    step: 1,
    title: "Sign Up free",
    desc: " Continue with Google & Create an account to get started with your AI assistant."
  },
  {
    step: 2,
    title: "Customize Assistance",
    desc: "setup your business name,tone,voice and theme."
  },
  {
    step: 3,
    title: "Train your Aswebsite",
    desc: "Add business details and personalize responses."
  },
  {
    step: 4,
    title: "Embed Anywhere",
    desc: "copy one script tag and paste it anywhere on your website."
  },
];
export default function Home({ user }) {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen  bg-[#f8fafc] overflow-hidden'>
      <section className=' relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20'>

        <div className='absolute inset-0 bg-gradient-to-br from-purple-50 viva-white to-emerald-50' />

        <div className='absolute top-0 left-1/4 w-[320px] h-[320px] bg-purple-200/40 blur-2xl rounded-full' />

        <div className='absolute bottom-0 right-1/4 w-[320px] h-[320px] bg-emerald-200/40 blur-2xl rounded-full' />

        <div className='relative max-w-6xl mx-auto'>
          <div className='flex justify-center'>
            <span className='inline-flex items-center gap-3 bg-white border brder-purple-100 shadow-sm text-purple-600 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full'>
              <span className='w-2 h-2 bg-purple-500 rounded-full' />
              voice AI for modern website

            </span>
          </div>
          <div className='mt-10 text-center sm:mt-12'>
            <h1 className=' max-w-5xl mx-auto text-[42px] leading-[52px]
        sm:text-6xl sm:leading-[72px] lg:text-7xl lg:leading-[88px]
        font-black tracking-[-0.04em] text-[#081028]'>
              Add a{""}
              <span className='inline-block px-2'>
                <span className='text-transparent bg-clip-text
            bg-gradient-to-r from-purple-500 to-emerald-500'>
                  Virtual AI assistant
                </span>
              </span>
              <br className='hidden sm:block' />
              to your website
            </h1>
            <p className='max-w-2xl mx-auto mt-7 text-sm sm:text-lg lg:text-xl text-[#64748b] leading-relaxed px-2'>
              Create a smart Voice-enabled assistant that talks to Visitors,
              answers questions and helps users navigate your website instantly.

            </p>
            <br />

            <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt10'>
              <button
                onClick={() => navigate("/builder")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl
      bg-gradient-to-r from-purple-500 to-emerald-500 text-white
      font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base
      shadow-[0_12px_40px_rgba(168,85,247,0.25)]
      hover:scale-[1.02] transition-all cursor-pointer"
              >
                Build your Assistant
              </button>
            </div>

            <p className='text-sm text-[#64748b] mt-4'>
              Free plan includes 200 Ai Responses
            </p>
          </div>
          <AssistantPreview />
        </div>
      </section>

      <section className='px-4 sm:px-6 lg:px-8 py-20 bg-white'>

        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-14'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black text-[#081028]'>
              Get Started in Minutes
            </h2>
            <p className='mt-4 text-sm sm:text-base lg:text-lg text-[#64748b]'>
              simple setup. No complicated Integration
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {STEPS.map((s, i) => (
              <div key={i} className='group bg-[#f8fafc] hover:bg-white
              border border-gray-100 rounded-[28px] p-7 transition-all
              hover:shadow-[0_15px_50px_rgba(0,0,0,0.6)]'>

                <span className='text-4xl font-black text-transparent bg-clip-text
                bg-gradient-to-r from-purple-500'>{s.step}</span>

                <h3 className='mt-5 text-lg font-semibold text-[#081028]'>
                  {s.title}</h3>

                <p className='mt-3 text-sm text-gray-500 leading-relaxed'>{s.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      <footer className='bg-[#081028] px-6 py-10'>
        <div className='max-w-6xl mx-auto text-center flex flex-col sm:flex-row
        items-center justify-between gap-4 sm:text-left'> 
        <div>
          <div
                  onClick={() => navigate('/')}
                  className='flex items-center gap-2.5'
                >
                  <img
                    src={OIP}
                    alt="logo"
                    className='w-auto h-9 object-contain'
                  />
        
                  <h1 className='text-xl font-bold text-gray-100 leading-none'>
                    Shifra{" "}
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500'>
                      AI
                    </span>
                  </h1>
                </div>
                <p className='text-gray-400 text-sm mt-1'>
                  Voice AI Assistant for Website</p>
        </div>
        <p className='text-gray-500 text-sm'>
          © {new Date().getFullYear()} Shifra AI. All rights reserved.
        </p>
      </div>


      </footer>

    </div>
  )
};
