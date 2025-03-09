const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log("Received message:", message);

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return Response.json({ recommendation: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
