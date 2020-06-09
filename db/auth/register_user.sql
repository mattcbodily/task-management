insert into users (
    first_name,
    last_name,
    email,
    password
) values (
    ${firstName},
    ${lastName},
    ${email},
    ${hash}
)
returning user_id, first_name, last_name, email;