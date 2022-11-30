import React from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavbarText } from 'reactstrap';
import Logo from './../assets/images/burger-logo.png';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        reduxState: state.BurgerState
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navToggle: false,
        }
    }

    setToggle = () => {
        this.setState({
            navToggle: !this.state.navToggle,
        })
    }


    render() {

        let navItems;
        if (this.props.reduxState.token === null) {
            navItems = (
                <NavItem>
                    <NavLink to="/">Home</NavLink>
                </NavItem>
            )

        } else {
            navItems = (
                <>
                    <NavItem>
                        <NavLink to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/order">Order</NavLink>
                    </NavItem>
                </>
            )
        }

        return (
            <>
                <Navbar expand="sm" container>
                    <NavbarBrand href="/">
                        <img src={Logo} alt="Logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.setToggle}>
                        <i className={`fa-solid ${this.state.navToggle ? 'fa-xmark' : 'fa-bars'}`} ></i>
                    </NavbarToggler>
                    <Collapse isOpen={this.state.navToggle} navbar>
                        <Nav className="m-auto" navbar >
                            {navItems}
                        </Nav>
                        <NavbarText>
                            <NavLink to="/auth">
                                <i className="fa-solid fa-user fs-4 text-white"></i>
                            </NavLink>
                        </NavbarText>
                    </Collapse>
                </Navbar>

            </>
        )
    }
}

export default connect(mapStateToProps)(Header);