import { Page } from 'puppeteer';
import { HomeSelector } from './selectors/home.selector';

type LoginOptions = {
    email: string,
    password: string,
}

export default async function login(page: Page, options: LoginOptions) {
    console.log(options);
    await page.goto('https://youtube.com');

    const [signInButton] = await page.$x(HomeSelector.SIGN_IN_button);

    await signInButton.click();
}
