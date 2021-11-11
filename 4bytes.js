#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const target = "signatures"
const stream = fs.createWriteStream(`${target}.csv`, { encoding: 'utf-8' })

stream.write("bytecode,text\r\n")

const dir = path.join(__dirname, target)

fs.readdir(dir, (err, files) => {
  files.forEach(file => {
    const buf = fs.readFileSync(path.join(dir, file));
    stream.write(`${file},${buf.toString()}\r\n`)
  });
});