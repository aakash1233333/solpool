"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeURL = void 0;
const constants_js_1 = require("./constants.js");
/**
 * Encode a Solana Pay URL.
 *
 * @param fields Fields to encode in the URL.
 */
function encodeURL(fields) {
    return 'link' in fields ? encodeTransactionRequestURL(fields) : encodeTransferRequestURL(fields);
}
exports.encodeURL = encodeURL;
function encodeTransactionRequestURL({ link, label, message }) {
    // Remove trailing slashes
    const pathname = link.search
        ? encodeURIComponent(String(link).replace(/\/\?/, '?'))
        : String(link).replace(/\/$/, '');
    const url = new URL(constants_js_1.SOLANA_PROTOCOL + pathname);
    if (label) {
        url.searchParams.append('label', label);
    }
    if (message) {
        url.searchParams.append('message', message);
    }
    return url;
}
function encodeTransferRequestURL({ recipient, amount, splToken, reference, label, message, memo, }) {
    var _a;
    const pathname = recipient.toBase58();
    const url = new URL(constants_js_1.SOLANA_PROTOCOL + pathname);
    if (amount) {
        url.searchParams.append('amount', amount.toFixed((_a = amount.decimalPlaces()) !== null && _a !== void 0 ? _a : 0));
    }
    if (splToken) {
        url.searchParams.append('spl-token', splToken.toBase58());
    }
    if (reference) {
        if (!Array.isArray(reference)) {
            reference = [reference];
        }
        for (const pubkey of reference) {
            url.searchParams.append('reference', pubkey.toBase58());
        }
    }
    if (label) {
        url.searchParams.append('label', label);
    }
    if (message) {
        url.searchParams.append('message', message);
    }
    if (memo) {
        url.searchParams.append('memo', memo);
    }
    return url;
}
//# sourceMappingURL=encodeURL.js.map