import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import * as React from "react";
import {
    FormControl, FormHelperText, IconButton, InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./LoginUpdatePassword.css";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    // Password visibility #start
    const [showPasswordNew, setShowPasswordNew] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

    const handleClickShowPasswordNew = () => setShowPasswordNew((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    // Password visibility #end

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <form id="kc-passwd-update-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <FormControl variant="outlined"
                                 error={messagesPerField.existsError("password")}
                                 sx={{ width: "100%" }}
                    >
                        <InputLabel htmlFor="password-new">{msg("passwordNew")}</InputLabel>
                        <OutlinedInput
                            label={msg("passwordNew")}
                            id="password-new"
                            className={kcClsx("kcInputClass")}
                            name="password-new"
                            type={showPasswordNew ? 'text' : 'password'}
                            autoFocus
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPasswordNew ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPasswordNew}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPasswordNew ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {messagesPerField.existsError("password") && (
                            <FormHelperText>
                                            <span
                                                id="input-error-password"
                                                className={kcClsx("kcInputErrorMessageClass")}
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(messagesPerField.get("password"))
                                                }}
                                            />
                            </FormHelperText>
                        )}
                    </FormControl>
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    <FormControl variant="outlined"
                                 error={messagesPerField.existsError("password-confirm")}
                                 sx={{ width: "100%" }}
                    >
                        <InputLabel htmlFor="password-confirm">{msg("passwordConfirm")}</InputLabel>
                        <OutlinedInput
                            label={msg("passwordConfirm")}
                            id="password-confirm"
                            className={kcClsx("kcInputClass")}
                            name="password-confirm"
                            type={showPasswordConfirm ? 'text' : 'password'}
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPasswordConfirm ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPasswordConfirm}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {messagesPerField.existsError("password-confirm") && (
                            <FormHelperText>
                                            <span
                                                id="input-error-password-confirm"
                                                className={kcClsx("kcInputErrorMessageClass")}
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(messagesPerField.get("password-confirm"))
                                                }}
                                            />
                            </FormHelperText>
                        )}
                    </FormControl>
                </div>
                <div className={kcClsx("kcFormGroupClass")}>
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <Button variant="contained"
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    !isAppInitiatedAction && "kcButtonBlockClass",
                                    "kcButtonLargeClass"
                                )}
                                type="submit"
                                sx={{ width: "100%" }}>
                            {msgStr("doSubmit")}
                        </Button>
                        {isAppInitiatedAction && (
                            <Button variant="outlined"
                                    className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                                    type="submit"
                                    name="cancel-aia"
                                    value="true"
                                    sx={{ width: "100%" }}>{msg("doCancel")}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />}
                                      label={msg("logoutOtherSessions")}
                                      className="checkbox"
                                      id="logout-sessions"
                                      name="logout-sessions"
                                      value="on"
                    />
                </FormGroup>
            </div>
        </div>
    );
}

