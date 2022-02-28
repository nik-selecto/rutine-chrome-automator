import { Page } from 'puppeteer';

export default async function reportVideo(page: Page, url: string) {
    await page.goto(url);
}
