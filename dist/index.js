"use strict";
exports.__esModule = true;
function isGregorianYearLeap(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 4 === 0 && year % 100 !== 0) {
        return true;
    }
    return false;
}
exports.isGregorianYearLeap = isGregorianYearLeap;
function isAsgardianYearLeap(year) {
    return isGregorianYearLeap(year + 16);
}
exports.isAsgardianYearLeap = isAsgardianYearLeap;
function toAsgardian(_a, mode) {
    var day = _a.day, month = _a.month, year = _a.year;
    year -= 2016;
    day += [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31].slice(0, month - 1).reduce(function (a, b) { return a + b; }, 0);
    if (mode === "non") {
        if (year > 0) {
            for (var loopYear = 1, origYear = year; loopYear < origYear || (loopYear === origYear && month > 2); loopYear++) {
                if (isAsgardianYearLeap(loopYear)) {
                    day++;
                    if (day > 365) {
                        year++;
                        day = 1;
                    }
                }
            }
        }
        else {
            for (var loopYear = 0, origYear = year; loopYear > origYear || (loopYear === origYear && month <= 2); loopYear--) {
                if (isAsgardianYearLeap(loopYear)) {
                    day--;
                    if (day < 1) {
                        year--;
                        day = 365;
                    }
                }
            }
        }
    }
    else if (isAsgardianYearLeap(year) && month > 2) {
        day++;
    }
    month = 1;
    for (var m = 0; m < 13; m++) {
        var daysInMonth = ((isAsgardianYearLeap(year) && ((mode === "feb" && m === 1) || (mode === "jun" && m === 5))) || m === 12) ? 29 : 28;
        if (day > daysInMonth) {
            day -= daysInMonth;
            month++;
        }
        else {
            break;
        }
    }
    return { day: day, month: month, year: year };
}
exports.toAsgardian = toAsgardian;
function toGregorian(_a, mode) {
    var day = _a.day, month = _a.month, year = _a.year;
    day = (month - 1) * 28 + day;
    if (mode === "non") {
        if (year > 0) {
            for (var loopYear = 1, origYear = year; loopYear < origYear; loopYear++) {
                if (isAsgardianYearLeap(loopYear)) {
                    day--;
                    if (day < 1) {
                        year--;
                        day = isAsgardianYearLeap(year) ? 366 : 365;
                    }
                }
            }
        }
        else {
            for (var loopYear = 0, origYear = year; loopYear >= origYear; loopYear--) {
                if (isAsgardianYearLeap(loopYear)) {
                    day++;
                    if (day > (isAsgardianYearLeap(year) ? 366 : 365)) {
                        year++;
                        day = 1;
                    }
                }
            }
        }
    }
    else if (isAsgardianYearLeap(year) && month > (mode === "feb" ? 2 : 6)) {
        day++;
    }
    year += 2016;
    month = 1;
    var daysInMonths = [31, isAsgardianYearLeap(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (var m = 0; m < 12; m++) {
        if (day > daysInMonths[m]) {
            day -= daysInMonths[m];
            month++;
        }
        else {
            break;
        }
    }
    return { day: day, month: month, year: year };
}
exports.toGregorian = toGregorian;
//# sourceMappingURL=index.js.map