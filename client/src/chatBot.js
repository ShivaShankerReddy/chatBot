import React, { Component } from 'react';
import axios from 'axios';

class Bot extends Component {
    state = {
        disambiguation: false,
        disambiguation_skill: '',
        disambiguation_count: 0,
        fullData: []
    }

    /* eslint-disable no-param-reassign */
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const queryFromUser = event.target.value;
            if (event.target.value.trim()) {
                event.target.value = '';
                // event.preventDefault();
                this.setState(state => ({
                    fullData: state.fullData.concat({
                        clientMsg: true,
                        message: queryFromUser,
                        date: new Date().toDateString()
                    })
                }));

                // body parameters to backend
                let options = {
                    url: '/chat',
                    method: 'POST',
                    data:
                    {
                        query: queryFromUser
                    },
                    headers: { 'Content-Type': 'application/json' }
                };
                if (this.state.disambiguation) {
                    options.data.disambiguation = true;
                    options.data.disambiguation_skill = this.state.disambiguation_skill;
                    options.data.disambiguation_count = this.state.disambiguation_count;
                }
                axios(options).then((res) => {
                    const response = res.data;
                    // self.message = response.message;
                    this.setState(state => ({
                        fullData: state.fullData.concat(
                            {
                                clientMsg: false,
                                message: response.message,
                                date: response.date
                            }
                        ),
                        disambiguation: response.disambiguation,
                        disambiguation_skill: response.disambiguation_skill,
                        disambiguation_count: response.disambiguation_count
                    }));
                    // self.fullData.push({ clientMsg: false, message: self.message });
                }).catch((err) => {
                    const errMsg = err.response.data.message;
                    const errDate = err.response.data.date;
                    // self.fullData.append(self.message);
                    // self.fullData.push({ clientMsg: false, message: self.message });
                    this.setState(state => ({
                        fullData: state.fullData.concat({
                            clientMsg: false,
                            message: errMsg,
                            date: errDate
                        })
                    }));
                });
            } else {
                event.preventDefault();
            }
        }
    }

    render() {
        return (
            <div className="botBar">
                <div id="messageDiv">
                    {
                        this.state.fullData.map((item, index) => (
                            <div className={item.clientMsg ? 'rightSideMessage' : 'leftSideMessage'} key={index.toString()}>
                                <div className="messageId">{item.message}</div>
                                <div className="timeId">{item.date}</div>
                            </div>
                        )) }
                </div>
                <div id="inputSearch">
                    <input id="textInputSearch" type="text" placeholder="Enter here.." onKeyPress={this.handleKeyPress} />
                </div>
            </div>
        );
    }
}

export default Bot;
