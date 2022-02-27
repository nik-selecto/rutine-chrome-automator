import { config } from 'dotenv';
import puppeteer from 'puppeteer';
import login from './login';
import pause from './utils/pause.utils';

config();

async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await login(page, { email: '', password: '' });
    await pause(5000);
    await browser.close();
}

main();
