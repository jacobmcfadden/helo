import React, {Component} from 'react';

import './Post.css';
import { Link } from 'react-router-dom';

class Post extends Component {
    render() {
        return (
            <Link to={`/post/${this.props.post.id}`}>      
                <div className="content_box dash_post_box">
                    <h3>{this.props.post.title}</h3>
                    <div className="author_box">
                        <p>
                            {this.props.post.author_id}
                        </p>
                        <img src={`https://robohash.org/${this.props.post.author_id}`} alt="author"/>
                    </div>
                </div>
            </Link>
        );
    }
}

export default Post;