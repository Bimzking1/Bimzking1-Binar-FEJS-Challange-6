import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const user = useSelector( store => store.user.data)

    return (
        <div className="nav-container sticky-top">
            <nav className="navbar navbar-expand-md navbar-light">
                <div className="navbar-brand"></div>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div id="navlist" className="navbar-nav p-4 p-lg-0">
                        <a href="#OurServices" className="nav-item nav-link active">Our Serices</a>
                        <a href="#WhyUs" className="nav-item nav-link active">Why Us</a>
                        <a href="#Testimonial" className="nav-item nav-link active">Testimonial</a>
                        <a href="#FAQ" className="nav-item nav-link active">FAQ</a>

                        {/* <a href="index.html" className="nav-register nav-link active">Register</a> */}
                        {/* <a className="nav-register nav-link active">Logout</a> */}
                        { user !== null && <Link to="/logout" className="nav-register nav-link active">Logout</Link> }
                        {/* { user !== null && <li><Link to="/logout">Logout</Link></li> } */}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar