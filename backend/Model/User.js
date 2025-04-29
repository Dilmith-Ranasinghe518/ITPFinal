//Model(User.js)

//Model.User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user', 'recycler', 'collector','finance','hr','recyclemgr'] }
});

module.exports = mongoose.model('User', userSchema);
