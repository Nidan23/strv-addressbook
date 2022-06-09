

CREATE TABLE IF NOT EXISTS user_model (
    email VARCHAR ( 200 ) UNIQUE NOT NULL,
    password VARCHAR ( 200 ) NOT NULL
);