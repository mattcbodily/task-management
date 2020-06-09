create table if not exists users (
    user_id serial primary key,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(250),
    password varchar(250)
);

create table if not exists project (
    project_id serial primary key,
    project_name varchar(30) not null,
    project_description text
);

create table if not exists user_project_join (
    join_id serial primary key,
    user_id int references users(user_id),
    project_id int references project(project_id)
);