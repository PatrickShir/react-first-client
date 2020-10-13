import React, {Component} from 'react';
import axios from 'axios';
//import {Redirect} from "react-router-dom";

export default class Reset extends Component {
    state = {};

    handleConfirm = e => {
        e.preventDefault();

        const data = {
            id: JSON.parse(localStorage.getItem('user')).id
        };

        axios.post('users/' + data.id + '/password/reset', data)
            .then(res => {
                    console.log(res);
                    this.setState({
                        message: res.data,
                        cls: 'success',
                        reset: true
                    });
                }
            )
            .catch(
                err =>
                    this.setState({
                        message: err.response,
                        cls: 'danger'
                    })
            )
    };

    render() {

        //if (this.state.reset) {
        //    return <Redirect to={'/'}/>;
       // }

        let message = '';

        if (this.state.message) {
            const cls = 'alert alert-' + this.state.cls;
            message = (
                <div className={cls} role="alert">
                    {this.state.message}
                </div>
            )
        }

        return (
            <form onSubmit={this.handleConfirm}>
                {message}
                <h3>Reset Password</h3>

                <button className="btn btn-primary btn-block">Confirm</button>
            </form>
        )
    }
}