const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamTransactionSchema = new Schema({
    points: {type: Number, required: true},
    transaction: {type: Schema.Types.ObjectId, ref: 'Transaction'},
    //team: {type: Schema.Types.ObjectId, ref: 'Team'},
});

moduls.exports = mongoose.model('Transaction', TransactionSchema);
