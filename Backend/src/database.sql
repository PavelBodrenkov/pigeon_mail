
create TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) DEFAULT(null),
    avatar VARCHAR(255),
    color_avatar VARCHAR(100),
    fullname VARCHAR(255),
    password VARCHAR(255) DEFAULT(null),
    is_online SMALLINT DEFAULT(0),
    is_admin SMALLINT DEFAULT(0),
    confirmed DATE DEFAULT(null),
    confirmed_hash VARCHAR(255),
    activation_link VARCHAR(255),
    is_activation INTEGER DEFAULT(0),
    last_seen TIMESTAMP,
    created_at TIMESTAMP DEFAULT(null),
    updated_at TIMESTAMP DEFAULT(null),
    deleted_at TIMESTAMP DEFAULT(null)
)

ALTER TABLE users
ADD COLUMN is_online SMALLINT DEFAULT(0)

-- Диологи
create TABLE conversation (
    id SERIAL PRIMARY KEY,
    first INTEGER NOT NULL,
    second INTEGER NOT NULL,
    last_message_id INTEGER NOT NULL,
    sender INTEGER NOT NULL,
    first_delete SMALLINT NOT NULL,
    second_delete SMALLINT NOT NULL,
    unread INTEGER NOT NULL
)

create TABLE messages (
    id SERIAL PRIMARY KEY,
    conv_id INTEGER NOT NULL,
    sender INTEGER NOT NULL,
    addressee INTEGER NOT NULL,
    readed SMALLINT NOT NULL,
    sender_delete SMALLINT NOT NULL,
    addressee_delete SMALLINT NOT NULL,
    message text,
    date TIMESTAMP
)

create TABLE tokens(
   id SERIAL PRIMARY KEY,
   user_id INTEGER,
   refresh_token VARCHAR(1000),
   created_at TIMESTAMP DEFAULT(null),
   updated_at TIMESTAMP DEFAULT(null),
   deleted_at TIMESTAMP DEFAULT(null),
   FOREIGN KEY (user_id) REFERENCES users (id)
)
------------------------------------------------------------------------------------
-- Таблица со списком групп чата
--     create TABLE chats(
--         id SERIAL PRIMARY KEY,
--         name VARCHAR(255),
--         user_id INTEGER,
--         created_at TIMESTAMP DEFAULT(null),
--         updated_at TIMESTAMP DEFAULT(null),
--         deleted_at TIMESTAMP DEFAULT(null)
--         FOREIGN KEY (user_id) REFERENCES users (id)
--     )
--
-- -- Таблица со списком участников чата
--     create TABLE party(
--         id SERIAL PRIMARY KEY,
--         chat_id INTEGER,
--         user_id INTEGER,
--         created_at TIMESTAMP DEFAULT(null),
--         updated_at TIMESTAMP DEFAULT(null),
--         deleted_at TIMESTAMP DEFAULT(null)
--     )
--
--     create TABLE messages(
--         messages_id SERIAL PRIMARY KEY,
--         chat_id INTEGER,
--         user_id INTEGER,
--         content VARCHAR(1000),
--         created_at TIMESTAMP DEFAULT(null),
--         updated_at TIMESTAMP DEFAULT(null),
--         deleted_at TIMESTAMP DEFAULT(null)
--         FOREIGN KEY (user_id) REFERENCES users (id)
--     )
--
--     create TABLE messages_status(
--         id SERIAL PRIMARY KEY,
--         message_id INTEGER,
--         user_id INTEGER,
--         is_read SMALLINT,
--         created_at TIMESTAMP DEFAULT(null),
--         updated_at TIMESTAMP DEFAULT(null),
--         deleted_at TIMESTAMP DEFAULT(null)
--     )

-------------------------------------------------------------

-- create TABLE dialogs(
--     id SERIAL PRIMARY KEY,
--     owner INTEGER,
--     partner INTEGER,
--     created_at DATE DEFAULT(null),
--     updated_at DATE DEFAULT(null),
--     deleted_at DATE DEFAULT(null),
--     FOREIGN KEY (owner) REFERENCES users (id)
-- )
--
-- create TABLE messages(
--     id SERIAL PRIMARY KEY,
--     owner INTEGER,
--     partner INTEGER,
--     text VARCHAR(255),
--     dialogId INTEGER,
--     unreaded:INTEGER,
--     created_at DATE DEFAULT(null),
--     updated_at DATE DEFAULT(null),
--     deleted_at DATE DEFAULT(null),
--     FOREIGN KEY (dialogId) REFERENCES dialogs (id)
-- )

