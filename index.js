const express = require("express");
const cors = require("cors");
const { callChatGPTChat } = require("./utils");

const server = express();

//middlewares
server.use(express.urlencoded({extended:false}));
server.use(express.json());
server.use(cors());

//routes
server.post("/chat", async (req,res) => {

    const body = req.body;
    const {message} = body;

    console.log("User message::", message);

    try {
        const responseData = await callChatGPTChat(message);

        console.log(responseData);

        const {choices} = responseData;
    
        console.log("CHATGPT Response::", choices);
    
        let assistantText = '';

        for(let choice of choices) {
            assistantText += choice.message?.content ? choice.message.content : '';
        }

        return res.status(200).json({returnCode:0,assistantText})

    } catch (error) {
        return res.status(500).json({returnCode:-1,assistantText:null})
    }
  

})



server.listen(3000, () => {
    console.log("Server running on PORT", 3000);
})
