# asgardia-calendar-converter

[![GitHub version](https://img.shields.io/github/release/katemihalikova/asgardia-calendar-converter.svg?style=flat-square)](https://github.com/katemihalikova/asgardia-calendar-converter)
[![npm version](https://img.shields.io/npm/v/asgardia-calendar-converter.svg?style=flat-square)](https://npm.im/asgardia-calendar-converter)
[![Travis](https://img.shields.io/travis/katemihalikova/asgardia-calendar-converter.svg?style=flat-square)](https://travis-ci.org/katemihalikova/asgardia-calendar-converter)
[![Coveralls](https://img.shields.io/coveralls/katemihalikova/asgardia-calendar-converter.svg?style=flat-square)](https://coveralls.io/github/katemihalikova/asgardia-calendar-converter)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://npm.im/asgardia-calendar-converter)

> Convert dates between ISO (Gregorian) calendar and proposed Asgardian calendar back and forth

## Leap Days

Per [Decree #2](https://asgardia.space/assets/doc/Decree002.pdf):

> The question of adding an extra day in a leap year will be addressed separately.

This means that any date outside 2017 can be affected by the later-proposed leap day adaptation. I've come up with three different approaches that I find to be the most likely:

- `"feb"`: Leap Day is included between February and March (similar to ISO calendar)
- `"jun"`: Leap Day is included between June and Asgard (similar to original International Fixed Calendar)
- `"non"`: no Leap Day is ever included

Use the keyword of your selected mode in all calls to convert functions (see [API](#api)).

## Install

```sh
npm install --save asgardia-calendar-converter
```

## Usage

Import:

```javascript
import {toAsgardian, toGregorian} from "asgardia-calendar-converter";
```

or require:

```javascript
const {toAsgardian, toGregorian} = require("asgardia-calendar-converter");
```

and use the provided functions:

```javascript
console.log(toAsgardian({day: 1, month: 7, year: 2017}, "non")); // logs {day: 14, month: 7, year: 1}
console.log(toGregorian({day: 1, month: 6, year: 1}, "non")); // logs {day: 21, month: 5, year: 2017}
```

## API

### `Datum`

```typescript
interface Datum {
  day: number;
  month: number;
  year: number;
}
```

### `toAsgardian`

```typescript
function toAsgardian(datum: Datum, mode: "feb" | "jun" | "non"): Datum;
```

- `datum`: ISO `Datum` object to be converted to Asgardian
- `mode`: Leap-day mode to be used (see [Leap Days](#leap-days))

### `toGregorian`

```typescript
function toGregorian(datum: Datum, mode: "feb" | "jun" | "non"): Datum;
```

- `datum`: Asgardian `Datum` object to be converted to ISO
- `mode`: Leap-day mode to be used (see [Leap Days](#leap-days))

### `isAsgardianYearLeap`

```typescript
function isAsgardianYearLeap(year: number): Datum;
```

- `year`: Asgardian year to be checked whether it is leap or not

### `isGregorianYearLeap`

```typescript
function isGregorianYearLeap(year: number): Datum;
```

- `year`: ISO year to be checked whether it is leap or not

## Development

Clone the repo and install dev-dependencies:

```sh
git clone url/of/your/fork
cd path/to/your/clone
npm install
```

Compile files from `src` to `dist`:

```sh
npm run build
```

Watch `src` and compile files from there to `dist` on change:

```sh
npm run watch
```

Run tests:

```sh
npm test
```

Compile files for demo to `out`:

```sh
npm run build-demo
```
