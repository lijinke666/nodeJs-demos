/**
 * @name 自动搜索
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
      await page.goto(URL, { waitUntil: "networkidle2" }); // 等待网络状态为空闲的时候才继续执行

      //获取焦点
      await page.focus("#kw");         //#kw 百度input 输入框的ID
      //输入关键字
      await page.type("#kw",'照片', {
        delay: 500 // 控制 keypress 也就是每个字母输入的间隔
      });
      //触发回车
      await page.tap("#su");
      await browser.close();
    } catch (error) {
      console.log("error\n", error);
      process.exit(0);
    }
  })();
