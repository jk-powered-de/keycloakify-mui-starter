import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import PasswordIcon from "@mui/icons-material/Password";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./SelectAuthenticator.css";

function getAuthenticatorIcon(iconCssClass: string | undefined) {
    switch (iconCssClass) {
        case "kcAuthenticatorPasswordClass":
            return <PasswordIcon />;
        case "kcAuthenticatorOTPClass":
            return <SmartphoneIcon />;
        case "kcAuthenticatorWebAuthnClass":
            return <KeyIcon />;
        case "kcAuthenticatorKeyClass":
            return <SecurityIcon />;
        default:
            return <LockIcon />;
    }
}

export default function SelectAuthenticator(props: PageProps<Extract<KcContext, { pageId: "select-authenticator.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, auth } = kcContext;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            headerNode={msg("loginChooseAuthenticator")}
        >
            <form id="kc-select-credential-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                    <List className={kcClsx("kcSelectAuthListClass")}>

                    {auth.authenticationSelections.map((authenticationSelection, i) => (
                        <ListItem disablePadding
                                  key={i}
                                  className={kcClsx("kcSelectAuthListItemClass")}
                                    >
                            <ListItemButton
                                key={i}
                                component="button"
                                type="submit"
                                name="authenticationExecution"
                                value={authenticationSelection.authExecId}
                                sx={{ borderRadius: 1, mb: 1 }}
                            >
                                <ListItemIcon>
                                    {getAuthenticatorIcon(authenticationSelection.iconCssClass)}
                                </ListItemIcon>

                                <ListItemText
                                    primary={
                                        <Typography variant="body1" fontWeight="medium">
                                            {advancedMsg(authenticationSelection.displayName)}
                                        </Typography>
                                    }
                                    secondary={
                                        authenticationSelection.helpText ? (
                                            <Typography variant="body2" color="text.secondary">
                                                {advancedMsg(authenticationSelection.helpText)}
                                            </Typography>
                                        ) : null
                                    }
                                />

                                <ArrowForwardIosIcon fontSize="small" />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
            </form>
        </Template>
    );
}

