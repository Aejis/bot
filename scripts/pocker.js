// Description:
//   Play planning poker
// 
// Dependencies:
//   None
// 
// Configuration:
//   None
// 
// Commands:
// 
//   hubot poker (play|start) - start the round
//   hubot poker (estimate|bet|rank) <score> - estimate current task with score
//   hubot poker (finish|end) - finish round and show the bets
// 
// Author:
//   Ptico

var allowedScores = ['1', '3', '5', '7', '13', '21', '?', '100', 'over 9000', 'coffee']; // TODO config variable

module.exports = function(robot) {
  robot.respond(/poc?ker (play|start)/, function(msg) {
    var channel = msg.envelope.user.reply_to;

    robot.brain.set('poker', channel);

    msg.send('Round starts. Please, estimate this task in the private message');
  });

  robot.respond(/poc?ker (estimate|bet|rank) (.*)/, function(msg) {
    var estimation = msg.match[2],
        room       = robot.brain.get('poker'),
        origin     = msg.message,
        envelope   = { room: room, user: {}, message: origin };

    if (room) {
      if (allowedScores.indexOf(estimation) > -1) {
        robot.brain.set('poker:scores:' + origin.user.id, estimation);
        robot.adapter.send(envelope, origin.user.name + ' has bet his estimation'); // Hack

        msg.send('Good! Thanks')
      } else {
        msg.send(estimation + " doesn't look like acceptable.");
        msg.send("Please use one of this scores: " + allowedScores.join(', '));
      }
    } else {
      msg.send('Round is not started yet. Take a break and grab some coffee');
    }
  });

  robot.respond(/poc?ker (finish|end)/, function(msg) {
    var scores = [],
        users = robot.brain.users();

    for (var id in users) {
      var key = 'poker:scores:' + id,
          score = robot.brain.get(key);

      if (score !== null) {
        scores.push(users[id].name + ' estimated this task with ' + score);
        robot.brain.remove(key);
      }
    }

    scores.forEach(function(est) {
      msg.send(est);
    });

    robot.brain.remove('poker');
  });
};