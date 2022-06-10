

CREATE TABLE IF NOT EXISTS user_entity (
    email VARCHAR ( 200 ) UNIQUE NOT NULL,
    password VARCHAR ( 200 ) NOT NULL
);