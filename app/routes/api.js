const friendData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res){
        var currentMatch;
        var currentMin = 20;
        var answerMatches = [];

        for(i = 0; i < friendData.length; i++){
            console.log(friendData[i].name)
            otherRs = friendData[i].scores;
            var diff = 0;

            for(j = 0; j < otherRs.length; j++){
                diff += Math.abs(req.body.scores[j] - otherRs[j]);
            }

            if (diff < currentMin){
                currentMatch = friendData[i];
                currentMin = diff;
            }
        }

        var personalityQs = [0,1,4,8];
        var personalityRs = [];

        for (k = 0; k < currentMatch.scores.length; k++){
            if (req.body.scores[k] - currentMatch.scores[k] === 0){
                answerMatches.push(1);

                if(k in personalityQs){
                    personalityRs.push(req.body.scores[k]);
                }
            }
        }

        var personalityScore = arraySum(personalityRs) / personalityRs.length;
        if(personalityScore > 3){
            currentMatch["personality"] = "Extrovert";
        }
        else if(personalityScore >= 2.5 && personalityScore < 3){
            currentMatch["personality"] = "Ambivert";
        }
        else {
            currentMatch["personality"] = "Introvert";
        }
        currentMatch["answerMatches"] = ((answerMatches.length)/10)*100;

        res.json(currentMatch);
    });
}
function arraySum(array){
    var sum = 0;
    for(i=0; i < array.length; i++){
        sum += parseInt(array[i]);
    }
    return sum;
}