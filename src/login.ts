import { Page } from 'puppeteer';

type LoginOptions = {
    email: string,
    password: string,
}

export default async function login(page: Page, options: LoginOptions) {
    console.log(options);
    await page.goto('https://youtube.com');
}
