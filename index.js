const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { callChatGPTChat } = require("./utils");
const compression = require("compression");

const server = express();

//middlewares
dotenv.config();
server.use(express.urlencoded({extended:false}));
server.use(express.json());
server.use(cors());
server.use(compression())

//routes
server.get("/", async(req,res) => {
     res.json("Hello World")
})

server.post("/chat", async (req,res) => {

    const body = req.body;
    const {message} = body;
    let assistantText = '';
    console.log("User message::", message);

    try {
        const responseData = await callChatGPTChat(message);

        console.log(responseData);

        const {choices} = responseData;
    
        console.log("CHATGPT Response::", choices);

        for(let choice of choices) {
            assistantText += choice.message?.content ? choice.message.content : '';
        }

        return res.status(200).json({returnCode:0,assistantText})
    

    } catch (error) {
        console.log("ERROR::", error);
        return res.status(500).json({returnCode:-1,assistantText:null})
    }

})



server.listen(3000, () => {
    console.log("Server running on PORT", 3000);
})
