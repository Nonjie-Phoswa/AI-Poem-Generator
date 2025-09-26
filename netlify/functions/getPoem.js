exports.handler = async function (event) {
  let API_KEY = process.env.SheCodes_AI_API;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: "Error: Missing SheCodes_AI_API key",
    };
  }

  let topic = event.queryStringParameters.topic.trim();

  let prompt = `Create a short poem about ${topic} and in the language of the ${topic}. The poem must start with a title written in ALL CAPS on the first line. Do not use asterisks, quotes or special characters around the title.`;

  let context = "Make it creative, engaging, in a poetic style and less than 100 words.";

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
