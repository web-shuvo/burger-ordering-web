const InitState = {
    items: [
        { type: 'salad', amount: 0, price: 20 },
        { type: 'meat', amount: 0, price: 80 },
        { type: 'cheese', amount: 0, price: 40 }
    ],
    basePrice: 50,
    btnDisable: true,
    orders: '',
    token: null,
    registered: false,
    userId: null,
    isLoading: false,
};

const BurgerState = (States = InitState, Action) => {

    let ingredients = [...States.items];
    let bPrice;
    if (Action.type === 'SET_ITEMS') {

        for (let val of ingredients) {
            if (val.type === Action.aType) {

                val.amount++;

                bPrice = States.basePrice + val.price;
            }

        }
        let amount = ingredients.reduce((init, elem) => {
            return init + elem.amount;
        }, 0)

        return {
            ...States,
            items: ingredients,
            basePrice: bPrice,
            btnDisable: amount === 0
        };
    }
    else if (Action.type === 'REMOVE_ITEMS') {

        for (let val of ingredients) {
            if (val.type === Action.rType) {

                if (val.amount === 0) {
                    return States;
                }
                val.amount--;

                if (States.basePrice <= 50) {
                    bPrice = 50
                } else {
                    bPrice = States.basePrice - val.price;
                }

            }
        }
        let amount = ingredients.reduce((init, elem) => {
            return init + elem.amount;
        }, 0)

        return {
            ...States,
            items: ingredients,
            basePrice: bPrice,
            btnDisable: amount === 0
        };
    }
    else if (Action.type === 'FETCH_ORDERS') {
        let orderArr = [];
        for (const key in Action.payload) {
            Action.payload[key].id = key;
            orderArr.push(Action.payload[key])
        }
        // console.log(orderArr);
        return {
            ...States,
            orders: orderArr
        }
    }
    else if (Action.type === 'FETCH_ORDERS_ERROR') {
        return {
            ...States,
            errCon: true,
            orders: Action.error
        }
    }
    else if (Action.type === 'AUTH_LOADING') {
        return {
            ...States,
            isLoading: true
        }
    }
    else if (Action.type === 'SIGN_IN_SUCCESS') {
        return {
            ...States,
            isLoading: false,
            token: Action.token,
            registered: Action.registered,
            userId: Action.userId,

        }
    }
    else if (Action.type === 'AUTH_VALID') {
        return {
            ...States,
            isLoading: false,
            authValidMess: Action.value
        }
    }
    else if (Action.type === 'IS_REGISTERED') {
        return {
            ...States,
            token: Action.token,
            userId: Action.userId,
            registered: Action.register
        }
    }
    else if (Action.type === 'LOGOUT') {
        return {
            ...States,
            token: null,
        }
    }

    return States;


}

export default BurgerState;