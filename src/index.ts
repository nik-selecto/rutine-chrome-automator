import { config } from 'dotenv';
import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import getReports from './get-reports';
import login from './login';
import reportVideo from './report';
import getEmailPasswordFromCli from './utils/get-email-password-from-cli.utils';

config();

async function main() {
    let skipCounter = 0;
    let badGuys: {
        url: string,
        reportMessage?: string,
    }[] = await getReports(skipCounter);

    try {
        const emailPassword = await getEmailPasswordFromCli();

        puppeteer.use(stealthPlugin());

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await login(page, emailPassword);

        while (badGuys.length) {
            for (let i = 0; i < badGuys.length; ++i) {
                // eslint-disable-next-line no-await-in-loop
                await reportVideo(page, badGuys[i].url, badGuys[i].reportMessage);
            }
            // eslint-disable-next-line no-await-in-loop
            badGuys = await getReports(skipCounter += 10);
        }

        await browser.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
