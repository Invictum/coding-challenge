# coding-challenge

The app is built on top of Node and Express.js. This technology stack was chosen based on the relatively simple business
logic and application requirements. It is better to consider more specialized frameworks (like Spring) for long term
support and evolution.

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

This method assumes the Docker application is installed, running and available at console. Steps to set up the Docker
application depend on underlying OS, but usually it is just an app download and installation. Follow the installation
steps from [official docker](https://docs.docker.com/get-docker) website.

With Docker, you have two options: use [prebuild image](#prebuild-image) (the fastest way to start)
or [build image form sources](#build-image-from-sources)

#### Prebuild image

Run the application with the following command in the Command Line / Terminal

```
docker run --rm -p 3000:3000 zim182/code-challenge:latest
```

Now the application is running on the local port `3000`. If you get the error that it is already in use, just update the
first number after the `-p` parameter with any other port, for example, try to run the application on the local
port `8080`

```
docker run --rm -p 8080:3000 zim182/code-challenge:latest
```

#### Build image from sources

1. Clone the repository with application code. If `git` is installed and available in terminal repository can be pulled
   with following command

```
git clone https://github.com/Invictum/coding-challenge.git`
```

Alternatively source code can be
downloaded [directly](https://github.com/Invictum/coding-challenge/archive/refs/heads/main.zip) from github. After
download `main.zip` archive should be unziped with any default tool available in OS. You can read more about
GIT [here](https://git-scm.com)

2. In Terminal navigate to the directory with source code.

```
cd coding-challenge/
```

4. Build the docker image with application

```
docker build . -t code-challange
```

4. Run the application

```
docker run --rm -p 3000:3000 code-challange
```

Local port can be updated in the same way as described in [prebuild image](#prebuild-image) section of this manual

### Local environment based

If you have Node.js installed locally or prefer to install it, you can use this approach. Exact steps depend on OS as
well, so just download the installation package from the [official site](https://nodejs.org/en/download/) and follow
installation steps.

1. Clone the repository with application code. If `git` is installed and available in terminal repository can be pulled
   with following command

```
git clone https://github.com/Invictum/coding-challenge.git`
```

Alternatively source code can be
downloaded [directly](https://github.com/Invictum/coding-challenge/archive/refs/heads/main.zip) from github. After
download `main.zip` archive should be unziped with any default tool available in OS. You can read more about
GIT [here](https://git-scm.com)

2. In Terminal navigate to the directory with source code.

```
cd coding-challenge/
```

4. Install all dependencies required for the app

```
npm ci
```

4. Run the application

```
node app.js
```

If default local port `3000` is already in use, it can be redefined by passing port number as parameter. E. g. try
running the application on local port `8080`

```
node app.js 8080
```

If the application is started, you should see `Listening at http://localhost:[PORT]` log entry in the console.

## Usage

Application provides 3 routes in accordance to the exercise requirements

```
GET http://localhost:3000/points
POST http://localhost:3000/points/spend
POST http://localhost:3000/transactions
```

For convenience swagger-ui is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs). It provides
easy way to explore application and allows playing with its API.

> **Notice**
>
> If non default port was used, the same port should be used in Swagger URL.