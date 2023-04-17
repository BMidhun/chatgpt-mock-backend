const nFetch = require("node-fetch");

async function callChatGPTChat (content) {
    const res = await nFetch("https://api.openai.com/v1/chat/completions", {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
            "OpenAI-Organization": `${process.env.OPENAI_ORG}`
        },
       body: JSON.stringify({
            messages: [{role:"user", content}],
            model: "gpt-3.5-turbo"
        })
    });

    return await res.json();
}

module.exports = {callChatGPTChat}
