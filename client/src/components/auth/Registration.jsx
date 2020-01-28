import "./auth.scss";
import '../../views/forms.scss'
import React, { Component } from 'react';
import LoadingButton from "../loader/LoadingButton";
import { withRouter } from "react-router-dom";
import { runValidityCheck } from '../helpers/InputVerification'

class Registration extends Component {


    state = {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        loading: 'false',
    };

    handleChange = e => {

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
                id: "email",
                validationType: "email",
                data: this.state.email
            },
            {
                id: "username",
                validationType: "username",
                data: this.state.username
            },
            {
                id: "password",
                id2: "password_confirmation",
                validationType: "passwords",
                data: this.state.password,
                confirmation: this.state.password_confirmation
            }
        ];

        return runValidityCheck(fields);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.isFormValid()) return; //check validity

        this.setState({loading: 'true'});

        let currentComponent = this;
        let token = document.querySelector('meta[name="csrf-token"]').content;
        fetch('api/v1/new_user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': token
            },
            redirect: "error",
            body: JSON.stringify(currentComponent.state)
        })
            .then( resp => {
                if (!resp.ok) { throw resp }
                //console.log(resp.json())
            })
            .then(resp => {
                //console.log('resp.json()');
                currentComponent.setState({loading: 'success'});
                currentComponent.props.history.push('/welcome');
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
            button_title: 'Sign Up',
        };

        if(!this.props.show){return null;}
        return (
            <div className={'auth-modal-box'}>
                <div className={'auth-modal'}>

                    <button onClick={this.props.onClose} className={'auth-modal-close-button'}>
                        &times;
                    </button>


                    <h1 className={'auth-modal-header'}>Sign Up</h1>

                    {/*
                    <a className={'auth-modal-link-alert'} href={'https://userfluent-test-deployment.herokuapp.com/users/sign_up'}>
                        Is this page not working?
                    </a>
                    <br/>
                    */}
                    <a className={'auth-modal-link'} onClick={this.props.toggleModal}>
                        Already have an account?
                    </a>

                    <form onSubmit={this.handleSubmit.bind(this)} id={'login-form'}>

                        <div className={'uf-modal-form-item-row'}>
                            <input type={'text'} name={'username'} placeholder={'Username (A-Z, Numbers, _ - , and must be 3-16 characters)'} className={'uf-modal-form-field'} onChange={this.handleChange} id={'username'}/>
                        </div>

                        <div className={'uf-modal-form-item-row'}>
                            <input type={'text'} name={'email'} placeholder={'Email'} className={'uf-modal-form-field'} onChange={this.handleChange} id={'email'}/>
                        </div>

                        <div className={'uf-modal-form-item-row'}>
                            <input type={'password'} name={'password'} placeholder={'Password'} className={'uf-modal-form-field'} onChange={this.handleChange} id={'password'}/>
                        </div>

                        <div className={'uf-modal-form-item-row'}>
                            <input type={'password'} name={'password_confirmation'} placeholder={'Confirm Password'} className={'uf-modal-form-field'} onChange={this.handleChange} id={'password_confirmation'}/>
                        </div>

                    </form>

                    <div className={"uf-modal-button-container"}>
                        <LoadingButton {...props}/>
                    </div>

                </div>
            </div>
        )
    }
}
export default withRouter(Registration);