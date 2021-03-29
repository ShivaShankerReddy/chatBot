const call = require('./call');
// const message = require('./message');


const skillExtraction = (req, res) =>{
    if (req.body.disambiguation) {
        if (req.body.disambiguation_skill == 'call') {
            call.extractCaller(req, res);
        }
    } else {
        const callerRegex = /.* ?\b(call|dail|ring)\b([a-z0-9_ @]+)?/;
        callerRegex.lastIndex = 0;
        const callerRegexOutput = callerRegex.exec(req.body.query);
        if (callerRegexOutput && callerRegexOutput.length > 0) {
            req.body.query = callerRegexOutput[2];
            call.extractCaller(req, res);
        } else {
            res.status(200).json({
                message: 'How can i help u.?',
                data: '',
                date: new Date().toDateString()
            });
        }
    }
};
module.exports = {
    skillExtraction
};
