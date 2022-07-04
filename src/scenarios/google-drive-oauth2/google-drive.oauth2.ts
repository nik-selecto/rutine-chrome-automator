/* eslint-disable camelcase */
import fs, { readFileSync } from 'fs';
import { join } from 'path';
import { google } from 'googleapis';
import { Page } from 'puppeteer';
import qs from 'query-string';
import { googleLogin } from '../../common/google-login';
import { rewriteEnvProp } from '../../utils/rewrite-env-prop.util';

type CredentialsType = Record<string, any> & { web: any };

const CREDENTIALS_PATH = join(__dirname, 'credentials.json').replace('dist', 'src');
const USER_EMAIL_PASSWORD_PATH = join(__dirname, 'user-secrets.json').replace('dist', 'src');
const SCOPES = [
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive',
];

function generateUrl() {
    const { web: { client_secret, client_id, redirect_uris } } = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, { encoding: 'utf-8' })) as CredentialsType;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    return oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
}

export async function googleDriveOAuth2(page: Page, options: {
    pathToEnv: string,
    key: string,
}) {
    try {
        const url = generateUrl();
        const { email, password } = JSON.parse(readFileSync(USER_EMAIL_PASSWORD_PATH, { encoding: 'utf-8' }));

        await page.goto(url);
        await googleLogin(page, { email, password });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const [_url, query] = page.url().split('?');
        const { code } = qs.parse(query);

        if (!code) {
            throw new Error('...ooops... Any "code" found');
        }

        const { pathToEnv, key } = options;

        rewriteEnvProp(pathToEnv, [key, code as string]);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
