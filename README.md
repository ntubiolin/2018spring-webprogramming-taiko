# 太鼓達人
## Table of Contents

- [Installation](#installation)
  - [Imstall node modules](#imstall-node-modules)
  - [Database](#database)
  - [Use API server in localhost:5000](#use-API-server-in-localhost:5000)
- [Architecture](#architecture)
  - [Frontend](#frondend)
  - [Backend](#backend)
- [Contributors](#contributors)

## Installation
### Imstall node modules
``` bash
npm insatll
cd login-app/
npm install
```
### Database
1. Make sure you have mongoDB installed first.
2. Modify the database path in `startDB.sh`.
3. Run the following command to start the database.
``` bash
sudo bash startDB.sh
```

### Use API server in localhost:5000
1. uncomment the line
``` javascript
//apiServerURL = 'http://localhost:5000';
``` 
in 3 files: 
- login-app/src/Login.js
- login-app/src/Taiko.js 
- login-app/src/Carosel.js
## Architecture

### Frontend
### Backend

## Contributors
林哲賢
林與晟
蘇懷安
