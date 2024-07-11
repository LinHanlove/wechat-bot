import axios from 'axios'
import dotenv from 'dotenv'
const env = dotenv.config().parsed // 环境参数

const key = env.SERVICE_KEY || '0d8b02c2174cf3f6a4b57cd622e929a0'
/**
 * @function 渣男语录
 * @returns string
 */
export async function getZhaNanYuLu() {
  const res = await axios.get(
    'https://apis.tianapi.com/zhanan/index',
    {
        params: {
        key:key
      },
    }
  ) 
  console.log('渣男语录', res.data);
  return res.data.result.content
}


/**
 * @function 打工人
 */
export async function getDaGongRen(name) {
  const res = await axios.get(
    'https://apis.tianapi.com/dgryl/index',
    {
        params: {
        key,
      },
    }
  ) 
  console.log('打工人', res.data);
  return res.data.result.content
}

/**
 * @function 朋友圈
 */
export async function getFriendsCircle() {
  const res = await axios.get(
    'https://apis.tianapi.com/pyqwenan/index',
    {
        params: {
        key,
      },
    }
  ) 
  console.log('朋友圈', res.data);
  return res.data.result.content
}

/**
 * @function 今日头条
 */
export async function getTodayNews() {
  const res = await axios.get(
    'https://apis.tianapi.com/topnews/index',
    {
        params: {
        key,
      },
    }
  ) 
  let data ='今日头条：\n'
   res.data.result.list.map(i=>{
    data =  data.concat (`
标题：${i.title}
时间：${i.ctime}
内容：${i.description}
url： ${i.url}
    `)
  })
  console.log('今日头条', data);
  return data
}

/**
 * @function 微博热搜
 */
export async function getWeiBoHot() {
  const res = await axios.get(
    'https://apis.tianapi.com/weibohot/index',
    {
        params: {
        key,
      },
    }
  ) 
  let data ='微博热搜: \n'
  res.data.result.list.map(i=>{
   data =  data.concat (`
标题：${i.hotword}
   `)
 })
 console.log('微博热搜', res.data.result.list);
 return data
}

/**
 * @function 查天气
 */
export async function getWeather(city) {
  console.log(city,'city');
  const word = city.replace('查天气', '')
  const res = await axios.get(
    'https://apis.tianapi.com/tianqi/index',
    {
        params: {
        key,
        city:word,
        type:1
      },
    }
  ) 
  if(res.data.code===250){
    return '查询错误～'
  }else{
    const data =`${word}今日天气: \n
日期：${res.data.result.date}
星期：${res.data.result.week}
地点：${res.data.result.province}${res.data.result.area}
天气🌈：${res.data.result.weather}
温度：${res.data.result.lowest}~${res.data.result.highest}
空气质量：${res.data.result.quality}
风向💨：${res.data.result.wind}
风速（km/h）： ${res.data.result.windspeed}
风力： ${res.data.result.windsc}
紫外线强度指数： ${res.data.result.uv_index	}
小寒提示🤪： ${res.data.result.tips}
      `
      console.log('天气', res.data);
      return data
  }


}

/**
 * @function 花语
 */
export async function getFlowerLanguage(flower) {
  const word = flower.replace('查花语', '')
  const res = await axios.get(
    'https://apis.tianapi.com/huayu/index',
    {
        params: {
        key,
        word
      },
    }
  ) 
  console.log('花语', res.data);
  if(res.data.code===250){
    return '智障的我未有该花语呦～'
  }else{
    const data = `🌸花语箴言: \n
花名：${res.data.result.cnflower}
enflower： ${res.data.result.enflower}
花语：${res.data.result.flowerlang}
${res.data.result.flowerprov}
      `
      return data
  }
}

/**
 * @function 彩虹屁
 */
export async function getRainbowPraise() {
  const res = await axios.get(
    'https://apis.tianapi.com/caihongpi/index',
    {
        params: {
        key,
      },
    }
  ) 
  console.log('彩虹屁', res.data);
  return res.data.result.content
}

/**
 * @function 网易云热评
 */
export async function getNetEaseMusicComment() {
  const res = await axios.get(
    'https://apis.tianapi.com/hotreview/index',
    {
        params: {
        key,
      },
    }
  )
  console.log('网易云热评', res.data);
  return res.data.result.content
} 

/**
 * @function 早安
 */
export async function getGoodMorning() {
  const res = await axios.get(
    'https://apis.tianapi.com/zaoan/index',
    {
        params: {
        key,
      },
    }
  )
  console.log('早安', res.data);
  return res.data.result.content
}

/**
 * @function 晚安
 */
export async function getGoodNight() {
  const res = await axios.get(
    'https://apis.tianapi.com/wanan/index',
    {
        params: {
        key,
      },
    }
  )
  console.log('晚安', res.data);
  return res.data.result.content
}