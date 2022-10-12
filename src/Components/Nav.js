// import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/img/logo.png';

const Nav = (props) => {

  return (
    <>
      <nav className="navbar shadow navbar-expand-md bg-dark navbar-dark fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/">
              <img className="logo-image shadow img-sm img-fluid" src={logo} alt="LOGO"/>
            </Link>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#NavList"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="NavList">
            <ul className="navbar-nav mr-0 ms-auto">
                <li className="nav-item"><br></br></li>
                <li className="nav-item"><Link to="../home" className={"nav-link "+(props.title==="home"?"active":"")}>Home</Link></li>
                <li className="nav-item"><Link to="../about" className={"nav-link "+(props.title==="about"?"active":"")}>About</Link></li>
                <li className="nav-item"><Link to="../contact" className={"nav-link "+(props.title==="contact"?"active":"")}>Contact</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
