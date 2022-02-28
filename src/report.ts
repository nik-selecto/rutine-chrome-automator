import { Page } from 'puppeteer';
import { VideoSelector } from './selectors/video.selector';

export default async function reportVideo(page: Page, url: string) {
    await page.goto(url);
    await page.waitForXPath(VideoSelector.MORE_button);

    const [moreButton] = await page.$x(VideoSelector.MORE_button);

    await moreButton.click();
    await page.waitForXPath(VideoSelector.DESCRIPTION_REPORT_FEEDBACK_buttons);

    const [, reportButton] = await page.$x(VideoSelector.DESCRIPTION_REPORT_FEEDBACK_buttons);

    await reportButton.click();
    await page.waitForXPath(VideoSelector.SPAM_radio);

    const [spamRadio] = await page.$x(VideoSelector.SPAM_radio);

    await spamRadio.click();
}
