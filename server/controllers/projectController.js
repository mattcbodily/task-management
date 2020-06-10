module.exports = {
    createProject: async(req, res) => {
        const {id} = req.params,
              {projectName, projectDescription} = req.body,
              db = req.app.get('db');

        let project = await db.projects.create_project({projectName, projectDescription}),
            {project_id} = project[0];

        db.projects.user_project_join({id, project_id})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    getProjects: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.projects.get_projects(+id)
        .then(projects => res.status(200).send(projects))
        .catch(err => res.status(500).send(err));
    }
}