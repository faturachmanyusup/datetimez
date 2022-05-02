/* eslint-disable */
const date = require('./build').default;
const { DateTimez } = require('./build');

describe('Test function date', () => {
	test('date should be able to create new DateTimez instance with valid value', () => {
		const time = date(2021, 1, 1, 12, 30);

		expect(time.year).toBe(2021);
		expect(time.month).toBe(1);
		expect(time.date).toBe(1);
		expect(time.hour).toBe(12);
		expect(time.minute).toBe(30);
		expect(time.second).toBe(0);
		expect(time.millisecond).toBe(0);
		expect(time.lastDateOfMonth).toBe(28);
		expect(time.dayString).toBe('Monday');
		expect(time.monthString).toBe('February');
		expect(time.unix).toBe(1612157400);
	});
});

describe('Test class DateTimez', () => {
	test('should be able to create instance without arg', () => {
		const time = new DateTimez();

		expect(time.year).not.toBeNull();
		expect(time.year).not.toBeUndefined();
		expect(time.month).not.toBeNull();
		expect(time.month).not.toBeUndefined();
		expect(time.date).not.toBeNull();
		expect(time.date).not.toBeUndefined();
		expect(time.hour).not.toBeNull();
		expect(time.hour).not.toBeUndefined();
	});

	test('should be able to create instance using native date javascript as arg', () => {
		const time = new DateTimez(new Date());

		expect(time.year).not.toBeNull();
		expect(time.year).not.toBeUndefined();
		expect(time.month).not.toBeNull();
		expect(time.month).not.toBeUndefined();
		expect(time.date).not.toBeNull();
		expect(time.date).not.toBeUndefined();
		expect(time.hour).not.toBeNull();
		expect(time.hour).not.toBeUndefined();
	});

	test('should be able to create instance using number as args', () => {
		const time = new DateTimez(2021, 11, 1, 5, 30);

		expect(time.year).toBe(2021);
		expect(time.month).toBe(11);
		expect(time.date).toBe(1);
		expect(time.hour).toBe(5);
		expect(time.minute).toBe(30);
		expect(time.second).toBe(0);
	});

	test('properties should not be able to modify directly', () => {
		const time = new DateTimez(2021, 11, 1, 5, 30);

		expect(() => { time.year = 25 }).toThrowError(/year/);
		expect(() => { time.month = 25 }).toThrowError(/month/);
		expect(() => { time.monthString = 25 }).toThrowError(/monthString/);
		expect(() => { time.date = 25 }).toThrowError(/date/);
		expect(() => { time.dayString = 25 }).toThrowError(/dayString/);
		expect(() => { time.hour = 25 }).toThrowError(/hour/);
		expect(() => { time.minute = 25 }).toThrowError(/minute/);
		expect(() => { time.second = 25 }).toThrowError(/second/);
		expect(() => { time.millisecond = 25 }).toThrowError(/millisecond/);
		expect(() => { time.lastDateOfMonth = 25 }).toThrowError(/lastDateOfMonth/);
		expect(() => { time.unix = 25 }).toThrowError(/Unable to update/);
	});

	test('should be able to create instance using string', () => {
		const time = new DateTimez('2021-12-17T03:24:00');
		const time2 = new DateTimez('December 17, 2021 03:24:00');

		expect(time.year).toBe(2021);
		expect(time.month).toBe(11);
		expect(time.date).toBe(17);
		expect(time.hour).toBe(3);
		expect(time.minute).toBe(24);
		expect(time.second).toBe(0);

		expect(time2.year).toBe(2021);
		expect(time2.month).toBe(11);
		expect(time2.date).toBe(17);
		expect(time2.hour).toBe(3);
		expect(time2.minute).toBe(24);
		expect(time2.second).toBe(0);
	});

	test('attributes should have valid value', () => {
		const time = new DateTimez(2021, 1, 1, 12, 30);

		expect(time.year).toBe(2021);
		expect(time.month).toBe(1);
		expect(time.date).toBe(1);
		expect(time.hour).toBe(12);
		expect(time.minute).toBe(30);
		expect(time.second).toBe(0);
	});

	test('should have default locale "en" and be able to set locale', () => {
		const time = new DateTimez(2021, 1, 1, 12, 30);

		expect(time.locale).toBe('en');

		time.setLocale('id');
		expect(time.locale).toBe('id');
	});

	test('method addYear should update existing year to valid year', () => {
		const time = new DateTimez(2021, 11, 31);
		time.addYear(1);

		expect(time.year).toBe(2022);
		expect(time.month).toBe(11);
		expect(time.date).toBe(31);
	});

	test('method addYear should keep date still max (e.g 29 Feb 2020 + 1 year = 28 Feb 2021)', () => {
		const time = new DateTimez(2020, 1, 29);
		time.addYear(1);

		expect(time.year).toBe(2021);
		expect(time.month).toBe(1);
		expect(time.date).toBe(28);
	});

	test('method addMonth should update existing month to valid month', () => {
		const time = new DateTimez(2021, 1, 1);
		time.addMonth(1);

		expect(time.year).toBe(2021);
		expect(time.month).toBe(2);
		expect(time.date).toBe(1);
	});

	test('method addMonth should keep date still max (e.g 31 Jan + 1 month = 28 Feb)', () => {
		const time = new DateTimez(2021, 0, 31);
		time.addMonth(1);

		expect(time.year).toBe(2021);
		expect(time.month).toBe(1);
		expect(time.date).toBe(28);
	});

	test('method addMonth should be able to update year', () => {
		const time = new DateTimez(2021, 11, 1);
		time.addMonth(1);

		expect(time.year).toBe(2022);
		expect(time.month).toBe(0);
		expect(time.date).toBe(1);
	});

	test('method addDate should update existing date to valid date', () => {
		const time = new DateTimez(2021, 11, 31);
		time.addDate(1);

		expect(time.year).toBe(2022);
		expect(time.month).toBe(0);
		expect(time.date).toBe(1);
	});

	test('method addDate should be able to update month & year', () => {
		const time = new DateTimez(2021, 11, 31);
		time.addDate(1);

		expect(time.year).toBe(2022);
		expect(time.month).toBe(0);
		expect(time.date).toBe(1);
	});

	test('method subtractYear should update existing year to valid year', () => {
		const time = new DateTimez(2021, 0, 1);
		time.subtractYear(1);

		expect(time.year).toBe(2020);
		expect(time.month).toBe(0);
		expect(time.date).toBe(1);
	});

	test('method subtractYear should keep date still max (e.g 29 Feb 2020 - 1 year = 28 Feb 2019)', () => {
		const time = new DateTimez(2020, 1, 29);
		time.subtractYear(1);

		expect(time.year).toBe(2019);
		expect(time.month).toBe(1);
		expect(time.date).toBe(28);
	});

	test('method subtractMonth should update existing month to valid month', () => {
		const time = new DateTimez(2021, 11, 31);
		time.subtractMonth(1);

		expect(time.year).toBe(2021);
		expect(time.month).toBe(10);
		expect(time.date).toBe(30);
	});

	test('method subtractMonth should be able to update year', () => {
		const time = new DateTimez(2021, 0, 5);
		time.subtractMonth(1);

		expect(time.year).toBe(2020);
		expect(time.month).toBe(11);
		expect(time.date).toBe(5);
	});

	test('method subtractMonth should keep date still max (e.g 31 Mar 2021 - 1 month = 29 Feb 2020)', () => {
		const time = new DateTimez(2020, 2, 31);
		time.subtractMonth(1);

		expect(time.year).toBe(2020);
		expect(time.month).toBe(1);
		expect(time.date).toBe(29);
	});

	test('method subtractDate should update existing date to valid date', () => {
		const time = new DateTimez(2021, 11, 31);
		time.subtractDate(1);

		expect(time.year).toBe(2021);
		expect(time.month).toBe(11);
		expect(time.date).toBe(30);
	});

	test('method subtractDate should be able to update month & year', () => {
		const time = new DateTimez(2021, 0, 1);
		time.subtractDate(1);

		expect(time.year).toBe(2020);
		expect(time.month).toBe(11);
		expect(time.date).toBe(31);
	});

	test('method format should return valid date and match format given', () => {
		const time = new DateTimez(2021, 0, 1, 5, 30);

		expect(time.format('DD-MM-YYYY')).toBe('01-01-2021');
		expect(time.format('ddd DD-MM-YYYY')).toBe('Fri 01-01-2021');
		expect(time.format('dddd DD-MM-YYYY')).toBe('Friday 01-01-2021');
		expect(time.format('dddd DD-MMM-YYYY')).toBe('Friday 01-Jan-2021');
		expect(time.format('dddd DD-MMMM-YYYY')).toBe('Friday 01-January-2021');
		expect(time.format('dddd DD-MMMM-YYYY hh:mm')).toBe('Friday 01-January-2021 05:30');
		expect(time.format('dddd DD-MMMM-YYYY hh:mm:ss')).toBe('Friday 01-January-2021 05:30:00');
	});

	test('method format should be able to use other locale (pass by second argument)', () => {
		const time = new DateTimez(2021, 0, 1, 5, 5);
		time.locale = 'id';

		expect(time.format('ddd DD-MM-YYYY')).toBe('Jum 01-01-2021');
		expect(time.format('dddd DD-MM-YYYY')).toBe('Jumat 01-01-2021');
		expect(time.format('dddd DD-MMM-YYYY')).toBe('Jumat 01-Jan-2021');
		expect(time.format('dddd DD-MMMM-YYYY')).toBe('Jumat 01-Januari-2021');
		expect(time.format('dddd DD-MMMM-YYYY hh:mm')).toBe('Jumat 01-Januari-2021 05:05');
	});

	test('method isBefore should return valid value', () => {
		const d1 = new DateTimez(2021, 1);
		const d2 = new DateTimez(2021, 0);

		expect(d1.isBefore(d2)).toBe(false);
		expect(d2.isBefore(d1)).toBe(true);
	});

	test('method isAfter should return valid value', () => {
		const d1 = new DateTimez(2021, 0);
		const d2 = new DateTimez(2021, 1);

		expect(d1.isAfter(d2)).toBe(false);
		expect(d2.isAfter(d1)).toBe(true);
	});

	test('method isEqual should return valid value', () => {
		const d1 = new DateTimez(2019, 1, 5);
		const d2 = new Date(2019, 1, 5);
		const d3 = new DateTimez(2019, 1, 1)

		expect(d1.isEqual(d2)).toBe(true);
		expect(d1.isEqual(d3)).toBe(false);
	});

	test('method isBetween should return valid value', () => {
		const d1 = new DateTimez(2021, 11, 5);
		const d2 = new DateTimez(2021, 11, 7);
		const d3 = new Date(2021, 11, 10)

		expect(d1.isBetween(d2, d3)).toBe(false);
		expect(d2.isBetween(d1, d3)).toBe(true);
	});
});