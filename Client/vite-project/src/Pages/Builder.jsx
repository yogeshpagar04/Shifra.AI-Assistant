

// import React, { useState } from "react";
// import axios from "axios";
// import { ServerUrl } from "../main"; // change path if needed
// import { FiPlus, FiTrash2 } from "react-icons/fi";
// import toast from "react-hot-toast";

// const THEMS = [
//   "light",
//   "dark",
//   "glass",
//   "neon",
// ];

// const TONES = [
//   "friendly",
//   "professional",
//   "sales",
//   "playful",

// ]

// export default function Builder({ user, setUser }) {

//   const[editAssistant,setEditAssistant]=useState(!user?.isSetupComplete)
//   const [assistantName, setAssistantName] = useState(user?.assistantName || "");

//   const [businessName, setBusinessName] = useState(user?.businessName || "");
//   const [businessType, setBusinessType] = useState(user?.businessType || "");
//   const [businessDescription, setBusinessDescription] = useState(user?.businessDescription || "");

//   const [theme, setTheme] = useState(user?.theme || "dark");
//   const [tone, setTone] = useState(user?.tone || "friendly");
//   const [geminiApiKey, setGeminiApiKey] = useState(user?.geminiApiKey || "");


//   const [pages, setPages] = useState(user?.pages || []);
//   const [pageName, setPageName] = useState("")
//   const [pagePath, setPagePath] = useState("");
//   const [pageKeywords, setPageKeywords] = useState("");

//   const [loading, setLoading] = useState(false);


// const addPage = () => {
//   if (!pageName || !pagePath) {
//     alert("Please fill in the page name and path.");
//     return;
//   }

//   const newPage = {
//     name: pageName,
//     path: pagePath,
//     keywords: pageKeywords
//       .split(",")
//       .map((keyword) => keyword.trim())
//       .filter((keyword) => keyword !== ""),
//   };

//   setPages([...pages, newPage]);

//   setPageName("");
//   setPagePath("");
//   setPageKeywords("");
// };

// const removePage = (index) => {
//   const updatedPages = pages.filter((_, i) => i !== index);
//   setPages(updatedPages);
// }

// const saveAssistant = async () => {
//   setLoading(true);
//   try {
//       const data={
//         assistantName,
//         businessName,
//         businessType,
//         businessDescription,
//         theme,
//         tone,
//         geminiApiKey,
//         pages,
    
//     }
//     const res=await axios.post(ServerUrl+"/api/user/save-assistant",data,{withcredentials:true})
//   console.log(res.data);
  
//     setUser(res.data.user)
//     toast.success("Assistant saved successfully!");
// setEditAssistant(false)
//     setLoading(false);
//   } catch (error) {
//   toast.error("Failed to save assistant. Please try again.");
//   console.log(error);
  
//   setLoading(false);
//   }
// };



import React, { useState } from "react";
import axios from "axios";
import { ServerUrl } from "../main";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const THEMS = [
  "light",
  "dark",
  "glass",
  "neon",
];

const TONES = [
  "friendly",
  "professional",
  "sales",
  "playful",
];

export default function Builder({ user, setUser }) {
  const [editAssistant, setEditAssistant] = useState(
    !user?.isSetupComplete
  );

  const [assistantName, setAssistantName] = useState(
    user?.assistantName || ""
  );

  const [businessName, setBusinessName] = useState(
    user?.businessName || ""
  );

  const [businessType, setBusinessType] = useState(
    user?.businessType || ""
  );

  const [businessDescription, setBusinessDescription] = useState(
    user?.businessDescription || ""
  );

  const [theme, setTheme] = useState(user?.theme || "dark");
  const [tone, setTone] = useState(user?.tone || "friendly");

  const [geminiApiKey, setGeminiApiKey] = useState(
    user?.geminiApiKey || ""
  );

  const [pages, setPages] = useState(
    Array.isArray(user?.pages) ? user.pages : []
  );

  const [pageName, setPageName] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [pageKeywords, setPageKeywords] = useState("");

  const [loading, setLoading] = useState(false);

  const addPage = () => {
    if (!pageName.trim() || !pagePath.trim()) {
      toast.error("Please fill Page Name and Path.");
      return;
    }

    const newPage = {
      name: pageName.trim(),
      path: pagePath.trim(),
      keywords: pageKeywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    };

    setPages((prev) => [...prev, newPage]);

    setPageName("");
    setPagePath("");
    setPageKeywords("");
  };

  const removePage = (index) => {
    setPages((prev) => prev.filter((_, i) => i !== index));
  };

  const saveAssistant = async () => {
    try {
      setLoading(true);

      const data = {
        assistantName,
        businessName,
        businessType,
        businessDescription,
        theme,
        tone,
        geminiApiKey,
        pages,
      };

      const res = await axios.post(
        `${ServerUrl}/api/user/save-assistant`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      if (res.data?.user) {
        setUser(res.data.user);
      }

      toast.success("Assistant saved successfully!");

      setEditAssistant(false);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to save assistant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#081028]">
            Assistant Builder
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Create and customize your AI assistant for your website.
          </p>
        </div>

      {  editAssistant && <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-[#081028] mb-4">
              Basic Assistant Details
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
                placeholder="Assistant Name"
                className="w-full border border-gray-300 rounded-2xl py-2 px-4"
              />

              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Business Name"
                className="w-full border border-gray-300 rounded-2xl py-2 px-4"
              />

              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="Business Type"
                className="w-full border border-gray-300 rounded-2xl py-2 px-4"
              />


              <textarea
                type="text"
                rows={4}
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="Business Description"
                className="w-full border border-gray-300 rounded-2xl py-2 px-4 resize-none"
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-[#081028] mb-4">
              Appearance
            </h2>
            <div>
              <label className="text-sm text-gray-600 mb-3 block">
                Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {THEMS.map((item) => (
                  <button
                    key={item}
                    className={`bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-2xl transition-colors duration-200 ${theme === item ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setTheme(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm text-gray-600 mb-3 block">
                Assistant Tone
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-4 gap-3">
                {TONES.map((item) => (
                  <button
                    key={item}
                    className={`bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-2xl transition-colors duration-200 ${tone === item ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setTone(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

          </div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5
            gap-4 flex-wrap">
              <div>
                <h2 className="text-lg font-semibold">
                  Gemini API key
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Add Your Gemini API Key To power Your Assistant

                </p>
              </div>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get Gemini API Key
              </a>
            </div>
            <input type="password"
              placeholder="AIza..."
              onChange={(e) => setGeminiApiKey(e.target.value)}
              value={geminiApiKey}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3" />
            <p className="text-xs text-gray-500 mt-3 leading-6">
              Your Api key is securely stored and only used for generating
              responses for your assistant.
              We do not share or store your key for any other purpose.
            </p>

          </div>
          <div className="bg-white rounded-3xl border border-gray-100  shadow-sm p-6">
            <div className="flex items-center justify-between mb-5
            gap-4 flex-wrap">
              <h2 className="text-lg font-semibold">
                Navigation Pages
              </h2>
              <div>
                <button
  onClick={addPage}
  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm"
>
  <FiPlus />
  Add New Page
</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input type="text" placeholder="Page Name"
                  className="border border-gray-200 rounded-2xl px-4 py-3"
                  onChange={(e) => setPageName(e.target.value)} value={pageName} />

                <input type="text" placeholder="/pricing"
                  className="border border-gray-200 rounded-2xl px-4 py-3"
                  onChange={(e) => setPagePath(e.target.value)} value={pagePath} />

                <input type="text" placeholder="Pricing, Plans, Subscription"
                  className="border border-gray-200 rounded-2xl px-4 py-3"
                  onChange={(e) => setPageKeywords(e.target.value)} value={pageKeywords} />
              </div>

              <div className="mt-5 space-y-3">
                {pages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-xl p-4">
                    <div>
                      <h3 className="font-medium">{page.name}</h3>
                      <p className="text-sm text-gray-500">{page.path}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {page.keywords.length} keywords
                      </span>
                    </div>
                    <button 
                    onClick={() => removePage(index)}
                    className="text-red-500 hover:text-red-700">
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={saveAssistant} disabled={loading} className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500
            to-emerald-500 text-white font-semibold">
              {loading ? "Saving..." : user.isSetupComplete ? "Update Assistant" : "Save Assistant"}
            </button>
          </div>
        </div>}
      </div>
    </div>
  );
}







