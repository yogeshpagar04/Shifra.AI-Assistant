

import React, { useState } from "react";
import axios from "axios";
import { FiCopy, FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { ServerUrl, CLIENT_URL } from "../App";

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
    const updatedPages = pages.filter((_, i) => i !== index);
    setPages(updatedPages);
  }
  //   setPages((prev) => prev.filter((_, i) => i !== index));
  // };

  const saveAssistant = async () => {
    setLoading(true);

    try {

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

  // const remainingMessages =
  //   Math.max(0,
  //     (user?.requestsLimit || 0) -
  //     (user?.totalMessages || 0)
  //   );

  // const remainingDays =
  //   user?.proExpiresAt
  // Math.max(0,
  //   Math.ceil(
  //     (new Date(user?.planExpiry || Date.now()) - Date.now()) /
  //     (1000 * 60 * 60 * 24)
  //   )
  // );

  //   const remainingDays = Math.max(
  //   0,
  //   Math.ceil(
  //     (new Date(user?.planExpiry || Date.now()) - Date.now()) /
  //       (1000 * 60 * 60 * 24)
  //   )
  // );

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

  const EmbedCode = `<script src="${CLIENT_URL}/assistant.js"data-user-id="${user?.id}">
  </script>`;

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

        {user?.isSetupComplete && !editAssistant && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
            <p className="text-sm text-gray-600">
              Assistant
            </p>

            <h2 className="text-3xl font-semibold text-[#081028] mt-1">
              {user?.assistantName}
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              Your assistant is ready
              to use on your website.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-4">
                <p className="text-sm text-gray-600">
                  Current plan </p>
                <h2 className="text-xl font-bold text-[#081028] mt-1 capitalize">
                  {user?.plan || "Free"}</h2>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-4">
                <p className="text-sm text-gray-600">
                  Gemini Status </p>
                <h2 className={`text-xl font-bold text-[#081028] mt-1 capitalize 
                    ${user?.geminiStatus === "active" ? "text-green-600" : user?.geminiStatus === "inactive" ? "text-red-600" : "text-yellow-600"}`}>
                  {user?.geminiStatus || "Not Set"}</h2>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-4">


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

            <div className="mt-7">
              <div className="mt-4 rounded-2xl bg-amber-50  border border-amber-200 p-4">

                <p className="text-sm text-amber-800 font-semibold">
                  Where to paste this script?
                </p>

                <p className="text-sm text-amber-800 mt-2 leading-7">
                  Paste this script before the closing
                  {""}
                  <span className="font-semibold">
                    {"</body>"}

                  </span>
                  {""}
                  tag of your website's HTML file.
                  <br />
                  <br />
                  Example:
                </p>
                <pre className="mt-3 bg-[#0b1020] text-emerald-400
                rounded-xl p-3 text-xs font-mono overflow-x-autoauto ">
                  {`
                  <body>
                  
                  Your website content 
                  
                  <script src="${CLIENT_URL}/assistant.js" data-user-id="${user?.id}">
                  </script>
                  
                  </body>`}
                </pre>
              </div>
              <p className="text-sm font-medium text-[#081028] mb-3 mt-3">
                Embed Code
              </p>
            </div>

            <div className="relative">
              <textarea
                value={EmbedCode}
                readOnly
                className="w-full h-20 bg-[#0b1020] text-emerald-400
                text-sm font-mono border border-gray-200 outline-none
                rounded-2xl py-2 px-4 resize-none"
              />
              <button onClick={() => {
                navigator.clipboard.writeText(EmbedCode);
                toast.success("Copied")
              }}
                className="absolute top-4 right-4 bg-white w-10 h-10
                 rounded-xl flex items-center justify-center 
                 "><FiCopy /></button>
            </div>
            <button
              onClick={() => setEditAssistant(true)}
              className="mt-6 h-12 px-6 rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white font-medium"
            >
              Edit Assistant
            </button>
          </div>
        )}


        {editAssistant && <div className="space-y-6">
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

              <div className="mt-5 space-y-3 ">
                {pages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 px-3 rounded-xl p-4 gap-4">
                    <div>
                      <h3 className="font-medium">{page.name}</h3>
                      <p className="text-sm text-gray-500">{page.path}</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {page.keywords.length} keywords
                      </span>
                    </div>
                    <button
                      onClick={() => removePage(index)}
                      className="text-red-500 hover:text-red-700  ">
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={saveAssistant} disabled={loading} className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500
            to-emerald-500 text-white font-semibold">
              {loading
                ? "Saving..."
                : user?.isSetupComplete
                  ? "Update Assistant"
                  : "Save Assistant"}
            </button>

          </div>
        </div>}
      </div>
    </div>
  );
}







