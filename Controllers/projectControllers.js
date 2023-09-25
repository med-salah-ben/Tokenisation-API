const ProjectSchema = require("../model/Project");

////--------graph method with Postgres

//insert Poject
exports.postProject = async (project) => {
  await ProjectSchema.create(project);
  
};

// select Project
exports.findUserProjects = async (userId) => {
  // console.log(userId)
  const projects = await ProjectSchema.findAll({
    where: {
      user_id: userId,
    },
  });
  // console.log("projects : " , projects)
  return projects;
};
// select Project By ID
exports.findProjectByID = async (id) => {
  const project = await ProjectSchema.findByPk(id);

  return project;
};

exports.deleteProject = async (id) => {
  const result = await ProjectSchema.destroy({
    where: {
      id: id,
    },
  });
  console.log(result)
};
