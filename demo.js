define("src/index", ["require", "exports"], function (require, exports) {
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
        var daysInMonths = [31, isGregorianYearLeap(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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
});
define("demo/demo", ["require", "exports", "src/index"], function (require, exports, index_1) {
    "use strict";
    exports.__esModule = true;
    var el = {
        gre_d: document.getElementById("gre_d"),
        gre_m: document.getElementById("gre_m"),
        gre_y: document.getElementById("gre_y"),
        gre_w: document.getElementById("gre_w"),
        gre_29: document.getElementById("gre_29"),
        gre_30: document.getElementById("gre_30"),
        gre_31: document.getElementById("gre_31"),
        feb_d: document.getElementById("feb_d"),
        feb_m: document.getElementById("feb_m"),
        feb_y: document.getElementById("feb_y"),
        feb_w: document.getElementById("feb_w"),
        feb_l: document.getElementById("feb_l"),
        feb_13: document.getElementById("feb_13"),
        jun_d: document.getElementById("jun_d"),
        jun_m: document.getElementById("jun_m"),
        jun_y: document.getElementById("jun_y"),
        jun_w: document.getElementById("jun_w"),
        jun_l: document.getElementById("jun_l"),
        jun_13: document.getElementById("jun_13"),
        non_d: document.getElementById("non_d"),
        non_m: document.getElementById("non_m"),
        non_y: document.getElementById("non_y"),
        non_w: document.getElementById("non_w"),
        non_13: document.getElementById("non_13")
    };
    function changed(gre) {
        var greDaysInMonths = [, 31, index_1.isGregorianYearLeap(gre.year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var feb = index_1.toAsgardian(gre, "feb");
        var jun = index_1.toAsgardian(gre, "jun");
        var non = index_1.toAsgardian(gre, "non");
        el.gre_y.value = String(gre.year);
        el.gre_m.value = String(gre.month);
        el.gre_d.value = String(gre.day);
        el.gre_29.style.display = greDaysInMonths[gre.month] >= 29 ? "" : "none";
        el.gre_30.style.display = greDaysInMonths[gre.month] >= 30 ? "" : "none";
        el.gre_31.style.display = greDaysInMonths[gre.month] >= 31 ? "" : "none";
        el.feb_y.value = String(feb.year);
        el.feb_m.value = String(feb.month);
        el.feb_d.value = feb.day === 29 ? feb.day + "-" + feb.month : String(feb.day);
        el.feb_l.style.display = index_1.isAsgardianYearLeap(feb.year) && feb.month === 2 ? "" : "none";
        el.feb_13.style.display = feb.month === 13 ? "" : "none";
        el.jun_y.value = String(jun.year);
        el.jun_m.value = String(jun.month);
        el.jun_d.value = jun.day === 29 ? jun.day + "-" + jun.month : String(jun.day);
        el.jun_l.style.display = index_1.isAsgardianYearLeap(jun.year) && jun.month === 6 ? "" : "none";
        el.jun_13.style.display = jun.month === 13 ? "" : "none";
        el.non_y.value = String(non.year);
        el.non_m.value = String(non.month);
        el.non_d.value = String(non.day);
        el.non_13.style.display = non.month === 13 ? "" : "none";
        var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var greDate = new Date(2000, gre.month - 1, gre.day);
        greDate.setFullYear(gre.year);
        el.gre_w.innerText = daysOfWeek[greDate.getDay()];
        el.feb_w.innerText = daysOfWeek[feb.day % 7];
        el.jun_w.innerText = daysOfWeek[jun.day % 7];
        el.non_w.innerText = daysOfWeek[non.day % 7];
        if (feb.month === 2 && feb.day === 29) {
            el.feb_w.innerText = "Leap Day";
        }
        if (feb.month === 13 && feb.day === 29) {
            el.feb_w.innerText = "Year Day";
        }
        if (jun.month === 6 && jun.day === 29) {
            el.jun_w.innerText = "Leap Day";
        }
        if (jun.month === 13 && jun.day === 29) {
            el.jun_w.innerText = "Year Day";
        }
        if (non.month === 13 && non.day === 29) {
            el.non_w.innerText = "Year Day";
        }
    }
    function greChanged() {
        var gre = { day: Number(el.gre_d.value), month: Number(el.gre_m.value), year: Number(el.gre_y.value) };
        var greDaysInMonths = [, 31, index_1.isGregorianYearLeap(gre.year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (gre.day > greDaysInMonths[gre.month]) {
            gre.day = greDaysInMonths[gre.month];
        }
        changed(gre);
    }
    function febChanged() {
        var feb = { day: Number(el.feb_d.value.split("-")[0]), month: Number(el.feb_m.value), year: Number(el.feb_y.value) };
        var febDaysInMonths = [, 28, index_1.isAsgardianYearLeap(feb.year) ? 29 : 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29];
        if (feb.day > febDaysInMonths[feb.month]) {
            feb.day = febDaysInMonths[feb.month];
        }
        changed(index_1.toGregorian(feb, "feb"));
    }
    function junChanged() {
        var jun = { day: Number(el.jun_d.value.split("-")[0]), month: Number(el.jun_m.value), year: Number(el.jun_y.value) };
        var junDaysInMonths = [, 28, 28, 28, 28, 28, index_1.isAsgardianYearLeap(jun.year) ? 29 : 28, 28, 28, 28, 28, 28, 28, 29];
        if (jun.day > junDaysInMonths[jun.month]) {
            jun.day = junDaysInMonths[jun.month];
        }
        changed(index_1.toGregorian(jun, "jun"));
    }
    function nonChanged() {
        var non = { day: Number(el.non_d.value), month: Number(el.non_m.value), year: Number(el.non_y.value) };
        var nonDaysInMonths = [, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29];
        if (non.day > nonDaysInMonths[non.month]) {
            non.day = nonDaysInMonths[non.month];
        }
        changed(index_1.toGregorian(non, "non"));
    }
    el.gre_y.addEventListener("change", greChanged, false);
    el.gre_m.addEventListener("change", greChanged, false);
    el.gre_d.addEventListener("change", greChanged, false);
    el.feb_y.addEventListener("change", febChanged, false);
    el.feb_m.addEventListener("change", febChanged, false);
    el.feb_d.addEventListener("change", febChanged, false);
    el.jun_y.addEventListener("change", junChanged, false);
    el.jun_m.addEventListener("change", junChanged, false);
    el.jun_d.addEventListener("change", junChanged, false);
    el.non_y.addEventListener("change", nonChanged, false);
    el.non_m.addEventListener("change", nonChanged, false);
    el.non_d.addEventListener("change", nonChanged, false);
    var now = new Date();
    changed({ day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() });
});
