import { test, expect, Locator } from '@playwright/test';

test.describe('if-else tests', () => {
    async function isOdd(number: number): Promise<boolean> {
        if (number === undefined || number === null || isNaN(Number(number))) {
            throw Error('Please enter a valid number')
        } else {
        //Return true for odd numbers, false for even numbers
            return number % 2 != 0
        }
    }

    test('returns true for odd numbers', async ({}) => {
        expect(await isOdd(7)).toBeTruthy();
        expect(await isOdd(1)).toBeTruthy();
        expect(await isOdd(-3)).toBeTruthy();
        expect(await isOdd(1000001)).toBeTruthy();
    })
    test('returns false for even numbers', async ({}) => {
        expect(await isOdd(10)).toBeFalsy();
        expect(await isOdd(2)).toBeFalsy();
        expect(await isOdd(-10)).toBeFalsy();
        expect(await isOdd(0)).toBeFalsy(); // Edge case: 0 is even
        expect(await isOdd(1000000)).toBeFalsy();
        expect(await isOdd(1.7976931348623157e308)).toBeFalsy();
    })
    test('throws an error for invalid input', async () => {
        await expect(isOdd(null as any)).rejects.toThrow('Please enter a valid number');
        await expect(isOdd(undefined as any)).rejects.toThrow('Please enter a valid number');
        await expect(isOdd('8yuh' as any)).rejects.toThrow('Please enter a valid number');
    });
})
