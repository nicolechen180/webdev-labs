import React from 'react';
import {getHeaders} from './utils';

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.requeryPost = this.props.requeryPost.bind(this);
    }

    // addComment () {
    //     fetch("/api/comments", {
    //         method: "POST",
    //         headers: getHeaders(),
    //         body: JSON.stringify({
    //             "post_id": postId,
    //             "text": text
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //     });
    // }

    render() {
        return (
            <div className="add-comment">
                <div className="input-holder">
                <input
                    type="text"/>
                </div>
                <button className="link">Post</button>
            </div>
        )
    }
}  

export default AddComment;