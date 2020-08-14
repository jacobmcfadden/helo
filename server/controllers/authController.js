const bcrypt = require('bcrypt');

module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        const user = await db.check_user(username);
        if(!user[0]){
            return res.status(401).send('Incorrect credentials');
        } else {
           const authenticated = bcrypt.compareSync(password, user[0].password);
           if(authenticated){
               req.session.user = {
                   id: user[0].id,
                   username: user[0].username,
                   profile_pic: user[0].profile_pic
               }
               res.status(200).send(req.session.user)
           } else {
               res.status(403).send('Email or password incorrect')
           }
        }
    },
    register: async (req, res) => {
        console.log(req);
        const db = req.app.get('db');
        const {username, password} = req.body;
        const user = await db.check_user(username);
        if(user[0]){
            return res.status(409).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.create_user([username, hash])
        req.session.user = {
            id: newUser.id,
            username: newUser.username,
            profile_pic: newUser.profile_pic
        }
        res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }
}