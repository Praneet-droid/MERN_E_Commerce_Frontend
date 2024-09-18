import { Link,useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import AppContext from "../Context/Appcontext"
function SearchProduct() {
const {product} =useContext(AppContext)
const [searchProduct,setSearchProduct]=useState([])

const {term}=useParams()
useEffect(()=>{
    setSearchProduct(product.filter((data)=>data?.title?.toLowerCase().includes(term.toLowerCase())))

},[product,term])  

return (
   <>
   <div className="container text-center">
    <h1> Related Products</h1>
    <div className="container d-flex justify-content-center align-item-center">  
    <div className="row ">
      {searchProduct?.map((product) => (
        <div key={product._id} className=" my-3 col-md-3 d-flex justify-content-center align-item-center">
          <div
            className="card bg-dark text-light text-center "
            style={{ width: "18rem" }}
          >
            <Link to={`/product/${product._id}`}  className="d-flex justify-content-center align-item-center p-4">
              <img
                src={product.imagesrc}
                className="card-img-top"
                alt="..."
                style={{ width: "200px", height: "200px",borderRadius:'10px',border:'2px solid yellow' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text ">{product.description}</p>
              
              <div className="my-3">  
              <button className="btn btn-primary mx-3">
               {product.price}{" ₹"}
              </button>
              <button className="btn btn-warning">AddToCart
              </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      </div>
    

   </div>
   </>
  )
}

export default SearchProduct;
