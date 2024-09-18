import AppContext from "../Context/Appcontext";
import { useContext } from "react";
import { Link } from "react-router-dom";
function Showproduct() {
  const { filterData,addToCart } = useContext(AppContext);

  return (
    <><div className="container d-flex justify-content-center align-item-center">  
    <div className="row ">
      {filterData?.map((products) => (
        <div key={products._id} className=" my-3 col-md-3 d-flex justify-content-center align-item-center">
          <div
            className="card bg-dark text-light text-center "
            style={{ width: "18rem" }}
          >
            <Link to={`/product/${products._id}`}  className="d-flex justify-content-center align-item-center p-4">
              <img
                src={products.imagesrc}
                className="card-img-top"
                alt="..."
                style={{ width: "200px", height: "200px",borderRadius:'10px',border:'2px solid yellow' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{products.title}</h5>
              <p className="card-text ">{products.description}</p>
              
              <div className="my-3">  
              <button className="btn btn-primary mx-3">
               {products.price}{" ₹"}
              </button>
              <button onClick={()=>{addToCart(products._id,products.title,products.price,1,products.imagesrc)}} className="btn btn-warning">AddToCart
              </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      </div>
    </>
  );
}

export default Showproduct;
