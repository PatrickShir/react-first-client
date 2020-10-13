/*
import React, {Component} from 'react';
import axios from 'axios';
//TODO: We should probably implement this into the frontend at some point
export default class Forgot extends Component {

    handleSubmit = e => {
        e.preventDefault();


        const data = {
            email: this.email
        };

        //TODO: We should probably implement this into the backend at some point
        axios.post('password/forgot', data)
            .then(res => {
                    console.log(res)
                }
            ).catch(
            err => console.log(err)
        )
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Forgot Password</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email"
                           onChange={e => this.email = e.target.value}/>
                </div>

                <button className="btn btn-primary btn-block">Submit</button>
            </form>
        )
    }
}
 */