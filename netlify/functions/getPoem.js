const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    let API_KEY = process.env.SheCodes_AI_API;

    let topic = event.queryStringParameters.topic || "life";

    let prompt = `Create a poem about ${topic}`;
    let context = "Make it creative, engaging and in a poetic style.";

    let url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
      prompt
    )}&context=${encodeURIComponent(context)}&key=${API_KEY}`;
    
    let response = await fetch(url);

    let data = await response.json();

    return {
      statusCode: 200,
  