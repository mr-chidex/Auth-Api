## Auth API

An auth api for users - Testing postgres

## Built With

- Node.js
- Postgres
- Express
- Git
- Json Web Token
- Postman
- Heroku

## Clone this project

```
git clone https://github.com/mr-chidex/Auth-Api.git
```

## Configure app

- Create a file named `.env` in the project root directory
- Add the environment variables as described in `dev.env` file
- Create a database
- Create database table using format in `models/schema.sql`

## Install dependencies

```
 yarn install
```

### Running this project locally

```
 yarn dev
```

### Running in production

Remember to set for ssl confguration n the HEROKU CLI

```
heroku config:set PGSSLMODE=no-verify
```

## Show your support

Give a ⭐️ if you like this project!

## Copyright

Copyright (c) mr-chidex
