/**
 * @name 自动打卡
 */
const puppeteer = require('puppeteer')
const URL = 'https://jinshuju.net/f/S9GX5n'
const INPUT_DELAY = 200
const USER_NAME = '李金珂'
const ADDRESS = '四川资阳';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    })

    console.log('正在打开金数据链接 %s', URL);
    const page = await browser.newPage()
    await page.goto(URL, { waitUntil: 'networkidle2' })
    console.log('链接已打开 √');

    // 姓名
    console.log('开始填写姓名: [%s]', USER_NAME);
    await page.waitForSelector('.field.field_1')
    await page.focus('.field.field_1')
    await page.type('.field.field_1', USER_NAME, {
      delay: INPUT_DELAY,
    })
    console.log('填写姓名完成 √');

    // 目前所在城市— 地址请尽量精确到地级市
    console.log('开始填写地址: [%s]', ADDRESS);
    await page.waitForSelector('.field.field_2')
    await page.focus('.field.field_2')
    await page.type('.field.field_2', ADDRESS, {
      delay: INPUT_DELAY,
    })
    console.log('填写地址完成 √');

    // 身体健康
    await page.tap('.field.field_6 .choice-wrapper:nth-child(1)')
    console.log('填写是否身体不舒服完成 √');

    // 家人都健康
    await page.tap('.field.field_6 .choice-wrapper:nth-child(1)')
    console.log('填写家人是否有身体不舒服完成 √');

    await page.tap(".ant-btn-primary");
    console.log('健康打开提交中....');

    await page.waitFor(2000)
    console.log('√ 健康打开已完成,  祝你身体健康, 武汉加油 💪');

    await browser.close()
  } catch (error) {
    console.log('error\n', error)
    process.exit(0)
  }
})()
