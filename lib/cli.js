#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
if (require.main === module) {
    const argv = process.argv.slice(2);
    const s = argv[argv.length - 1];
    if (s) {
        try {
            _1.pp(JSON.parse(s));
        }
        catch (e) {
            // console.error(e)
            console.info('Please supply a valid JSON.');
        }
    }
}
