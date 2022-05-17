CREATE TABLE users
(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  UNIQUE(email)
);

/**OR **/
--set  extension
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users
(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  UNIQUE(email)
);