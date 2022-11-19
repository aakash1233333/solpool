"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseURL = exports.ParseURLError = void 0;
const web3_js_1 = require("@solana/web3.js");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const constants_js_1 = require("./constants.js");
/**
 * Thrown when a URL can't be parsed as a Solana Pay URL.
 */
class ParseURLError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ParseURLError';
    }
}
exports.ParseURLError = ParseURLError;
/**
 * Parse a Solana Pay URL.
 *
 * @param url - URL to parse.
 *
 * @throws {ParseURLError}
 */
function parseURL(url) {
    if (typeof url === 'string') {
        if (url.length > 2048)
            throw new ParseURLError('length invalid');
        url = new URL(url);
    }
    if (url.protocol !== constants_js_1.SOLANA_PROTOCOL)
        throw new ParseURLError('protocol invalid');
    if (!url.pathname)
        throw new ParseURLError('pathname missing');
    return /[:%]/.test(url.pathname) ? parseTransactionRequestURL(url) : parseTransferRequestURL(url);
}
exports.parseURL = parseURL;
function parseTransactionRequestURL({ pathname, searchParams }) {
    const link = new URL(decodeURIComponent(pathname));
    if (link.protocol !== constants_js_1.HTTPS_PROTOCOL)
        throw new ParseURLError('link invalid');
    const label = searchParams.get('label') || undefined;
    const message = searchParams.get('message') || undefined;
    return {
        link,
        label,
        message,
    };
}
function parseTransferRequestURL({ pathname, searchParams }) {
    let recipient;
    try {
        recipient = new web3_js_1.PublicKey(pathname);
    }
    catch (error) {
        throw new ParseURLError('recipient invalid');
    }
    let amount;
    const amountParam = searchParams.get('amount');
    if (amountParam != null) {
        if (!/^\d+(\.\d+)?$/.test(amountParam))
            throw new ParseURLError('amount invalid');
        amount = new bignumber_js_1.default(amountParam);
        if (amount.isNaN())
            throw new ParseURLError('amount NaN');
        if (amount.isNegative())
            throw new ParseURLError('amount negative');
    }
    let splToken;
    const splTokenParam = searchParams.get('spl-token');
    if (splTokenParam != null) {
        try {
            splToken = new web3_js_1.PublicKey(splTokenParam);
        }
        catch (error) {
            throw new ParseURLError('spl-token invalid');
        }
    }
    let reference;
    const referenceParams = searchParams.getAll('reference');
    if (referenceParams.length) {
        try {
            reference = referenceParams.map((reference) => new web3_js_1.PublicKey(reference));
        }
        catch (error) {
            throw new ParseURLError('reference invalid');
        }
    }
    const label = searchParams.get('label') || undefined;
    const message = searchParams.get('message') || undefined;
    const memo = searchParams.get('memo') || undefined;
    return {
        recipient,
        amount,
        splToken,
        reference,
        label,
        message,
        memo,
    };
}
//# sourceMappingURL=parseURL.js.map