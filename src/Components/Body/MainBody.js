import Burger from './burger/burger';
import Orders from './Orders/Order';
import Checkout from './Orders/CheckOut/CheckOut';
import Auth from '../../Auth/Auth';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';


let mapStateToProps = (state) => {
    return {
        reduxState: state.BurgerState
    }
}



class MainBody extends React.Component {


    render() {

        let comElem;
        if (this.props.reduxState.token === null) {
            comElem = (
                <Routes>
                    <Route path='/' element={<Burger />} />
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/*' element={<Navigate to='/auth' />} />
                </Routes>
            )
        } else {
            comElem = (
                <Routes>
                    <Route path='/' element={<Burger />} />
                    <Route path='/order' element={<Orders />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/auth' element={<Auth />} />
                </Routes>
            )
        }
        // console.log(comElem);
        return (
            <div className="container main_body">
                {comElem}
            </div>
        )

    }
}

export default connect(mapStateToProps)(MainBody);