// eslint-disable-next-line no-shadow
export enum VideoOptionsSelector {
    MORE_button = '//button[starts-with(@aria-label, "Ещё") or starts-with(@aria-label, "More") or starts-with(@aria-label, "Інші")]',
    DESCRIPTION_REPORT_FEEDBACK_buttons = '//tp-yt-paper-item[@role="option"]',
    SPAM_radio = '//*[contains(@aria-label, "Спам") or contains(@aria-label, "Spam")]',
    REPORT_checkboxes_5 = '//input[@aria-haspopup="listbox" and @role="button"]',
    SPAM_checkItems_30 = '//tp-yt-paper-item[@role="option"]',
    NEXT_button = '//yt-formatted-string[contains(@class, "style-blue-text")]',
    REPORT_textarea = '//textarea',
    REPORT_buttons_2 = '//yt-formatted-string[contains(@class, "style-blue-text")]',
}
