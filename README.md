# coding-challenge

The app is built on top of Node and Express.js. These options were chosen based on the relatively simple business logic
and application requirements. It is better to consider more specialized frameworks (like Spring) for long term support
and evolution.

## Table of Contents

1. [Installation](#installation)
    1. [Docker based](#docker-based)
        1. [Prebuild image](#prebuild-image)
        2. [Build image from sources](#build-image-from-sources)
    2. [Local environment based](#local-environment-based)
2. [Usage](#usage)

## Installation

Several installation options are available.

### Docker based

This method requires docker installation. Steps depending on underlying OS, but usually it just an app download and
installation. Follow the installation steps from [official docker](https://docs.docker.com/get-docker) website. Further
steps assumes docker is installed, running and available at terminal.

This method requires docker installation. Exact steps vary depending on the underlying OS, but it's usually just
downloading of the app and installing it. Follow the installation instructions from
the [official docker](https://docs.docker.com/get-docker) website (https://docs.docker.com/get-docker). The Next Steps
assume docker is installed, running and available on the terminal.

Now two options are available: using [prebuild image](#prebuild-image)
or [build image form sources](#build-image-from-sources)

#### Prebuild image

This is the easiest way to launch the application. Run the application with the following command in the terminal

```
docker run --rm -p 3000:3000 zim182/code-challenge:latest
```

In the above example, the application is running on the local port `3000`. If it is already in use, then the first
number after the `-p` parameter can be updated to customize it. E. g. run application on local port `8080`

```
docker run --rm -p 8080:3000 zim182/code-challenge:latest
```

#### Build image from sources

1. Get the repository with application code. If `git` is installed and available in terminal repository can be pulled
   with following command

```
git clone https://github.com/Invictum/coding-challenge.git`
```

Alternatively source code can be
downloaded [directly](https://github.com/Invictum/coding-challenge/archive/refs/heads/main.zip) from github. After
download `main.zip` archive should be unziped with any default tool available in OS.

2. Open the terminal in the directory with source code.
3. Build the docker image with application using following terminal command

```
docker build . -t code-challange
```

4. Then run the application with

```
docker run --rm -p 3000:3000 code-challange
```

Local port can be updated the same way as described in [prebuild image](#prebuild-image) section of this manual

### Local environment based

This option requires Node.js local installation. Steps also depend on OS, download installation package
form [official site](https://nodejs.org/en/download/) and follow installation steps.

1. Get the repository with application code. If `git` is installed and available in terminal repository can be pulled
   with following command

```
git clone https://github.com/Invictum/coding-challenge.git`
```

Alternatively source code can be
downloaded [directly](https://github.com/Invictum/coding-challenge/archive/refs/heads/main.zip) from github. After
download `main.zip` archive should be unziped with any default tool available in OS.

2. Open the terminal in the directory with source code.
3. Install all dependencies required for the app via command in terminal.

```
npm ci
```

4. Run the application

```
node app.js
```

If default local port `3000` is already it can be redefined by passing port number as parameter. E. g. run application
on local port `8080`

```
node app.js 8080
```

If all works as expected you should see `Listening at http://localhost:[PORT]` log entry in the console.

## Usage

Application provides 3 routes in accordance to the exercise requirements

```
GET http://localhost:3000/points/balance
POST http://localhost:3000/points/spend
POST http://localhost:3000/transactions
```

For convenience swagger-ui is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs). It provides
easy way to explore application and allows to play with its API.

> **Notice**
>
> If non default port was used don't forget to update mentioned URLs.