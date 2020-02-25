#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
if (require.main === module) {
    const argv = process.argv.slice(2);
    const s = argv[argv.length - 1];
    if (s) {
        // @ts-ignore
        _1.pp(safeEval(s));
    }
}
/**
 * https://github.com/hacksparrow/safe-eval
 * @param code
 * @param context
 * @param opts
 */
// @ts-ignore
function safeEval(code, context, opts) {
    const vm = require('vm');
    var sandbox = {};
    var resultKey = 'SAFE_EVAL_' + Math.floor(Math.random() * 1000000);
    sandbox[resultKey] = {};
    var clearContext = `
    (function() {
      Function = undefined;
      const keys = Object.getOwnPropertyNames(this).concat(['constructor']);
      keys.forEach((key) => {
        const item = this[key];
        if (!item || typeof item.constructor !== 'function') return;
        this[key].constructor = undefined;
      });
    })();
  `;
    code = clearContext + resultKey + '=' + code;
    if (context) {
        Object.keys(context).forEach(function (key) {
            sandbox[key] = context[key];
        });
    }
    vm.runInNewContext(code, sandbox, opts);
    return sandbox[resultKey];
}
