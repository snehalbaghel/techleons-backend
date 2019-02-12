const mongoose = require('mongoose');
const Participant = require('./participant');
const Transaction = require('./transaction');

const Schema = mongoose.Schema;

const ParticipantChildSchema = new Schema({
    participant: {type: Schema.Types.ObjectId, ref: 'Participant'},
    attendance: {type: Boolean, default: false},
})

const EventSchema = new Schema({
    name: {type: String, required: true},
    //venue: string,
    participants: [ParticipantChildSchema],
    participationPoints: {type: Number}
    // attendees: {type: [Schema.Types.ObjectId], ref: 'Participant',default: undefined},
})

EventSchema.methods.addParticipant = function(ObjectId) {
    this.participants.push({participant: ObjectId});
}

EventSchema.methods.markParticipant = async function(ObjectId) {
    try{
        const participant = await Participant.findById(ObjectId);
        const attendanceModel = await this.participants.findOne({participant: ObjectId});
        
        if(!attendanceModel.attendance) {
            //let transaction = new Transaction
            participant.addPoints(this.participationPoints);
            attendanceModel.attendance = true;
        } else if (this.name == 'Gaming') {
            participant.addPoints(this.participationPoints);
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = mongoose.model('Event' , EventSchema);