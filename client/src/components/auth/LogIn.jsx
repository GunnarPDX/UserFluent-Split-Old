import "./auth.scss";
import '../../views/forms.scss'
import React, { Component } from 'react';
import LoadingButton from '../loader/LoadingButton';
import { runValidityCheck } from '../helpers/InputVerification'


class LogIn extends Component {

    state = {
        email: '',
        password: '',
        loading: 'false',
    };

    handleChange = (e) => {

        let newValue = e.target.value;
        let key = e.target.name;
        this.setState({
            [key]: newValue,
            loading: 'false'
        });
    };

    isFormValid = () => {

        let fields = [
            {
                'id' : 'email',
                'validationType'   : 'email',
                'data' : this.state.email
            },
            {
                'id' : 'password',
                'validationType'   : 'password',
                'data' : this.state.password,
            },
        ];

        return runValidityCheck(fields);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if(!this.isFormValid()) return;

        this.setState({loading: 'true'});

        let currentComponent = this;
        let token = document.querySelector('meta[name="csrf-token"]').content;
        fetch('api/v1/new_session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': token
            },
            redirect: "error",
            body: JSON.stringify(currentComponent.state)
        })
            .then( resp => {
                if (!resp.ok) { throw resp }
                console.log(resp.text())
            })
            .then(resp => {
                currentComponent.setState({loading: 'success'});
                window.location.reload(false);
            })
            .catch( err => {
                err.text().then( errorMessage => {
                    currentComponent.setState({loading: 'failed'});
                    console.log(errorMessage);
                })
            });
    };

    render() {
        let props = {
            loading: this.state.loading,
            form: 'login-form',
            button_title: 'Log In',
        };

        if(!this.props.show){return null;}
        return (
            <div className={'auth-modal-box'}>
                <div className={'auth-modal'}>

                    <button onClick={this.props.onClose} className={'auth-modal-close-button'}>
                        &times;
                    </button>


                    <h1 className={'auth-modal-header'}>Log In</h1>

                    {/*
                    <a className={'auth-modal-link-alert'} href={'https://userfluent-test-deployment.herokuapp.com/users/sign_in'}>
                        Is this page not working?
                    </a>
                    <br/>
                    */}

                    <a className={'auth-modal-link'} onClick={this.props.toggleModal}>
                        Don't have an account?
                    </a>

                    <form onSubmit={this.handleSubmit.bind(this)} id={'login-form'}>

                        <div className={'uf-modal-form-item-row'}>
                            <input type={'text'} name={'email'} placeholder={'Account Email'} className={'uf-modal-form-field'} onChange={this.handleChange} id={'email'}/>
                        </div>

                        <div className={'uf-modal-form-item-row'}>
                            <input type={'password'} name={'password'} placeholder={'Account Password'} className={'uf-modal-form-field'} onChange={this.handleChange} id={'password'}/>
                        </div>

                    </form>

                    <a className={'auth-modal-link'}>
                        Forgot Password?
                    </a>

                    <div className={"uf-modal-button-container"}>
                        <LoadingButton {...props}/>
                    </div>

                </div>
            </div>
        )
    }
}
export default LogIn;