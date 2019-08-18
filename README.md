# oRmember

The idea was to create a handy Application running on Local Area Network to securly access your trading info's from everywhere.
The inspiration came from the infamous ToDo's App. In fact, this is my very first Javascript / React / NodeJS project, so don't knock me too hard for the code.

![ormember-img1](https://i.ibb.co/W0JNM1m/Screen-Shot-2019-08-18-at-5-03-05-PM.png)
![ormember-img2](https://i.ibb.co/vcr7Dhp/Screen-Shot-2019-08-18-at-4-15-25-PM.png)

## Features

- Track down your Orders/Setups with ease
- Attach Charts on your Orders
- Mark Order as filled (yay)
- Delete Orders
- Delete Logos

## Packages

- React
- NodeJS
- MySQL
- React-Bootstrap
- React-Semantic-UI
- React-Bootstrap-Table2
- React-Grid-Gallery

## Installation

### Clone Repo

```bash
# clone the repo
$ git clone https://github.com/kinothUI/ormember.git ormember
```

### Install dependencies

```bash
# install back-end dependencies
$ cd oRmember
$ npm install

# install front-end dependencies
$ cd client
$ npm install
```

### Install MySQL Server & create Database or use your existing MySQL Server

```bash
# i.e. on Linux Systems
$ sudo apt install mysql-server
```

```mysql
# Create database 'ormember'
$ CREATE SCHEMA `ormember` DEFAULT CHARACTER SET utf8;
# Create two tables
$ CREATE TABLE `ormember`.`orders` (
  `uuid` VARCHAR(65) NULL,
  `xchange` VARCHAR(255) NULL,
  `ticker` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `lmt` VARCHAR(45) NULL,
  `volume` VARCHAR(45) NULL,
  `comment` TEXT(10000) NULL,
  `date` VARCHAR(45) NULL,
  `filled` TINYINT NULL);

$ CREATE TABLE `ormember`.`logo` (
  `uuid` VARCHAR(65) NULL,
  `src` VARCHAR(45) NULL,
  `thumbnail` VARCHAR(45) NULL,
  `thumbnailHeight` INT NULL,
  `thumbnailWidth` INT NULL);
```

### Configure MySQL connection

open file: **./mysql/config.js**

```javascript
const settings = {
  host: "your_database_host",
  user: "your_database_user",
  password: "users_password",
  database: "ormember"
};
```

### Basic usage

```bash
$ npm run react
```

Navigate to [http://localhost:3000](http://localhost:3000).
