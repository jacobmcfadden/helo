import React, {Component} from 'react';
import Post from '../Post/Post';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';
import axios from 'axios';

import './Dashboard.css';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            searchBox: '',
            myPosts: true,
            posts:[]
        }
    }

    componentDidMount(){
        this.getPosts();
    }

   handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    logout = () => {
            this.props.logoutUser();
            this.props.history.push('/');
    }

    getPosts = () => {
        axios.get('/api/posts').then(res => {
            this.setState({
                posts: res.data
            })
        }).catch(err => {
            console.log(err);
            alert('Post Request Failed')
        })
    }
    render() {
        const {posts} = this.state
        const list = posts.map(post=> {
            return <Post post={post} key={post.id} />
        });

        return (
            <div className="Dash">
                <div className="content_box dash_filter">
                    <div className="dash_search_box">
                        <input name="searchBox" value={this.state.searchBox} className="dash_search_bar" placeholder="Search by Title" onChange={e => this.handleChange(e)}/>
                        <button className="dark_button" id="dash_reset">Search</button>
                        <button className="dark_button" id="dash_reset">Reset</button>
                    </div>
                    <div className="dash_check_box">
                        <p>My Posts</p>
                        <input name-="myPosts" type="checkbox" value={this.state.myPosts} onChange={e => this.handleChange(e)}/>
                    </div>
                </div>
                <div className="content_box dash_posts_container">
                    {list}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{getUser})(Dashboard);