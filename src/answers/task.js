import {bot} from '../index.js'
import dotenv from 'dotenv'
import schedule from 'node-schedule'
import {getGoodMorning
  ,getWeather,
  getFriendsCircle,
  getNetEaseMusicComment
} from './index.js'
const env = dotenv.config().parsed // 环境参数


const nameList = env.SCHEDULED_TASK_CONTACTS.split(',') || []
/**
 * @function 每日说任务
 */
export const task = async () => {
    // 每天的 08:00 执行任务
    schedule.scheduleJob('0 8 * * *', async()=>{
      // 早安
      const goodMorning = await getGoodMorning()

      // 天气
      const weather1 = await getWeather('杭州')
      const weather2 = await getWeather('广州')

      // 文案
      const friendsCircle = await getFriendsCircle()

      let strStart1 = `\n你的小寒开始工作啦！\n\n${goodMorning}\n\n${friendsCircle}\n\n${weather1}`
      let strStart2 = `\n你的小寒开始工作啦！\n\n${goodMorning}\n\n${friendsCircle}\n\n${weather2}`

      nameList.forEach(async item => {
        const contact =
        await bot.Contact.find({ alias: item }) || await bot.Contact.find({ name: item })

        if (item=== '🥀77') {
          contact.say(strStart2) //发送消息
        }else{
          contact.say(strStart1) //发送消息
        }
      })
    });

    // 每天的 18:00 执行任务
    schedule.scheduleJob('0 18 * * *', async()=>{

      // 文案
      const friendsCircle = await getFriendsCircle()

      // 网易云文案
      const netEaseMusicComment = await getNetEaseMusicComment()

      let strEnd = `\n你的小寒下班啦！\n\n${friendsCircle}\n\n${netEaseMusicComment}`

      nameList.forEach(async item => {
        const contact =
        await bot.Contact.find({ alias: item }) || await bot.Contact.find({ name: item })

        contact.say(strEnd) //发送消息

      })
    });
    
}

