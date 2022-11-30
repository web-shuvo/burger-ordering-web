import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

let mapStateToProps = (state) => {
    return {
        reduxState: state.BurgerState.token
    }
}

let mapDispatchToprops = (dispatch) => {
    return {
        logout: () => {
            localStorage.clear();

            dispatch({
                type: 'LOGOUT',
            })
        }
    }
}

let AuthUser = (props) => {

    return (
        <div className="row mt-5">
            <div className="col-lg-5 mx-auto text-center authUser">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width='150' height='65' fill="wheat">
                    <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
                </svg>
                <h2>Hello, welcome</h2>

                <div style={{ marginTop: '60px', }}>
                    <NavLink to='/' style={{ color: 'white' }}>
                        <span style={{ cursor: 'pointer' }} onClick={props.logout}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='25' height='25' fill='white'>
                                <path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z" />
                            </svg>
                            Logout
                        </span>
                    </NavLink>
                </div>

            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToprops)(AuthUser);