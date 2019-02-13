//const mongoose = require('mongoose');
const Event = require('../models/event');
const Participant = require('../models/participant');

module.exports.markPresent = async function(req, res) {
    
    if(req.isAuthenticated()) {
        Participant
            .find()
            .where('username')
            .in(req.body.usernames)
            .exec(function(err, participants) {
                    if(err) {
                    console.error(err);
                }
                else {
                    Event
                        .findById(req.user.event)
                        .exec(function (err, event) {
                            if(err) {
                                console.error(err);
                            } 
                            else {

                                participants.forEach((participant) => {
                                    event.markParticipant(participant._id);
                                    event.save(function(err, product) {
                                        console.info(`${product.username} marked attendance for ${event._id}`)
                                    });
                                })
                                res.status(200);
                                res.send(`${req.body.usernames} marked.`);

                            }
                        });
                }
            }); 
    } else {
            res.send('Not logged in');
        }

    }


module.exports.addNewAttendee = function(req, res) {
    if(req.isAuthenticated()) {
        Participant
            .findOne({username: req.body.username})
            .exec(function(err, participant) {
                if(err) {
                    console.error(err);
                }
                else {
                    participant.addEvent(req.user.event);
                    participant
                        .save(function (err, product) {
                            if(err) {
                                console.error(err);
                            }
                            else {
                                Event
                                    .findById(req.user.event)
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
    } else {
            res.send('Not logged in');
        }
    }

module.exports.getParticipants = function(req, res) {
   
    if(req.isAuthenticated()) {
    Event
        .findById(req.user.event)
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
    } else {
        res.send('Not logged in');
    }
        
}