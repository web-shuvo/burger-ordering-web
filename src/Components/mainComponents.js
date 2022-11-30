import Header from './header';
import MainBody from './Body/MainBody';
import Footer from './footer';
import React from 'react';
import { connect } from 'react-redux';

let mapDispatchToProps = (dispatch) => {
    return {
        isRegistered: (token, userId, register) => {
            dispatch({
                type: 'IS_REGISTERED',
                token,
                userId,
                register
            })
        }
    }
}


class MainComponents extends React.Component {

    render() {

        let idToken = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        let register = localStorage.getItem('register');
        let expires = new Date(localStorage.getItem('expiresIn'));
        if (idToken) {
            if (expires >= new Date()) {
                this.props.isRegistered(idToken, userId, register)
            } else {
                localStorage.clear();
            }
        }

        return (
            <>
                <Header />
                <MainBody />
                <Footer />
            </>
        )
    }
}

export default connect(null, mapDispatchToProps)(MainComponents);