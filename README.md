# oRmember

![ormember-img1](https://i.ibb.co/W0JNM1m/Screen-Shot-2019-08-18-at-5-03-05-PM.png)
![ormember-img2](https://i.ibb.co/vcr7Dhp/Screen-Shot-2019-08-18-at-4-15-25-PM.png)

## Packages

- React
- Redux
- Redux-Saga
- React-Semantic-UI
- React-Bootstrap-Table2
- React-Grid-Gallery
- NodeJS

## Installation

### Clone Repo

```bash
# clone the repo
$ git clone https://github.com/kinothUI/ormember.git ormember
```

### Install dependencies

```bash
# install api dependencies
$ cd oRmember
$ npm install

# install frontend dependencies
$ cd client
$ npm install
```

### Install MySQL Server & create Database or use your existing MySQL Server

```bash
# i.e. on Debian Systems
$ sudo apt install mysql-server
$ mysql -u root -p < schema.sql
```

### Configure MySQL connection

open file: **./mysql/config.js**

```javascript
const settings = {
  host: "your_database_host",
  user: "your_database_user",
  password: "users_password",
  database: "ormember",
};
```

### Basic usage

#### start api & ui in development mode

```bash
$ npm run server
$ cd client
$ npm run start
```

Navigate to [http://localhost:3000](http://localhost:3000).

custom font created with [fontello.com](http://fontello.com)
