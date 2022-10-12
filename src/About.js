import Nav from "./Components/Nav";
import "./PageLayout.css";

export default function About(){
    return (
        <>
        <div className="Page-Nav">
            <Nav title="about"/>
        </div>
        <div className="Page-Content">
            About Section
        </div>
        </>
    );
}

