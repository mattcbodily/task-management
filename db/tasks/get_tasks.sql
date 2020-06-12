select * from task 
where project_id = $1
and task_progress != 'Done';