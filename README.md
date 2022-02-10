# ARKAS DESKTOP

electron desktop app

- Initiate this app using boilerplate from electron-forge (template: typescript-webpack) https://www.electronforge.io/templates/typescript-+-webpack-template

### Platform

- [x] electron webpack typsecript project
- [x] react + wartek's component-library + tailwind + clsx
- [x] eslint + prettier + pre-commit (husky)
- [x] basic build
- [x] local sqlite connection
- [x] installation build & script which includes sqlite3 db creation (if not exists)
- [ ] local db migration (for table structure and/or initial data)
- [ ] version auto update mechanism
- [ ] unit test

### Features

- [ ] Login
- [ ] Registrasi
- [ ] Aktivasi Kertas Kerja
- [ ] Pengisian Kertas Kerja
- [ ] Pengajuan Pengesahan Kertas Kerja
- [ ] Cek Status Pengesahan Kertas Kerja
- [ ] Pengisian dan Sync BKU
- [ ] Perubahan Kertas Kerja
- [ ] Pergeseran Kertas Kerja

## Setup

### Required

- yarn
- nodejs
- sqlite3

### Run/Build

1. Clone repository

```bash
git clone https://gitlab.com/wartek-id/sds/arkas-desktop.git && cd arkas-desktop
```

2. Add [gitlab auth token](https://wartek.atlassian.net/wiki/spaces/ENG/pages/1684734334/How+To+Setup+GITLAB+AUTH+TOKEN) to your env.

```bash
export GITLAB_AUTH_TOKEN=YOUR_TOKEN
```

3. Install all dependenies

```bash
yarn install
```

4. Preparation

```bash
yarn postinstall
```

5. Run app

```bash
yarn start
```

## Generate Installer

It will generate installer based on your OS,
If you run this command below using Windows, it will generate .exe
If you run this command below using Mac, it will generate .dmg

```bash
yarn make
```

## Release Pipeline

Make sure the changes are merged to `main` branch and **tagged with the expected version**. Staging build and release will happen automatically, production is to be triggered manually from pipeline.

- staging releases: https://console.cloud.google.com/storage/browser/arkas_releases_staging;tab=objects?project=arkas-staging
- production releases: https://console.cloud.google.com/storage/browser/arkas_releases_production;tab=objects?project=arkas-production
