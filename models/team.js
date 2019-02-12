const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: { type: String, required: true},
    points: {type: Number, default: 0},
    transactions: { type: Schema.Types.ObjectId, ref: 'Transation'},
})

TeamSchema.addTransaction = function(ObjectId) {
    this.transactions.push(ObjectId);
}

TeamSchema.method.addPoints = function(point) {
    this.points += point;
}

TeamSchema.methods.deductPoints = function(point) {
    this.points -= point;
}