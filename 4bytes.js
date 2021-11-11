#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const target = "signatures"
const stream = fs.createWriteStream(`${target}.csv`, { encoding: 'utf-8' })

stream.write("bytecode,methodName\r\n")

const dir = path.join(__dirname, target)

fs.readdir(dir, (err, files) => {
  files.forEach(file => {
    const buf = fs.readFileSync(path.join(dir, file));

    const method = buf.toString()
      .replace(/\(.*\)$/, "")
      .replace(/[A-Z]+/g, (word) => word[0]+word.slice(1).toLowerCase());

    let words = method.split(/_{1,}/).filter(Boolean).map((word, i, arr) => {
      if (arr.length <= 1) return word
      if (i === 0) return word
      return word[0].toUpperCase() + word.slice(1)
    }).join("")
    words = words.split(/(?=[A-Z]+)/u).join(" ")

    if (words) {
      words = words[0].toUpperCase() + words.slice(1)
      stream.write(`${file},${words.toString()}\r\n`)
    }
  });
});