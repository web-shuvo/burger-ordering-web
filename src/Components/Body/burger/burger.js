import React from "react";
import Ingredients from './../ingredients/Ingredients';
import BurgerAction from "../burger-action/burgerAction";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalComponent from './ModalComponent';
import { connect } from 'react-redux';
import BurgerDispatch from "./BurgerDispatch";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        reduxState: state.BurgerState
    }
}



class Burger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // items: [
            //     { type: 'salad', amount: 0, price: 20 },
            //     { type: 'meat', amount: 0, price: 80 },
            //     { type: 'cheese', amount: 0, price: 40 }
            // ],
            // basePrice: this.props.reduxState.basePrice,
            toggleBtn: false,
            // btnDisable: true,
        }
    }


    addIngredientHandler = (type) => {

        // let ingredients = [...this.props.reduxState.items];
        // let bPrice;
        // // let btn;
        // for (const val of ingredients) {
        //     if (val.type === type) {
        //         val.amount++;
        //         bPrice = this.state.basePrice + val.price;
        //     }
        //     // if (val.amount !== 0) {
        //     //     btn = false;
        //     // }
        // }


        // this.setState({
        //     // items: ingredients,
        //     basePrice: bPrice,
        //     // btnDisable: btn
        // })
        this.props.addItems(type);
        // this.disableHandler();
    }


    removeIngredientHandler = (type) => {

        // let ingredients = [...this.props.reduxState.items];
        // let bPrice;
        // // let btn;
        // for (const val of ingredients) {
        //     if (val.type === type) {

        //         if (val.amount === 0) {
        //             return false;
        //         }
        //         val.amount--;

        //         if (this.props.reduxState.basePrice <= 50) {
        //             bPrice = 50
        //         } else {
        //             bPrice = this.state.basePrice - val.price;
        //         }

        //     };

        //     // if (val.amount !== 0) {
        //     //     btn = false;
        //     // } else {
        //     //     btn = true
        //     // }

        // }


        // this.setState({
        //     // items: ingredients,
        //     basePrice: bPrice,
        //     // btnDisable: btn
        // })
        this.props.removeItems(type)
        // this.disableHandler();
    }

    // disableHandler = (items) => {
    //     let amount = items.reduce((init, elem) => {
    //         return init + elem.amount;
    //     }, 0)

    //     this.setState({ btnDisable: amount === 0 })
    // }


    toggleBtnHandler = () => {
        this.setState({
            toggleBtn: !this.state.toggleBtn
        })
    }




    render() {

        let amounts = this.props.reduxState.items.map(elem => {
            let elements = [...Array(elem.amount).keys()];
            // console.log(elements);
            return elements.map(_ => {
                return <Ingredients type={elem.type} key={(Math.random() * 100)} />
            })
        }).reduce((res, arrElem) => {
            return res.concat(arrElem)
        }, [])


        let emptyAmount;
        if (amounts.length === 0) {
            emptyAmount = <h2 style={{ textAlign: 'center' }}>Please add some ingredients</h2>
        }


        return (
            <div className="row pt-5">
                <div className="col-12 col-lg-6 px-5">
                    <Ingredients type='top' />
                    {emptyAmount || amounts}
                    <Ingredients type='bottom' />
                </div>

                <div className="col-12 col-lg-6 px-5 mt-5" >
                    <BurgerAction type={this.props.reduxState.items} addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler} basePrice={this.props.reduxState.basePrice} modal={this.toggleBtnHandler} btn={this.props.reduxState.btnDisable} />
                </div>

                <Modal isOpen={this.state.toggleBtn}  >
                    <ModalHeader >Your tottal price</ModalHeader>
                    <ModalBody>
                        <ModalComponent items={this.props.reduxState.items} />
                        <p>Tottal - {this.props.reduxState.basePrice} /= taka only</p>
                    </ModalBody>
                    <ModalFooter>
                        <Link to='/checkout'>
                            <Button style={{ backgroundColor: '#c60d5c' }}>
                                Go to checkout
                            </Button>
                        </Link>
                        {' '}
                        <Button color="secondary" onClick={this.toggleBtnHandler}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }

}



export default connect(mapStateToProps, BurgerDispatch)(Burger);