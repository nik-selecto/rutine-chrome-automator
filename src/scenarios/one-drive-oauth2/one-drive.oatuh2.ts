import { readFileSync } from 'fs';
import { join } from 'path/posix';
import { Browser } from 'puppeteer';
import qs from 'query-string';
import pause from '../../utils/pause.utils';

export async function oneDriveOAuth2(browser: Browser) {
    const page = await browser.newPage();
    const query = qs.stringify(JSON.parse(readFileSync(join(__dirname, 'credentials.json').replace('dist', 'src'), { encoding: 'utf-8' })));

    await page.goto(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${query}`);

    // TODO

    await pause(5000);
}
