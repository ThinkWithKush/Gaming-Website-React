import { useState } from "react";
import Nav from "./Components/Nav.js";
import Footer from "./Components/Footer.js";
import GameList from "./Components/Games/GamesList.js";
import "./PageLayout.css";
import { Link } from "react-router-dom";

export default function Home (){

    const  [joke,setJoke] = useState("It's better to die than living dead.");

    const getJoke = () =>{
        fetch('https://api.chucknorris.io/jokes/random').then(response=>response.json()).then(data=>setJoke(data.value))
    }

    return (
        <>
        {/* Nav and Banner */}
        <div className="Page-Nav">
            <Nav title="home"/>
        </div>
        <div className="Page-Content" id="Banner">
            <div className="Page-Element d-flex align-items-center" id="jumbo-container">
                <div>
                    <div className="d-none d-md-flex" id="jumbo-container-text"><strong> <div className="remtext"><span className="first-letter">W</span><span className="remtext">elcome To</span> <span className="first-letter">F</span><span className="remtext">un</span> <span className="first-letter">F</span><span className="remtext">actory</span><br/> We manufacture smiles here : )</div></strong></div>
                    {/* <div onMouseOver={getJoke} onMouseDown={getJoke}>{joke}</div> */}
                </div>
            </div>
            <div className="jumbo-bg-fade"></div>
        </div>

        {/* Page Content */}
        <div className="Page-Content px-3">
            <div className="row row-content">

                {/* Left SideBar */}
                <div className="sidebar d-none d-sm-flex col-0 col-sm-3 col-md-2">
                    {/* <div className="left-sidebar bg-black d-none d-sm-flex col-0 col-sm-3 col-md-2">
                        <ul className="list-unstyled container px-5">
                            <li><a href="#Games">Games</a></li><hr/>
                            <li><a href="#Memes">Memes</a></li>
                        </ul>
                    </div> */}
                </div>

                {/* Games */}
                <div className="col-12 col-sm-9 col-md-10">
                    <h1 className="label" id="Games">Games </h1><br/>
                    <div className="container games-container row">
                    {
                        GameList.map((item,id)=>{
                        return (
                            <div className="col-12 col-sm-6 col-md-4" key={`Game ${item.id}`} >
                            <Link to={item.path}><div className="shadow-lg gamecard card">
                                {/* <img className="fluid" src={item.logo} alt='Game_Icon'/> */}
                                <div className="card-body">
                                    <img className="img-fluid game-logo" src={item.logo} alt="Game_Icon"/>
                                    <strong>{item.title}</strong><br/>
                                    {item.desc}
                                </div>
                            </div></Link>
                            </div>
                        )
                        })
                    }
                    </div>
                    
                    <br/><br/>
                    <h1 className="label" id="Memes"> Memes </h1>
                    <p>{joke}</p>
                    <button className="btn btn-primary" onClick={getJoke}>New Joke</button>
                </div>
            </div>
        </div>

        <div>
            <Footer/>
        </div>
        </>
    )
};