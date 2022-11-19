import type { Connection, Finality, TransactionResponse, TransactionSignature } from '@solana/web3.js';
import type { Amount, Memo, Recipient, References, SPLToken } from './types.js';
/**
 * Thrown when a transaction doesn't contain a valid Solana Pay transfer.
 */
export declare class ValidateTransferError extends Error {
    name: string;
}
/**
 * Fields of a Solana Pay transfer request to validate.
 */
export interface ValidateTransferFields {
    /** `recipient` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#recipient). */
    recipient: Recipient;
    /** `amount` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#amount). */
    amount: Amount;
    /** `spl-token` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#spl-token). */
    splToken?: SPLToken;
    /** `reference` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#reference). */
    reference?: References;
    /** `memo` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#memo). */
    memo?: Memo;
}
/**
 * Check that a given transaction contains a valid Solana Pay transfer.
 *
 * @param connection - A connection to the cluster.
 * @param signature - The signature of the transaction to validate.
 * @param fields - Fields of a Solana Pay transfer request to validate.
 * @param options - Options for `getTransaction`.
 *
 * @throws {ValidateTransferError}
 */
export declare function validateTransfer(connection: Connection, signature: TransactionSignature, { recipient, amount, splToken, reference, memo }: ValidateTransferFields, options?: {
    commitment?: Finality;
}): Promise<TransactionResponse>;
//# sourceMappingURL=validateTransfer.d.ts.map