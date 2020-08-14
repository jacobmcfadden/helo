import React, {Component} from 'react';

import './Form.css';

class Form extends Component {
    render() {
        return (
            <div className="Form content_box">
                <h2 className="title">New Post</h2>
                <div className="form_input_box">
                    <p>Title:</p>
                    <input value=""/>
                </div>
                <div className="form_img_prev" alt="preview">
                    <img src="form_img_prev" alt="image-preview"/>
                </div>
                <div className="form_input_box">
                    <p>Image URL:</p>
                    <input value=""/>
                </div>
                <div className="form_text_box">
                    <p>Content:</p>
                    <textarea></textarea>
                </div>
                <button className="dark_button form_button">Post</button>
            </div>
        );
    }
}

export default Form;