/**
 * @name 截图
 */
const puppeteer = require("puppeteer");
const path = require("path");
const URL = "http://www.baidu.com";

(async () => {
  try {
    const browser = await puppeteer.launch({
      // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
      headless: false
    });

    //新建一个窗口
    const page = await browser.newPage();
    page.setViewport({
      width: 1440,
      height: 600
    });
    await page.goto(URL, { waitUntil: "networkidle2" }); // 等待网络状态为空闲的时候才继续执行

    //进项截图
    await page.screenshot({
      path: path.resolve(__dirname, "./saved.png")
    });

    await browser.close();

    console.log("下载完成!");
  } catch (error) {
    console.log("error\n", error);
    process.exit(0);
  }
})();
