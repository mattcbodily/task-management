create table if not exists users (
    user_id serial primary key,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(250),
    password varchar(250)
);