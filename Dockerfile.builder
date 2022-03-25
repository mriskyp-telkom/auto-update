# base image is defined here https://gitlab.com/wartek-id/sds/sds/-/tree/main/docker/arkas-builder-base
FROM asia.gcr.io/belajar-id-networks/sds/arkas-builder-base:2d7d5d233ff3701b995449f739f08c52bc4e71f8
WORKDIR /arkas_release

COPY . /arkas_release/

RUN export GITLAB_AUTH_TOKEN=UCQKEftDUDBxCwshfJCn &&\
    node -v && npm install -g npm@8.1.2 && npm -v &&\
    mv ./.env.staging ./.env && rm ./.env.production &&\
    npm install yarn --legacy-peer-deps &&\
    yarn install &&\
    yarn make-win32 && rm -rf out/Arkas-win32-x64 &&\
    yarn make && rm -rf out/Arkas-linux-x64
    
RUN echo "==> total size: $(du -sh .)" &&\
    apt install -y tree && tree out