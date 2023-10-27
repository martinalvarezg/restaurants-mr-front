import { Link } from "react-router-dom";
function Navbar (props) {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
        <h1>Market Research Tool</h1>
        <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
            <Link to="/">
            <a class="nav-link " aria-current="page"><i class="bi-pin-map"></i>Map</a>
            </Link>
            </li>
            <li className="nav-item">
            <Link to="dashboard">
            <a className="nav-link"><i class="bi-speedometer2"></i> Dashaboard</a>
            </Link>
            </li>
        </ul>
        </div>
        
    );
  }

  export default Navbar;