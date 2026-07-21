(function () {
  // ==========================
  // User Data
  // ==========================
  const script = document.currentScript;
  const userId = script?.dataset?.userId || "";

  console.log("User:", userId);

  // Default theme fallback
  const defaultTheme = "dark";
  let assistantConfig = null;

  // ==========================
  // Load CSS
  // ==========================
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://shifra-yp-ai-assistant.onrender.com/assistant.css";
    // link.href = "https://shifraai-assistant-yp.netlify.app//assistant.css";

  document.head.appendChild(link);

  // ==========================
  // Popup
  // ==========================
  const popup = document.createElement("div");
  popup.className = `shifra-popup theme-${defaultTheme}`;

  popup.innerHTML = `
<div class="shifra-overlay"></div>

<div class="shifra-content">
  <div class="shifra-top">
    <div class="shifra-orb-wrap">
      <div class="shifra-orb-glow"></div>
      <div class="shifra-orb"></div>
    </div>

    <h2 class="shifra-title">Hello! I'm Shifra Assistant</h2>

    <p class="shifra-sub">
      Your smart voice assistant.
      <br>
      Ask me anything about your website.
    </p>

    <div class="shifra-status">Tap button to speak</div>

    <div class="shifra-wave">
      <span></span><span></span><span></span><span></span><span></span><span></span>
    </div>

    <div class="shifra-user-text">User</div>
    <div class="shifra-ai-text">AI</div>
  </div>

  <div class="shifra-bottom">
    <button class="shifra-mic">
      <img src="https://shifra-yp-ai-assistant.onrender.com/mic.png" class="shifra-mic-icon" alt="Mic" />
    </button>
  </div>
</div>
`;

  document.body.appendChild(popup);
  popup.style.display = "none";

  // ==========================
  // Floating Button
  // ==========================
  const button = document.createElement("button");
  button.className = `shifra-btn theme-${defaultTheme}`;
  button.innerHTML = `
    <img src="https://shifra-yp-ai-assistant.onrender.com/logo.png" alt="logo" />
  `;
  document.body.appendChild(button);

  // ==========================
  // Toggle Popup
  // ==========================
  let isOpen = false;
  button.addEventListener("click", () => {
    isOpen = !isOpen;
    popup.style.display = isOpen ? "flex" : "none";
  });

  // ==========================
  // Config Load + Apply
  // ==========================
  const applyConfig = () => {
    if (!assistantConfig) return;

    const theme = assistantConfig.theme || defaultTheme;

    popup.className = `shifra-popup theme-${theme}`;
    button.className = `shifra-btn theme-${theme}`;

    const title = popup.querySelector(".shifra-title");
    title.textContent = `Hello! I'm ${assistantConfig.assistantName || "Shifra Assistant"}`;

    const subTitle = popup.querySelector(".shifra-sub");
    subTitle.innerHTML = `
      Welcome to ${assistantConfig.businessName || "our website"}.
      <br/>
      Ask me anything about your website.
    `;
  };

  const loadAssistant = async () => {
    try {
      const response = await fetch(`https://shifra-ai-assistant.onrender.com/api/assistant/config/${userId}`);
      const data = await response.json();

      if (data?.user) {
        assistantConfig = data.user;
        applyConfig();
      }
    } catch (error) {
      console.log("Assistant load error:", error);
    }
  };

  // IMPORTANT: call once (no recursion)
  loadAssistant();

  // ==========================
  // Voice + UI refs
  // ==========================
  const status = popup.querySelector(".shifra-status");
  const wave = popup.querySelector(".shifra-wave");
  const userText = popup.querySelector(".shifra-user-text");
  const aiText = popup.querySelector(".shifra-ai-text");
  const mic = popup.querySelector(".shifra-mic");

  const speak = (text) => {
    window.speechSynthesis.cancel();
    aiText.textContent = text;
    status.textContent = "AI Speaking...";

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
  

    speech.onend = () => {
      status.textContent = "Tap button to speak";
      wave.style.opacity = "0.4";
    };

    window.speechSynthesis.speak(speech);
  };

  const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognitionClass) {
    const recognition = new SpeechRecognitionClass();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    let isListening = false;

    recognition.onstart = () => {
      isListening = true;
      status.textContent = "Listening...";
      wave.style.opacity = "1";
    };

    recognition.onend = () => {
      isListening = false;
      if (status.textContent !== "Processing...") {
        status.textContent = "Tap button to speak";
      }
      wave.style.opacity = "0.4";
    };

    recognition.onerror = () => {
      status.textContent = "Tap button to speak";
      wave.style.opacity = "0.4";
    };

    recognition.onresult = async (e) => {
      const text = e.results?.[0]?.[0]?.transcript || "";
      userText.textContent = "You: " + text;

      recognition.stop();

      setTimeout(async () => {
        try {
          status.textContent = "Processing...";

          // const response = await fetch("http://localhost:5000/api/assistant/ask", {
          //   method: "POST",
          //   // credentials: "include",
          //   headers: {
          //     "Content-Type": "application/json"
          //   },
          //   body: JSON.stringify({
          //     userId,
          //     message: text
          //   })
          // });
          const response = await fetch("https://shifra-ai-assistant.onrender.com/api/assistant/ask", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId,
    message: text,
  }),
});

          const data = await response.json();
          console.log("Assistant Response:", data);

          if (data?.success) {
            speak(data.response || "Done.");

            if (data.action === "navigate" && data.path) {
              setTimeout(() => {
                window.location.href = data.path;
              }, 1500);
            }else{
              speak(data.airespons)
            }

            
          } else {
            speak("Response error. Please check your plan.");
          }
        } catch (error) {
          speak("AI server error");
        }
      }, 600);
    };

    mic.onclick = () => {
      if (isListening) return;

      userText.textContent = "";
      aiText.textContent = "";

      try {
        recognition.start();
      } catch (err) {
        console.log(err);
      }
    };
  } else {
    status.textContent = "Speech recognition not supported in this browser.";
  }
})();
