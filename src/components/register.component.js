import React, {Component} from "react";
import axios from 'axios';

export default class HomeComponent extends Component {
    state = {};

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone
        };
        delete axios.defaults.headers.common.Authorization;
        axios.post('users', data).then(
            res => {
                this.setState({
                    message: res.data,
                    cls: 'success',
                });
            }
        ).catch(
            err => {
                if (err.response.status === 409) {
                    this.setState({
                        message: err.response.data,
                        cls: 'danger'
                    })
                } else {
                    this.setState({
                        message: err.response.data.message,
                        cls: 'danger'
                    })
                }
            }
        )
    };

    render() {
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
            <form onSubmit={this.handleSubmit}>
                {message}
                <h3>Sign up</h3>

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

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm Password"
                           onChange={e => this.confirmPassword = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" placeholder="First name"
                           onChange={e => this.firstName = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" placeholder="Last name"
                           onChange={e => this.lastName = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" className="form-control" placeholder="0731231234"
                           onChange={e => this.phone = e.target.value}/>
                </div>

                <button className="btn btn-primary btn-block">Sign Up</button>
            </form>
        )
    }
}