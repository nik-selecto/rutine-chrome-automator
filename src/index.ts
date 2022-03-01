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
    const badGuys: {
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
                const report = badGuys.pop();
                // eslint-disable-next-line no-await-in-loop
                await reportVideo(page, report!.url, report!.reportMessage);
            }
            // eslint-disable-next-line no-await-in-loop
            badGuys.concat(await getReports(skipCounter += 10));
        }

        await browser.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
