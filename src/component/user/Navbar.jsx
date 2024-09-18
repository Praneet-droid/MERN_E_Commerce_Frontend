import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import AppContext from "../Context/Appcontext";
import { useContext } from "react";
function Navbar() {
  const [searchItems, setSearchItems] = useState("");
  const location = useLocation();
  const filterByCategory = (cat) => {
    setFilteredData(
      product.filter((data) => data.category.toLowerCase() == cat.toLowerCase())
    );
  };
  const filterByPrice = (price) => {
    setFilteredData(product.filter((data) => data.price >= price));
  };
  const navigate = useNavigate();
  const { setFilteredData, product, logout, isAuthenticated, userProfile,cart } =
    useContext(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchItems}`);
  };
  
  
  return (
    <>
      <div className="container-fluid sticky-top ">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            {/* Left part of the navbar: Title */}
            <Link to="/" className="navbar-brand">
              <h1 className="text-light">MERN E-Commerce</h1>
            </Link>

            {/* Right part of the navbar: Search and Buttons */}
            <form className="search_bar" onSubmit={handleSubmit}>
              <div className="d-flex ms-auto">
                <CiSearch className="search_bar" />
                <input
                  list="items"
                  type="search"
                  value={searchItems}
                  id="searchbar"
                  className=" search-bar-input form-control me-2"
                  placeholder="Search"
                  onChange={(e) => setSearchItems(e.target.value)}
                />

                <div className="d-flex align-items-center">
                  {isAuthenticated && (
                    <>
                    
                      <Link
                      to={'/cart'}
                      
                        type="button"
                        className="btn btn-primary mx-3 position-relative"
                      >
                        <FaShoppingCart className="d-flex"/>
                        {cart?.items?.length>0&&( <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cart?.items?.length}
                        
                        </span>)}
                        
                      </Link>
                    
                      <button
                        className="btn btn-warning mx-1"
                        onClick={userProfile}
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="btn btn-danger mx-1"
                      >
                        Logout
                      </button>
                    </>
                  )}

                  {!isAuthenticated && (
                    <>
                      <Link to={"/login"} className="btn btn-secondary mx-1">
                        Login
                      </Link>
                      <Link to={"/register"} className="btn btn-info mx-1">
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </nav>
      </div>
      {location.pathname == "/" && (
        <div className="sub_bar">
          <div className="items" onClick={() => setFilteredData(product)}>
            No Filter
          </div>
          <div className="items" onClick={() => filterByCategory("mobiles")}>
            Mobiles
          </div>
          <div className="items" onClick={() => filterByCategory("laptop")}>
            Laptops
          </div>
          <div className="items" onClick={() => filterByCategory("camera")}>
            Camera
          </div>
          <div className="items" onClick={() => filterByCategory("headphones")}>
            Headphones
          </div>
          <div className="items" onClick={() => filterByPrice(15999)}>
            15999
          </div>
          <div className="items" onClick={() => filterByPrice(25999)}>
            25666
          </div>
          <div className="items" onClick={() => filterByPrice(6999)}>
            69999
          </div>
          <div className="items" onClick={() => filterByPrice(89999)}>
            89999
          </div>
          <div className="items" onClick={() => filterByPrice(99999)}>
            99999
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
