import React, {Component} from 'react';

class App extends Component {

    constructor() {
        super()
        this.state = {
            username: null,
            password: null,
            login: false,
            store: null
        }
    }

    componentDidMount() {
        this.storeCollector()
    }

    storeCollector() {
        let store = JSON.parse(localStorage.getItem('login'));
        if (store && store.login) {
            this.setState({login:true,store:store})
        }
    }

    login() {
        fetch('http://localhost:8080/api/auth', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }).then((response) => {
            response.text().then((result) => {
                console.warn("result", result);
                localStorage.setItem('login', JSON.stringify({
                    login: true,
                    token: result.substring(8, 163),
                    refreshtoken: result.substring(172, 327)
                }))
                this.storeCollector();
            })
        })
    }

    post() {
        fetch('http://localhost:8080/api/auth', {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }).then((response) => {
            response.text().then((result) => {
                console.warn("result", result);
            })
        })
    }

    render() {
        return (
            <div>
                <h1>jwt token with React</h1>
                {
                    !this.state.login ?
                        <div>
                            <input type="text" onChange={(event) => {
                                this.setState({username: event.target.value})
                            }}/> <br/> <br/>
                            <input type="password" onChange={(event) => {
                                this.setState({password: event.target.value})
                            }}/> <br/> <br/>
                            <button onClick={() => {
                                this.login()
                            }}>Login
                            </button>
                        </div>
                        :
                        <div>
                            <textarea onChange={(event) => this.setState({post: event.target.value})}></textarea>
                            <button onClick={() => {
                                this.post()
                            }}>Post
                            </button>
                        </div>
                }
            </div>
        );
    }
}

export default App