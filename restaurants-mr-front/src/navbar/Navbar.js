function Navbar (props) {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
        <h1>Market Research Tool</h1>
        <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
            <a class="nav-link " aria-current="page" href="#"><i class="bi-pin-map"></i>Map</a>
            </li>
            <li className="nav-item">
            
            <a className="nav-link" href="#"><i class="bi-speedometer2"></i> Dashaboard</a>
            </li>
        </ul>
        </div>
        
    );
  }

  export default Navbar;