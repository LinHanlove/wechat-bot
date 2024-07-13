import axios from "axios";
import dotenv from "dotenv";
import { cityCode } from "../utils/city.js";
import { fuzzyMatchByProperty } from "atom-tools";
const env = dotenv.config().parsed; // 环境参数

const key = env.SERVICE_KEY || "0d8b02c2174cf3f6a4b57cd622e929a0";
/**
 * @function 渣男语录
 * @returns string
 */
export async function getZhaNanYuLu() {
  const res = await axios.get("https://apis.tianapi.com/zhanan/index", {
    params: {
      key: key,
    },
  });
  console.log("渣男语录", res.data);
  return res.data.result.content;
}

/**
 * @function 打工人
 */
export async function getDaGongRen(name) {
  const res = await axios.get("https://apis.tianapi.com/dgryl/index", {
    params: {
      key,
    },
  });
  console.log("打工人", res.data);
  return res.data.result.content;
}

/**
 * @function 朋友圈
 */
export async function getFriendsCircle() {
  const res = await axios.get("https://apis.tianapi.com/pyqwenan/index", {
    params: {
      key,
    },
  });
  console.log("朋友圈", res.data);
  return res.data.result.content;
}

/**
 * @function 今日头条
 */
export async function getTodayNews() {
  const res = await axios.get("https://api.vvhan.com/api/hotlist/toutiao");
  let data = "今日头条：\n";
  res.data.data.map((i, idx) => {
    if (idx < 10) {
      data = data.concat(`
标题：${i.title}
热度：${i.hot}
url： ${i.url}
    `);
    }
  });
  console.log("今日头条", data);
  return data;
}

/**
 * @function 微博热搜
 */
export async function getWeiBoHot() {
  const res = await axios.get("https://api.vvhan.com/api/hotlist/wbHot");
  let data = "微博热搜: \n";
  res.data.data.map((i, idx) => {
    if (idx < 10) {
      data = data.concat(`
标题：${i.title}
热度：${i.hot}
url： ${i.url}
    `);
    }
  });
  console.log("微博热搜", data);
  return data;
}

/**
 * @function 查天气
 */
export async function getWeather(city) {
  const cityName = city.replace("天气", "");

  const word = await fuzzyMatchByProperty({
    array: cityCode,
    prop: "city_name",
    key: cityName,
  });

  const res = await axios.get(
    `http://t.weather.itboy.net/api/weather/city/${
      word[0] ? word[0].city_code : ""
    }`
  );

  if (res.data.status === 404) {
    return "查询错误～";
  } else {
    let data = `
${res.data.cityInfo.parent}${res.data.cityInfo.city}
湿度：${res.data.data.shidu}
空气质量：${res.data.data.quality}
pm2.5：${res.data.data.pm25}
pm10：${res.data.data.pm10}
`;
    res.data.data.forecast.forEach((i, idx) => {
      if (idx < 3) {
        data += `
${i.ymd}  ${i.week}  ${i.type}🌈
${i.low} ～ ${i.high}
日出日落🌄：${i.sunrise} ～ ${i.sunset}
🌬️${i.fx} ${i.fl}
小寒提示🔔：${i.notice}
`;
      }
    });
    return data;
  }
}

/**
 * @function 花语
 */
export async function getFlowerLanguage(flower) {
  const word = flower.replace("花语", "");
  const res = await axios.get("https://apis.tianapi.com/huayu/index", {
    params: {
      key,
      word,
    },
  });
  console.log("花语", res.data);
  if (res.data.code === 250) {
    return "智障的我未有该花语呦～";
  } else {
    const data = `🌸花语箴言: \n
花名：${res.data.result.cnflower}
enflower： ${res.data.result.enflower}
花语：${res.data.result.flowerlang}
${res.data.result.flowerprov}
      `;
    return data;
  }
}

/**
 * @function 彩虹屁
 */
export async function getRainbowPraise() {
  const res = await axios.get("https://apis.tianapi.com/caihongpi/index", {
    params: {
      key,
    },
  });
  console.log("彩虹屁", res.data);
  return res.data.result.content;
}

/**
 * @function 网易云热评
 */
export async function getNetEaseMusicComment() {
  const res = await axios.get("https://apis.tianapi.com/hotreview/index", {
    params: {
      key,
    },
  });
  console.log("网易云热评", res.data);
  return res.data.result.content;
}

/**
 * @function 早安
 */
export async function getGoodMorning() {
  const res = await axios.get("https://apis.tianapi.com/zaoan/index", {
    params: {
      key,
    },
  });
  console.log("早安", res.data);
  return res.data.result.content;
}

/**
 * @function 晚安
 */
export async function getGoodNight() {
  const res = await axios.get("https://apis.tianapi.com/wanan/index", {
    params: {
      key,
    },
  });
  console.log("晚安", res.data);
  return res.data.result.content;
}

/**
 * @function 二次元
 */
export async function getACG() {
  const res = await axios.get(
    "https://api.vvhan.com/api/wallpaper/acg?type=json"
  );
  console.log("二次元", res.data);
  return {
    type: "image",
    url: res.data.url,
  };
}

/**
 * @function 摸鱼日历
 */
export async function getFishCalendar() {
  const res = await axios.get("https://api.vvhan.com/api/moyu?type=json");
  console.log("摸鱼日历", res.data);
  return {
    type: "image",
    url: res.data.url,
  };
}

/**
 * @function 给朕看看
 */
export async function getBeautifulPicture() {
  const res = await axios.get(
    "https://api.vvhan.com/api/wallpaper/mobileGirl?type=json"
  );
  console.log("美图看看", res.data);
  return {
    type: "image",
    url: res.data.url.replace(".webp", ".png"),
  };
}

/**
 * @function 给朕舞一个
 */
export async function getBeautifulGirls() {
  const res = await axios.get("https://api.qqsuu.cn/api/dm-xjj2?type=json");
  console.log("给朕舞一个", res.data);
  return {
    type: "video",
    video: res.data.video,
  };
}
