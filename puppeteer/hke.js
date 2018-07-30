/**
 * @name 自动搜索
 */
const puppeteer = require("puppeteer");
const path = require("path");
const URL = "http://localhost:6688/?company=0550&utm_source=WeChat&utm_medium=Chat&utm_campaign=%E4%B8%A4%E4%B8%87%E4%BA%94&company=0550&t=1532936307634#/tray/a3abdc25-03c2-4e38-85a3-01e4ad29e46c/a31e0b05-59a4-4e9a-9971-a2bdd879130c";

(async () => {
    try {
      const browser = await puppeteer.launch({
        headless: false
      });

      //新建一个窗口
      const page = await browser.newPage();
      await page.goto(URL, { waitUntil: "networkidle2" }); // 等待网络状态为空闲的时候才继续执行

      // //获取焦点
      // await page.focus("#kw");         //#kw 百度input 输入框的ID
      // //输入关键字
      // await page.type("#kw",'照片', {
      //   delay: 500 // 控制 keypress 也就是每个字母输入的间隔
      // });
      
      await page.tap(".btn"); 
      await page.waitForNavigation()
      console.log('加入购物袋');

      await page.tap(".btn-bottom"); 
      console.log(' 结账');
      await page.tap(".btn-bottom"); 
           // await browser.close();
    } catch (error) {
      console.log("error\n", error);
      process.exit(0);
    }
  })();
