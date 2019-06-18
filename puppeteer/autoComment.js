const puppeteer = require('puppeteer');
const COMMENT = "测试 puppeteer 自动评论666";

(async () => {

  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://www.lijinke.cn/')
    console.log('跳转到博客首页...')

    await page.click('.content > .post:nth-child(1) > .post-title > h3 > a')
    console.log('点击按钮...')

    await page.waitForSelector('.post-page > #vcomments #veditor')
    await page.focus('.post-page > #vcomments #veditor')
    console.log('鼠标放入输入框...')

    await page.type(".post-page > #vcomments #veditor", COMMENT);
    console.log('输入评论...')

    await page.waitForSelector('.vsubmit')
    await page.click('.vsubmit')
    console.log('点击回复按钮...')

    const element = await page.$('.vtext')
    const text = await (await element.getProperty('textContent')).jsonValue();
    const questions = text.split('=')[0].replace(/\x/g,'*')
    console.log('验证码: ', questions);

    const result = eval(questions)
    console.log('计算结果: ', result);

    await page.waitForSelector('.vcode.vinput')
    await page.type('.vcode.vinput', String(result))
    console.log('输入答案...');

    await page.waitForSelector('.vsure.vbtn')
    await page.click('.vsure.vbtn')

    console.log('评论成功....')
    await browser.close()

  } catch (error) {
    console.log('error: ', error);
    process.exit(0)
  }
})()
