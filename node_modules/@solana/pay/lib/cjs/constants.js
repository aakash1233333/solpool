"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEN = exports.SOL_DECIMALS = exports.MEMO_PROGRAM_ID = exports.HTTPS_PROTOCOL = exports.SOLANA_PROTOCOL = void 0;
const web3_js_1 = require("@solana/web3.js");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
/** @internal */
exports.SOLANA_PROTOCOL = 'solana:';
/** @internal */
exports.HTTPS_PROTOCOL = 'https:';
/** @internal */
exports.MEMO_PROGRAM_ID = new web3_js_1.PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
/** @internal */
exports.SOL_DECIMALS = 9;
/** @internal */
exports.TEN = new bignumber_js_1.default(10);
//# sourceMappingURL=constants.js.map