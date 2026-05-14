CREATE TABLE IF NOT EXISTS users(
    id              UUID            PRIMARY KEY,
    first_name      VARCHAR(50)     NOT NULL,
    last_name       VARCHAR(50)     NOT NULL,
    email           VARCHAR(100)    NOT NULL       UNIQUE,
    password        VARCHAR(100)    NOT NULL
);

--create types
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN 
            CREATE TYPE transaction_type AS ENUM ('EARNING', 'EXPENSE', 'INVESTMENT');
    END IF;
END$$;

CREATE TYPE transaction_type AS ENUM ('EARNING', 'EXPENSE', 'INVESTMENT');

CREATE TABLE IF NOT EXISTS transactions(
    id              UUID            PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(100)    NOT NULL,
    date            date            NOT NULL,
    ammount         NUMERIC(10,2)   NOT NULL,
    type transaction_type NOT NULL
)
