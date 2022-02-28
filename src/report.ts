import { Page } from 'puppeteer';
import { VideoSelector } from './selectors/video.selector';

export default async function reportVideo(page: Page, url: string) {
    await page.goto(url);
    await page.waitForXPath(VideoSelector.MORE_button);

    const [reportButton] = await page.$x(VideoSelector.MORE_button);

    await reportButton.click();
}
