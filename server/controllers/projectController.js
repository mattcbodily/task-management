module.exports = {
    createProject: (req, res) => {
        const {projectName, projectDescription} = req.body,
              db = req.app.get('db');

        db.projects.create_project({projectName, projectDescription})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    getProjects: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.projects.get_projects(id)
        .then(projects => res.status(200).send(projects))
        .catch(err => res.status(500).send(err));
    }
}