import React from "react";
import { connect } from 'react-redux';
import mapDispatchToProps from './OrderDispatch';
import OrderCount from './OrderCount';
import Spinner from './../../Spinner';


let mapStateToProps = (State) => {
    return {
        reduxState: State.BurgerState
    }
}

class Orders extends React.Component {

    componentDidMount() {
        let token = this.props.reduxState.token;
        let userId = this.props.reduxState.userId;
        let query = '&orderBy="userId"&equalTo="' + userId + '"';
        fetch('https://burger-builder-009-default-rtdb.firebaseio.com/order.json?auth=' + token + query)
            .then(res => res.json())
            .then((val) => { this.props.fetchOrders(val) })
            .catch((err) => { this.props.fetchOrdersErr(err.message) })
    }

    render() {
        let order;
        if (this.props.reduxState.orders === '') {
            order = <Spinner />
        } else {
            if (this.props.reduxState.errCon) {
                order = <div className="col-lg-4 text-center border p-5">
                    <strong>{this.props.reduxState.orders}</strong>
                </div>
            }
            else {
                order = this.props.reduxState.orders.map((val) => {
                    return <OrderCount key={val.id} info={val} />
                })
            }
        }



        return (
            <div className="row mt-5 mb-5 px-3 justify-content-evenly">
                {order}

            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);