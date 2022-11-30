let mapDispatchToprops = (dispatch) => {
    return {

        AuthData: (payload, cond) => {

            dispatch({
                type: "AUTH_LOADING",
            })

            let data = {
                email: payload.username,
                password: payload.password,
                rePassword: payload.repassword,
                returnSecureToken: true
            }


            if (cond === 'Sign up') {

                fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPtgB8mSGHwa2bHbcg7ukVR-x3Sm_1sMw", {
                    method: 'post',
                    headers: {
                        "content-type": "Application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(val => {
                        if (val.error) {
                            dispatch({
                                type: 'AUTH_VALID',
                                value: val.error.message
                            })
                        } else {

                            localStorage.setItem('token', val.idToken);
                            localStorage.setItem('userId', val.localId);
                            let expires = new Date(new Date().getTime() + (val.expiresIn * 1000));
                            localStorage.setItem('expiresIn', expires);
                            localStorage.setItem('register', val.registered)

                            dispatch({
                                type: 'SIGN_IN_SUCCESS',
                                token: val.idToken,
                                registered: val.registered,
                                userId: val.localId
                            });
                        }

                    })
                    .catch((err) => {
                        dispatch({
                            type: 'AUTH_VALID',
                            value: err.message
                        })
                    })

            } else {

                fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPtgB8mSGHwa2bHbcg7ukVR-x3Sm_1sMw", {
                    method: 'post',
                    headers: {
                        "content-type": "Application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(val => {

                        if (val.error) {
                            dispatch({
                                type: 'AUTH_VALID',
                                value: val.error.message
                            })
                        } else {
                            dispatch({
                                type: 'AUTH_VALID',
                            })
                        }

                    })
                    .catch((err) => {
                        dispatch({
                            type: 'AUTH_VALID',
                            value: err.message
                        })
                    })

            }

        },


    }
}

export default mapDispatchToprops;