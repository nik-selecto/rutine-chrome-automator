import { Page } from 'puppeteer';
import { GoogleSignInSelector } from './selectors/google-sign-in.selector';
import { HomeSelector } from './selectors/home.selector';

type LoginOptions = {
    email: string,
    password: string,
};

export default async function login(page: Page, options: LoginOptions) {
    await page.goto('https://youtube.com');
    await page.waitForXPath(HomeSelector.SIGN_IN_button);

    const { email, password } = options;
    const [signInButton] = await page.$x(HomeSelector.SIGN_IN_button);

    await signInButton.click();
    await page.waitForNavigation();

    const [emailInput] = await page.$x(GoogleSignInSelector.EMAIL_input);

    await emailInput.type(email);

    const [nextAfterEmailButton] = await page.$x(GoogleSignInSelector.NEXT_button);

    await nextAfterEmailButton.click();

    const [incorrectEmailMessage] = await page.$x(GoogleSignInSelector.ERROR_MESSAGE_not_find_your_google_account);

    if (incorrectEmailMessage) {
        throw new Error(`Check your email! Google couldn't find any account for "${email}" email`);
    }

    await page.waitForXPath(GoogleSignInSelector.PASSWORD_input, { visible: true });

    const [passwordInput] = await page.$x(GoogleSignInSelector.PASSWORD_input);

    await passwordInput.type(password);

    const [nextAfterPasswordButton] = await page.$x(GoogleSignInSelector.NEXT_button);

    await nextAfterPasswordButton.click();

    const [incorrectPasswordMessage] = await page.$x(GoogleSignInSelector.ERROR_MESSAGE_wrong_password);

    if (incorrectPasswordMessage) {
        throw new Error('Check your password! Google said that it is wrong');
    }

    await page.waitForNavigation();
}
