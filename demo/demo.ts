import {Datum, isAsgardianYearLeap, isGregorianYearLeap, toAsgardian, toGregorian} from "../src/index";

let el = {
  gre_d: document.getElementById("gre_d") as HTMLSelectElement,
  gre_m: document.getElementById("gre_m") as HTMLSelectElement,
  gre_y: document.getElementById("gre_y") as HTMLInputElement,
  gre_w: document.getElementById("gre_w") as HTMLTableCellElement,
  gre_29: document.getElementById("gre_29") as HTMLOptionElement,
  gre_30: document.getElementById("gre_30") as HTMLOptionElement,
  gre_31: document.getElementById("gre_31") as HTMLOptionElement,
  feb_d: document.getElementById("feb_d") as HTMLSelectElement,
  feb_m: document.getElementById("feb_m") as HTMLSelectElement,
  feb_y: document.getElementById("feb_y") as HTMLInputElement,
  feb_w: document.getElementById("feb_w") as HTMLTableCellElement,
  feb_l: document.getElementById("feb_l") as HTMLOptionElement,
  feb_13: document.getElementById("feb_13") as HTMLOptionElement,
  jun_d: document.getElementById("jun_d") as HTMLSelectElement,
  jun_m: document.getElementById("jun_m") as HTMLSelectElement,
  jun_y: document.getElementById("jun_y") as HTMLInputElement,
  jun_w: document.getElementById("jun_w") as HTMLTableCellElement,
  jun_l: document.getElementById("jun_l") as HTMLOptionElement,
  jun_13: document.getElementById("jun_13") as HTMLOptionElement,
  non_d: document.getElementById("non_d") as HTMLSelectElement,
  non_m: document.getElementById("non_m") as HTMLSelectElement,
  non_y: document.getElementById("non_y") as HTMLInputElement,
  non_w: document.getElementById("non_w") as HTMLTableCellElement,
  non_13: document.getElementById("non_13") as HTMLOptionElement,
};

function changed(gre: Datum) {
  let greDaysInMonths = [, 31, isGregorianYearLeap(gre.year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let feb = toAsgardian(gre, "feb");
  let jun = toAsgardian(gre, "jun");
  let non = toAsgardian(gre, "non");

  el.gre_y.value = String(gre.year);
  el.gre_m.value = String(gre.month);
  el.gre_d.value = String(gre.day);
  el.gre_29.style.display = greDaysInMonths[gre.month] >= 29 ? "" : "none";
  el.gre_30.style.display = greDaysInMonths[gre.month] >= 30 ? "" : "none";
  el.gre_31.style.display = greDaysInMonths[gre.month] >= 31 ? "" : "none";
  el.feb_y.value = String(feb.year);
  el.feb_m.value = String(feb.month);
  el.feb_d.value = feb.day === 29 ? feb.day + "-" + feb.month : String(feb.day);
  el.feb_l.style.display = isAsgardianYearLeap(feb.year) && feb.month === 2 ? "" : "none";
  el.feb_13.style.display = feb.month === 13 ? "" : "none";
  el.jun_y.value = String(jun.year);
  el.jun_m.value = String(jun.month);
  el.jun_d.value = jun.day === 29 ? jun.day + "-" + jun.month : String(jun.day);
  el.jun_l.style.display = isAsgardianYearLeap(jun.year) && jun.month === 6 ? "" : "none";
  el.jun_13.style.display = jun.month === 13 ? "" : "none";
  el.non_y.value = String(non.year);
  el.non_m.value = String(non.month);
  el.non_d.value = String(non.day);
  el.non_13.style.display = non.month === 13 ? "" : "none";

  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let greDate = new Date(2000, gre.month - 1, gre.day);
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

function greChanged(): void {
  let gre = {day: Number(el.gre_d.value), month: Number(el.gre_m.value), year: Number(el.gre_y.value)};
  let greDaysInMonths = [, 31, isGregorianYearLeap(gre.year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (gre.day > greDaysInMonths[gre.month]) {
    gre.day = greDaysInMonths[gre.month];
  }
  changed(gre);
}

function febChanged(): void {
  let feb = {day: Number(el.feb_d.value.split("-")[0]), month: Number(el.feb_m.value), year: Number(el.feb_y.value)};
  let febDaysInMonths = [, 28, isAsgardianYearLeap(feb.year) ? 29 : 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29];
  if (feb.day > febDaysInMonths[feb.month]) {
    feb.day = febDaysInMonths[feb.month];
  }
  changed(toGregorian(feb, "feb"));
}

function junChanged(): void {
  let jun = {day: Number(el.jun_d.value.split("-")[0]), month: Number(el.jun_m.value), year: Number(el.jun_y.value)};
  let junDaysInMonths = [, 28, 28, 28, 28, 28, isAsgardianYearLeap(jun.year) ? 29 : 28, 28, 28, 28, 28, 28, 28, 29];
  if (jun.day > junDaysInMonths[jun.month]) {
    jun.day = junDaysInMonths[jun.month];
  }
  changed(toGregorian(jun, "jun"));
}

function nonChanged(): void {
  let non = {day: Number(el.non_d.value), month: Number(el.non_m.value), year: Number(el.non_y.value)};
  let nonDaysInMonths = [, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29];
  if (non.day > nonDaysInMonths[non.month]) {
    non.day = nonDaysInMonths[non.month];
  }
  changed(toGregorian(non, "non"));
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

let now = new Date();
changed({day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear()});
