const genericPool = require("generic-pool");
const {success,debug,fatal} = require("signale");
const { Socket } = require("net");

const HOST = "192.168.2.154";
const PORT = 9002;

/**
 * Step 1 - 创建连接池
 */
const factory = {
  //声明实例
  create() {
    const client = new Socket();
    client.connect(PORT, HOST, () => {
      success("连接成功");
    });
    return client;
  },
  destroy(client) {
    client.disconnect();
  }
};

const options = {
  max: 10, //连接池最大连接数
  min: 2 //连接池最小连接数
};

const pool = genericPool.createPool(factory, options);

pool.acquire()
  .then(client => {
    success("poop acquire success");
    client.on("data", data => {
      debug("接收游戏服务器数据:",data);
    });
    client.on("error", err => {
      fatal("socket连接失败", err);
    });
    client.on("close", () => {
      debug("连接关闭");
      client.destroy();
      pool.release(client)
    });
    client.on("timeout",()=>{
      debug("连接超时");
    })
  })
  .catch(err => {
    //超时或者 超过最大等待连接数
    fatal("poop acquire error:", err);
  });

pool.drain().then(() => {
  pool.clear();
});
