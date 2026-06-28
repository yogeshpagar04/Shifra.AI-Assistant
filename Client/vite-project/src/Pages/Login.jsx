

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HiOutlineSparkles, HiOutlineMicrophone } from "react-icons/hi"
import { HiOutlineBolt, HiOutlineCodeBracket } from "react-icons/hi2"
import { FcGoogle } from "react-icons/fc"
import OIP from "../assets/OIP.jpeg"

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Utils/firebase";
import axios from 'axios';
import { ServerUrl } from '../App'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
export default function Login({setUser}) {

    const navigate = useNavigate();
    const FEATURES = [
        {
            icon: <HiOutlineMicrophone />,
            title: "AI Voice Assistant",
            desc: "Natural real-time Voice Conversations"
        },
        {
            icon: <HiOutlineSparkles />,
            title: "Smart Navigation",
            desc: "Intelligent website navigation and search"
        },
        {
            icon: <HiOutlineCodeBracket />,   // corrected icon1
            title: "Easy Integration",
            desc: "Add Assistant Using one script tag",
        },
        {
            icon: <HiOutlineBolt />,
            title: "Powerful AI",
            desc: "Built on top of OpenAI's GPT-4"
        }
    ];
    const handleLogin =async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const{displayName,email}=result.user;
            console.log("firebase data ::: ",displayName,email);
            // const user = result.user;
            const res= await axios.post(ServerUrl +"/api/auth/google",{ name:displayName, email },{withCredentials:true});
            console.log("checking response from server ::: ")
              setUser(res.data.user);
              toast.success("Login successful!");
              navigate("/");
            // console.log(res.data);
            // setUser(user);
            // navigate("/");
        } catch (error) {
            toast
            console.error("Error during Google Sign-In:", error);
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50 overflow-hidden'>

            <div className='max-w-7xl mx-auto px-6 py-16 lg:py-24'>

                <div className='grid lg:grid-cols-2 gap-16 items-center'>

                    <div>

                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-purple-100 text-purple-600 text-sm font-medium'>
                            <HiOutlineSparkles />
                            Ai voice Assistant Platform
                        </div>

                        <h1 className='mt-8 text-4xl lg:text-5xl font-black leading-tight text-gray-900'>
                            Build AI Assistant

                            <span className='block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-500'>
                                For Any Website
                            </span>

                        </h1>

                        <p className='mt-8 text-lg text-gray-600 leading-8 max-w-2xl'>
                            Create a powerful AI voice assistant for your website in minutes.
                        </p>

                        <button  onClick={handleLogin} className='mt-10 h-16 px-8 rounded-2xl bg-gradient-to-r from-purple-600 to-emerald-500 text-white text-lg font-semibold flex items-center gap-4 shadow-[0_20px_80px_rgba(139,92,246,0.25)] hover:scale-105 transition cursor-pointer'>

                            <FcGoogle className='text-3xl bg-white rounded-full' />

                            Continue with Google

                        </button>

                        <p className='mt-6 text-sm text-gray-500'>
                            free plan includes 200 AI Responses
                        </p>

                    </div>

                    <div className='relative'>

                        <div className='absolute inset-0 bg-gradient-to-br from-purple-200/50 to-emerald-200/40 blur-[120px]' />

                        <div className='relative rounded-[40px] border border-black/5 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)] p-8 overflow-hidden'>

                            <div className='flex items-center justify-between'>

                                <div>
                                    <h2 className='mt-2 text-3xl font-bold text-[#81028f]'>
                                        Features
                                    </h2>
                                </div>

                                <div className='w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-500 to-emerald-500 flex items-center justify-center shadow-[0_20px_80px_rgba(139,92,246,0.25)] p-3'>

                                    <img
                                        src={OIP}
                                        alt="Logo"
                                        className='w-full h-full object-contain'
                                    />

                                </div>

                            </div>
                            <div className='m-10 space-y-5'>
                                {
                                    FEATURES.map(({icon,title,description}, index) => (
                                        <div key={index} className='flex  gap-5 rounded-3xl border border-black/5 bg-[#f9f9f9] p-5'>

                                            <div className='min-w-[60px] h-[60px] rounded-2xl
                                            bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-2xl flex items-center justify-center
                                            shadow-[0_10px_30px_rgba(139,92,246,0.20)]'>
                                                {icon}
                                                </div>
                                                <div>
                                                    <h3 className='text-lg font-semibold text-[#81028f]'>
                                                        {title}
                                                    </h3>
                                                    <p className='mt-2 text-sm leading-7 text-[#64748b]'>
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                    ))
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}