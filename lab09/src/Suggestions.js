import React from 'react';
import {getHeaders} from './utils';
import Suggestion from './Suggestion';

class Suggestions extends React.Component {  
    constructor(props) {
        super(props);
        this.state = { suggestions: [] };
        this.fetchSuggestions = this.fetchSuggestions.bind(this);
        console.log('Suggestions component created');
    }

    componentDidMount() {
        // fetch suggestions
        this.fetchSuggestions();
        console.log('Suggestions component mounted');
    }

    fetchSuggestions() {
        fetch('/api/suggestions', {
            // authentication headers added using 
            // getHeaders() function from src/utils.js
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({ suggestions: data });
        })
    }

    render () {
        if (!this.state.suggestions) {
            return (
                <div></div>
            );
        }
        return (
            <div className="suggestions">
                <p className="suggestion-text">Suggestions for you</p>
                <div>
                    {
                        this.state.suggestions.map(suggestedUser => {
                            return (
                                <Suggestion
                                    model = {suggestedUser}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )     
    }
}

export default Suggestions;