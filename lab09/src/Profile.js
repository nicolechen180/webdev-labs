import React from 'react';
import {getHeaders} from './utils';

class Profile extends React.Component {  

    constructor(props) {
        super(props);
        this.state = { profile: null };
        this.fetchProfile = this.fetchProfile.bind(this);
        // constructor logic
        console.log('Profile component created');
    }

    componentDidMount() {
        // fetch posts
        console.log('Profile component mounted');
        this.fetchProfile();
    }

    fetchProfile() {
        fetch('/api/profile', {
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({ profile: data });
        })
    }

    render () {
        const profile = this.state.profile
        if (!profile) {
            return (
                <div></div>  
            );
        }
        return (
            <header>
                <img src={ profile.thumb_url } className="pic" alt={ 'profile pic for' + profile.username } /> 
                <h2>{ profile.username }</h2>    
            </header>
        );
    }
}

export default Profile;