import { config } from 'dotenv';
import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import login from './login';
import reportVideo from './report';
import getEmailPasswordFromCli from './utils/get-email-password-from-cli.utils';
import pause from './utils/pause.utils';

config();

async function main() {
    try {
        const emailPassword = await getEmailPasswordFromCli();

        // with this plugin google can't detect automation on login stage
        puppeteer.use(stealthPlugin());

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        // TODO sometimes couldn't click "SIGN IN" button
        await login(page, emailPassword);
        await reportVideo(page, 'https://www.youtube.com/shorts/x_8y71hJfns');
        await pause(7000);
        await browser.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
