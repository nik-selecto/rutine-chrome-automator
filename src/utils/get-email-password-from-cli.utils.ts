import inquierer from 'inquirer';

export default async function getEmailPasswordFromCli() {
    const { email, password } = await inquierer.prompt([
        {
            type: 'input',
            message: 'Your youtube account email please',
            name: 'email',
        },
        {
            type: 'password',
            message: 'Your youtube account password please',
            name: 'password',
            mask: true,
        },
    ]);

    if (!email || !/\w+@\w+\.\w+/.test(email)) {
        throw new Error(`First arg should be your youtube's email! Actual value: "${email}"`);
    }

    if (!password || (password.length < 8)) {
        throw new Error(`Second arg should be your youtube's password.`);
    }

    return { email, password };
}
