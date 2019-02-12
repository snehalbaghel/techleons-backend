const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AttendanceChildSchema = new Schema({
    participant: {type: Schema.Types.ObjectId, ref: 'Participant'},
    attendance: {type: Boolean, default: false},
})

const EventSchema = new Schema({
    name: {type: string, required: true},
    venue: string,
    participants: [AttendanceChildSchema],
    // attendees: {type: [Schema.Types.ObjectId], ref: 'Participant',default: undefined},
})

EventSchema.methods.addParticipant = function(ObjectId) {
    this.participants.push({participant: ObjectId});
}

EventSchema.methods.markParticipant = async function(ObjectId) {
    const attendanceModel = await this.participants.findOne({participant: ObjectId});
    attendanceModel.attendance = true;
}

module.exports = mongoose.model('Event' , EventSchema);