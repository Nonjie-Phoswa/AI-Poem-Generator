let form = document.querySelector("#poemForm");
form.addEventListener("submit", generatePoem);

function generatePoem(event) {
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
  document.getElementById("poemPlaceholder").style.display = "none";
  document.getElementById("poemContent").style.display = "none";
  const loadingEl = document.getElementById("loadingIndicator");
  if (loadingEl) loadingEl.style.display = "flex";

  // Correct fetch usage: call fetch(url) then chain .then(...)
  fetch(`/.netlify/functions/getPoem?topic=${encodeURIComponent(topic)}`)
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

      const poemContentEl = document.getElementById("poemContent");
      const answer =
        (data && (data.answer || data.response || data.poem || data.result)) ||
        "";
      poemContentEl.textContent = answer || showPoem(topic);
      poemContentEl.style.display = "block";
    })
    .catch((error) => {
      if (loadingEl) loadingEl.style.display = "none";

      const poemContentEl = document.getElementById("poemContent");
      poemContentEl.textContent = showPoem(topic);
      poemContentEl.style.display = "block";
      console.error(error);
    });
}

function showPoem(topic) {
  return `On the topic of ${topic}
                
In realms of thought where ${topic} resides,
A tapestry of meaning gently glides.
Through whispered words and silent sighs,
A universe of ${topic} never dies.

It dances in the morning light,
And lingers through the darkest night.
A constant presence, pure and bright,
${topic}'s essence, our soul's delight.

So let us cherish, let us hold,
This ${topic} story to be told.
More precious than the finest gold,
A wonder to behold.`;
}
