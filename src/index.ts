import { config } from 'dotenv';
import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { generateUrl } from './generate-url';
import pause from './utils/pause.utils';

config();

async function main() {
    try {
        puppeteer.use(stealthPlugin());

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto(generateUrl());
        await pause(300000);

        await browser.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
