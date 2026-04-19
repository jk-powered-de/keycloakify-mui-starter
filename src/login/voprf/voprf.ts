import { Evaluation, FinalizeData, Oprf, VOPRFClient } from "@cloudflare/voprf-ts";
import { base64UrlStringToUint8Array, uint8ArrayToBase64UrlString } from "./encoding.ts";
import { hkdfWegoV1 } from "./hash.ts";

const suite = Oprf.Suite.P384_SHA384;

const voprfPublicKey =
    "A0cy0CiWj-VH5pwJCDX4-Ea5OQ7TYvtlIRkrBqtneyHq7u6ZnDH7Dk1Aw8JPfm-Bqw";

const voprfClient = new VOPRFClient(suite, base64UrlStringToUint8Array(voprfPublicKey));

export async function bindVOPRF(email: string | undefined) {
    const input = new TextEncoder().encode(email);
    const [finData, evalReq] = await voprfClient.blind([input]);
    const evalReqBytes = evalReq.serialize();
    const evalReqB64U = uint8ArrayToBase64UrlString(evalReqBytes);
    return { finData, evalReqB64U };
}
export async function unbindVOPRF(finData: FinalizeData, evaluationB64U: string) {
        const evaluation = Evaluation.deserialize(
            voprfClient.suite,
            base64UrlStringToUint8Array(evaluationB64U)
        );
        const [output] = await voprfClient.finalize(finData, evaluation);
        const emailHash = uint8ArrayToBase64UrlString(hkdfWegoV1(output));
        return emailHash;
}

export async function fetchEvaluation(evalReqB64U: string) {
    const res = await fetch("http://api.localhost/api/auth/voprf", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            evalReqB64U
        }),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`VOPRF service error ${res.status}: ${text}`);
    }

    const { data} = (await res.json());
    if (!data.evaluationB64U) throw new Error("Missing evaluationB64U in response");
    return data.evaluationB64U;
}