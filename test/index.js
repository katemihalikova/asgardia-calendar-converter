"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const tap = require("tap");

const {toAsgardian, toGregorian} = require("../dist/index.js");

tap.test("Convert between ISO ans Asgardian (using conversion table)", { timeout: 300e3 }, t => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "conversion-table.csv")),
  });
  rl.once("line", () => {
    rl.on("line", line => {
      let data = line.trim().split(";").map(Number);
      let gre = {day: data[0], month: data[1], year: data[2]};
      let non = {day: data[3], month: data[4], year: data[5]};
      let feb = {day: data[6], month: data[7], year: data[8]};
      let jun = {day: data[9], month: data[10], year: data[11]};

      t.match(toAsgardian(gre, "non"), non, `Gregorian to Asgardian (without LD) - converting from ${gre.day}.${gre.month}.${gre.year}`);
      t.match(toAsgardian(gre, "feb"), feb, `Gregorian to Asgardian (with Feb LD) - converting from ${gre.day}.${gre.month}.${gre.year}`);
      t.match(toAsgardian(gre, "jun"), jun, `Gregorian to Asgardian (with Jun LD) - converting from ${gre.day}.${gre.month}.${gre.year}`);
      t.match(toGregorian(non, "non"), gre, `Asgardian to Gregorian (without LD) - converting from ${non.day}.${non.month}.${non.year}`);
      t.match(toGregorian(feb, "feb"), gre, `Asgardian to Gregorian (with Feb LD) - converting from ${feb.day}.${feb.month}.${feb.year}`);
      t.match(toGregorian(jun, "jun"), gre, `Asgardian to Gregorian (with Jun LD) - converting from ${jun.day}.${jun.month}.${jun.year}`);
    });
  })
  .on("close", () => {
    t.end();
    process.exit();
  });
});
