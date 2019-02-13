const mongoose = require('mongoose');
const Transaction = require('./transaction');
const Participant = require('./participant');


const Schema = mongoose.Schema;

const AttendanceCSchema = new Schema({
    participant: {type: Schema.Types.ObjectId, ref: 'Participant'},
    attendance: {type: Boolean, default: false},
})

const EventSchema = new Schema({
    name: {type: String, required: true},
    // venue: string,
    participants: [AttendanceCSchema],
    participationPoints: {type: Number},
    first: {type: Schema.Types.ObjectId, ref: 'Participant'},
    second: {type: Schema.Types.ObjectId, ref: 'Participant'},
    third: {type: Schema.Types.ObjectId, ref: 'Participant'},
    // attendees: {type: [Schema.Types.ObjectId], ref: 'Participant',default: undefined},
})

EventSchema.methods.addParticipant = function(ObjectId) {
    this.participants.push({participant: ObjectId});
}

EventSchema.methods.markParticipant = async function(participantId) {
    try{
        const attendanceModel = await this.participants.findOne({participant: participantId});
        
        if(!attendanceModel.attendance) {
            let transaction = new Transaction(
                {
                    points: this.participationPoints,
                    participant: participantId,
                    event: this._id,
                    reason: `Attendance for ${this.name}`,
                }
            );
            transaction.save();
            transaction.executeTransaction();
            attendanceModel.attendance = true;` `
        } else if (this.name == 'Gaming') {
            let transaction = new Transaction(
                {
                    points: this.participationPoints,
                    participant: participantId,
                    event: this._id,
                    reason: `Attendance for ${this.name}`,
                }        
            );
            transaction.save();
            transaction.executeTransaction();
        }
    } catch (err) {
        console.error(err);
    }
}

EventSchema.methods.putFirst = async function(participantUsername) {
    if(this.first == undefined || this.first == null) {
        try {
            let participant = await Participant.findOne({username: participantUsername});
            
            let transaction = new Transaction({
                points: 1000,
                participant: participant._id,
                event: this._id,
                reason: `First Prize winner of ${this.name}`,
                team: participant.team
            })

            transaction.save();
            transaction.executeTransaction();
        } catch(err) {
            console.error(err);
        }
    } else {
        console.log('first place is already taken');
    }
}

EventSchema.methods.putSecond = async function(participantUsername) {
    if(this.second == undefined || this.second == null) {
        try {
            let participant = await Participant.findOne({username: participantUsername});
            
            let transaction = new Transaction({
                points: 750,
                participant: participant._id,
                event: this._id,
                reason: `Second Prize winner of ${this.name}`,
                team: participant.team
            })
        
            transaction.save();
            transaction.executeTransaction();
        } catch(err) {
            console.error(err);
        }
    } else {
        console.log('second place is already taken');
    }
}

EventSchema.methods.putThird = async function(participantUsername) {
    if(this.third == undefined || this.third == null) {
        try {
            let participant = await Participant.findOne({username: participantUsername});
            
            let transaction = new Transaction({
                points: 500,
                participant: participant._id,
                event: this._id,
                reason: `Third Prize winner of ${this.name}`,
                team: participant.team
            })
        
            transaction.save();
            transaction.executeTransaction();
        } catch(err) {
            console.error(err);
        }
    } else {
        console.log('third place is already taken');
    }
}


module.exports = mongoose.model('Event' , EventSchema);