import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const { setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        client_name: "",
        email: "",
        mobile_number: "",
        address: "",
        subscription_start_date: "",
        subscription_end_date: "",
        password: "",
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: e.target.value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();
        console.log(inpval);

        const { client_name, email, mobile_number, address, subscription_start_date,subscription_end_date,password} = inpval;


        if (client_name === "") {
            alert("client_name is required")
        } else if (email === "") {
            alert("email is required")
        } else if (!email.includes("@")) {
            alert("enter valid email")
        } else if (mobile_number === "") {
            alert("mobile_number is required")
        } else if (address === "") {
            alert("address is required")
        } else if (subscription_start_date === "") {
            alert("subscription_start_date is required")
        } else if (subscription_end_date === "") {
            alert("subscription_end_date is required")
         } else if (password === "") {
              alert("password is required")
        } else {
      
            const res = await fetch("/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    client_name, email, mobile_number, address, subscription_start_date, subscription_end_date, password
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error ");
                alert("error");

            } else {
                history.push("/home")
                setUdata(data)
                console.log("data added");

            }
        }

    }

    return (
        <div className="container">
            {/* <NavLink to="/">home</NavLink> */}
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputname" className="form-label">Client Name</label>
                        <input type="text" string={inpval.client_name} onChange={setdata} name="client_name" className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEmail" className="form-label">email</label>
                        <input type="email" string={inpval.email} onChange={setdata} name="email" className="form-control"  />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputMobile_number" className="form-label">Mobile Number</label>
                        <input type="number" string={inpval.mobile_number} onChange={setdata} name="mobile_number" className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <textarea type="text" string={inpval.address} onChange={setdata} name="address" className="form-control" ></textarea>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputStartDate" className="form-label">Start Date</label>
                        <input type="date" name="subscription_start_date" string={inpval.subscription_start_date} onChange={setdata} className="form-control" id="" cols="30" rows="5" />
                    </div>

                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEndDate" className="form-label">End Date</label>
                        <input type="date" name="subscription_end_date" string={inpval.subscription_end_date} onChange={setdata} className="form-control" id="" cols="30" rows="5" />
                    </div>

                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputpassword" className="form-label">Password</label>
                        <input type="password" name="password" string={inpval.password} onChange={setdata} className="form-control" id="exampleInputPassword1" cols="30" rows="5" />
                    </div>
                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Register;

