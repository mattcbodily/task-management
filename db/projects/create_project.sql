insert into project (
    project_name,
    project_description
) values (
    ${projectName},
    ${projectDescription}
)
returning project_id;