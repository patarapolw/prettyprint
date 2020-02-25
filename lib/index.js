"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
function pp(obj, options = {}) {
    console.log(util_1.default.inspect(cloneAndReplace(obj), {
        colors: true,
        depth: null,
        ...options
    }));
}
exports.pp = pp;
class MultilineString {
    // eslint-disable-next-line no-useless-constructor
    constructor(s) {
        this.s = s;
    }
    [util_1.default.inspect.custom](depth, options) {
        return [
            '',
            ...this.s.split('\n').map((line) => {
                return '\x1b[2m|\x1b[0m ' + options.stylize(line, 'string');
            })
        ].join('\n');
    }
}
function cloneAndReplace(obj) {
    if (obj && typeof obj === 'object') {
        if (Array.isArray(obj) && obj.constructor === Array) {
            const o = [];
            obj.map((el, i) => {
                o[i] = cloneAndReplace(el);
            });
            return o;
        }
        else if (obj.constructor === Object) {
            const o = {};
            Object.entries(obj).map(([k, v]) => {
                o[k] = cloneAndReplace(v);
            });
            return o;
        }
    }
    else if (typeof obj === 'string') {
        if (obj.includes('\n')) {
            return new MultilineString(obj);
        }
    }
    return obj;
}
