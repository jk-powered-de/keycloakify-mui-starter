import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Button from "@mui/material/Button";
import "./DeleteCredential.css";

export default function DeleteCredential(props: PageProps<Extract<KcContext, { pageId: "delete-credential.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msgStr, msg } = i18n;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, credentialLabel } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("deleteCredentialTitle", credentialLabel)}
        >
            <div id="kc-delete-text">{msg("deleteCredentialMessage", credentialLabel)}</div>
            <form className="form-actions" action={url.loginAction} method="POST">
                <Button variant="contained"
                        sx={{ width: "100%" }}
                        className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                        name="accept"
                        id="kc-accept"
                        type="submit"
                >{msgStr("doConfirmDelete")}
                </Button>
                <Button variant="outlined"
                        className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                        name="cancel-aia"
                        id="kc-decline"
                        type="submit"
                        sx={{ width: "100%" }}
                >{msgStr("doCancel")}
                </Button>
            </form>
            <div className="clearfix" />
        </Template>
    );
}

