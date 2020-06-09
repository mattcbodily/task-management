select * from projects p
join user_project_join up on p.project_id = up.project_id
where up.user_id = $1;