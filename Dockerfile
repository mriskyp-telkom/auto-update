FROM local/arkas-builder-base
WORKDIR /app
COPY . .

RUN export GITLAB_AUTH_TOKEN=UCQKEftDUDBxCwshfJCn &&\ 
    mv ./.env.staging ./.env && rm ./.env.production &&\
    npm install yarn &&\
    yarn install &&\
    yarn make-win32 &&\ 
    yarn make

RUN apt install -y tree &&\
    tree out/make/


# FROM sickcodes/docker-osx
# WORKDIR /
# COPY . .
# RUN /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)" &&\
#     echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/arch/.profile &&\
#     eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" &&\
#     brew install homebrew/cask-versions/wine-devel &&\
#     brew install mono &&\
#     brew install dpkg &&\
#     brew install fakeroot