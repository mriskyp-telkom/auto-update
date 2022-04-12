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
- [x] unit test

### Features

- [x] Login
- [x] Registrasi
- [x] Logout
- [ ] Aktivasi Kertas Kerja
- [ ] Pengisian Kertas Kerja
- [ ] Pengajuan Pengesahan Kertas Kerja
- [ ] Cek Status Pengesahan Kertas Kerja
- [ ] Pengisian dan Sync BKU
- [ ] Perubahan Kertas Kerja
- [ ] Pergeseran Kertas Kerja

## Setup

### Prerequisite

#### MAC OS

- nodejs v16.6.1 (recommendation)

#### Windows

- nodejs v16.13.1 (recommendation)

### Required

- yarn
- sqlite3

### Install prerequisite

1. Install the latest LTS version of node `v16+` with <a href="https://github.com/nvm-sh/nvm">nvm</a> to make it easier to manage multiple node version.

1. Install yarn with

```bash
npm install -g yarn
```

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

### Test

6. Run test

```bash
    yarn test
```

Due yarn test will spawn a child process, we need to limit maxWorker that running the test async

```bash
    yarn test --maxWorkers 2
```

If you want to run test in specific file do

```bash
yarn test <filename>
```

If you facing error better-sqlite3 due to different Node.js version, run your test using this command below :

```bash
ELECTRON_RUN_AS_NODE=true ./node_modules/.bin/electron ./node_modules/jest-cli/bin/jest.js
```

source : https://github.com/JoshuaWise/better-sqlite3/issues/545

7. Using make file

```bash
make yarn-test
```

8. Using Instance
   locate your path jest, locate the path of test file, and add the instance

```bash
 node '/Users/user/kodingan/arkas-desktop/node_modules/.bin/jest' '/Users/user/kodingan/arkas-desktop/tests/main/repositories/InstansiPengguna.test.ts' -t 'AddInstansiPengguna'
```

### Code Coverage

8. Using make file

Support Mac, Linux
For Windows, use Powershell or any

```bash
make code-coverage
```

### Clean Yarn

Init first for initial

```bash
make yarn-init
```

After that, run this

```bash
make yarn-clean
```

## Shortcut Open Dev Tools

### MAC OS

```bash
Shift+Command+I
```

### Windows

```bash
Shift+Control+I
```

## Generate Installer

It will generate installer based on your OS,
If you run this command below using Windows, it will generate .exe

```bash
    yarn make-win32
```

If you run this command below using Mac, it will generate .dmg

```bash
    yarn make
```

If you want to make installer using mac, but the target type for Windows, install wine first before executing `yarn make-win32`

```bash
     brew install --cask wine-stable
```

or you can download Wine pkg from the official site

After that, if somehow you still not able to install due some tools not installed yet

```bash
    install XQuartz-2.7.7.dmg from the official site
```

Install it and then try again

## Seed data

Currently: Please use seed data based on the kemdikbud data in order to mirror the sync data and make sure that every unit test success

If somehow you need to create a mock, please set comment that explained why should be differ from kemdikbud db dev

## Release Pipeline

Make sure the changes are merged to `main` branch and **tagged with the expected version**. Staging build and release will happen automatically, production is to be triggered manually from pipeline.

- staging releases: https://console.cloud.google.com/storage/browser/arkas_releases_staging;tab=objects?project=arkas-staging
- production releases: https://console.cloud.google.com/storage/browser/arkas_releases_production;tab=objects?project=arkas-production

### Build Check

to try out build, you can use the Dockerfile.builder to simulate the build that is to be executed by the runner.
`docker build --progress=plain -t arkas-builder . -f Dockerfile.builder`
commands under RUN command in Dockerfile.builder is the ones that is used as scripts in ci-pipeline.
