class DateTimez extends Date {
	#locale = 'en';

	constructor(
		year?: number | string | Date,
		month?: number,
		date?: number,
		hour?: number,
		minute?: number,
		second?: number
	) {
		super(
			!year && !month && !date && !hour && !minute && !second
				? new Date()
				: typeof year === 'string' || typeof year === 'object'
					? year
					: new Date(year || 1900, month || 0, date || 1, hour || 0, minute || 0, second || 0)
		);

		return this;
	}

	get year(): number {
		return this.getFullYear();
	}

	set year(_) {
		throw new Error('Cannot modify the property year directly. Use setFullYear instead.');
	}

	get month(): number {
		return this.getMonth();
	}

	set month(_) {
		throw new Error('Cannot modify the property month directly. Use setMonth instead.');
	}

	get date(): number {
		return this.getDate();
	}

	set date(_) {
		throw new Error('Cannot modify the property date directly. Use setDate instead.');
	}

	get hour(): number {
		return this.getHours();
	}

	set hour(_) {
		throw new Error('Cannot modify the property hour directly. Use setHours instead.');
	}

	get minute(): number {
		return this.getMinutes();
	}

	set minute(_) {
		throw new Error('Cannot modify the property minute directly. Use setMinutes instead.');
	}

	get second(): number {
		return this.getSeconds();
	}

	set second(_) {
		throw new Error('Cannot modify the property second directly. Use setSeconds instead.');
	}

	get millisecond(): number {
		return this.getMilliseconds();
	}

	set millisecond(_) {
		throw new Error('Cannot modify the property millisecond directly. Use setMilliseconds instead.');
	}

	get monthString(): string {
		return this.toLocaleString(this.#locale, { month: 'long' });
	}

	set monthString(_) {
		throw new Error('Property monthString is depend on month. In case you want to modify month, use setMonth instead.');
	}

	get dayString(): string {
		return this.toLocaleString(this.#locale, { weekday: 'long' });
	}

	set dayString(_) {
		throw new Error('Property dayString is depend on date. In case you want to modify day, use setDate instead.');
	}

	get lastDateOfMonth(): number {
		const temp = new DateTimez(this);

		temp.setMonth(this.getMonth() + 1);
		temp.setDate(0);

		return temp.date;
	}

	set lastDateOfMonth(_) {
		throw new Error('Cannot modify lastDateOfMonth since it depend on month.');
	}

	get locale(): string {
		return this.#locale;
	}

	set locale(code: string) {
		this.#locale = code;
	}

	get unix(): number {
		return Math.round(this.getTime() / 1000);
	}

	set unix(_) {
		throw new Error('Unable to update date directly');
	}

	/**
	 * Set locale value using id of a string with a BCP 47 language tag, or an array of such strings.
	 * 
	 * For more info about locale:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation
	*/
	setLocale(code: string): DateTimez {
		this.#locale = code;

		return this;
	}

	/**
	 * Modify `DateTimez` by adding date(s) according to `num`.
	*/
	addDate(num: number): DateTimez {
		this.setDate(this.getDate() + num);

		return this;
	}

	/**
	 * Modify `DateTimez` by adding month(s) according to `num`.
	*/
	addMonth(num: number): DateTimez {
		const target: DateTimez = new DateTimez(this.year, this.month + num);

		if (this.date > target.lastDateOfMonth) {
			this.setDate(target.lastDateOfMonth);
		}

		this.setMonth(this.getMonth() + num);

		return this;
	}

	/**
	 * Modify `DateTimez` by adding year(s) according to `num`.
	*/
	addYear(num: number): DateTimez {
		const target: DateTimez = new DateTimez(this.year + 1, this.month);

		if (this.date > target.lastDateOfMonth) {
			this.setDate(target.lastDateOfMonth);
		}

		this.setFullYear(this.getFullYear() + num);

		return this;
	}

	/**
	 * Modify `DateTimez` by subtracting year(s) according to `num`.
	*/
	subtractYear(num: number): DateTimez {
		const target: DateTimez = new DateTimez(this.year - 1, this.month);

		if (this.date > target.lastDateOfMonth) {
			this.setDate(target.lastDateOfMonth);
		}

		this.setFullYear(this.getFullYear() - num);

		return this;
	}

	/**
	 * Modify `DateTimez` by subtracting date(s) according to `num`.
	*/
	subtractDate(num: number): DateTimez {
		this.setDate(this.getDate() - num);

		return this;
	}

	/**
	 * Modify `DateTimez` by subtracting month(s) according to `num`.
	*/
	subtractMonth(num: number): DateTimez {
		const target: DateTimez = new DateTimez(this.year, this.month - num);

		if (this.date > target.lastDateOfMonth) {
			this.setDate(target.lastDateOfMonth);
		}

		this.setMonth(this.getMonth() - num);

		return this;
	}

	/**
	 * Takes a string of tokens and replaces them with their corresponding values. You can freely decide the separators.
	*/
	format(format: string, locale: string = this.#locale): string {
		const yearFull = this.toLocaleString(locale, { year: 'numeric' });
		const year: string = yearFull.slice(2);

		const monthFull: string = this.toLocaleString(locale, { month: 'long' });
		const monthShort: string = monthFull.slice(0, 3);
		const month2Digit: string = this.toLocaleString(locale, { month: '2-digit' });

		const date: string = this.toLocaleString(locale, { day: '2-digit' });

		const dayFull: string = this.toLocaleString(locale, { weekday: 'long' });
		const dayShort: string = dayFull.slice(0, 3);

		const hour: string = this.toLocaleString(locale, { hour: '2-digit', hour12: false });
		let minute: string = this.toLocaleString(locale, { minute: '2-digit' });
		if (minute.length < 2) minute = `0${this.toLocaleString(locale, { minute: '2-digit' })}`;

		let second: string = this.toLocaleString(locale, { second: '2-digit' });
		if (second.length < 2) second = `0${this.toLocaleString(locale, { second: '2-digit' })}`;

		return format
			.replace('YYYY', yearFull)
			.replace('YY', year)
			.replace('MMMM', monthFull)
			.replace('MMM', monthShort)
			.replace('MM', month2Digit)
			.replace('DD', date)
			.replace('dddd', dayFull)
			.replace('ddd', dayShort)
			.replace('hh', hour)
			.replace('mm', minute)
			.replace('ss', second);
	}

	/**
	 * Check if a `DateTimez` is before another `Date`. Return `false` if equal.
	 * 
	 * Units of measurements: Year, Month, Date, Hour, Minute, Second
	*/
	isBefore(d: Date): boolean {
		return this.unix < new DateTimez(d).unix;
	}

	/**
	 * Check if a `DateTimez` is after another `Date`. Return `false` if equal.
	 * 
	 * Units of measurements: Year, Month, Date, Hour, Minute, Second
	*/
	isAfter(d: Date): boolean {
		return this.unix > new DateTimez(d).unix;
	}

	/**
	 * Check if whether a `DateTimez` is equal to another `Date`.
	 * 
	 * Units of measurements: Year, Month, Date, Hour, Minute, Second
	*/
	isEqual(d: Date): boolean {
		return this.unix === new DateTimez(d).unix;
	}
	
	/**
	 * Check if a DateTimez is between 2 other Dates.
	 * Return true if equal to first parameter or second parameter.
	 * 
	 * Units of measurements: Year, Month, Date, Hour, Minute, Second
	*/
	isBetween(d1: Date, d2: Date): boolean {
		const start: DateTimez = new DateTimez(d1);
		const end: DateTimez = new DateTimez(d2);

		return (this.unix >= start.unix) && (this.unix <= end.unix); 
	}
}

const date = (
	year?: number | string | Date,
	month?: number,
	date?: number,
	hour?: number,
	minute?: number,
	second?: number
): DateTimez =>
	new DateTimez(
		!year && !month && !date && !hour && !minute && !second
			? new Date()
			: typeof year === 'string' || typeof year === 'object'
				? year
				: new Date(year || 1990, month || 0, date || 1, hour || 0, minute || 0, second || 0)
	);

module.exports.default = date;
module.exports.DateTimez = DateTimez;
