/**
 * @name 保存PDF
 */
const puppeteer = require("puppeteer");
const path = require("path");
const URL = "https://news.ycombinator.com";

(async () => {
  try {
    const browser = await puppeteer.launch({
      // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
      headless: false
    });

    //新建一个窗口
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle2" }); // 等待网络状态为空闲的时候才继续执行

    //生成PDF
    await page.pdf({
      path:"./test.pdf",
      format:"A4"
    })

    await browser.close();

    console.log("下载完成!");
  } catch (error) {
    console.log("error\n", error);
    process.exit(0);
  }
})();
