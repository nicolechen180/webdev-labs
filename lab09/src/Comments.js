import React from 'react';

class Comments extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        console.log('Comments component created');
    }

    componentDidMount() {
        // fetch posts
        console.log('Comments component mounted');
    }

    render () {
        const comments = this.props.comments;
        if (comments.length === 0) {
            return (
                <div></div>  
            );
        }
        const lastComment = comments[comments.length - 1];
        if (comments.length > 1) {
            return (
                <div>
                    <div id={'view-comments-wrapper-' + this.props.postId}>
                        <p><button className="link" id={'viewComments-' + this.props.postId }>
                            view all {comments.length} comments
                        </button></p>
                    </div>
                    <div id={'last-comment-wrapper-' + this.props.postId}>
                        <p><strong>{lastComment.user.username}</strong> 
                            {lastComment.text}
                        </p>
                        <div className = "timestamp">{lastComment.display_time}</div>
                    </div>
                </div>
            )
        }
        return (
            <div id={'last-comment-wrapper-' + this.props.postId}>
                <p>
                    <strong>{lastComment.user.username}</strong> 
                    {lastComment.text}
                </p>
                <div className = "timestamp">{lastComment.display_time}</div>
            </div>
        )
    }
}

export default Comments;