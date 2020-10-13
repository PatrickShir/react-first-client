import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

export default class Reset extends Component {
    state = {};

    handleConfirm = e => {
        e.preventDefault();

        const data = {
            id: JSON.parse(localStorage.getItem('user')).id
        };

        axios.post('users/' + data.id + '/password/reset', data)
            .then(res => {
                    console.log(res)
                    this.setState({
                        reset: true
                    });
                }
            ).catch(
            err => console.log(err)
        )
    };

    render() {

        if (this.state.reset) {
            return <Redirect to={'/'}/>;
        }

        return (
            <form onSubmit={this.handleConfirm}>
                <h3>Reset Password</h3>

                <button className="btn btn-primary btn-block">Confirm</button>
            </form>
        )
    }
}