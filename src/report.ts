import { Page } from 'puppeteer';
import { VideoOptionsSelector } from './selectors/video.selector';
import pause from './utils/pause.utils';

export default async function reportVideo(page: Page, url: string, reportMessage: string = 'This video is not truth. And It\'s goal is to MAKE WAR between Russian and Ukraine!') {
    await page.goto(url);
    await page.waitForXPath(VideoOptionsSelector.MORE_ON_STORY_buttons_story_0_video_1);

    let isVideo = false;
    const [forStoryMoreButton, forVideoMoreButton] = await page.$x(VideoOptionsSelector.MORE_ON_STORY_buttons_story_0_video_1);

    try {
        await forStoryMoreButton.click();
    } catch (error) {
        console.error(error);
        await forVideoMoreButton.click();
        isVideo = true;
    }

    pause(5000);

    await page.waitForXPath(VideoOptionsSelector.DESCRIPTION_REPORT_FEEDBACK_buttons_story_1_video_0);

    const reportButtons = await page.$x(VideoOptionsSelector.DESCRIPTION_REPORT_FEEDBACK_buttons_story_1_video_0);
    const reportButton = reportButtons[isVideo ? 0 : 1];

    await reportButton.click();
    await page.waitForXPath(VideoOptionsSelector.SPAM_radio);

    const [spamRadio] = await page.$x(VideoOptionsSelector.SPAM_radio);

    await spamRadio.click();
    await page.waitForXPath(VideoOptionsSelector.REPORT_checkboxes_5);

    const checkboxes = await page.$x(VideoOptionsSelector.REPORT_checkboxes_5);
    // TODO rm this hardcode
    const spamCheckbox = checkboxes[5];

    await spamCheckbox.click();
    // await pause(5000);
    await page.waitForXPath(VideoOptionsSelector.SPAM_checkItems_30);

    const checkItems = await page.$x(VideoOptionsSelector.SPAM_checkItems_30);
    // TODO rm this hardcode
    const falseInfoCheckItem = checkItems[30];

    // TODO rm this hardcode
    await pause(1500);
    await falseInfoCheckItem.click();

    const [nextButton] = await page.$x(VideoOptionsSelector.NEXT_button);

    await nextButton.click();
    await page.waitForXPath(VideoOptionsSelector.REPORT_textarea);

    const [textarea] = await page.$x(VideoOptionsSelector.REPORT_textarea);

    await textarea.type(reportMessage);

    const [, finalReportButton] = await page.$x(VideoOptionsSelector.REPORT_buttons_2);

    await finalReportButton.click();
}
