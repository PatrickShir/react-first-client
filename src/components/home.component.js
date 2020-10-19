import React, {Component} from "react";
import axios from 'axios';

export default class HomeComponent extends Component {

    state = {
        users: [],
    };

    componentDidMount() {
        axios.get('users')
            .then(res => {
                this.setState({
                    users: res.data
                });
            })
            .catch(
                err => {
                    this.setState({
                        message: err.response
                    })
                }
            )
    }

    render() {
        //If we have logged in
        if (this.props.user) {

            //If we are an admin
            if (this.props.user.length >= 1) {

                //Once users have been loaded
                if (this.state.users !== null) {
                    const dashboardInfo =
                        this.state.users.map((user) => <tr className='clickable-row-u' tabIndex='0' id={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                        </tr>);

                    //If users are not empty
                if (this.state.users.length > 0) {
                    return (
                        //<h2>Hi {this.props.user.firstName} {this.props.user.lastName}</h2>,
                            <div className="admin-dashboard">{this.state.users !== null ?
                                (
                                    <div className="row">
                                        <div className="col-1"/>
                                        <div className="col-10 text-center">
                                            <h1 className="display-3">Admin Dashboard</h1>
                                            <table className="table table-hover">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Email</th>
                                                    <th>Firstname</th>
                                                    <th>Lastname</th>
                                                    <th>Phone</th>
                                                    <th>Role</th>
                                                </tr>
                                                {dashboardInfo}
                                                </thead>
                                                <tbody className="tbody-user">
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-1"/>
                                    </div>
                                ) : (
                                    <h2>No users found!</h2>
                                )}
                            </div>
                    );
                }
            }}
            if (this.props.user.role === 'USER') {
                return (
                    <h2>Hi {this.props.user.firstName} {this.props.user.lastName},<br/>Upload a file/do whatever a
                        user can do!</h2>
                )
            }
        }
        return (
            <h2>You are not logged in</h2>
        )
    }
}