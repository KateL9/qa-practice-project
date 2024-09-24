import { test, expect, Locator } from '@playwright/test';

test.describe('if-else tests', () => {

    async function isOdd(number: number): Promise<boolean> {
        if (number === undefined || number === null || isNaN(Number(number))) {
            throw Error('Please enter a valid number')
        } else {
        //Return true for odd numbers, false for even numbers
            return number % 2 != 0
        }
    };
    async function isGreater(number1: number, number2: number): Promise<number | string | undefined> {
        if (number1 === undefined || number2 === undefined || 
        number1 === null || number2 === null || 
        isNaN(Number(number1)) || isNaN(Number(number2))) {
            throw Error('Please enter a valid number')
        } else if (number1 < number2) {
            return number2
        } else if (number2 < number1) {
            return number1
        } else if (number1 == number2) {
            return `${number1} equals to ${number2}`
        }
    };

    // Tests to check isOdd function
    test('returns true for odd numbers', async () => {
        expect(await isOdd(7)).toBeTruthy();
        expect(await isOdd(1)).toBeTruthy();
        expect(await isOdd(-3)).toBeTruthy();
        expect(await isOdd(1000001)).toBeTruthy();
    });
    test('returns false for even numbers', async () => {
        expect(await isOdd(10)).toBeFalsy();
        expect(await isOdd(2)).toBeFalsy();
        expect(await isOdd(-10)).toBeFalsy();
        expect(await isOdd(0)).toBeFalsy(); // Edge case: 0 is even
        expect(await isOdd(1000000)).toBeFalsy();
        expect(await isOdd(1.7976931348623157e308)).toBeFalsy();
    });
    test('throws an error for invalid input', async () => {
        await expect(isOdd(null as any)).rejects.toThrow('Please enter a valid number');
        await expect(isOdd(undefined as any)).rejects.toThrow('Please enter a valid number');
        await expect(isOdd('8yuh' as any)).rejects.toThrow('Please enter a valid number');
    });   
    
    // Tests to check isGreater function
    test('check which number is greater', async () => {
        expect(await isGreater(9, 10)).toEqual(10);
        expect(await isGreater(10, 9)).toEqual(10);
        expect(await isGreater(-10, -9)).toEqual(-9);
        expect(await isGreater(0, 0.001)).toEqual(0.001);
        expect(await isGreater(9, 9)).toEqual('9 equals to 9');
    });
    test('check throwing an error for invalid inputs ', async () => {
        expect(isGreater(null as any, 10)).rejects.toThrow('Please enter a valid number');
        expect(isGreater(10, undefined as any)).rejects.toThrow('Please enter a valid number');
        expect(isGreater('8yuh' as any, 10)).rejects.toThrow('Please enter a valid number');
    });
})
