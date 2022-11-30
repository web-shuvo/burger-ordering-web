import React from "react";
import { connect } from 'react-redux';
import Spinner from "../../../Spinner";
import { Modal, ModalBody } from 'reactstrap';

const mapStateToProps = (state) => {
    return {
        reduxState: state.BurgerState
    }
}

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                Address: '',
                Phone: '',
                Payment: 'Select one please'
            },
            btnCon: true,
            modalControl: false,
            conditions: false,
            resultText: ''
        }
    }

    inputChangeHandler = (e) => {
        let name = e.target.id;
        let value = e.target.value;
        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            }
        })
    }



    submitEventHandler = (eve) => {
        eve.preventDefault();

        let data = {
            items: this.props.reduxState.items,
            Price: this.props.reduxState.basePrice,
            Address: this.state.values,
            userId: this.props.reduxState.userId
        };

        let token = this.props.reduxState.token;

        this.setState({
            modalControl: true
        })

        fetch('https://burger-builder-009-default-rtdb.firebaseio.com/order.json?auth=' + token, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        conditions: true,
                        resultText: 'Successfully submited',
                    })
                    setTimeout(() => {
                        this.setState({
                            modalControl: false
                        })
                    }, 2000)
                }
            })
            .catch((err) => {
                this.setState({
                    conditions: true,
                    resultText: err.message,
                })
                setTimeout(() => {
                    this.setState({
                        modalControl: false
                    })
                }, 2000)
            })

    }

    btnDisableHandler = () => {
        let Address = this.state.values.Address;
        let Phone = this.state.values.Phone;
        let Payment = this.state.values.Payment;
        let btn = !this.props.reduxState.btnDisable;
        if (Address && Phone && Payment && btn) {
            this.setState({
                btnCon: false
            })
        } else {
            this.setState({
                btnCon: true
            })
        }

    }



    render() {
        let text;
        if (this.state.conditions) {
            text = <h3>{this.state.resultText}</h3>
        } else {
            text = <Spinner />
        }

        return (
            <div className="row">

                <div className="col-lg-6 m-auto mt-5" >

                    <div className="text-center" style={{ border: '2px solid black', padding: '10px 0' }}>
                        <h2>Your tottal = {this.props.reduxState.basePrice} BDT</h2>
                    </div>
                    <form onSubmit={(e) => { this.submitEventHandler(e) }}>
                        <div className="mb-3">
                            <label htmlFor="Address" className="form-label">Address</label>
                            <textarea className="form-control" id="Address" aria-describedby="emailHelp" value={this.state.values.Address}
                                onChange={(eve) => { this.inputChangeHandler(eve); this.btnDisableHandler() }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Phone" className="form-label">Phone</label>
                            <input type="tel" className="form-control" id="Phone" value={this.state.values.Phone}
                                onChange={(eve) => { this.inputChangeHandler(eve); this.btnDisableHandler() }} />
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="Payment" className="form-label">Payment type</label>
                            <select className="form-select" aria-label="Default select example" id="Payment" value={this.state.values.Payment}
                                onChange={(eve) => { this.inputChangeHandler(eve); this.btnDisableHandler() }} >
                                <option>Select one please</option>
                                <option value="Bkash">Bkash</option>
                                <option value="Nagad">Nagad</option>
                                <option value="COD">Cash on delivery</option>
                            </select>
                        </div>
                        <div className="text-center">

                            <button type="submit" disabled={this.state.btnCon} className="btn mx-1 px-5" style={{ backgroundColor: 'rgb(198, 13, 92)', color: 'wheat', fontWeight: '600' }} >Confirm</button>

                            <button type="button" onClick={() => { window.location.assign('/') }} className="btn mx-1 px-5" style={{ backgroundColor: 'gray', color: 'wheat', fontWeight: '600' }}>Cancel</button >

                        </div>
                    </form>
                </div>
                <Modal isOpen={this.state.modalControl}  >

                    <ModalBody>
                        {text}
                    </ModalBody>

                </Modal>

            </div>
        )

    }

}

export default connect(mapStateToProps)(Checkout);