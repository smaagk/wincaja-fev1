export function capitalizeFirstLetter(str: string) {
    if (str === null || str === undefined || str === '') {
        return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
}