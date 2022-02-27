export default function pause(seconds: number = 2000) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise<void>((resolve) => setTimeout(resolve, seconds));
}
