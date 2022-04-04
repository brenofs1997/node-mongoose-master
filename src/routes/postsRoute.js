import PostsModel from '../models/posts'

const postsRoute =(app) => {

    app.route('/posts/:id?')
        .get(async(req,res) =>{
            const {id} = req.params
            const query = {};

            if(id){
                query._id=id
            }

            try {
                const posts = await PostsModel.find(query)
                res.send({ posts })
            } catch (error) {
                res.status(400).send({error:'Falhou em encontrar'})
            }
         }   
    )
    .post(async(req,res) =>{
        try {
            const posts = new PostsModel(req.body)
            await PostsModel.save()
            res.status(201).send('OK')
        } catch (error) {
            res.send({error:'Falhou em inserir'})
        }
    })
    .put(async(req,res) =>{
        const { id } = req.params

        if (!id) {
            return res.status(400).send({ error: 'Post ID is missing.' })
        }

        try {
            const updatedPosts = await PostsModel.findOneAndUpdate({ _id: id }, req.body, {
                new: true,
            });

            console.log(updatedPosts)

            if (updatedPosts) {
                return res.status(200).send('OK')
            }


            res.status(400).send({ error: 'Could not update the user' })

            
        } catch (error) {
            res.send(error)
        }
    })
    .delete(async(req,res)=>{
        const { id } = req.params

        if (!id) {
            return res.status(400).send({ error: 'Post ID is missing.' })
        }

        try {
            const deletedPost = await PostsModel.deleteOne({ _id: id })

            if (deletedPost.deletedCount) {
                return res.send('OK')
            }

            res.status(400).send({ error: 'Could not delete the user' })

        } catch (error) {
            res.send(error)
        }
    })
}
module.exports = postsRoute