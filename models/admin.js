const mongoose = require('mongoose');
const bcrypt =require('bcrypt-nodejs');


const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    event: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
})

AdminSchema.methods.setPassword = function(pass) {
    this.password = bcrypt.hashSync(pass);
}

AdminSchema.methods.validconstword = function(pass) {
    console.log('inside validate method');
    return bcrypt.compareSync(pass, this.password);
}

module.exports = mongoose.model('Admin' , AdminSchema);