import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { TextField } from "@mui/material";
import "./Code.css";

export default function Code(props: PageProps<Extract<KcContext, { pageId: "code.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { code } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={code.success ? msg("codeSuccessTitle") : msg("codeErrorTitle", code.error)}
        >
            <div id="kc-code">
                {code.success ? (
                    <>
                        <p>{msg("copyCodeInstruction")}</p>
                        <TextField id="code"
                                   className={kcClsx("kcTextareaClass")}
                                   variant="outlined"
                                   defaultValue={code.code}
                                   sx={{width: '100%'}}
                                   slotProps={{
                                       input: {
                                           readOnly: true,
                                       },
                                   }}/>
                    </>
                ) : (
                    code.error && (
                        <p
                            id="error"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(code.error)
                            }}
                        />
                    )
                )}
            </div>
        </Template>
    );
}

