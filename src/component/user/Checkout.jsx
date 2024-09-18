import { useState } from "react";
import { useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Card,
  ListGroup,
  Image,
} from "react-bootstrap";
import { useContext } from "react";
import AppContext from "../Context/Appcontext";
import axios from "axios";
import { useNavigate } from "react-router";
const Checkout = () => {
  const { userAddress, cart, url, user,clearCart } = useContext(AppContext);
  const navigate=useNavigate();
  const [shippingDetails] = useState({
    ...userAddress,
  });
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const shippingCost = 10;

  // Calculate total based on item price and quantity
  const itemsTotal = cart?.items?.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const totalAmount = itemsTotal + shippingCost;

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
  }, [cart]);
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: totalAmount,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });
const {orderId,amount:orderAmount}=orderResponse.data;

const options = {
    "key": "rzp_test_ewi9BkyBkv7yb1", // Enter the Key ID generated from the Dashboard
    "amount": orderAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Parneet Sharma", //your business name
    "description": "Paying To Parneet Sharma",
    "image": "https://example.com/your_logo",
    "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "handler": async function(response){
        console.log(response)
        const paymentData={
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            signature:response.razorpay_signature,
            amount:orderAmount,
            orderItems:cart?.items,
            userId:user._id,
            userShipping:userAddress,
        }
        const api= await axios.post(`${url}/payment/verify-payment`,{paymentData});
      
        if(api.data.success){
        navigate('/orderconfirmation');
        console.log(api.data)
        clearCart();
        }
    },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

const rzrpay=new window.Razorpay(options);
rzrpay.open();

    } catch (error) {
      console.log(error);
    }
   
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Checkout</h2>
      <Row>
        {/* Shipping Information (Read-only) */}
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h4>Shipping Information</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Full Name:</strong> {shippingDetails.fullName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Address:</strong> {shippingDetails.address}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>City:</strong> {shippingDetails.city}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>State:</strong> {shippingDetails.state}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Country:</strong> {shippingDetails.country}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Postal Code:</strong> {shippingDetails.postalCode}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone Number:</strong> {shippingDetails.phoneNumber}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          {/* Payment Information */}
          <Card className="mb-4">
            <Card.Body>
              <h4>Payment Information</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    label="Credit Card"
                    name="paymentMethod"
                    value="Credit Card"
                    checked={paymentMethod === "Credit Card"}
                    onChange={handlePaymentChange}
                  />
                  <Form.Check
                    type="radio"
                    label="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === "PayPal"}
                    onChange={handlePaymentChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Debit Card"
                    name="paymentMethod"
                    value="Debit Card"
                    checked={paymentMethod === "Debit Card"}
                    onChange={handlePaymentChange}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card>
            <Card.Header>
              <h4>Order Summary</h4>
            </Card.Header>
            <ListGroup variant="flush">
              {/* Dynamically Display Order Items with Images */}
              {cart?.items?.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col xs={3}>
                      <Image src={item.imagesrc} fluid rounded />
                    </Col>
                    <Col>{item.title}</Col>
                    <Col>Qty: {item.qty}</Col>
                    <Col>₹{(item.price * item.qty).toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              ))}

              <ListGroup.Item>
                <Row>
                  <Col>Items Total:</Col>
                  <Col>₹{itemsTotal?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₹{shippingCost.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>
                    <strong>₹{totalAmount.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <Button variant="primary" onClick={handleSubmit}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
