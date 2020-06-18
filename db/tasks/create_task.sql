insert into task (
    task_name,
    task_progress,
    user_id,
    project_id,
    complete_by
) values (
    ${taskName},
    ${taskProgress},
    ${id},
    ${projectId},
    ${completeBy}
);