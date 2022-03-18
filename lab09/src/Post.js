import React from 'react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';
import {getHeaders} from './utils';

class Post extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.model
        }

        this.requeryPost = this.requeryPost.bind(this);
    }

    requeryPost() {
        fetch(`/api/posts/${this.state.post.id}`, {
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    post: data
                });
            });
    }
    
    render () {
        const post = this.state.post;
        if (!post) {
            return (
                <div></div>  
            );
        }
        return (
            <section className="card">
                <div className="header">
                    <h3>{ post.user.username }</h3>
                    <i className="fa fa-dots"></i>
                </div>
                
                <img 
                    src={ post.image_url } 
                    alt={'Image posted by ' +  post.user.username } 
                    width="300" 
                    height="300" />
                
                <div className="info">
                    <div className="buttons">
                        <div>
                            <LikeButton 
                                postId={post.id} 
                                likeId={post.current_user_like_id}
                                requeryPost={this.requeryPost} />
                            <i className="far fa-comment"></i>
                            <i className="far fa-paper-plane"></i>
                        </div>
                        <div>
                            <BookmarkButton
                                postId={post.id}
                                bookmarkId={post.current_user_bookmark_id}
                                requeryPost={this.requeryPost} />
                        </div>
                    </div>
                    <p className={'likes-' + post.id}><strong> { post.likes.length } like{post.likes.length !== 1 ? 's' : ''}</strong></p>
                    <div className="caption">
                        <p>
                        <strong> { post.user.username }</strong> 
                        { post.caption }.. <button className="link">more</button>
                        </p>
                    </div>
                    <div className="comments">
                        <div className="add-comment">
                            <div className="input-holder">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."/>
                            </div>
                            <button className="link">Post</button>
                        </div>
                    </div>
                </div>
            </section> 
        );     
    }
}

export default Post;