insert into task_note (
    task_id,
    note
) values (
    ${id},
    ${noteInput}
)
returning note;