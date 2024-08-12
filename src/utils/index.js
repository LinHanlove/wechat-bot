import axios from "axios";

/**
 * @function 下载视频
 */
export const downloadVideo = async (videoUrl) => {
  try {
    const response = await axios({
      method: "get",
      url: videoUrl,
      responseType: "stream",
    });

    const chunks = [];
    response.data.on("data", (chunk) => {
      chunks.push(chunk);
    });

    return new Promise((resolve, reject) => {
      response.data.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });

      response.data.on("error", reject);
    });
  } catch (error) {
    console.error("下载视频失败:", error);
    return null;
  }
};

/**
 * @function 将二进制数组转换为 data URL
 * @param {*} binaryArray
 * @param {*} mimeType
 * @returns
 */
export const binaryArrayToDataURL = (binaryArray, mimeType) => {
  // 将二进制数组转换为 Buffer 对象
  const buffer = Buffer.from(binaryArray);

  // 将 Buffer 转换为 Base64 编码的字符串
  const base64String = buffer.toString("base64");

  // 构造数据 URL
  return `data:${mimeType};base64,${base64String}`;
};

export const downloadImage = async (imageUrl) => {
  try {
    const response = await axios({
      method: "get",
      url: imageUrl,
      responseType: "arraybuffer", // 改为arraybuffer来获取二进制数据
    });

    const buffer = response.data; // 直接使用response.data作为Buffer

    return buffer;
  } catch (error) {
    console.error("下载图片失败:", error);
    return null;
  }
};
