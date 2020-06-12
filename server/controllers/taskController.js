module.exports = {
    getTasks: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.tasks.get_tasks(+id)
        .then(tasks => res.status(200).send(tasks))
        .catch(err => res.status(500).send(err));
    },
    createTask: (req, res) => {
        const {id} = req.params,
              {taskName, taskProgress} = req.body,
              db = req.app.get('db');

        db.tasks.create_task({taskName, taskProgress, id: +id})
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err));
    },
    updateTaskProgress: (req, res) => {
        const {id} = req.params,
              {taskProgress} = req.body,
              db = req.app.get('db');

        db.tasks.update_task_progress({taskProgress, id})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    completeTask: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.tasks.complete_task({id})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
}