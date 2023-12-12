import { Link } from "react-router-dom"

function Footer() {
    return (
        <>
            <div className="bg-dark">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between text-white py-4">
                        <p className="mb-0">© 2023 / 本網站僅供練習，非實際商業用途</p>
                        <Link to='/adminLogin' target='_blank' className='btn'>後台</Link>
                        {/* <ul className="d-flex list-unstyled mb-0 h4">
                            <li><a href="#" className="text-white mx-3"><i className="fab fa-facebook"></i></a></li>
                            <li><a href="#" className="text-white mx-3"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="#" className="text-white ms-3"><i className="fab fa-line"></i></a></li>
                        </ul> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer