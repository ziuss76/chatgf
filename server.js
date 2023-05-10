const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
//.env 파일하나 server.js랑 같은 경로에 만들면 될 듯 합니다

const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  // const response = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [{ role: "user", content: message }],
  //   max_tokens: 1000,
  // });
  const response = await openai.createImage({
    prompt: message,
    n: 1,
    size: "1024x1024",
  });
  console.log(response.data);
  if (response.data) {
    // if (response.data.choices) {
    //   res.json({
    //     message: response.data.choices[0].message.content,
    //   });
    // }
    res.json({
      imgUrl: response.data.data[0].url,
    });
  }
});

app.listen(PORT, () => {
  console.log("Example app port: " + PORT);
});
