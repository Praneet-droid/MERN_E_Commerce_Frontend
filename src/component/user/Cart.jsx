import { useNavigate } from "react-router";
import AppContext from "../Context/Appcontext";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function Cart() {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } = useContext(AppContext);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;

    if (cart?.items?.length > 0) {
      cart?.items?.forEach((item) => {
        price += item.price;
        qty += item.qty;
      });
      setPrice(price);
      setQty(qty);
    } else {
      setPrice(0);
      setQty(0);
    }
  }, [cart, removeFromCart, clearCart]);

  return (
    <>
      {cart?.items?.length > 0 ? (
        <>
          <div className="my-5 text-center">
            <button className="btn btn-info mx-3">Total Qty: {qty}</button>
            <button className="btn btn-warning mx-3">Total Price: {price}</button>
          </div>
          {cart?.items?.map((product) => (
            <div key={product?._id} className="container bg-dark">
              <div className="d-flex justify-content-around align-item-center my-3 text-center">
                <div className="cart-img my-3">
                  <img
                    src={product?.imagesrc}
                    alt="Product"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="cart_des text-white font-sans">
                  <h2>{product?.title}</h2>
                  <h4>{product?.price}</h4>
                  <h4>QTY: {product?.qty}</h4>
                </div>
                <div className="cart_action text-white my-auto">
                  <button
                    onClick={() => decreaseQty(product.productId, 1)}
                    className="btn btn-secondary mx-3"
                  >
                    Qty--
                  </button>
                  <button
                    onClick={() =>
                      addToCart(product.productId, product.title, product.price / product.qty, 1, product.imagesrc)
                    }
                    className="btn btn-info mx-3"
                  >
                    Qty++
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Are You Sure You Want To Remove This Product From Cart?")) {
                        removeFromCart(product.productId);
                      }
                    }}
                    className="btn btn-danger mx-3"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          {cart?.items?.length > 0 && (
            <div className="container text-center">
              <button className="btn btn-warning mx-3" onClick={() => navigate("/shipping")}>
                Checkout
              </button>
              <button
                className="btn btn-danger mx-3"
                onClick={() => {
                  if (confirm("Are You Sure?")) {
                    clearCart();
                  }
                }}
              >
                Clear Cart
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center my-5">
        <button className="btn btn-info text-center align-center" onClick={()=>{navigate('/')}}>Continue Shopping...</button>
        </div>
      )}
    </>
  );
}

export default Cart;
