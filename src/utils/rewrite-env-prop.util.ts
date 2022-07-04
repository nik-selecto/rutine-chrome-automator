import * as envfile from 'envfile';
import { readFileSync, writeFileSync } from 'fs';

export function rewriteEnvProp(pathToEnv: string, kvPair: [string, string]) {
    const [k, v] = kvPair;
    const env = envfile.parse(readFileSync(pathToEnv, { encoding: 'utf-8' }));
    env[k] = v;
    writeFileSync(pathToEnv, envfile.stringify(env));
}
