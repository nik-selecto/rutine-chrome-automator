import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { config } from 'dotenv';
import { googleDriveOAuth2 } from './scenarios/google-drive-oauth2/google-drive.oauth2';

config();

async function main() {
    try {
        const browser = await puppeteer
            .use(stealthPlugin())
            .launch({ headless: true });
        const page = await browser.newPage();

        await googleDriveOAuth2(page, {
            pathToEnv: '/Users/nikitamoiseienko/flysystem-ts/.test.env',
            key: 'GDRIVE_AUTH_CODE',
        });

        await browser.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
