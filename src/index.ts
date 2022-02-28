import { config } from 'dotenv';
import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import login from './login';
import reportVideo from './report';
import getEmailPasswordFromCli from './utils/get-email-password-from-cli.utils';

config();

async function main() {
    const badGuys: {
        url: string,
        reportMessage?: string,
    }[] = [];

    try {
        const emailPassword = await getEmailPasswordFromCli();

        puppeteer.use(stealthPlugin());

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await login(page, emailPassword);

        for (let i = 0; i < badGuys.length; ++i) {
            // eslint-disable-next-line no-await-in-loop
            await reportVideo(page, badGuys[i].url, badGuys[i].reportMessage);
        }

        await browser.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
