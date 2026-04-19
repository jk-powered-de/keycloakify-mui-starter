import { hkdf } from "@noble/hashes/hkdf.js";
import { sha256 } from "@noble/hashes/sha2.js";

const te = new TextEncoder();

export function hkdfWegoV1(input: Uint8Array) {
    return hkdf(sha256, input, te.encode("wego-v1"), te.encode("wego-auth"), 32);
}