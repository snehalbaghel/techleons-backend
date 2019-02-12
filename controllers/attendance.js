const mongoose = require('mongoose');
const Event = require('../controllers/Event');
const Participant = require('../models/participant');

module.exports.markPresent = function(req, res) {
    
    Participant
        .findOne({username: req.body.username})
        .exec(function(err, participant) {
                if(err) {
                console.error(err);
            }
            else {
                Event
                    .findById(req.body.eventID)
                    .exec(function (err, event) {
                        if(err) {
                            console.error(err);
                        } 
                        else {
                            event.markParticipant(participant._id);
                            event.save(function(err, product) {
                                res.status(200);
                                res.send(`${req.body.username} marked.`);
                            });
                        }
                    });
            }
        });

    }

module.exports.addNewAttendee = function(req, res) {

    Participant
        .findOne({username: req.body.username})
        .exec(function(err, participant) {
            if(err) {
                console.error(err);
            }
            else {
                participant.addEvent(req.body.eventID);
                participant
                    .save(function (err, product) {
                        if(err) {
                            console.error(err);
                        }
                        else {
                            Event
                                .findById(req.body.eventID)
                                .exec(function (err, event) {
                                    if(err) {
                                        console.error(err);
                                    } 
                                    else {
                                        event.markParticipant(participant._id);
                                        event.save(function(err, product) {
                                            res.status(200);
                                            res.send(`${req.body.username} marked and added.`);
                                        });
                                    }
                                })
                        }
                    })
            }
        });
    }

// module.exports.getParticipants = function(req, res) {
//     Event
//         .findById(req.body.eventID)
//         .exec(function (err, event) {
//             if(err) {
//                 console.error(err);
//             } else {
//                 event.populate()
//             }
//         })
// //
//         .populate('participant')
//         .exec(function(err, event) {
//             if(err) {
//                 console.error(err);
//             } else {
                
//             }
//         })
        
// }