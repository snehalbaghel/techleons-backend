const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    points: {type: Number, required: true},
    participant: {type: Schema.Types.ObjectId, ref: 'Participant', required: true},
    event: {type: Schema.Types.ObjectId, ref: 'Evemt', required: true},
    reason: {type: String, required: true},
    team: {type: Schema.Types.ObjectId, ref: 'Team'},
});

moduls.exports = mongoose.model('Transaction', TransactionSchema);
