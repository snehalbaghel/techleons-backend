const mongoose = require('mongoose');
const Participant = require('./participant');
const Team = require('./team');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    points: {type: Number, required: true},
    participant: {type: Schema.Types.ObjectId, ref: 'Participant', required: true},
    event: {type: Schema.Types.ObjectId, ref: 'Evemt', required: true},
    reason: {type: String, required: true},
    team: {type: Schema.Types.ObjectId, ref: 'Team'},
    timestamp: {type: Schema.Types.Date, default: Date.now},
});

TransactionSchema.methods.executeTransaction = async function() {
    const participant = await Participant.findById(this.participant);
    const team = await Team.findById(this.team);

    participant.addPoints(this.points);
    team.addPoints(this.points);

    participant.save();
    team.save();
}

module.exports = mongoose.model('Transaction', TransactionSchema);
