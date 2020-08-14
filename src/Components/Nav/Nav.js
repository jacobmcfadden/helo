import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import Arrows_keyboard_deleteIcon from '../../assets/Arrows_keyboard_deleteIcon';
import Basic_homeIcon from '../../assets/Basic_homeIcon';
import Basic_elaboration_document_plusIcon from '../../assets/Basic_elaboration_document_plusIcon';
import {connect} from 'react-redux';
import {logoutUser, getUser} from '../../ducks/reducer';
import axios from 'axios';


import './Nav.css';

class Nav extends Component {
    
    componentDidMount(){
        this.props.getUser();
    }

    logout = () => {
        axios.get('/auth/logout').then( res => {
            this.props.logoutUser();
            this.props.history.push('/');
        }).catch(err => console.log(err))
    }

    render() {
        console.log(this.props.user)
        return (
            <div className="Nav">
                <div className="nav_profile_container">
                    <div className="nav_profile_pic"><img className="nav_profile_pic" src={this.props.user.profile_pic} alt=""/></div>
                    <p>{this.props.user.username}</p>
                </div>
                <div className="nav_links">
                    <Link to="/dashboard"><Basic_homeIcon className="nav_img"/></Link>
                    <Link to="/new"><Basic_elaboration_document_plusIcon className="nav_img"/></Link>
                </div>
                <Link onClick={this.logout}><Arrows_keyboard_deleteIcon className="nav_img logout"/></Link>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{logoutUser, getUser})(Nav);