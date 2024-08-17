import {
  getZhaNanYuLu,
  getDaGongRen,
  getFriendsCircle,
  getTodayNews,
  getWeather,
  getWeiBoHot,
  getFlowerLanguage,
  getRainbowPraise,
  getNetEaseMusicComment,
  getGoodMorning,
  getACG,
  getFishCalendar,
  getBeautifulPicture,
  getBeautifulGirls,
  getTrainTicket,
  getFunction,
  getFayan,
  getSong,
} from "./index.js";

export const getOtherServe = (content) => {
  switch (content) {
    case "渣男语录":
      return getZhaNanYuLu();

    case "打工人":
      return getDaGongRen();

    case "朋友圈文案":
      return getFriendsCircle();

    case "今日头条":
      return getTodayNews();

    case "微博热搜":
      return getWeiBoHot();

    case "彩虹屁":
      return getRainbowPraise();

    case "网易云热评":
      return getNetEaseMusicComment();

    case "早安":
      return getGoodMorning();

    case "二次元":
      return getACG();

    case "摸鱼日历":
      return getFishCalendar();

    case "给朕看看":
      return getBeautifulPicture();

    case "给朕舞一个":
      return getBeautifulGirls();

    default:
      if (content.includes("天气")) {
        return getWeather(content);
      }
      if (content.includes("花语")) {
        return getFlowerLanguage(content);
      }
      if (content.includes("火车票")) {
        return getTrainTicket(content);
      }
      if (content.includes("小寒指令列表")) {
        return getFunction();
      }
      if (content.includes("执行")) {
        return getFayan(content);
      }
      if (content.includes("点歌")) {
        return getSong(content);
      }

      return;
  }
};
