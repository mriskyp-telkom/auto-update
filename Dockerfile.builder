# base image is defined here https://gitlab.com/wartek-id/sds/sds/-/tree/main/docker/arkas-builder-base
FROM asia.gcr.io/belajar-id-networks/sds/arkas-builder-base:aa457e041ed32e3cf46bb1aaa4e4e077fee8744b
WORKDIR /arkas_release

COPY . /arkas_release/

RUN export GITLAB_AUTH_TOKEN=UCQKEftDUDBxCwshfJCn &&\
    node -v &&\
    mv ./.env.staging ./.env && rm ./.env.production &&\
    npm install yarn &&\
    yarn install &&\
    yarn package-win32 && rm -rf out/Arkas-win32-x64 &&\
    yarn package && rm -rf out/Arkas-linux-x64
    
RUN echo "==> total size: $(du -sh .)" &&\
    apt install -y tree && tree out