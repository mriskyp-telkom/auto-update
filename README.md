# ARKAS DESKTOP
electron desktop app

- Initiate this app using boilerplate from electron-forge (template: typescript-webpack) https://www.electronforge.io/templates/typescript-+-webpack-template

### Platform
- [x] electron webpack typsecript project
- [x] react + wartek's component-library + tailwind + clsx
- [x] basic build
- [ ] local sqlite connection
- [ ] installation build & script which includes sqlite3 db creation (if not exists)
- [ ] local db migration (for table structure and/or initial data)
- [ ] version auto update mechanism

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

add environment variable GITLAB_AUTH_TOKEN, with the value of your gitlab personal access token. if you don't have it yet, follow [this](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) to create one. alternatively, always run the commands with that variable. e.g: `$ GITLAB_AUTH_TOKEN=<your_token> yarn install`.

### Run/Build

1. Clone repository
```bash
git clone https://gitlab.com/wartek-id/sds/arkas-desktop.git && arkas-desktop
```

2. Add [gitlab auth token](https://wartek.atlassian.net/wiki/spaces/ENG/pages/1684734334/How+To+Setup+GITLAB+AUTH+TOKEN) to your env.

```bash
export GITLAB_AUTH_TOKEN=YOUR_TOKEN
```

3. Install all dependenies
```bash
yarn install
```

4. Run app
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

