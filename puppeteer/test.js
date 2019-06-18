const puppeteer = require('puppeteer');
const couponId = "731888888020000001";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()

  const navigationPromise = page.waitForNavigation()

  await page.evaluateOnNewDocument (
    token => {
      localStorage.clear();
      localStorage.setItem('STARBUCKS_CUSTOMER_STORAGE_FEATURE_TOGGLE_KEY', token);
    }, '{"enabledDelivery": true, "enabledCake": true, "enableCakeReservationFromActivityList": true, "enableCakeReservationFromAddressBar": true}');

  await page.goto('http://172.30.19.4/')
  await page.setViewport({ width: 1200, height: 700 })

  await navigationPromise

  // 进入活动页
  await page.waitForSelector('a[href="/cakeactivity1"]')
  await page.click('a[href="/cakeactivity1"]')

  // 输入券号
  await page.waitForSelector(".ant-input")
  await page.focus(".ant-input");         //#kw 百度input 输入框的ID
  await page.type(".ant-input", couponId ,{
    delay: 100
  });

  // 等待验证
  await page.waitFor(2000)

  // 进入预约详情页
  await page.waitForSelector('.reservation-coupon-inputs-button-start-reservation')
  await page.click('.reservation-coupon-inputs-button-start-reservation')

  await page.waitFor(1000)

  await page.waitForSelector('.pickup-search-store-icon')
  await page.click('.pickup-search-store-icon')

  await page.waitForSelector('.reservation-map-marker:nth-of-type(1)')
  await page.hover('.reservation-map-marker:nth-of-type(1)')

  await page.waitForSelector('.reservation-map-select-store:nth-of-type(1)')
  await page.click('.reservation-map-select-store:nth-of-type(1)')
})()
