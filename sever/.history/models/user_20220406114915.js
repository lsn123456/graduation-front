const mongoose = require('mongoose')
/* Schema: 表的描述 用户登录信息表*/
const Schema = mongoose.Schema
const UserSchema = new Schema({
  phone: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  newpassword: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})
/* model 建模型 */
module.exports = mongoose.model('User', UserSchema)