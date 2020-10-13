import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/home.component.js";
import Nav from "./components/navigation.component.js";
import Login from "./components/login.component.js";
import Register from "./components/register.component.js";
import Reset from "./components/reset.component.js";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import axios from "axios";

export default class App extends Component {

    state = {};

    componentDidMount = () => {
        axios.get('users').then(
            res => {
                this.setUser(res.data);
            },
            err => {
                console.log(err)
            }
        )
    };

    setUser = user => {
        this.setState({
            user: user
        });
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Nav user={this.state.user} setUser={this.setUser}/>
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Switch>
                                <Route exact path="/" component={() => <Home user={this.state.user}/>}/>
                                <Route exact path="/login" component={() => <Login setUser={this.setUser}/>}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/reset" component={Reset}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}