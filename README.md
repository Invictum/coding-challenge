# coding-challenge

## Installation

### Convenient docker based
1. Install docker. Steps depending on underlying OS, but usually it just an app download and installation.
Follow the installation steps from [official docker](https://docs.docker.com/get-docker) website. Further steps assumes
docker is installed, running and available at terminal.
2. Get the repository with application code.
If `git` is installed and available in terminal repository can be pulled with following command
```
git clone https://github.com/Invictum/coding-challenge.git` command in the terminal
```
Alternatively source code can be downloaded [directly](https://github.com/Invictum/coding-challenge/archive/refs/heads/main.zip) from github.
After download `main.zip` archive should be unziped with any default tool available in OS.
3. Open the terminal in the directory with source code.
4. Build the docker image with application following command
```
docker build . -t code-challange
```
5. Run application with
```
docker run --rm -p 3000:3000 code-challange
```
If `3000` port is already used any other port can be used, just update the command. E. g. run app on port `8080`
```
docker run --rm -p 8080:3000 code-challange
```

### Classic node.js based
1. Install Node.js. Steps also depend on OS, just download installation package form [official site](https://nodejs.org/en/download/)
and follow installation steps.
2. Get the repository with application code.
   If `git` is installed and available in terminal repository can be pulled with following command
```
git clone https://github.com/Invictum/coding-challenge.git` command in the terminal
```
Alternatively source code can be downloaded [directly](https://github.com/Invictum/coding-challenge/archive/refs/heads/main.zip) from github.
After download `main.zip` archive should be unziped with any default tool available in OS.
3. Open the terminal in the directory with source code.
4. Install all dependencies required for the app via command in terminal
```
npm ci
```
5. Run the application
```
node app.js
```
If all worked as expected you should see `Listening at http://localhost:3000` log entry in the console

## Usage

Application provides 3 routes in accordance to the task
```
GET http://localhost:3000/points/balance
POST http://localhost:3000/points/spend
POST http://localhost:3000/transactions
```
For convenience swagger-ui is available at (http://localhost:3000/api-docs/). It provides a convenient way to explore
application and allows to play with its API.