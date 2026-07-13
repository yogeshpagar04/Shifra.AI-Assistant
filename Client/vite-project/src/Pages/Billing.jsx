import React from 'react'

export default function Billing({ user, setUser }) {
  
  const remainingMessages = Math.max(
    0,
    (user?.requestLimit || 0) -
    (user?.totalMessages || 0)
  );

  const remainingDays = Math.max(
    0,
    Math.ceil(
      (new Date(user?.proExpiresAt || Date.now()) - Date.now()) /
      (1000 * 60 * 60 * 24)
    )
  );
  return (
    <div className='min-h-screen bg-[#f7f8fc] px-4 py-10'>
      <div className='max-w-5xl mx-auto'>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#081028]">

          Billing & Subscription
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your AI Assistant plan and usage.
          </p>
        </div>

         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

              <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-4">
                <p className="text-sm text-gray-600">
                  Current plan </p>
                <h2 className="text-xl font-bold text-[#081028] mt-1 capitalize">
                  {user?.plan || "Free"}</h2>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-4">
                <p className="text-sm text-gray-600">
                  Gemini Status </p>
                <h2 className={`text-xl font-bold text-[#081028] mt-1 capitalize 
                    ${user?.geminiStatus === "active" ? "text-green-600" : user?.geminiStatus === "inactive" ? "text-red-600" : "text-yellow-600"}`}>
                  {user?.geminiStatus || "Not Set"}</h2>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-6">


                <p className="text-sm text-gray-400">
                  {user?.plan === "free" ? "Message Left" : "Plan Expiry"}
                </p>

                <h2 className="text-xl font-bold text-[#081028] mt-1 capitalize">
                  {user?.plan === "free"
                    ? remainingMessages
                    : `${remainingDays} days`}
                </h2>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>

              <div className='rounded-3xl border border-gray-100 bg-white shadow-sm p-8'>
                <h2 className='text-xl font-bold text-[#081028]'>Free Plan</h2>
                <h3 className='text-5xl font-bold text-[#081028] mt-2'>$0/month</h3>

                <ul className='mt-6 space-y-4 text-gray-600'>
                  <li>1000 AI Messages</li>
                  <li> Voice Assistant</li>
                  <li> Navigation Support</li>
                  <li>Basic Customization</li>

                  </ul>

              </div>

              <div className='rounded-3xl  bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg p-8'>
                <h2 className='text-xl font-bold text-[#081028]'>Pro Plan</h2>
                <h3 className='text-5xl font-bold text-[#081028] mt-2'>$9.99/month</h3>
                <p className='mt-2 opacity-90 '>3 Month Access </p>

                <ul className='mt-6 space-y-4 opacity-90'>
                  <li>Unlimited AI Messages</li>
                  <li>Advanced Voice Assistant</li>
                  <li>Priority Navigation Support</li>
                  <li>Ultimate navigation experience</li>
                  <li>Advanced Customization</li>
                </ul>
               < button  disabled={user?.plan==="pro"}className={`mt-8 h-12 w-full rounded-2xl font-semibold transition 
                ${user?.plan==="pro" ? "bg-emerald-200 text-blck cursor-default"
                :"bg-white text-[#081028] cursor-pointer"}`}>
                  {user?.plan==="pro"?"Active plan":"Upgrade Now"}
               </button>

              </div>

            </div>

      </div>
    </div>
  )
}
