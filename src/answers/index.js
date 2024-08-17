import axios from "axios";
import dotenv from "dotenv";
import { cityCode } from "../utils/city.js";
import { fuzzyMatchByProperty } from "atom-tools";
const env = dotenv.config().parsed; // 环境参数

const key = env.SERVICE_KEY || "0d8b02c2174cf3f6a4b57cd622e929a0";

/**
 * @function 指令列表
 */

const instructionList = [
  {
    key: "1",
    value: "渣男语录",
    type: "general",
    function: getZhaNanYuLu,
  },
  {
    key: "2",
    value: "打工人",
    type: "general",
    function: getDaGongRen,
  },
  {
    key: "3",
    value: "朋友圈文案",
    type: "general",
    function: getFriendsCircle,
  },
  {
    key: "4",
    value: "今日头条",
    type: "general",
    function: getTodayNews,
  },
  {
    key: "5",
    value: "微博热搜",
    type: "general",
    function: getWeiBoHot,
  },
  {
    key: "6",
    value: "花语",
    type: "special",
  },
  {
    key: "7",
    value: "彩虹屁",
    type: "general",
    function: getRainbowPraise,
  },
  {
    key: "8",
    value: "网易云热评",
    type: "general",
    function: getNetEaseMusicComment,
  },
  {
    key: "9",
    value: "天气查询",
    type: "special",
  },
  {
    key: "10",
    value: "火车票查询",
    type: "special",
  },
  {
    key: "11",
    value: "摸鱼日历",
    type: "general",
    function: getFishCalendar,
  },
  {
    key: "12",
    value: "二次元",
    type: "general",
    function: getACG,
  },
  {
    key: "13",
    value: "晚安",
    type: "general",
    function: getGoodNight,
  },
  {
    key: "14",
    value: "早安",
    type: "general",
    function: getGoodMorning,
  },
  {
    key: "15",
    value: "给朕看看",
    type: "general",
    function: getBeautifulPicture,
  },
  {
    key: "16",
    value: "给朕舞一个",
    type: "general",
    function: getBeautifulGirls,
  },
  {
    key: "17",
    value: "平台点歌（vip歌曲暂不支持）",
    type: "special",
  },
];

export async function getFunction() {
  return instructionList.reduce((prev, curr) => {
    return `${prev}\n${curr.key}. ${curr.value}`;
  }, "小寒指令列表🥳：\n请输入‘执行+编码’执行结果");
}

/**
 * @function 言出法随
 */
export async function getFayan(str) {
  const key = str.replace("执行", "").toString();
  const match = instructionList.map((i) => i.key);

  if (!match.includes(key)) return "指令不存在，请重新输入";

  const res = instructionList.find((i) => i.key === key);

  if (res.type === "general") {
    return res.function();
  } else if (res.type === "special") {
    return "该指令需要特殊操作，具体使用方法，请询问我的爸爸🤡";
  }
}

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
export async function getDaGongRen() {
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
  const res = await axios.get(
    "https://dayu.qqsuu.cn/moyurili/apis.php?type=json"
  );
  console.log("摸鱼日历", res.data);
  return {
    type: "image",
    url: res.data.data,
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
  const res = await axios.get("https://777.cam/api/M/?type=json");
  console.log("给朕舞一个", res.data);
  return {
    type: "video",
    video: res.data.data,
  };
}

/**
 * @function 火车票查询 2024-12-02，杭州到武山，火车票查询
 */
export async function getTrainTicket(word) {
  const time = word.split("，")[0];
  const departure = word.split("，")[1].split("到")[0];
  const arrival = word.split("，")[1].replace("，", "").split("到")[1];
  console.log("火车票查询", time, departure, arrival);

  const res = await axios.get("https://api.lolimi.cn/API/hc/api.php", {
    params: {
      departure, // 期点
      arrival, // 终点
      time,
    },
  });
  console.log("火车票查询", res.data);
  return res.data;
}

/**
 * @function 点歌 网易云：netease，QQ：qq，酷狗：kugou
 *点歌：夜曲-网易云
 */
export async function getSong(songName) {
  const typeList = {
    网易云: "netease",
    QQ: "qq",
    酷狗: "kugou",
  };
  const song = songName.split("：")[1].split("-")[0];
  const type = typeList[songName.split("：")[1].split("-")[1]];
  const res = await axios.get("https://papi.oxoll.cn/API/music/api.php", {
    params: {
      type: type || "netease",
      music: song,
    },
  });

  console.log("点歌", res.data);

  // 获取音频文件的 URL
  const audioUrl = res.data.data[0].url;
  const title = res.data.data[0].title;
  return {
    type: "file",
    url: audioUrl,
    title,
  };
}
