import type { Options } from '@solana/qr-code-styling';
import QRCodeStyling from '@solana/qr-code-styling';
/**
 * Create a QR code from a Solana Pay URL.
 *
 * @param url - The URL to encode.
 * @param size - Width and height in pixels.
 * @param background - Background color, which should be light for device compatibility.
 * @param color - Foreground color, which should be dark for device compatibility.
 */
export declare function createQR(url: string | URL, size?: number, background?: string, color?: string): QRCodeStyling;
/** @ignore */
export declare function createQROptions(url: string | URL, size?: number, background?: string, color?: string): Options;
//# sourceMappingURL=createQR.d.ts.map