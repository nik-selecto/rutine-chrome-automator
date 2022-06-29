/* eslint-disable camelcase */
import fs from 'fs';
import { join } from 'path';
import { google } from 'googleapis';
import { inspect } from 'util';
import { config } from 'dotenv';

config({ path: join(__dirname, '../../..', '.test.env') });

const { DEBUG: LOG_MODE } = process.env;
const log = (...args: any[]) => args.forEach((a) => (LOG_MODE === 'debug' ? console.info(inspect(a, { colors: true, depth: null })) : {}));

log();

type CredentialsType = Record<string, any> & { web: any };

const CREDENTIALS_PATH = join(process.cwd(), 'credentials.json');
const SCOPES = [
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive',
];

export function generateUrl() {
    const { web: { client_secret, client_id, redirect_uris } } = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, { encoding: 'utf-8' })) as CredentialsType;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    return oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
}
