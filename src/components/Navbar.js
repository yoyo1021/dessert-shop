import { NavLink } from "react-router-dom"

function Navbar({ cartData }) {
    return (<>
        <div className="bg-white sticky-top">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light bg-white px-md-3">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavLink className="navbar-brand " to="/"
                    >
                        Navbar
                    </NavLink>

                    <div className="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <NavLink className="nav-link py-3" to="/products">本店商品</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex py-2">
                        <NavLink to="/cart" className='nav-link position-relative'>
                            <i className=" bi bi-bag-fill"></i>
                            {cartData?.carts?.length !== 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartData?.carts?.length}
                                </span>
                            )}

                        </NavLink>
                    </div>

                </nav>
            </div>

        </div>
    </>)
}
export default Navbar