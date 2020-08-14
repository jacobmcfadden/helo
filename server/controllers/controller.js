module.exports = {
    
    createPost: async (req, res) => {
        const db = req.app.get('db');
        const {title, img, content, author_id} = req.body;

        const [post] = await db.create_post([title, img, content, author_id]);
        if(post[0]){
            return res.status(409).send('Internal server error, post could not be created')
        } 
        res.status(200).send(post[0])
    },
    getPosts: async (req, res) => {
        const db = req.app.get('db');
        const [posts] = await db.get_posts();
        return res.status(200).send([posts])
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;

        const [post] = await db.delete_post([id]);
        res.status(200).send('Delete successful');
    }
}