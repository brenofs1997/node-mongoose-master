import Mongoose from 'mongoose'

const schema = new Mongoose.Schema({
    title:String, content : String,
    author:String,
    publishDate:Date

})
const PostsModel = Mongoose.model('Posts', schema)

export default PostsModel