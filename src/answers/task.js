import {bot} from '../index.js'
import dotenv from 'dotenv'
import schedule from 'node-schedule'
import {FileBox} from 'file-box'
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
      const hangZhouWeather = await getWeather('杭州')
      const guangZhouWeather = await getWeather('广州')
      const ninBoWeather = await getWeather('宁波')

      // 文案
      const friendsCircle = await getFriendsCircle()

      let strStartHangZhou = `\n你的小寒开始工作啦！\n\n${goodMorning}\n\n${friendsCircle}\n\n${hangZhouWeather}`
      let strStartGuangZhou = `\n你的小寒开始工作啦！\n\n${goodMorning}\n\n${friendsCircle}\n\n${guangZhouWeather}`
      let strStartNinBo = `\n你的小寒开始工作啦！\n\n${goodMorning}\n\n${friendsCircle}\n\n${ninBoWeather}`

      nameList.forEach(async item => {
        const contact =
        await bot.Contact.find({ alias: item }) || await bot.Contact.find({ name: item })

        if (item=== '🥀77') {
          contact.say(strStartGuangZhou) 
        }else if(item=== '王一丁'){
          contact.say(strStartNinBo)
        }else{
          contact.say(strStartHangZhou) 
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

      // 每天的 22:00 执行任务
      schedule.scheduleJob('0 23 * * *', async()=>{

        const fileBox = FileBox.fromUrl('http://img.92fa.com/pic/TX1695_06.jpg'); 

        nameList.forEach(async item => {
          const contact =
          await bot.Contact.find({ alias: item }) || await bot.Contact.find({ name: item })
          
          contact.say(' 小寒寒：\n一天结束啦～\n晚安～早点睡😪') 
    
          contact.say(fileBox) 
        })
      });
    
}

