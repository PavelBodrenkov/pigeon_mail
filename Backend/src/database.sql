
create TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) DEFAULT(null),
    avatar VARCHAR(255),
    fullname VARCHAR(255),
    password VARCHAR(255) DEFAULT(null),
    is_admin INTEGER DEFAULT(0),
    confirmed DATE DEFAULT(null),
    confirmed_hash VARCHAR(255),
    last_seen DATE,
    created_at DATE DEFAULT(null),
    updated_at DATE DEFAULT(null),
    deleted_at DATE DEFAULT(null)
)

create TABLE dialogs(
    id SERIAL PRIMARY KEY,
    owner INTEGER,
    partner INTEGER,
    created_at DATE DEFAULT(null),
    updated_at DATE DEFAULT(null),
    deleted_at DATE DEFAULT(null),
    FOREIGN KEY (owner) REFERENCES users (id)
)