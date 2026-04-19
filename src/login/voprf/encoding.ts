import {base64urlnopad } from "@scure/base";

export function base64UrlStringToUint8Array(base64UrlString: string) {
    return base64urlnopad.decode(base64UrlString);
}
export function uint8ArrayToBase64UrlString(uint8Array: Uint8Array) {
    return base64urlnopad.encode(uint8Array);
}
