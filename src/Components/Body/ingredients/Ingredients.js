import React from "react";
import Meat from './../../../assets/images/meat.png';
import Cheese from './../../../assets/images/cheese.png';
import Salad from './../../../assets/images/salad.png';
import Top from './../../../assets/images/top.png';
import Bottom from './../../../assets/images/bottom.png';


class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let Ingredient;
        switch (this.props.type) {
            case 'top':
                Ingredient = <img src={Top} alt="burger-top" className="w-100" />
                break;
            case 'meat':
                Ingredient = <img src={Meat} alt="burger-top" className="w-100" />
                break;
            case 'cheese':
                Ingredient = <img src={Cheese} alt="burger-top" className="w-100" style={{ borderRadius: '50px' }} />
                break;
            case 'salad':
                Ingredient = <img src={Salad} alt="burger-top" className="w-100" style={{ borderRadius: '50px' }} />
                break;
            case 'bottom':
                Ingredient = <img src={Bottom} alt="burger-top" className="w-100" />
                break;
            default:
                Ingredient = null;
        }
        return (
            <div>
                {Ingredient}
            </div>
        )
    }

}

export default Ingredients;