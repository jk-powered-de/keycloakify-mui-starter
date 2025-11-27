<p align="center">
    <i>🚀 <a href="https://keycloakify.dev">Keycloakify</a> v11 – MUI Starter 🚀</i>
    <br/>
    <br/>
</p>

# keycloakify-mui-starter

This repository is the MUI (Material UI) based starter for Keycloakify v11. It is built with React + MUI and provides a clean foundation for creating custom Keycloak login themes.

Below you’ll find how to run it locally, customize styles (global and per page), build distributable Keycloak theme JARs, and initialize optional Account/Email themes.

## Quick start

```bash
git clone https://github.com/jk-powered-de/keycloakify-mui-starter
cd keycloakify-mui-starter
yarn install # Or use another package manager; if you switch, please remove yarn.lock first.
```

## Test the theme locally

Documentation: https://docs.keycloakify.dev/testing-your-theme

## Customize the theme (overview)

This starter is based on MUI (React) and uses both MUI components and classic per‑page CSS files.

- Global styles: `src/login/main.css`
  - Quickly tweak global look & feel:
    - CSS variables (colors, spacing, sizes): for example `--kc-primary`, `--kc-max-card-width`, `--kc-header-background`, `--kc-page-title-color`, `--kc-box-background`, etc.
    - Fonts: define your own `@font-face` and default font family.
    - Base layout: header, card, form layouts, buttons, lists, links, inputs, error/info areas, etc.
    - Loading/Progress: styling hooks are in CSS; the display is controlled in `Template.tsx`.
  - Benefit: change it once — applies to the whole login theme.

- Page-/element‑specific styles: under `src/login/pages` you’ll find a dedicated `.css` file for (almost) every page, for example:
  - `Login.css`, `Register.css`, `Error.css`, `Code.css`, `DeleteAccountConfirm.css`, `Info.css`, `Terms.css`, `UpdateEmail.css`, and more.
  - Each file is imported by its corresponding React component (e.g. `import "./Login.css";`).
  - This lets you fine‑tune a single page/use‑case without affecting global styles.

- Template / overall layout (MUI‑based): `src/login/Template.tsx`
  - Contains the shared page layout including the header, messages (`<Alert>` from MUI), locale switch, etc.
  - Logo/branding: by default the realm title is shown in the header. You can replace it with a logo like this:

    ```tsx
    // in Template.tsx inside #kc-header-wrapper
    <img src={"/path/to/logo.svg"} alt="Your brand" style={{ height: 40 }} />
    ```

  - MUI components (e.g. `Alert`, `LinearProgress`) are already wired up. Adjust look & feel via MUI props/SX or CSS classes.

More general guidance: https://docs.keycloakify.dev/customization-strategies

## Build the Keycloak theme

You need [Maven](https://maven.apache.org/) (>= 3.1.1) and Java (>= 7). The `mvn` command must be available in your `$PATH`.

-   On macOS: `brew install maven`
-   On Debian/Ubuntu: `sudo apt-get install maven`
-   On Windows: `choco install openjdk` and `choco install maven` (Or download from [here](https://maven.apache.org/download.cgi))

```bash
npm run build-keycloak-theme
```

Note that by default Keycloakify generates multiple .jar files for different versions of Keycloak.  
You can customize this behavior, see documentation [here](https://docs.keycloakify.dev/features/compiler-options/keycloakversiontargets).

# Initializing the account theme

```bash
npx keycloakify initialize-account-theme
```

# Initializing the email theme

```bash
npx keycloakify initialize-email-theme
```

# Not everything is supported... yet!
- Individual fields styling (e.g. input, select, textarea) is not supported out of the box. You can still customize them via global CSS in `main.css`.

## Credits / Contribution

- MUI design authored/contributed by https://jk-powered.de (jk-powered.de).
- Built with: https://keycloakify.dev
