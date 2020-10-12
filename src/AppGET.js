import React, {Component} from 'react';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/users')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    users: json,
                })
            });
    }


    render() {

        var { isLoaded, users } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">

                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                ID: {user.id} | Email: {user.email} | Role: {user.role} | Firstname: {user.firstName} | Lastname: {user.lastName} | Phone: {user.phone}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default App;
