const whichBrowser = () => {
  const isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isFirefox = typeof InstallTrigger !== "undefined";
  const isSafari =
    Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") >
    0;
  const isEdge = navigator.userAgent.indexOf("Edg") !== -1;
  const isOpera =
    (!!window.opr && !!opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(" OPR/") >= 0;
  const isBrave = typeof navigator.brave !== "undefined";
  const isIE =
    navigator.userAgent.indexOf("Trident/") > -1 ||
    navigator.userAgent.indexOf("MSIE") > -1;
  if (isFirefox) {
    return "Firefox";
  } else if (isSafari) {
    return "Safari";
  } else if (isEdge) {
    return "Edge";
  } else if (isOpera) {
    return "Opera";
  } else if (isBrave) {
    return "Brave";
  } else if (isChrome) {
    return "Chrome";
  } else if (isIE) {
    return "IE";
  }
  return "Unknown";
};

const isChromiumBasedBrowser = () => {
  const browserName = whichBrowser();
  return ["Chrome", "Edge", "Opera", "Brave"].includes(browserName);
};

const whichOS = () => {
  const isWindows = navigator.userAgent.indexOf("Windows") !== -1;
  const isMac = navigator.userAgent.indexOf("Mac") !== -1;
  const isLinux = navigator.userAgent.indexOf("Linux") !== -1;
  const isAndroid = navigator.userAgent.indexOf("Android") !== -1;
  const isIOS = navigator.userAgent.indexOf("like Mac") !== -1;
  if (isWindows) {
    return "Windows";
  }
  if (isMac) {
    return "Mac";
  }
  if (isLinux) {
    return "Linux";
  }
  if (isAndroid) {
    return "Android";
  }
  if (isIOS) {
    return "iOS";
  }
  return "Unknown";
};

const chunkText = (text, chunkLength = 150) => {
  const sentences = text.split(/(?<=[.?!])\s+/);
  const sentenceChunks = [];
  sentences.forEach((sentence) => {
    let currentChunk = "";
    sentence.split("").forEach((char, index) => {
      if (
        currentChunk.length < chunkLength &&
        ![".", "!", "?"].includes(char)
      ) {
        currentChunk += char;
      } else if (
        currentChunk.length >= chunkLength &&
        currentChunk.charAt(currentChunk.length - 1) !== " "
      ) {
        const lastSpaceIndex = currentChunk.lastIndexOf(" ");
        sentenceChunks.push(currentChunk.substring(0, lastSpaceIndex));
        currentChunk = currentChunk.substring(lastSpaceIndex + 1) + char;
      } else {
        if (currentChunk.length > 1) {
          sentenceChunks.push(currentChunk.trim());
        }
        currentChunk = char;
      }
      if (index === sentence.length - 1) {
        if (currentChunk.length > 1) {
          sentenceChunks.push(currentChunk.trim());
        }
      }
    });
  });
  return sentenceChunks;
};

const textToVoice = (text, lang = "en-EN", rate = 0.9, pitch = 1) => {
  const textChunks = chunkText(text);
  textChunks.forEach((chunk) => {
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = lang;
    let voices = window.speechSynthesis.getVoices();
    voices.forEach((voice) => {
      if (voice.lang === lang) {
        utterance.voice = voice;
      }
    });
    speechSynthesis.speak(utterance);
  });
};

const listVoices = () => {
  window.speechSynthesis.getVoices().forEach(function (voice) {
    console.log(voice.name + " (CODE :" + voice.lang + ")");
  });
};

const stopTextToVoice = () => {
  speechSynthesis.cancel();
};
