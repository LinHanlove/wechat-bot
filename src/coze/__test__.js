import { getCozeReply } from "./index.js";

// 测试 open ai api
async function test() {
  const message = await getCozeReply("你好!");
  console.log("🌸🌸🌸 message: ", message);
}
test();
