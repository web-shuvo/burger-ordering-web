const BurgerDispatch = (dispatch) => {
    return {

        addItems: (ItemsType) => {
            dispatch({
                type: 'SET_ITEMS',
                aType: ItemsType
            })
        },

        removeItems: (ItemType) => {
            dispatch({
                type: 'REMOVE_ITEMS',
                rType: ItemType
            })
        },



    }
}

export default BurgerDispatch;