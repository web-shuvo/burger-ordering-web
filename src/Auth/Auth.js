import React from "react";
import { connect } from "react-redux";
import { Formik } from 'formik';
import mapDispatchToprops from './AuthDispatch';
import AuthUser from './AuthUser';
import Spinner from '../Components/Spinner';


let mapStateToProps = (state) => {
    return {
        reduxState: state.BurgerState
    }
}


class Auth extends React.Component {
    state = {
        switchValue: 'Sign up',
    }

    switchHandler = () => {
        this.setState({
            switchValue: this.state.switchValue === 'Sign up' ? 'Login' : 'Sign up',
        })
    }

    render() {

        let authElem;
        if (this.props.reduxState.isLoading) {
            authElem = <Spinner />
        } else {
            authElem = (this.props.reduxState.token ? <AuthUser /> : <div className="row mt-5 px-3">
                <div className="col-lg-5 mx-auto border rounded py-3">

                    <button className="btn w-100 mb-4"
                        style={{ backgroundColor: '#c60d5c', color: 'white' }}
                        onClick={this.switchHandler}
                    >
                        <strong>Switch to {this.state.switchValue}</strong>
                    </button>



                    <Formik
                        initialValues={
                            {
                                username: '',
                                password: '',
                                repassword: ''
                            }
                        }
                        onSubmit={(values) => { this.props.AuthData(values, this.state.switchValue) }}
                        validate={(values) => {
                            let errMess = {};
                            if (!values.username) {
                                errMess.username = 'Required';
                            } else if (!values.password) {
                                errMess.password = 'Required';
                            } else if (values.password.length <= 4) {
                                errMess.password = 'Please insert more then 4 carecter'
                            } if (this.state.switchValue === 'Login') {
                                if (!values.repassword) {
                                    errMess.repassword = "Reqiured"
                                } else if (values.password !== values.repassword) {
                                    errMess.repassword = 'Password did not matched'
                                }
                            }

                            return errMess;
                        }}
                    >

                        {(props) => {
                            return (

                                <form onSubmit={props.handleSubmit} className='authForm'>

                                    <input className="form-control mb-3"
                                        name="username"
                                        type='text'
                                        value={props.values.username}
                                        onChange={props.handleChange}
                                        placeholder='Enter Username'
                                    />
                                    <p>{props.errors.username}</p>
                                    <input className="form-control mb-3"
                                        name="password"
                                        type='password'
                                        value={props.values.password}
                                        onChange={props.handleChange}
                                        placeholder='Enter Password'
                                    />
                                    <p>{props.errors.password}</p>


                                    {this.state.switchValue === 'Sign up' ?
                                        null : <>
                                            <input className="form-control mb-3"
                                                name="repassword"
                                                type='password'
                                                value={props.values.repassword}
                                                onChange={props.handleChange}
                                                placeholder='Enter Repassword'
                                            />
                                            <p>{props.errors.repassword}</p>
                                        </>

                                    }

                                    <p>{this.props.reduxState.authValidMess}</p>

                                    <button type="Submit" className="btn btn-success">
                                        {this.state.switchValue === 'Sign up' ? 'Login' : 'Sign up'}
                                    </button>
                                </form>
                            )
                        }}


                    </Formik>

                </div>
            </div>)
        }

        return (
            <>
                {authElem}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(Auth);