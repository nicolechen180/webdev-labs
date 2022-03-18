import React from 'react';
import {getHeaders} from './utils';

class Suggestion extends React.Component {
    constructor(props) {
        super(props);
        this.toggleFollow = this.toggleFollow.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.state = { following: null}
        this.state = { user: this.props.model}
    }

    toggleFollow(ev) {
        if (this.state.following) {
            console.log('unfollow');
            this.unfollow();
        }
        else {
            console.log(this.state.user.id)
            console.log('follow');
            this.follow();
        }
    };
    
    follow() {
        fetch("/api/following/", {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ user_id: this.state.user.id })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({ 
                following: true,
                following_id: data.id, 
            })
        });
    }
    
    unfollow() {
        fetch(`/api/following/${this.state.following_id}`, {
            method: "DELETE",
            headers: getHeaders(),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                following: false
            })
        });
    
    }

    render() {
        const user = this.state.user;
        const following = this.state.following
        return (
            <section>
                <img src={ user.thumb_url } className="pic" alt={'Profile pic for' + user.username } />
                <div>
                    <p>{ user.username }</p>
                    <p >suggested for you</p>
                </div>
                <div>
                    <button 
                        role="switch"
                        className={`link following ${following ? 'active' : ''}`}
                        aria-checked="false" 
                        aria-label={'Follow' + user.username } 
                        onClick={this.toggleFollow}>
                    { following ? 'unfollow' : 'follow'}
                    </button>
                </div>
            </section>
        )
    }

}

export default Suggestion;