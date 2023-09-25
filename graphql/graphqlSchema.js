const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");

//Validation Errors
const { errorName } = require("../constant/constant");

//import  User Controllers
const userControllers = require("../Controllers/userControllers");
//import  Project Controllers
const projectControllers = require("../Controllers/projectControllers");
//import  Post Controllers
const postControllers = require("../Controllers/postControllers");

//---------USER--------------------
// declare the User Type => One User in Our List
const userType = new GraphQLObjectType({
  name: "User",
  description: "This is user",
  // fields of Our User
  fields: {
    //- we need to take our var like the same in our database Schema
    id: { type: GraphQLID, description: "this is the ID" },
    name: { type: GraphQLString, description: "this is the name" },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    pspWallet: { type: GraphQLInt },
    // //if list we can use GrapghQlList
    tokens: {
      //list of String
      type: new GraphQLList(GraphQLInt),
    },
  },
});
//---------Project--------------------
const projectType = new GraphQLObjectType({
  name: "Project",
  description: "This is project",
  // fields of Our project
  fields: {
    //- we need to take our var like the same in our database Schema
    id: { type: GraphQLID, description: "this is the ID" },
    user_id: {
      type: GraphQLInt,
      description: "this is the ID Of the user who create project",
    },
  },
});
//---------Post--------------------
const postType = new GraphQLObjectType({
  name: "Post",
  description: "This is post",
  // fields of Our User
  fields: {
    //- we need to take our var like the same in our database Schema
    id: { type: GraphQLID, description: "this is the ID" },
    project_id: { type: GraphQLInt },
    title: { type: GraphQLString, description: "this is the title" },
    actions: { type: GraphQLString },
    identifier: { type: GraphQLString },
    qty: { type: GraphQLInt },
    symbol: { type: GraphQLString },
    tokenPrice: { type: GraphQLInt },
    supply: { type: GraphQLInt },
    tokenDescription: { type: GraphQLString },
    startSaleDate : {type:GraphQLString},
    endSaleDate : {type:GraphQLString},
    distributionDate : {type:GraphQLString},
    rentVersementDate : {type:GraphQLString},
    rentPrice: { type: GraphQLInt },
    zipCode: { type: GraphQLInt },
    location : {type:GraphQLString},
    surface: { type: GraphQLInt },
    secondMarket:{type: GraphQLBoolean}
  },
});


const queryType = new GraphQLObjectType({
  name: "Query",
  description: "this is the query type",
  fields: {
    //---------USER Query--------------------
    // Get All Users
    users: {
      //-----The list of User get How the User will displayed
      type: new GraphQLList(userType),
      description: "this is the list of user",
      ////----If we want to return just specific User we created now like test
      // resolve:(_,args)=>{
      //     return [{name:"test"}]
      // }
      //-------If we want to return all User make function that return all User
      resolve: async (_, args) => {
        try {
          const result = await userControllers.graphUserFindPostgres();
          return result;
        } catch (error) {
          throw new Error(errorName.SERVER_ERROR);
        }
      },
    },
    oneUserById: {
      type: userType,
      description: "this is the One User By ID",
      args: {
        id: {
          type: GraphQLID,
          description: "this is the id of our User",
        },
      },
      //-------If we want to return One User make function that return One User in Controllers and import it
      resolve: async (_, args) => {
        if (!args.id) {
          throw new Error(errorName.ID_IS_REQUIRED);
        }
        const isExist = await userControllers.graphUserFindByIDPostgres(
          args.id
        );
        console.log("isExist : ", isExist);
        if (!isExist) {
          console.log("isExist2 : ", isExist);
          throw new Error(errorName.ID_NOT_EXIST);
        }
        try {
          return isExist;
        } catch (error) {
          console.log("isExist33 : ");
          throw new Error(errorName.SERVER_ERROR);
        }
      },
    },
    //---------Projects Query--------------------
    getUserProjects: {
      type: new GraphQLList(projectType),
      description: "this is the All Project By User ID",
      args: {
        user_id: {
          type: GraphQLInt,
          description: "this is the user id",
        },
      },
      //-------If we want to return One User make function that return One User in Controllers and import it
      resolve: async (_, args) => {
        if (!args.user_id) {
          throw new Error(errorName.ID_IS_REQUIRED);
        }
        const isExist = await projectControllers.findUserProjects(args.user_id);
        if (!isExist.length) {
          throw new Error(errorName.USER_HAS_NOT_PROJECTS);
        } else {
          try {
            return isExist;
          } catch (error) {
            throw new Error(errorName.SERVER_ERROR);
          }
        }
      },
    },
    getOneProjectById: {
      type: projectType,
      description: "this is get Project By ID",
      args: {
        id: {
          type: GraphQLID,
          description: "this is the id of our Project",
        },
      },
      //-------If we want to return One User make function that return One User in Controllers and import it
      resolve: async (_, args) => {
        if (!args.id) {
          throw new Error(errorName.ID_IS_REQUIRED);
        }
        const isExist = await projectControllers.findProjectByID(
          args.id
        );
        console.log(isExist)
        if (!isExist) {
          throw new Error(errorName.PORJECTID_NOT_EXIST);
        }
        try {
          return isExist;
        } catch (error) {
          throw new Error(errorName.SERVER_ERROR);
        }
      },
    },
    //--------------------POSTS QUERY---------------
    findAllPosts: {
      type: new GraphQLList(postType),
      description: "this is the list of posts",
      resolve: async (_, args) => {
        try {
          const result = await postControllers.findPosts();
          return result;
        } catch (error) {
          throw new Error(errorName.SERVER_ERROR);
        }
      },
    },
    findPostById: {
      type: postType,
      description: "this is the One Post By ID",
      args: {
        id: {
          type: GraphQLID,
          description: "this is the id of our Post",
        },
      },
      resolve: async (_, args) => {
        if (!args.id) {
          throw new Error(errorName.ID_IS_REQUIRED);
        }
        const isExist = await postControllers.findPostByID(
          args.id
        );
        // console.log("isExist : ", isExist);
        if (!isExist) {
          throw new Error(errorName.ID_NOT_EXIST);
        }
        try {
          return isExist;
        } catch (error) {
          throw new Error(errorName.SERVER_ERROR);
        }
      },
    },
    findPostByProjectId: {
      type: new GraphQLList(postType),
      description: "this is the One Post By ID",
      args: {
        project_id: {
          type: GraphQLID,
          description: "this is the id of our Post",
        },
      },
      resolve: async (_, args) => {
        if (!args.project_id) {
          throw new Error(errorName.ID_IS_REQUIRED);
        }
        const isExist = await postControllers.findPostByProjectID(
          args.project_id
        );
        console.log("isExist : ", isExist);
        if (!isExist.length) {
          throw new Error(errorName.NO_POST_BY_PROJECTID);
        }
        try {
          return isExist;
        } catch (error) {
          throw new Error(errorName.SERVER_ERROR);
        }
      },
    },
  },
});

// GraphQL Mutations (POST & PUT)
const mutationsType = new GraphQLObjectType({
  name: "Mutations",
  description: "This is Mutations Types",
  fields: {
    //---------User Mutations--------------------
    postUser: {
      type: userType,
      description: "add user",
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString, description: "this is the name" },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        pspWallet: { type: GraphQLInt },
        tokens: {
          //list of String
          type: new GraphQLList(GraphQLInt),
        },
      },
      resolve: async (_, args) => {
        const newUser= {
          id: args.id,
          name: args.name,
          email: args.email,
          phone: args.phone,
          pspWallet: args.pspWallet,
          tokens: args.tokens,
        };
        console.log("test");
        if (!args.email || !args.name || !args.phone) {
          throw new Error(errorName.FIELDS_REQUIRED);
        }
        const result = await userControllers.graphUserFindByEmailPostgres(
          args.email
        );
        console.log(result);
        if (result) {
          throw new Error(errorName.USER_ALREADY_EXISTS);
        } else {
          console.log("first");
          try {
            await userControllers.postUser(newUser);
            return newUser;
          } catch (error) {
            // console.error(err);
            throw new Error(errorName.SERVER_ERROR);
          }
        }
      },
    },
    EditUser: {
      type: userType,
      description: "Edit user : ",
      args: {
        id: {
          type: GraphQLID,
          description: "this is the id of our User",
        },
        name: { type: GraphQLString, description: "this is the name" },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        // pspWallet: { type: GraphQLInt },
        // tokens: {
        //   //list of String
        //   type: new GraphQLList(GraphQLInt),
        // },
      },
      resolve: async (_, args) => {
        const newData = {
          id: args.id,
          name: args.name,
          email: args.email,
          phone: args.phone,
          // pspWallet: args.pspWallet,
          // tokens: args.tokens,
        };
        if (!args.id) {
          throw new Error(errorName.ID_IS_REQUIRED);
        }
        const result = await userControllers.graphUserFindByIDPostgres(
          args.id
        );
        // console.log(result)
        if (!result) {
          throw new Error(errorName.ID_NOT_EXIST);
        } else {
          try {
            const test = await userControllers.graphUserPutPostgres(newData);
            return test;
          } catch (error) {
            throw new Error(errorName.SERVER_ERROR);
          }
        }
      },
    },
    //---------Project Mutations--------------------
    postProject: {
      type: projectType,
      description: "add project",
      args: {
        // id: { type: GraphQLID },
        user_id: { type: GraphQLInt },
      },
      resolve: async (_, args) => {
        const newProject = {
          // id: args.id,
          user_id: args.user_id,
        };
        if (!args.user_id) {
          throw new Error(errorName.ID_IS_REQUIRED);
        } else {
          console.log("newproject");
          try {
            console.log("newproject2");
            await projectControllers.postProject(newProject);
            console.log("newproject3");
            return newProject;
          } catch (error) {
            console.error(err);
            throw new Error(errorName.SERVER_ERROR);
          }
        }
      },
    },
    deleteProjectById: {
      type: projectType,
      description: "this is the delete project By ID",
      args: {
        id: {
          type: GraphQLID,
          description: "this is the id of our project",
        },
      },
      resolve: async (_, args) => {
        if (!args.id) {
          throw new Error(errorName.ID_IS_REQUIRED);
        }

        const isExist =
          await projectControllers.findProjectByID(args.id);
        if (!isExist) {
          throw new Error(errorName.ID_NOT_EXIST);
        }else{
          try {
            await projectControllers.deleteProject(args.id);
            console.log(true);
            return `Project ID : ${args.id} deleted`;
          } catch (error) {
            throw new Error(errorName.SERVER_ERROR);
          }
        }

      },
    },
        //---------Post Mutations--------------------
        addPost: {
          type: postType,
          description: "add Post",
          args: {
            id: { type: GraphQLID },
            project_id: { type: GraphQLInt },
            title: { type: GraphQLString, description: "this is the title" },
            identifier: { type: GraphQLString },
            qty: { type: GraphQLInt },
            symbol: { type: GraphQLString },
            tokenPrice: { type: GraphQLInt },
            supply: { type: GraphQLInt },
            tokenDescription: { type: GraphQLString },
            startSaleDate : {type:GraphQLString},
            endSaleDate : {type:GraphQLString},
            distributionDate : {type:GraphQLString},
            rentVersementDate : {type:GraphQLString},
            rentPrice: { type: GraphQLInt },
            zipCode: { type: GraphQLInt },
            location : {type:GraphQLString},
            surface: { type: GraphQLInt }
          },
          resolve: async (_, args) => {
            const newPost = {
              project_id: args.  project_id,
              title: args.title,
              identifier:args.identifier,
              qty: args.qty,
              symbol: args.symbol,
              tokenPrice: args.tokenPrice,
              supply: args.supply,
              tokenDescription: args.tokenDescription,
              startSaleDate : args.startSaleDate,
              endSaleDate : args.endSaleDate,
              distributionDate : args.distributionDate,
              rentVersementDate : args.rentVersementDate,
              rentPrice: args.rentPrice,
              zipCode: args.zipCode,
              location : args.location,
              surface: args.surface,
            };
            console.log("test");
            if (!args.project_id) {
              throw new Error(errorName.FIELDS_REQUIRED);
            }else {
              console.log("first");
              try {
                await postControllers.createPost(newPost);
                return newPost;
              } catch (error) {
                // console.error(err);
                throw new Error(errorName.SERVER_ERROR);
              }
            }
          },
        },
        deletePostById: {
          type: postType,
          description: "this is the delete Post By ID",
          args: {
            id: {
              type: GraphQLID,
              description: "this is the id of our post",
            },
          },
          resolve: async (_, args) => {
            if (!args.id) {
              throw new Error(errorName.ID_IS_REQUIRED);
            }
    
            const isExist =
              await postControllers.findPostByID(args.id);
            if (!isExist) {
              throw new Error(errorName.ID_NOT_EXIST);
            }else{
              try {
                await postControllers.deletePost(args.id);
                console.log(true);
                return true;
              } catch (error) {
                console.log(error)
                throw new Error(errorName.SERVER_ERROR);
              }
            }
    
          },
        },
        EditPost: {
          type: postType,
          description: "Edit user : ",
          args: {
            id: {
              type: GraphQLID,
              description: "this is the id of our post",
            },
            // project_id: { type: GraphQLInt },
            title: { type: GraphQLString, description: "this is the title" },
            // identifier: { type: GraphQLString },
            qty: { type: GraphQLInt },
            symbol: { type: GraphQLString },
            tokenPrice: { type: GraphQLInt },
            supply: { type: GraphQLInt },
            tokenDescription: { type: GraphQLString },
            startSaleDate : {type:GraphQLString},
            endSaleDate : {type:GraphQLString},
            distributionDate : {type:GraphQLString},
            rentVersementDate : {type:GraphQLString},
            rentPrice: { type: GraphQLInt },
            zipCode: { type: GraphQLInt },
            location : {type:GraphQLString},
            surface: { type: GraphQLInt }
          },
          resolve: async (_, args) => {
            const newData = {
              id: args.id,
              // project_id: args.project_id,
              title: args.title,
              // identifier:args.identifier,
              qty: args.qty,
              symbol: args.symbol,
              tokenPrice: args.tokenPrice,
              supply: args.supply,
              tokenDescription: args.tokenDescription,
              startSaleDate : args.startSaleDate,
              endSaleDate : args.endSaleDate,
              distributionDate : args.distributionDate,
              rentVersementDate : args.rentVersementDate,
              rentPrice: args.rentPrice,
              zipCode: args.zipCode,
              location : args.location,
              surface: args.surface,
            };
            if (!args.id) {
              throw new Error(errorName.ID_IS_REQUIRED);
            }
            const result = await postControllers.findPostByID(
              args.id
            );
            console.log("result : " , result)
            if (!result) {
              throw new Error(errorName.ID_NOT_EXIST);
            } else {
              try {
                const test = await postControllers.EditPost(newData);
                return test;
              } catch (error) {
                throw new Error(errorName.SERVER_ERROR);
              }
            }
          },
        },
        EditPostOpenStatus: {
          type: postType,
          description: "Edit status : ",
          args: {
            id: {
              type: GraphQLID,
              description: "this is the id of our post",
            },
          },
          resolve: async (_, args) => {
            if (!args.id) {
              throw new Error(errorName.ID_IS_REQUIRED);
            }
            const result = await postControllers.findPostByID(
              args.id
            );
            if (!result) {
              throw new Error(errorName.ID_NOT_EXIST);
            } else {
              try {
                const test = await postControllers.EditPostOpenActions(args.id);
                return test;
              } catch (error) {
                throw new Error(errorName.SERVER_ERROR);
              }
            }
          },
        },
        EditPostCommitedStatus: {
          type: postType,
          description: "Edit status : ",
          args: {
            id: {
              type: GraphQLID,
              description: "this is the id of our post",
            },
          },
          resolve: async (_, args) => {
            if (!args.id) {
              throw new Error(errorName.ID_IS_REQUIRED);
            }
            const result = await postControllers.findPostByID(
              args.id
            );
            if (!result) {
              throw new Error(errorName.ID_NOT_EXIST);
            } else {
              try {
                const test = await postControllers.EditPostCommitedActions(args.id);
                return test;
              } catch (error) {
                throw new Error(errorName.SERVER_ERROR);
              }
            }
          },
        },
  },
});

//Our Schema
const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationsType,
});

exports.schema = schema;
