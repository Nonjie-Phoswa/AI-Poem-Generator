exports.handler = async (event) => {
  try {
    
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
        },
        body: "",
      };
    }

    
    const API_KEY = process.env.SheCodes_AI_API;
    if (!API_KEY) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: "Missing SheCodes_AI_API environment key",
      };
    }

    const params = event.queryStringParameters || {};
    const topic = (params.topic || "life").trim();

    const prompt = `Create a poem about ${topic}`;
    const context = "Make it creative, engaging and in a poetic style.";

    const url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
      prompt
    )}&context=${encodeURIComponent(context)}&key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      return {
        statusCode: response.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: text,
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
 
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: `Server error: ${error.message}`,
    };
  }
};
