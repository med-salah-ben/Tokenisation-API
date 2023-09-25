const PostSchema = require("../model/Post");

////--------graph method with Postgres

//insert Post
exports.createPost = async (post) => {
  await PostSchema.create(post);
  
};

// select Post
exports.findPosts = async () => {
  // console.log(userId)
  const posts = await PostSchema.findAll();
  // console.log("Posts : " , posts)
  return posts;
};
// select Post By ID
exports.findPostByID = async (id) => {
  const post = await PostSchema.findByPk(id);

  return post;
};

// select Post By Project ID
exports.findPostByProjectID = async (projectID) => {
    const post = await PostSchema.findAll({where:{project_id : projectID}});
  
    return post;
  };

exports.deletePost = async (id) => {
  const result = await PostSchema.destroy({
    where: {
      id: id,
    },
  });
};

exports.EditPost =async (post)=>{
    // console.log(post)
        await PostSchema.update({ ...post }, {
        where: {
          id: post.id
        }})
        const Post =  await PostSchema.findOne({ where: { id: post.id} })
    return Post
}

exports.EditPostOpenActions =async (ID)=>{
    // console.log(post)
        await PostSchema.update({ actions: "Sale Open" }, {
        where: {
          id:ID
        }})
        const Post =  await PostSchema.findOne({ where: { id: ID} })
    return Post
}

exports.EditPostCommitedActions =async (ID)=>{
    // console.log(post)
        await PostSchema.update({ actions: "Commited" }, {
        where: {
          id:ID
        }})
        const Post =  await PostSchema.findOne({ where: { id: ID} })
    return Post
}