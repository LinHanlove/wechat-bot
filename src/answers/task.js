import { bot } from "../index.js";
import dotenv from "dotenv";
import schedule from "node-schedule";
import { FileBox } from "file-box";
import { sleep } from "atom-tools";
import {
  getGoodMorning,
  getWeather,
  getFriendsCircle,
  getNetEaseMusicComment,
} from "./index.js";
const env = dotenv.config().parsed; // 环境参数

const nameList = env.SCHEDULED_TASK_CONTACTS.split(",") || [];
/**
 * @function 每日任务
 */
export const task = async () => {
  // 每天的 08:00 执行任务
  schedule.scheduleJob("0 8 * * *", async () => {
    // 早安
    const goodMorning = await getGoodMorning();

    // 天气
    const hangZhouWeather = await getWeather("杭州");
    const guangZhouWeather = await getWeather("广州");
    const ninBoWeather = await getWeather("宁波");
    const wuShanXianWeather = await getWeather("武山县");
    const yiChangWeather = await getWeather("宜昌");

    // 文案
    const friendsCircle = await getFriendsCircle();

    let strStartHangZhou = `\n小寒🤡\n\n${goodMorning}\n\n${friendsCircle}\n\n${hangZhouWeather}`;
    let strStartGuangZhou = `\n小寒🤡\n\n${goodMorning}\n\n${friendsCircle}\n\n${guangZhouWeather}`;
    let strStartNinBo = `\n小寒🤡\n\n${goodMorning}\n\n${friendsCircle}\n\n${ninBoWeather}`;
    let strStartWuShanXian = `\n小寒🤡\n\n${goodMorning}\n\n${friendsCircle}\n\n${wuShanXianWeather}`;
    let strStartYiChang = `\n小寒🤡\n\n${goodMorning}\n\n${friendsCircle}\n\n${yiChangWeather}`;

    nameList.forEach(async (item, idx) => {
      const contact =
        (await bot.Contact.find({ alias: item })) ||
        (await bot.Contact.find({ name: item }));

      if (item === "🥀77") {
        await sleep(1500 * idx);
        contact.say(strStartGuangZhou);
      } else if (item === "王一丁") {
        await sleep(1500 * idx);
        contact.say(strStartNinBo);
      } else if (item === "妈妈" || item === "文霞") {
        await sleep(1500 * idx);
        contact.say(strStartWuShanXian);
      } else if (item === "阿罪") {
        await sleep(1500 * idx);
        contact.say(strStartYiChang);
      } else {
        await sleep(1500 * idx);
        contact.say(strStartHangZhou);
      }
    });
  });

  // 每天的 18:00 执行任务
  schedule.scheduleJob("0 18 * * *", async () => {
    // 文案
    const friendsCircle = await getFriendsCircle();

    // 网易云文案
    const netEaseMusicComment = await getNetEaseMusicComment();

    let strEnd = `\n小寒🤡\n\n${friendsCircle}\n\n${netEaseMusicComment}`;

    nameList.forEach(async (item, idx) => {
      const contact =
        (await bot.Contact.find({ alias: item })) ||
        (await bot.Contact.find({ name: item }));
      await sleep(1500 * idx);
      contact.say(strEnd); //发送消息
    });
  });

  // 每天的 22:00 执行任务
  schedule.scheduleJob("0 23 * * *", async () => {
    const fileBox = FileBox.fromUrl("http://img.92fa.com/pic/TX1695_06.jpg");

    nameList.forEach(async (item, idx) => {
      const contact =
        (await bot.Contact.find({ alias: item })) ||
        (await bot.Contact.find({ name: item }));

      contact.say("小寒🤡\n一天结束啦～\n晚安～早点睡😪");
      await sleep(1500 * idx);
      contact.say(fileBox);
    });
  });
};
