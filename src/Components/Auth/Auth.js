import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../../ducks/reducer';

import logo from '../../logo.svg';
import './Auth.css';

class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    // toggle = () => {
    //     this.setState({
    //         newUser: !this.state.newUser
    //     })
    // }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = () => {
        const {username, password} = this.state;
        axios.post('/auth/login', {username, password}).then(res => {
            console.log("Login Success!");
            this.props.loginUser(res.data);
            this.props.history.push('/dashboard')
        }).catch(err => {
            console.log(err);
            alert('Login Failed')
        })
    }

    register = () => {
        const {username, password} = this.state;
        axios.post('/auth/register', {username, password}).then(res => {
            this.props.loginUser(res.data);
            console.log('user has been registered')
            this.props.history.push('/dashboard');
        }).catch(err => {
            console.log(err);
            alert('Register Failed')
        })
    }

    render() {
        const {username, password} = this.state;
        return (  
            <div className="Auth">
                <div className="auth_container">
                    <img src={logo} alt="logo" className="logo"/>
                    <h1 className="auth_title">Helo</h1>
                    <div className="auth_input_box"><p>Username:</p><input onChange={e => this.changeHandler(e)} name="username" type="text" value={username} placeholder="Username"/></div>
                    <div className="auth_input_box"><p>Password:</p><input onChange={e => this.changeHandler(e)} name="password" type="password" value={password} placeholder="Password"/></div>
                    <div className="auth_button_container">
                        <button className="dark_button" onClick={this.login}> Login </button>
                        <button className="dark_button" onClick={this.register}> Register </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {loginUser})(Auth);