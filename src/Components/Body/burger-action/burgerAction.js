import React from "react";

class BurgerAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        let items = this.props.type.map((val, ind) => {
            return (
                <div key={ind} className='row my-1'>
                    <div style={{ fontSize: '20px', fontWeight: '700' }} className='col-4 text-center'>
                        {val.type} - {val.price}
                    </div>
                    <div className='col-8 text-center'>
                        <button className="btn btn-danger btn-md mx-1" onClick={() => this.props.removeIngredient(val.type)}>less</button>
                        <button className="btn btn-success btn-md mx-1" onClick={() => this.props.addIngredient(val.type)}>more</button>
                    </div>
                </div>
            )
        })


        return (
            <div className="card">
                <div className="card-header text-center" style={{ backgroundColor: '#c60d5c', color: 'wheat' }}>
                    <h4>Add Ingredients</h4>
                </div>
                <div className="card-body">
                    {items}
                </div>
                <div className="card-footer text-center">
                    <strong>Price: {this.props.basePrice} BDT</strong>
                </div>
                <button disabled={this.props.btn} onClick={this.props.modal} style={{ padding: '10px 0 10px 0', marginTop: '25px', backgroundColor: 'rgb(198, 13, 92)', color: 'wheat', }}><strong>Order now</strong></button>
            </div>
        )
    }
}


export default BurgerAction;