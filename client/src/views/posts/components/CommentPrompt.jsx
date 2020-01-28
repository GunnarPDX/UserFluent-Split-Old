import React, { Component } from 'react'
import LoadingButton from "../../../components/loader/LoadingButton";

class CommentPrompt extends Component {

    state = {
        content: '',
        post_id: '',
        loading: 'false',
    };

    handleChange = e => {
        let newValue = e.target.value;
        let key = e.target.name;
        this.setState({
            [key]: newValue,
            post_id: this.props.post_id,
            loading: 'false'
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let currentComponent = this;

        this.setState({loading: 'true'});

        let data = {post: this.state};
        let token = document.querySelector('meta[name="csrf-token"]').content;
        fetch('api/v1/comments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': token
            },
            redirect: "error",
            body: JSON.stringify(this.state)
        })
            .then( resp => {
                if (!resp.ok) { throw resp };
                console.log(resp.json());
            })
            .then(post => {
                this.setState({loading: 'success'});
                window.location.reload(false); {/* This should call callback function to update props in parent instead */}
            })
            .catch( err => {
                err.text().then( errorMessage => {
                    currentComponent.setState({loading: 'failed'});
                    console.log(errorMessage);
                })
            });

    };

    renderForm = () => {

        let props = {
            loading: this.state.loading,
            form: 'comment-form',
            button_title: 'submit',

        }

        return(
            <form onSubmit={this.handleSubmit.bind(this)} id="comment-form">

                            <div className="comment-prompt-box">

                                <p>

                                    <textarea
                                    name="content"
                                    rows="8"
                                    onChange={this.handleChange}
                                    placeholder={"Type here to create a comment."}
                                    className="comment-text-area"
                                    />

                                </p>

                                {/*<input type="submit" value="Submit Comment" className={"standard-button"} />*/}

                                <LoadingButton {...props}/>


                            </div>

                        </form>
        )

    }

    render() {
        return (
            <div>
                {this.renderForm()}
            </div>
        )
    }

}
export default CommentPrompt