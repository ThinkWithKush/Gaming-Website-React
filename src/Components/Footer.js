import React from "react";
import { Link } from "react-router-dom";

const Footer = ()=>{
    return (
        <>
        <footer className="style-footer">
            <div className="container justify-content-center">
                Send Us your Feedback <Link to="../Contact" className="btn btn-sm btn-white"> Send Feedback </Link>
            </div>
            <div className="row justify-content-center">Copyright 2022 | Fun Factory</div>
        </footer>
        </>
    )
};

export default Footer;