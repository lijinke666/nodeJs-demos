const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  
  await page.setViewport({ width: 1440, height: 700 })
  
  await page.goto('http://localhost:8889/')
  
  const navigationPromise = page.waitForNavigation()
  await navigationPromise
  
  await page.waitForSelector('.ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input-affix-wrapper > #username')
  await page.click('.ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input-affix-wrapper > #username')
  
  await page.waitForSelector('.ant-row > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-btn')
  await page.click('.ant-row > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-btn')
  
  await page.waitForSelector('.ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input-affix-wrapper > #password')
  await page.click('.ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input-affix-wrapper > #password')
  
  await page.waitForSelector('.ant-row > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-btn')
  await page.click('.ant-row > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-btn')
  
  await navigationPromise
  
  await browser.close()
})()