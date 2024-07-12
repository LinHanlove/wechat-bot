import axios from "axios";
import dotenv from "dotenv";
import { log } from "wechaty";
const env = dotenv.config().parsed; // 环境参数

const domain = "https://api.coze.cn";
const server = {
  chat: `${domain}/open_api/v2/chat`,
};

const configuration = {
  conversation_id: env.CONVERSATION_ID,
  bot_id: env.BOT_ID,
  user: env.USER,
  stream: false,
};

export async function getCozeReply(prompt) {
  try {
    console.log("问题🙋", prompt);
    const res = await axios.post(
      server.chat,
      Object.assign(configuration, {
        query: prompt,
      }),
      {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
          Connection: "keep-alive",
          Accept: "*/*",
          Host: "api.coze.cn",
          Authorization: `Bearer ${env.COZE_API_KEY}`,
        },
      }
    );

    const { messages } = res.data;
    console.log("messages", messages);
    let returnMsg = "";
    messages.forEach((i) => {
      if (i.type === "answer" && i.content_type === "text") {
        returnMsg = i.content;
      }
    });
    return returnMsg;
  } catch (error) {
    console.log("报错啦！", error);
    return "抱歉😅，我是智障小寒～，请稍后再问我吧！😘";
  }
}
