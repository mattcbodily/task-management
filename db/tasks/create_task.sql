insert into task (
    task_name,
    task_progress,
    user_id,
    project_id
) values (
    ${taskName},
    ${taskProgress},
    ${id},
    ${projectId}
);