import React from 'react';
import { getHeaders } from './utils';

class NavBar extends React.Component {  

    constructor(props) {
        super(props);
        this.state = { user: null };
        this.fetchUser = this.fetchUser.bind(this);
        // constructor logic
        console.log('NavBar component created');
    }

    fetchUser() {
        fetch('/api/profile', {
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({ user: data });
        })
    }

    componentDidMount() {
        // fetch posts
        console.log('NavBar component mounted');
        this.fetchUser();
    }

    render () {
        const user = this.state.user
        if (!user) {
            return (
                <div></div>  
            );
        }
        return (
            <nav className="main-nav">
                <h1>{this.props.title}</h1>
                <ul>   
                    <li><a href="/api">API Docs</a></li>
                    <li><span>{ user.username }</span></li>
                    <li><a href="/logout">Sign out</a></li>
                </ul> 
            </nav>       
        );
    }
}

export default NavBar;