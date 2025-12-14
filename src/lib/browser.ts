import puppeteer, { Browser } from "puppeteer";

let browser: Browser;

export const launchPage = async () => {
    if (!browser) browser = await puppeteer.launch();
    let page = await browser.newPage();

    const content = async () => {
        return await page.content();
    }

    const scrollToEnd = async () => {
        await page.evaluate(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollTo(0, scrollHeight);
        });
    }

    const setViewport = async (width: number, height: number) => {
        await page.setViewport({ width, height });
    }

    const runScript = async <T>(script: (...arg: any[]) => T, args?: any[]) => {
        if (!args) args = [];
        return await page.evaluate(script, ...args);
    }

    const goto = async (url: string) => {
        await page.goto(url);
    }

    return {
        content,
        scrollToEnd,
        setViewport,
        goto,
        runScript
    }
}

export const closeBrowser = async () => {
    if (browser) await browser.close();
}