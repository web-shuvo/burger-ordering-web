let mapDispatchToProps = (dispacth) => {
    return {

        fetchOrders: (orders) => {
            dispacth({
                type: 'FETCH_ORDERS',
                payload: orders
            })
        },
        fetchOrdersErr: (error) => {
            dispacth({
                type: 'FETCH_ORDERS_ERROR',
                error: error
            })
        }

    }
}

export default mapDispatchToProps;