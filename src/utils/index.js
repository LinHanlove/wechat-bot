import axios from "axios";
import { FileBox } from "file-box";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

/**
 * @function 下载音频
 */
export const downloadAudio = async (audioUrl, fileName) => {
  try {
    // 确保文件名有正确的扩展名
    if (!fileName.endsWith(".mp3")) {
      fileName += ".mp3";
    }

    // 指定下载到 public/audio 文件夹
    const directoryPath = path.join("public", "audio"); // 从根目录开始
    const fullFilePath = path.join(__dirname, directoryPath, fileName); // 使用 __dirname 确定当前文件的目录

    // 使用 axios 下载音频文件到本地
    const writer = fs.createWriteStream(fullFilePath);
    await axios
      .get(audioUrl, { responseType: "stream" })
      .then((response) => {
        response.data.pipe(writer);
      })
      .catch((error) => {
        console.error("下载失败", error);
      });

    // 等待文件写入完成
    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        writer.close(() => {
          console.log("文件写入完成");
          // 现在可以创建 FileBox 实例
          const fileBox = FileBox.fromFile(fullFilePath);
          resolve(fileBox);
        });
      });
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("下载音频失败:", error);
    return null;
  }
};

/**
 * @function 删除public/audio文件夹中的所有文件
 */
export const deleteAudioFiles = () => {
  const directoryPath = path.join(__dirname, "public", "audio");
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("读取文件夹失败:", err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("删除文件失败:", err);
        } else {
          console.log("文件删除成功:", filePath);
        }
      });
    });
  });
};
