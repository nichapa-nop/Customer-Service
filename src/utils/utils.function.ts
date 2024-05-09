const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const symbol = '!@#$%^&*()_+[]{}|;:,.<>?';
const number = '0123456789';
const randomLength = 20;

export function generateRandomString(length = randomLength, includeNumber = true, includeSymbol = true): string {
    let randomString = '';
    let source = charset;
    if (includeNumber) {
        source = source + number;
    }
    if (includeSymbol) {
        source = source + symbol;
    }
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * source.length);
        randomString += source.charAt(randomIndex);
    }

    return randomString;
}
