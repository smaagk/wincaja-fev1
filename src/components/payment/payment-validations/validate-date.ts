export function validateMonth(value: string) {
    return [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
    ].includes(value);
}

export function validateYear(value: string) {
    return [
        '20',
        '21',
        '22',
        '23',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '35'
    ].includes(value);
}
