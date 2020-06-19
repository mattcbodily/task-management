module.exports = {
    getTasks: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.tasks.get_tasks(+id)
        .then(tasks => res.status(200).send(tasks))
        .catch(err => res.status(500).send(err));
    },
    getTaskNotes: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.tasks.get_task_notes({id})
        .then(notes => res.status(200).send(notes))
        .catch(err => res.status(500).send(err));
    },
    createTask: (req, res) => {
        const {id} = req.params,
              {taskName, taskProgress, projectId, completeBy} = req.body,
              db = req.app.get('db');

        db.tasks.create_task({taskName, taskProgress, id: +id, projectId, completeBy})
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err));
    },
    addTaskNote: (req, res) => {
        const {id} = req.params,
              {noteInput} = req.body,
              db = req.app.get('db');

        db.tasks.add_task_note({id, noteInput})
        .then(note => res.status(200).send(note))
        .catch(err => res.status(500).send(err));
    },
    updateDate: (req, res) => {
        const {id} = req.params,
              {completeBy} = req.body,
              db = req.app.get('db');

        db.tasks.update_date({completeBy, id})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
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