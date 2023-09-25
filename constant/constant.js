exports.errorName = {
  //NEW Contact
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  FIELDS_REQUIRED: "FIELDS_REQUIRED",
  //ID
  ID_IS_REQUIRED: "ID_IS_REQUIRED",
  ID_NOT_EXIST: "ID_NOT_EXIST",
  //EMAIL
  EMAIL_IS_REQUIRED: "EMAIL_IS_REQUIRED",
  EMAIL_NOT_EXIST:"EMAIL_NOT_EXIST",
  //Projects
  USER_HAS_NOT_PROJECTS: "USER_HAS_NOT_PROJECTS",
  PORJECTID_NOT_EXIST  : "PORJECTID_NOT_EXIST",
  //POST
  NO_POST_BY_PROJECTID : "NO_POST_BY_PROJECTID",
  
  //Server
  SERVER_ERROR: "SERVER_ERROR",
};

exports.errorType = {
      //NEW Contact
  USER_ALREADY_EXISTS: {
    message: "User is already exists.",
    statusCode: 403,
  },
  FIELDS_REQUIRED: {
    message: "All Fields is required.",
    statusCode: 404,
  },
    //ID
  ID_IS_REQUIRED: {
    message: "ID is required.",
    statusCode: 403,
  },
  ID_NOT_EXIST: {
    message: "There is no data With this id.",
    statusCode: 404,
  },
    //EMAIL
  EMAIL_IS_REQUIRED: {
    message: "Email is required.",
    statusCode: 404,
  },
  EMAIL_NOT_EXIST: {
    message: "There is no User With this email.",
    statusCode: 404,
  },
  //PROJECT
  USER_HAS_NOT_PROJECTS: {
    message: "There is no Project for  this user.",
    statusCode: 404,
  },
  PORJECTID_NOT_EXIST: {
    message: "There is no Project With this id.",
    statusCode: 404,
  },
  //POSTS
  NO_POST_BY_PROJECTID:{
    message: "There is no Post With this Project id.",
    statusCode: 404,
  },
    //Server
  SERVER_ERROR: {
    message: "Server error.",
    statusCode: 500,
  },
};
