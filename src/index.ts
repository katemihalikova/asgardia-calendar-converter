export interface Datum {
  day: number;
  month: number;
  year: number;
}

export function isGregorianYearLeap(year: number): boolean {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 4 === 0 && year % 100 !== 0) {
    return true;
  }
  return false;
}

export function isAsgardianYearLeap(year: number): boolean {
  return isGregorianYearLeap(year + 16);
}

export function toAsgardian({day, month, year}: Datum, mode: "non" | "feb" | "jun"): Datum {
  year -= 2016;
  day += [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31].slice(0, month - 1).reduce((a, b) => a + b, 0);
  if (mode === "non") {
    if (year > 0) {
      for (let loopYear = 1, origYear = year; loopYear < origYear || (loopYear === origYear && month > 2); loopYear++) {
        if (isAsgardianYearLeap(loopYear)) {
          day++;
          if (day > 365) {
            year++;
            day = 1;
          }
        }
      }
    } else {
      for (let loopYear = 0, origYear = year; loopYear > origYear || (loopYear === origYear && month <= 2); loopYear--) {
        if (isAsgardianYearLeap(loopYear)) {
          day--;
          if (day < 1) {
            year--;
            day = 365;
          }
        }
      }
    }
  } else if (isAsgardianYearLeap(year) && month > 2) {
    day++;
  }

  month = 1;
  for (let m = 0; m < 13; m++) {
    let daysInMonth = ((isAsgardianYearLeap(year) && ((mode === "feb" && m === 1) || (mode === "jun" && m === 5))) || m === 12) ? 29 : 28;
    if (day > daysInMonth) {
      day -= daysInMonth;
      month++;
    } else {
      break;
    }
  }

  return {day, month, year};
}

export function toGregorian({day, month, year}: Datum, mode: "non" | "feb" | "jun"): Datum {
  day = (month - 1) * 28 + day;
  if (mode === "non") {
    if (year > 0) {
      for (let loopYear = 1, origYear = year; loopYear < origYear; loopYear++) {
        if (isAsgardianYearLeap(loopYear)) {
          day--;
          if (day < 1) {
            year--;
            day = isAsgardianYearLeap(year) ? 366 : 365;
          }
        }
      }
    } else {
      for (let loopYear = 0, origYear = year; loopYear >= origYear; loopYear--) {
        if (isAsgardianYearLeap(loopYear)) {
          day++;
          if (day > (isAsgardianYearLeap(year) ? 366 : 365)) {
            year++;
            day = 1;
          }
        }
      }
    }
  } else if (isAsgardianYearLeap(year) && month > (mode === "feb" ? 2 : 6)) {
    day++;
  }

  year += 2016;
  month = 1;
  let daysInMonths = [31, isGregorianYearLeap(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let m = 0; m < 12; m++) {
    if (day > daysInMonths[m]) {
      day -= daysInMonths[m];
      month++;
    } else {
      break;
    }
  }

  return {day, month, year};
}
