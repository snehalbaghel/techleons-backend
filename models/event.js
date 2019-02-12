const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {type: string, required: true},
    venue: string,
    participants: [{type: Schema.Types.ObjectId, ref: 'Participant'}],
    attendees: {type: [Schema.Types.ObjectId], ref: 'Participant',default: undefined},
})

EventSchema.methods.addParticipant = function(ObjectId) {
    this.participants.push(ObjectId);
}

EventSchema.methods.addAttendee = function(ObjectId) {
    this.attendees.push(ObjectId);
}

module.exports = mongoose.model('Event' , EventSchema);