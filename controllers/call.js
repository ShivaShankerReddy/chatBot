const extractCaller = (req, res) => {
    if (req.body.disambiguation && req.body.disambiguation_count > 2) {
        return res.status(200).json(
            {
                disambiguation: false,
                message: 'Sorry couldn\'t process your request'
            }
        );
    }
    const callerQuery = req.body.query;
    if (callerQuery && callerQuery.trim() && callerQuery.replace('to', '')) {
        const call2Reg = callerQuery.replace('to ', '');
        res.status(200).json({
            message: `Calling ${call2Reg}`,
            data: call2Reg,
            date: new Date().toDateString(),
            disambiguation: false
        });
    } else {
        res.status(200).json({
            disambiguation: true,
            disambiguation_skill: 'call',
            disambiguation_count: req.body.disambiguation_count ? req.body.disambiguation_count + 1 : 1,
            message: 'Whom do you want to make a call.?',
            data: '',
            date: new Date().toDateString()
        });
    }
};


module.exports = {
    extractCaller
};
