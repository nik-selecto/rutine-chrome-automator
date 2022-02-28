// eslint-disable-next-line no-shadow
export enum GoogleSignInSelector {
    EMAIL_input = '//input[@type="email"]',
    PASSWORD_input = '//input[@type="password"]',
    NEXT_button = '//span[text()="Next"]',
    ERROR_MESSAGE_not_find_your_google_account = '//div[contains(text(), "your Google")]',
    ERROR_MESSAGE_wrong_password = '//span[contains(text(), "click Forgot password")]'
}
