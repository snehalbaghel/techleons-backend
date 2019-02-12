const mongoose = require('mongoose');
const TransationModel = require('./transaction');

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
    name: { type: String, required: true, unique: true},
    username:  { type: String, required: true},
    events: { type: Schema.Types.ObjectId, ref: 'Event'},
    transactions: { type: Schema.Types.ObjectId, ref: 'Transation'},
    points: { type: Number, default: 0},
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