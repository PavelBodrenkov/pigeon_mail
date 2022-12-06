
create TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) DEFAULT(null),
    avatar VARCHAR(255),
    fullname VARCHAR(255),
    password VARCHAR(255) DEFAULT(null),
    is_admin INTEGER DEFAULT(0),
    confirmed DATE DEFAULT(null),
    confirmed_hash VARCHAR(255),
    activation_link VARCHAR(255),
    is_activation INTEGER DEFAULT(0),
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

create TABLE messages(
    id SERIAL PRIMARY KEY,
    owner INTEGER,
    partner INTEGER,
    text VARCHAR(255),
    dialogId INTEGER,
    unreaded:INTEGER,
    created_at DATE DEFAULT(null),
    updated_at DATE DEFAULT(null),
    deleted_at DATE DEFAULT(null),
    FOREIGN KEY (dialogId) REFERENCES dialogs (id)
)

create TABLE tokens(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    refresh_token VARCHAR(1000),
    created_at DATE DEFAULT(null),
    updated_at DATE DEFAULT(null),
    deleted_at DATE DEFAULT(null),
    FOREIGN KEY (user_id) REFERENCES users (id)
)