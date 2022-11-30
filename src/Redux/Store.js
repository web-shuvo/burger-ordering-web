import { configureStore } from "@reduxjs/toolkit";
import BurgerState from './Reducers/BurgerReducer';

const MainStore = configureStore({
    reducer: {
        BurgerState,
    },


});

export default MainStore;