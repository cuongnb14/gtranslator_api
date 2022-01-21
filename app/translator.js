const puppeteer = require('puppeteer-extra')
const useProxy = require('puppeteer-page-proxy');
const { PROXY } = require('~app/configs')
const proxyChain = require('proxy-chain');

// const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// puppeteer.use(StealthPlugin())

function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

const translate = async (from, to, content) => {
    const args = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
    ]

    if (PROXY.length > 0) {
        const proxy = randomChoice(PROXY)
        const anonymizeProxy = await proxyChain.anonymizeProxy(proxy);
        args.push(`--proxy-server=${anonymizeProxy}`)
    }

    const browser = await puppeteer.launch({
        headless: false,
        args: args
    });

    try {
        const url = encodeURI(`https://translate.google.com/?sl=${from}&tl=${to}&text=${content}`)
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle2',
        });


        await page.waitForXPath('//span[@jsname="W297wb"]//text()');
        let elements = await page.$x('//span[@jsname="W297wb"]');
        let result = [];

        let map = elements.map(async function (element) {
            let text = await page.evaluate(element => element.textContent, element);
            result.push(text);
        })
        await Promise.all(map)
        return result.join(" ")

    } finally {
        browser.close()
    }
};


module.exports = { translate }
