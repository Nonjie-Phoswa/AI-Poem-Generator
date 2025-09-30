exports.handler = async function (event) {
  let API_KEY = process.env.SheCodes_AI_API;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: "Error: Missing SheCodes_AI_API key",
    };
  }

  let topic = event.queryStringParameters.topic.trim();

  let prompt = `Create daily affirmations about ${topic} and in the language of the ${topic}. The affirmations must start with a title written in ALL CAPS on the first line. Do not use asterisks or special characters around the title. Each affirmation must be positive, unisex, written in the first person and if it's inpired by the Bible, include a short scripture reference in brackets at the end. Do not number or format them with symbols. Just return plain text.`;

  let context = "Make it creative, engaging and less than 120 words.";

  let url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${API_KEY}`;

  try {
    let response = await fetch(url);

    let data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Server error: ${error.message}`,
    };
  }
};
