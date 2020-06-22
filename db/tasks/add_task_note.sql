insert into task_note (
    task_id,
    note,
    note_date
) values (
    ${id},
    ${noteInput},
    ${noteDate}
)
returning note, note_date;