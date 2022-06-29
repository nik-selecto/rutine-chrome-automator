import { config } from 'dotenv';
import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

config();

async function main() {
    try {
        puppeteer.use(stealthPlugin());

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        console.log(page.isClosed());

        await browser.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
