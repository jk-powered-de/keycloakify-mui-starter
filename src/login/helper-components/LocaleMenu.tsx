import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { MessageKey } from "keycloakify/login/i18n/messages_defaultSet/types";
import { ListItemIcon } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

type Language = {
    languageTag: string;
    label: string;
    href?: string;
};

type MsgStr = (key: MessageKey, ...args: (string | undefined)[]) => string;

interface LocaleMenuProps {
    enabledLanguages: Language[];
    currentLanguage: Language;
    msgStr: MsgStr;
}

export function LocaleMenu({ enabledLanguages, currentLanguage, msgStr }: LocaleMenuProps) {
    if (enabledLanguages.length <= 1) return null;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleMenuItemClick = (href?: string) => {
        if (href) window.location.href = href;
        setAnchorEl(null);
    };

    return (
        <div id="kc-locale">
            <List component="nav" aria-label={msgStr("languages")} sx={{ bgcolor: "background.paper" }}>
                <ListItemButton
                    id="kc-current-locale-link"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    aria-controls="language-switch1"
                    onClick={handleClickListItem}
                    tabIndex={1}
                >
                    <ListItemText primary={currentLanguage.label} />
                    <ListItemIcon>
                        <ArrowDropDown fontSize="small" />
                    </ListItemIcon>
                </ListItemButton>
            </List>

            <Menu
                id="language-switch1"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        "aria-labelledby": "kc-current-locale-link",
                        role: "menu",
                    },
                }}
            >
                {enabledLanguages.map(({ languageTag, label, href }) => (
                    <MenuItem
                        key={languageTag}
                        onClick={() => handleMenuItemClick(href)}
                        selected={currentLanguage.languageTag === languageTag}
                        role="menuitem"
                    >
                        {label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
