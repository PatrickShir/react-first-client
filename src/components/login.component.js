import React, {Component} from "react";
import axios from 'axios';
import {Redirect} from "react-router-dom";

export default class HomeComponent extends Component {
    state = {};

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            username: this.email,
            password: this.password
        };

        delete axios.defaults.headers.common['Authorization'];
        axios.post('auth', data)
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res.data));
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('token')).jwt;
                this.loadUser();
            })
            .catch(
                err => {
                    this.setState({
                        message: err.response.data
                    })
                }
            )
    };

    loadUser() {
        axios.get('users', {headers: {"Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).jwt}})
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                this.setState({
                    loggedIn: true
                });
                this.props.setUser(res.data);
            })
            .catch(
                err => {
                    this.setState({
                        message: err.response.data
                    })
                }
            )
    }

    render() {

        if (this.state.loggedIn) {
            return <Redirect to={'/'}/>;
        }

        let error = '';

        if (this.state.message) {
            error = (
                <div className="alert alert-danger" role="alert">
                    {this.state.message}
                </div>
            )
        }

        return (
            <form onSubmit={this.handleSubmit}>
                {error}
                <h3>Login</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email"
                           onChange={e => this.email = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password"
                           onChange={e => this.password = e.target.value}/>
                </div>

                <button className="btn btn-primary btn-block">Login</button>
            </form>
        )
    }
}