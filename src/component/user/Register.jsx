import { useContext, useState } from "react";
import AppContext from "../Context/Appcontext";
import { useNavigate } from "react-router";
function Register() {
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    });
    const navigate=useNavigate();
    const {register}=useContext(AppContext);
    const onChangeHandler=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})

    }
    const submitHandler= async(e)=>{
        e.preventDefault();
        const {name,email,password}=formData;
       const result= await register(name,email,password)

        setFormData({
            name:"",
            email:"",
            password:""
        })

        if(result.success || result.message=="User already exists") navigate('/login');
      

    }

  return (
    <>
      <div
        className="container mt-5 p-4"
        style={{
          width: "600px",
          border: "2px solid grey",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center ">User Register</h1>
        <form className="my-3" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
             Name
            </label>
            <input
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
             name="email"
             value={formData.email}
             onChange={onChangeHandler}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
             name="password"
             value={formData.password}
             onChange={onChangeHandler}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
<div className=" d-grid col-6 mx-auto my-3">
          <button type="submit" className="btn btn-primary">
          Register
          </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
