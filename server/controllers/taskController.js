module.exports = {
    getTasks: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.tasks.get_tasks(id)
        .then(tasks => res.status(200).send(tasks))
        .catch(err => res.status(500).send(err));
    },
    createTask: (req, res) => {
        const {taskName, id} = req.body,
              db = req.app.get('db');

        db.tasks.create_task({taskName, id})
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err));
    }
}