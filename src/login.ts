import { Page } from 'puppeteer';

// eslint-disable-next-line no-shadow
export enum GoogleSignInSelector {
    EMAIL_input = '//input[@type="email"]',
    PASSWORD_input = '//input[@type="password"]',
    NEXT_button = '//span[text()="Next" or text()="Далі"]',
    ERROR_MESSAGE_not_find_your_google_account = '//div[contains(text(), "your Google")]',
    ERROR_MESSAGE_wrong_password = '//span[contains(text(), "click Forgot password")]'
}

export async function login(page: Page, loginData: { email: string, password: string }) {
    const [emailInput] = await page.$x(GoogleSignInSelector.EMAIL_input);
    const { email, password } = loginData;
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
