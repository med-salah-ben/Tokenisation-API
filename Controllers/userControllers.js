const UserSchema = require("../model/Users");

////--------graph method with Postgres

//insert User
exports.postUser = (user)=>{
   return UserSchema.create(user)
}

// select User 
exports.graphUserFindPostgres = ()=>{
    return UserSchema.findAll()
}
// select User By ID 
exports.graphUserFindByIDPostgres = (id)=>{
    const User = UserSchema.findByPk(id)
    if (User === null) {
        return "there is no User with this id"
      } else {
        return User
      }
 }

exports.graphUserFindByEmailPostgres = (email)=>{
    return  UserSchema.findOne({ where: { email: email} })
 
}


exports.graphUserPutPostgres =async (user)=>{
    console.log(user)
        await UserSchema.update({ ...user }, {
        where: {
          id: user.id
        }})
        const User =  await UserSchema.findOne({ where: { id: user.id} })
    return User
}
