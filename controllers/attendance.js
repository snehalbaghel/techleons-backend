//const mongoose = require('mongoose');
const Event = require('../models/event');
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

module.exports.getParticipants = function(req, res) {
    Event
        .findById(req.body.eventID)
        .exec(function (err, event) {
            if(err) {
                console.error(err);
            } else if(!event) {
                console.log('invalid');
            } else {
               const participantsModelArray =  event.participants;
               participantsModelArray
                    .populate('participant')
                    .exec(function (err, participants) {

                        if(err) {
                            console.error(err);
                        }
                        res.send(participants);
                    })
            }
        })
        //
        // .populate('participant')
        // .exec(function(err, event) {
        //     if(err) {
        //         console.error(err);
        //     } else {
                
        //     }
        // })
        
}