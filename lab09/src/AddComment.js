import React from 'react';
import {getHeaders} from './utils';

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.addComment = this.addComment.bind(this);
        this.requeryPost = this.props.requeryPost.bind(this);
    }

    handleChange(ev) {
        // console.log(ev);
        const text = ev.target.value
        // console.log(text);
        this.setState({value: text});
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.addComment();
        }
    }

    addComment () {
        fetch("/api/comments", {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                "post_id": this.props.postId,
                "text": this.state.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({value: ""});
            this.requeryPost();
        });
        this.textInput.current.focus();
    }

    render() {
        return (
            <div className="add-comment">
                <div className="input-holder">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={this.state.value}
                    ref={this.textInput}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}/>
                </div>
                <button 
                    className="link"
                    onClick = {this.addComment}>Post</button>
            </div>
        )
    }
}

export default AddComment;