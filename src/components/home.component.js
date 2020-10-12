import React, {Component} from "react";

export default class HomeComponent extends Component {

    render() {
        if (this.props.user){
            return (
                <h2>Hi {this.props.user.firstName} {this.props.user.lastName}</h2>
            )
        }
        return (
            <h2>You are not logged in</h2>
        )
    }
}