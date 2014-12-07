var express = require('express');
var router = express.Router();
var db = require('../db');
var _ = require('lodash');

var reasons = [
    'You always want me to look good...for both of us.',
    'The feeling I get when I see you smile.',
    'Your pretty face.',
    'How amazingly well you take care of me when I\'m feeling down.',
    "That dream of mine of dating someone who I can sing with...that's you.",
    'Your amazing voice.',
    "You want to work on things, not just say \"fuck it\" and bail.",
    'Your long black, summertime-curly, hair.',
    'Riding behind you while we bike around the city together.',
    'Your tomboyish attitude mixed with your great sense of style.',
    'You want to play the banjo.',
    'My 29th birthday present, an incredible evening of all things I love!',
    'Our backpacking trip to Olympic together and how much you enjoyed it.',
    'Some nights, you just want to hang out and watch a movie.',
    'The incredible meals that you cook for us.',
    'The incredible dates you plan for us.',
    'The way you insist on asking Google questions as if it was a person.',
    'The wonderful home that we have built together.',
    'Your capacity to understanding and care for me, despite my difficulties to do the same.',
    'You make me slow down and stop driving myself so hard.',
    'Your cute butt.',
    'Our long debates where we end up agreeing and not realizing it.',
    'Our love of Paul Simon.',
    'I can spend time with you doing pretty much anything for any duration.'
];

/* GET home page. */
router.get('/', function(req, res) {
    db.getClient().then(function(client) {
        client.query('SELECT * FROM reasons ORDER BY views ASC, RANDOM();', function(err, result) {
            var reasons = _.map(result.rows, function(row) {
                return {reason: row.reason, id: row.id};
            });

            res.render('index', { 
                name: 'Christine',
                reasons: JSON.stringify(reasons)
            });
        });
    });
    
});

module.exports = router;
