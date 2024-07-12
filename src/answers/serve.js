import {getZhaNanYuLu,getDaGongRen,getFriendsCircle,getTodayNews,getWeather,getWeiBoHot,getFlowerLanguage,
  getRainbowPraise,
  getNetEaseMusicComment,
  getGoodMorning,
  getGoodNight
} from './index.js'

export const getOtherServe = (content) => {
  switch (content) {
    case '渣男语录':
      return getZhaNanYuLu();

    case '打工人':
      return getDaGongRen();

    case '朋友圈文案':
      return getFriendsCircle();

    case '今日头条':
      return getTodayNews();

    case '微博热搜':
      return getWeiBoHot(); 

    case '彩虹屁':
        return getRainbowPraise();

    case '网易云热评':
        return getNetEaseMusicComment();

    case '早安':
        return getGoodMorning();

    case '晚安':
        return getGoodNight();

    default:
      if (content.includes('天气')) { 
        return getWeather(content);ç
      }
      if (content.includes('花语')) { 
        return getFlowerLanguage(content);
      }
      return; // 默认情况下返回一个提示信息
  }
};

