import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { config } from 'dotenv';
import { googleDriveOAuth2 } from './scenarios/google-drive-oauth2/google-drive.oauth2';
import { oneDriveOAuth2 } from './scenarios/one-drive-oauth2/one-drive.oatuh2';

config();

async function main() {
    try {
        const browser = await puppeteer
            .use(stealthPlugin())
            .launch({ headless: false });
        const page = await browser.newPage();

        if (false) {
            await googleDriveOAuth2(page, {
                pathToEnv: '/Users/nikitamoiseienko/flysystem-ts/.test.env',
                key: 'GDRIVE_AUTH_CODE',
            });
        }

        await oneDriveOAuth2(browser);

        await browser.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
