const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {firstName, lastName, email, password} = req.body,
              db = req.app.get('db');

        let foundUser = await db.auth.check_user(email);
        if(foundUser[0]){
            return res.status(400).send('Email already in use')
        }

        const salt = bcrypt.genSaltSync(10),
              hash = bcrypt.hashSync(salt, password);

        let newUser = await db.auth.register_user({firstName, lastName, email, hash});
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: (req, res) => {
        const {email, password} = req.body,
              db = req.app.get('db');

        let foundUser = await db.auth.check_user(email);
        if(!foundUser){
            res.status(400).send('User not found')
        }

        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if(!authenticated){
            return res.status(401).send('Password incorrect');
        }

        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}