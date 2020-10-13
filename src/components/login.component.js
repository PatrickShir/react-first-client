import React, {Component} from "react";
import axios from 'axios';
import {Redirect} from "react-router-dom";

export default class HomeComponent extends Component {
    state = {}

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            username: this.email,
            password: this.password
        }

        axios.post('auth', data)
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res.data))
                this.loadUser();
            })
            .catch(
                err => {
                    console.log(err)
                }
            )
    };

    loadUser() {
        axios.get('users', {headers: {"Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).jwt}})
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data))
                this.setState({
                    loggedIn: true
                });
                this.props.setUser(res.data);
            })
            .catch(
                err => {
                    console.log(err)
                }
            )
    }

    render() {

        if (this.state.loggedIn) {
            return <Redirect to={'/'}/>;
        }

        return (
            <form onSubmit={this.handleSubmit}>
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