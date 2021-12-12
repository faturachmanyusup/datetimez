# datetimez

[![npm version](https://img.shields.io/npm/v/datetimez.svg?style=flat)](https://www.npmjs.com/package/datetimez)
[![install size](https://packagephobia.now.sh/badge?p=datetimez)](https://packagephobia.now.sh/result?p=datetimez)
[![year download ](https://img.shields.io/npm/dy/datetimez)](https://img.shields.io/npm/dy/datetimez)
[![license](https://img.shields.io/npm/l/datetimez)](https://img.shields.io/npm/l/datetimez)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/faturachmanyusup/examples/blob/main/examples/datetimez)
<br>

a small size date (and time) formater library based on native javascript Date.

## Installing

Using npm:

```bash
$ npm install datetimez
```

Using bower:

```bash
$ bower install datetimez
```

Using yarn:

```bash
$ yarn add datetimez
```

<br>

## Using DateTimez

There is some ways to use date time:
### Import default as a function
```js
// CommonJS
const date = require('datetimez').default;

// ES6
import date from 'datetimez';

// Create date with current date as a value
const current = date();
current.year // current year

// Create date using numbers as parameters
const foo = date(2021, 5);
foo.year    // 2021
foo.month   // 5 default 0
foo.date    // 1 default 1
foo.hour    // 1 default 0
foo.minute    // 1 default 0
foo.second    // 1 default 0
foo.millisecond   // 1 default 0

// Create date using string as parameter
const bar = date('2021-11-01T03:24:00');
bar.year	// 2021
bar.month	// 11
bar.date	// 1
bar.hour	// 3
bar.minute	// 24
```

### Import DateTimez
```js
const { DateTimez } = require('datetimez');
// OR
import { DateTimez } from 'datetimez';

// Create date with current date as a value
const current = new DateTimez();
current.year // current year

// Create date using numbers as parameters
const foo = new DateTimez(2021, 5);
foo.year    // 2021
foo.month   // 5 default 0
foo.date    // 1 default 1
foo.hour    // 1 default 0
foo.minute    // 1 default 0
foo.second    // 1 default 0
foo.millisecond	  // 1 default 0

// Create date using string as parameter
const bar = new DateTimez('2021-11-01T03:24:00');
bar.year	// 2021
bar.month	// 11
bar.date	// 1
bar.hour	// 3
bar.minute	// 24
```

Since DateTimez is based on native Javascript Date, everything that work on Date is work on DateTimez too.

<br>

## Attributes

```js
const foo = date(2021, 2, 5, 12, 30, 10);
```
let's say there is a variable named foo like code above. So, below attributes will be available on foo. <br>
Please note, attributes mark as readonly means it can't be modify directly. There are methods for modify each of them. <br>

### locale < String >
```js
foo.locale // 'en' default en
```
### year < Number > #readonly
```js
foo.year // 2021
``` 
### month < Number > #readonly
```js
foo.month // 2
``` 
### monthString < String > #readonly
```js
foo.monthString // March
``` 
### date < Number > #readonly
```js
foo.date // 5
```
### dayString < String > #readonly
```js
foo.dayString // Friday
```
### hour < Number > #readonly
```js
foo.hour // 12
```
### minute < Number > #readonly
```js
foo.minute // 30
```
### second < Number > #readonly
```js
foo.second // 10
```
### millisecond < Number > #readonly
```js
foo.monthString // 0
```
### unix < Number > #readonly
```js
foo.unix // 1614922210
```
### lastDateOfMonth < Number > #readonly
```js
foo.lastDateOfMonth // 31
```

<br>

## Modify
<strong>Note</strong>: Every DateTimez instances are mutable. Calling any of the modify methods will modify instance's value.

### setLocale(id: String): DateTimez
set locale value using id of a string with a BCP 47 language tag, or an array of such strings.
For more info about locale read [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation).

### addDate(n: Number): DateTimez
```js
const date = require('datetimez');

date(2021, 1, 5).addDate(5).date // 10

// in case result of calculation is bigger than last date of current month, it will increase month
const foo = date(2021, 0, 31);
foo.addDate(5).date // 4
foo.month // 1

// just like case above, addDate will increase year if result of calculation is bigger than Des 31st
const bar = date(2021, 11, 31);
bar.addDate(5).date // 4
bar.month // 0
bar.year // 2022
```

### addMonth(n: Number): DateTimez
```js
date(2021, 1, 5).addMonth(5).month // 6

// if result of calculation is bigger than 11, it will increase year
const foo = date(2021, 5, 10);
foo.addMonth(8).month // 2
foo.year // 2022

// if date is last date of previous month and not available after calculation. Date will be decreased to nearest available date.
const bar = date(2021, 0, 31);
bar.addMonth(1).month // 1
bar.date // 28
```

### addYear(n: Number): DateTimez
```js
date(2021, 1, 5).addYear(5).year // 2026

// if date is last date of previous year and not available after calculation. Date will be decreased to nearest available date.
const foo = date(2020, 1, 29);
foo.addYear(1).year // 2021
foo.date // 28
```

### substractDate(n: Number): DateTimez
```js
date(2021, 1, 20).subtractDate(5).date // 15

// in case result of calculation is less than 1, it will decrease month
const foo = date(2021, 1, 2);
foo.subtractDate(5).date // 28
foo.month // 0

// just like case above, subtractDate will modify year if result of calculation is less than Jan 31st
const bar = date(2021, 0, 2);
bar.subtractDate(5).date // 28
bar.month // 0
bar.year // 2020
```

### subtractMonth(n: Number): DateTimez
```js
date(2021, 7, 5).subtractMonth(5).month // 2

// if result of calculation is less than 0, it will decrease year
const foo = date(2021, 0, 10);
foo.subtractMonth(1).month // 11
foo.year // 2020

// if date on previous month not available after calculation. Date will be decreased to nearest available date.
const bar = date(2021, 2, 31);
bar.subtractMonth(1).month // 1
bar.date // 28
```

### subtractYear(n: Number): DateTimez
```js
date(2020, 1, 29).subtractYear(1).year // 2019

// if date on previous year not available after calculation. Date will be decreased to nearest available date.
const foo = date(2019, 1, 29);
foo.subtractYear(1).year // 2019
foo.date // 28
```

### isBefore (d: Date): DateTimez
```js
const year2019 = date(2019, 5, 20);
const year2021 = date(2021, 5, 20);

year2019.isBefore(year2021) // true
year2021.isBefore(year2019) // false
year2021.isBefore(year2021) // false
```

### isAfter (d: Date): DateTimez
```js
const year2019 = date(2019, 5, 20);
const year2021 = date(2021, 5, 20);

year2019.isAfter(year2021) // false
year2021.isAfter(year2019) // true
year2021.isAfter(year2021) // false
```

### isEqual (d: Date): DateTimez
```js
const year = date(2019, 5, 20);
const sameYear = date(2019, 5, 20);

year.isAfter(sameYear) // false
sameYear.isAfter(year) // false
sameYear.isAfter(year2021) // true
```

## Format
### format(format: String, locale?: String)
Takes a string of tokens and replaces them with their corresponding values. You can freely decide the separators.<br>
Example:
```js
const foo = date('December 11, 2021 03:24:00');

foo.format('ddd, MM-DD-YYYY') // Sat, 12-12-2021
foo.format('dddd, MM/DD/YYYY') // Saturday, 12/12/2021
foo.format('dddd DD MMMM YYYY hh:mm:ss', 'id') // Sabtu 12 Desember 2021 03:24:00
```
#### available tokens

<table>
  <tr>
    <th>Token</th>
    <th>Value</th>
    <th>Examples</th>
  </tr>
  <tr>
    <td>ss</td>
    <td>2-digit second</td>
    <td>00, 01, ..., 59</td>
  </tr>
  <tr>
    <td>mm</td>
    <td>2-digit minute</td>
    <td>00, 01, ..., 59</td>
  </tr>
  <tr>
    <td>hh</td>
    <td>2-digit hour</td>
    <td>00, 01, ..., 23</td>
  </tr>
  <tr>
    <td>ddd</td>
    <td>Short Day</td>
    <td>Sun, Mon, Tue, ...</td>
  </tr>
  <tr>
    <td>dddd</td>
    <td>Full Day</td>
    <td>Sunday, Monday, ...</td>
  </tr>
  <tr>
    <td>DD</td>
    <td>2-digit date</td>
    <td>01, 02, 03, 04, ...</td>
  </tr>
  <tr>
    <td>MM</td>
    <td>2-digit Month</td>
    <td>01, 02, 03, ..., 12</td>
  </tr>
  <tr>
    <td>MMM</td>
    <td>Short Month</td>
    <td>Jan, Feb, ..., Dec</td>
  </tr>
  <tr>
    <td>MMMM</td>
    <td>Full Month</td>
    <td>January, ..., December</td>
  </tr>
  <tr>
    <td>YY</td>
    <td>2-digit Year</td>
    <td>19, 20, 21, 22, ...</td>
  </tr>
  <tr>
    <td>YYYY</td>
    <td>4-digit Year</td>
    <td>2019, 2020, 2021, ...</td>
  </tr>
</table>

<br>

## Playground

You can use Gitpod an online IDE(which is free for Open Source) for running the examples online.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/faturachmanyusup/examples/blob/main/examples/datetimez)


## License

[MIT](LICENSE)