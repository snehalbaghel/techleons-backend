const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
    name: { type: String, required: true},
    username:  { type: String, required: true, unique: true},
    events: [{ type: Schema.Types.ObjectId, ref: 'Event'}],
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction'}],
    points: { type: Number, default: 0},
    team: {type: Schema.Types.ObjectId},
    dob: {type: Schema.Types.Date},
    course: {type: String},
    });

ParticipantSchema.methods.addEvent = function(ObjectId) {
    this.events.push(ObjectId);
}

ParticipantSchema.methods.addTransaction = function(ObjectId) {
    this.events.push(ObjectId);
}

ParticipantSchema.method.addPoints = function(point) {
    this.points += point;
}

ParticipantSchema.methods.deductPoints = function(point) {
    this.points -= point;
}

module.exports = mongoose.model('Participant' , ParticipantSchema);