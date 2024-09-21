import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
function ProductDetail() {
  const { id } = useParams();
  const url = "https://mern-e-commerce-cjkd.onrender.com/api";

  const [product, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      setProducts(api.data.product);
    };

    fetchProduct();
  }, [id]);
  return (
    <>
    <div className="container my-5  ">
  <div className="row align-items-center ">
    {/* Product Image (Left) */}
    <div className="col-md-5 d-flex justify-content-center">
      <img
        className="rounded-xl img-fluid"
        src={product?.imagesrc}
        alt={product?.title}
        style={{ width: "250px", height: "250px" }}
      />
    </div>

    {/* Product Description (Right) */}
    <div className="col-md-7">
      <h1>{product?.title}</h1>
      <p>{product?.description}</p>
      <div className="my-5">
        <button className="btn btn-danger mx-3">Buy NOW</button>
        <button className="btn btn-warning">Add To Cart</button>
      </div>
    </div>
  </div>
</div>

    <RelatedProduct category={product?.category}/>
    </>
  );
}

export default ProductDetail;
