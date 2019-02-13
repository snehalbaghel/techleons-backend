const Event = require('../models/event');

module.exports.putFirst =  function(req, res) {
    if(req.isAuthenticated()) {
        Event
            .findById(req.user.event)
            .exec(
                function(err, event) {
                    if(err) {
                        console.error(err);
                    } else {
                        event.putFirst(req.body.username);
                        res.send(`${req.body.username} saved as first`);
                    }
                }
            )
    } else {
        res.send('Not logged in');
    }
}

module.exports.putSecond =  function(req, res) {
    if(req.isAuthenticated()) {
        Event
            .findById(req.user.event)
            .exec(
                function(err, event) {
                    if(err) {
                        console.error(err);
                    } else {
                        event.putSecond(req.body.username);
                        res.send(`${req.body.username} saved as second`);
                    }
                }
            )
    } else {
        res.send('Not logged in');
    }
}

module.exports.putThird =  function(req, res) {
    if(req.isAuthenticated()) {
        Event
            .findById(req.user.event)
            .exec(
                function(err, event) {
                    if(err) {
                        console.error(err);
                    } else {
                        event.putThird(req.body.username);
                        res.send(`${req.body.username} saved as third`);
                    }
                }
            )
    } else {
        res.send('Not logged in');
    }
}
