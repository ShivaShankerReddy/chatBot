const extractMessage = (req, res) => {
    if (req.body.disambiguation && req.body.disambiguation_count > 2) {
        return res.status(200).json(
            {
                disambiguation: false,
                message: 'Sorry couldn\'t process your request'
            }
        );
    }
    const messageQuery = req.body.query;
    if (messageQuery && messageQuery.trim()) {
        // const mess2Reg = messageQuery.replace('to ', '');
        res.status(200).json({
            message: `Sent message to ${messageQuery}`,
            data: messageQuery,
            date: new Date().toDateString(),
            disambiguation: false
        });
    } else {
        res.status(200).json({
            disambiguation: true,
            disambiguation_skill: 'message',
            disambiguation_count: req.body.disambiguation_count ? req.body.disambiguation_count + 1 : 1,
            message: 'Whom do you want to send a message.?',
            data: '',
            date: new Date().toDateString()
        });
    }
};


module.exports = {
    extractMessage
};
