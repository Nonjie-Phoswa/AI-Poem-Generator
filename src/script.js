let form = document.querySelector("#poemForm");
form.addEventListener("submit", generatePoem);

function generatePoem(event) {
  event.preventDefault();

  let topic = document.querySelector("#topicInput").value.trim();

  let errorMessage = document.querySelector("#errorMessage");
  errorMessage.textContent = "";

  if (!topic) {
    errorMessage.textContent = "Please enter a topic name.";
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(topic)) {
    errorMessage.textContent =
      "Invalid topic. Only letters and spaces allowed.";
    return;
  }

  // Show loading indicator
  document.getElementById("poemPlaceholder").style.display = "none";
  document.getElementById("poemContent").style.display = "none";
  document.getElementById("loadingIndicator").style.display = "flex";

  setTimeout(showPoem, 2000);
}

function showPoem() {
  let fallbackPoem = `On the topic of ${topic}
                
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

  // Hide loading indicator and show poem
  document.getElementById("loadingIndicator").style.display = "none";
  document.getElementById("poemContent").textContent = fallbackPoem;
  document.getElementById("poemContent").style.display = "block";
}
