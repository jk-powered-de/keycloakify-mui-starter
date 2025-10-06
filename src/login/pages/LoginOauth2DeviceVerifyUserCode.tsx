import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

export default function LoginOauth2DeviceVerifyUserCode(
    props: PageProps<Extract<KcContext, { pageId: "login-oauth2-device-verify-user-code.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url } = kcContext;

    const { msg, msgStr } = i18n;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("oauth2DeviceVerificationTitle")}
        >
            <form
                id="kc-user-verify-device-user-code-form"
                className={kcClsx("kcFormClass")}
                action={url.oauth2DeviceVerificationAction}
                method="post"
            >
                <div className={kcClsx("kcFormGroupClass")}>
                    <TextField
                        label={msg("verifyOAuth2DeviceUserCode")}
                        variant="outlined"
                        id="device-user-code"
                        name="device_user_code"
                        autoComplete="off"
                        type="text"
                        className={kcClsx("kcInputClass")}
                        autoFocus
                        sx={{width: "100%"}}
                    />
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                    </div>

                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <div className={kcClsx("kcFormButtonsWrapperClass")}>
                            <Button variant="contained"
                                    sx={{width: "100%"}}
                                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                                    type="submit">{msgStr("doSubmit")}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
