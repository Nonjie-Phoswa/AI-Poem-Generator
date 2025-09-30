let form = document.querySelector("#appForm");
form.addEventListener("submit", generateAffirmation);

function generateAffirmation(event) {
  event.preventDefault();

  let topic = document.querySelector("#topicInput").value.trim();

  let errorMessage = document.querySelector("#errorMessage");
  if (errorMessage) {
    errorMessage.textContent = "";
  }

  if (!topic) {
    if (errorMessage) {
      errorMessage.textContent = "Please enter a topic name.";
    }
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(topic)) {
    if (errorMessage) {
      errorMessage.textContent =
        "Invalid topic. Only letters and spaces allowed.";
    }
    return;
  }

  // Show loading indicator
  document.getElementById("affirmationPlaceholder").style.display = "none";
  document.getElementById("affirmationContent").style.display = "none";
  const loadingEl = document.getElementById("loadingIndicator");
  if (loadingEl) loadingEl.style.display = "flex";

  fetch(`/.netlify/functions/getAffirmation?topic=${encodeURIComponent(topic)}`)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text || `Request failed with ${response.status}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      if (loadingEl) loadingEl.style.display = "none";

      const affirmationContentEl = document.getElementById("affirmationContent");
      const answer =
        (data && (data.answer || data.response || data.poem || data.result)) ||
        showAffirmation(topic);

      let lines = answer.split("\n");
      let title = lines[0];
      let body = lines.slice(1).join("\n");

      affirmationContentEl.innerHTML = "";
      affirmationContentEl.style.display = "block";

      let titleEl = document.createElement("div");
      let bodyEl = document.createElement("div");
      titleEl.className = "affirmation-title";
      bodyEl.className = "affirmation-body";
      affirmationContentEl.appendChild(titleEl);
      affirmationContentEl.appendChild(bodyEl);

      new window.Typewriter(titleEl, {
        strings: title,
        autoStart: true,
        cursor: "",
        delay: 50,
      });

      const titleLength = title.length;
      const estimatedTime = titleLength * 70;

      bodyEl.style.opacity = "0";
      bodyEl.style.transition = "opacity 1.5s ease-in";

      setTimeout(() => {
        bodyEl.textContent = body;
        bodyEl.style.opacity = "1";
      }, estimatedTime);
    })

    .catch((error) => {
      if (loadingEl) loadingEl.style.display = "none";

      const affirmationContentEl =
        document.getElementById("affirmationContent");
      affirmationContentEl.textContent = showAffirmation(topic);
      affirmationContentEl.style.display = "block";
      console.error(error);
    });
}

function showAffirmation(topic) {
  return `${topic}
                
Even in the area of ${topic}, I am a child of God,
Guided by His wisdom and strengthened by His love. 
His grace covers every part of my life, including ${topic}.`;
}
