import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator'

import { connect } from 'react-redux';
import { login } from '../actions/auth';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger">
                Ce champ est important
            </div>
        );
    }
};

const email = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Cet email est invalide.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                le nom d'utilisateur doit contenir entre 3 et 20 charactaires.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        <div className="alert alert-danger" role="alert">
            le password doit contenir entre 6 et 40 chatactaires
        </div>
    }
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
            successful: false,
        };
    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            successful: false,
        });

        this.form.validetedAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.props
                .dispatch(
                    register(this.state.username, this.state.email, this.state.password))
                .then(() => {
                    this.setState({
                        successful: true,
                    });
                })
                .catch(() => {
                    this.setState({
                        successful: false,
                    });
                });
        }
    }

    render() {
        const { message } = this.props;

        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                </div>

                <Form
                    onSubmit={this.handleRegister}
                    ref={(c) => {
                        this.form = c;
                    }}
                >
                    {!this.state.successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input type="text"
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUserName}
                                    validations={[required, vusername]}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input type="text"
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    validations={[required, email]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input type="text"
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    validations={[required, vpassword]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary"> Sign Up </button>
                            </div>

                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={(c) => {
                                    this.checkBtn = c;
                                }}
                            />
                        </div>
                    )}

                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { message } = state.message;

    return {
        message
    };
}

export default connect(mapStateToProps)(Register);