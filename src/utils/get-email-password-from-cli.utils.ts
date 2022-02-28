/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import inquierer from 'inquirer';

// TODO rm hardcode from cli

export default async function getEmailPasswordFromCli() {
    // const { email, password } = await inquierer.prompt([
    //     {
    //         type: 'input',
    //         message: 'Your youtube account email please',
    //         name: 'email',
    //     },
    //     {
    //         type: 'password',
    //         message: 'Your youtube account password please',
    //         name: 'password',
    //         mask: true,
    //     },
    // ]);

    const [email, password] = await Promise.resolve(process.argv.slice(2));

    if (!email || !/\w+@\w+\.\w+/.test(email)) {
        throw new Error(`First arg should be your youtube's email! Actual value: "${email}"`);
    }

    if (!password || (password.length < 8)) {
        throw new Error(`Second arg should be your youtube's password.`);
    }

    return { email, password };
}
