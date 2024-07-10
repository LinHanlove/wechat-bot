# WeChat Bot

一个 基于 `chatgpt` + `wechaty` 的微信机器人

可以用来帮助你自动回复微信消息，或者管理微信群/好友.

`简单`，`好用`，`2分钟（4 个步骤）` 就能玩起来了。🌸 如果对您有所帮助，请点个 Star ⭐️ 支持一下。

## 使用前需要配置的 AI 服务（目前支持 4 种，可任选其一）

- deepseek获取自己的 `api key`，地址戳这里 👉🏻 ：[deepseek开放平台](https://platform.deepseek.com/usage)  
  将获取到的`api key`填入 `.evn` 文件中的 `DEEPSEEK_FREE_TOKEN` 中。

- 科大讯飞

  新增科大讯飞，去这里申请一个 key：[科大讯飞](https://console.xfyun.cn/services/bm35)，每个模型都有 200 万的免费 token ，感觉很难用完。  
  注意： 讯飞的配置文件几个 key，别填反了，很多人找到我说为什么不回复，都是填反了。  
  而且还有一个好处就是，接口不会像 Kimi 一样限制请求频次，相对来说稳定很多。  
  服务出错可参考： [issues/170](https://github.com/wangrongding/wechat-bot/issues/170), [issues/180](https://github.com/wangrongding/wechat-bot/issues/180)

- Kimi （请求限制较严重）

  可以去 ： [kimi apikey](https://platform.moonshot.cn/console/api-keys) 获取你的 key  
  最近比较忙，大家感兴趣可以提交 PR，我会尽快合并。目前 Kimi 刚刚集成，还可以实现上传文件等功能，然后有其它较好的服务也可以提交 PR 。

- ChatGPT

  先获取自己的 `api key`，地址戳这里 👉🏻 ：[创建你的 api key](https://beta.openai.com/account/api-keys)

  **注意：这个是需要去付费购买的，很多人过来问为什么请求不通，请确保终端走了代理，并且付费购买了它的服务**

  ```sh
  # 执行下面命令，拷贝一份 .env.example 文件为 .env
  cp .env.example .env
  # 填写完善 .env 文件中的内容
  OPENAI_API_KEY='你的key'
  ```

- 其他  
  （待实践）理论上使用openAI格式的api，都可以使用，在env文件中修改对应的api_key、model、proxy_url即可。

## 赞助商

<p align="center">
  <a href="https://302.ai" target="_blank">
    <img src="./sponsors/302AI.png" alt="Hi" width="200" />
  </a>
</p>

> 302.AI 是一个汇集全球顶级 AI 的自助平台，按需付费，零月费，零门槛使用各种类型 AI。 [产品链接](https://302.ai) | [网站介绍](https://help.302.ai)

## 开发/使用

检查好自己的开发环境，确保已经安装了 `nodejs` , 版本需要满足 Node.js >= v18.0 ，版本太低会导致运行报错,最好使用 LTS 版本。

1. 安装依赖

> 安装依赖时，大陆的朋友推荐切到 taobao 镜像源后再安装，命令：  
> `npm config set registry https://registry.npmmirror.com`  
> 想要灵活切换，推荐使用我的工具 👉🏻 [prm-cli](https://github.com/wangrongding/prm-cli) 快速切换。

```sh
# 安装依赖
npm i
# 推荐用 yarn 吧，npm 安装有时会遇到 wechaty 内部依赖安装失败的问题
yarn
```

2. 运行服务

```sh
# 启动服务
npm run dev # 或者 npm run start
# 启动服务
yarn dev # 或者 yarn start
```

然后就可以扫码登录了，然后根据你的需求，自己修改相关逻辑文件。

![](https://assets.fedtop.com/picbed/202403261420468.png)

![](https://assets.fedtop.com/picbed/202212071315670.png)

为了兼容 docker 部署，避免不必要的选择交互，新增指定服务运行

```sh
# 运行指定服务 （ 目前支持 ChatGPT | Kimi | Xunfei ）
npm run start -- --serve Kimi
# 交互选择服务，仍然保持原有的逻辑
npm run start
```

3. 测试

安装完依赖后，运行 `npm run dev` 前，可以先测试下 openai 的接口是否可用，运行 `npm run test` 即可。

遇到 timeout 问题需要自行解决。（一般就是代理未成功，或者你的梯子限制了调 openai api 的服务）

## 你要修改的

很多人说运行后不会自动收发信息，不是的哈，为了防止给每一条收到的消息都自动回复（太恐怖了），所以加了限制条件。

你要把下面提到的地方自定义修改下。

- 群聊，记得把机器人名称改成你自己微信号的名称，然后添加对应群聊的名称到白名单中，这样就可以自动回复群聊消息了。
- 私聊，记得把需要自动回复的好友名称添加到白名单中，这样就可以自动回复私聊消息了。

在.env文件中修改你的配置即可，示例如下

```sh
# 白名单配置
#定义机器人的名称，这里是为了防止群聊消息太多，所以只有艾特机器人才会回复，
#这里不要把@去掉，在@后面加上你启动机器人账号的微信名称
BOT_NAME=@可乐
#联系人白名单
ALIAS_WHITELIST=微信名1,备注名2
#群聊白名单
ROOM_WHITELIST=XX群1,群2
```

可以看到，自动回复都是基于 `chatgpt` 的，记得要开代理，或者填写代理地址。

![](https://assets.fedtop.com/picbed/202212131123257.png)


[MIT](./LICENSE).
