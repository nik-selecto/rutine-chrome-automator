export default function pause(seconds: number = 2000) {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, seconds);
    });
}
