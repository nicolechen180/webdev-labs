import React from 'react';
import {getHeaders} from './utils';

class Stories extends React.Component {  

    constructor(props) {
        super(props);
        this.state = { stories: [] };
        this.fetchStories = this.fetchStories.bind(this);
        // constructor logic
        console.log('Stories component created');
    }

    componentDidMount() {
        // fetch posts
        console.log('Stories component mounted');
        this.fetchStories();
    }

    fetchStories() {
        fetch('/api/stories', {
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ stories: data });
        })
    }

    render () {
        if (!this.state.stories) {
            return (
                <div></div>  
            );
        }
        return (
            <section className="stories">
                {
                    this.state.stories.map(story => {
                        return (
                            <div>
                                <img src={ story.user.thumb_url } className="pic" alt={ 'profile pic for' + story.user.username } />
                                <p>{ story.user.username }</p>
                            </div>
                        )
                    })
                }
            </section>  
        );
    }
}

export default Stories;