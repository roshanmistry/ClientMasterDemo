import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';
// import { NavLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Login = () => {

    const { setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        email: "",
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


    const loginpdata = async (e) => {
        e.preventDefault();
        console.log(inpval);

        const { email, password, subscription_start_date, subscription_end_date } = inpval;



        if (email === "") {
            alert("email is required")
        } else if (!email.includes("@")) {
            alert("enter valid email")
        } else if (password === "") {
            alert("password is required")
        } else {

            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password, subscription_start_date, subscription_end_date
                })
            });

            const data = await res.json();
            console.log(data);
            var today = new Date().toLocaleDateString();
            console.log(today);

            var start_date = new Date(data[0].subscription_start_date);
            console.log(start_date.toLocaleDateString());
            var conestartDate;
            if (today > start_date.toLocaleDateString()) {
                // True if today is on or after 
                conestartDate = true;
                console.log("True if today is on or after");
            } else {
                // Today is before
                conestartDate = false;
                console.log("Today is before");
            }
            var end_date = new Date(data[0].subscription_end_date);
            console.log(end_date.toLocaleDateString());
            var conendDate;
            if (today > end_date.toLocaleDateString()) {
                // True if today is on or after 
                console.log("True if today is on or after");
                conendDate = true;
            } else {
                // Today is before
                conendDate = false;
                console.log("Today is before");
            }
            console.log("start " + conestartDate + " end " + conendDate)
            if (conestartDate === true && conendDate === false) {
                console.log("login...");
                history.push("/Home")
            } else {
                console.log("not login....");
            }

            // if (res.status === 422 || !data) {
            //     console.log("error ");
            //     // alert("error");

            // } else {
            //     history.push("/")
            //     setUdata(data)
            //     console.log("data added");

            // }
        }

    }

    return (
        <div className="container mt-5">

            {/* <NavLink to="/Home">home</NavLink> */}
            <Card sx={{ maxWidth: 800 }}>
                <CardContent>
                    <form className="mt-4">
                        <h1 style={{ fontWeight: 400, border: 5 }}>Login</h1>
                        <div className="row">

                            <div className="mb-3 col-lg-6 col-md-6 col-12">
                                <label htmlFor="exampleInputEmail" className="form-label">email</label>
                                <input type="email" string={inpval.email} onChange={setdata} name="email" className="form-control" />
                            </div>
                            <div className="mb-3 col-lg-6 col-md-6 col-12">
                                <label htmlFor="exampleInputpassword" className="form-label">Password</label>
                                <input type="password" name="password" string={inpval.password} onChange={setdata} className="form-control" id="exampleInputPassword1" cols="30" rows="5" />
                            </div>
                            <button type="submit" onClick={loginpdata} className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
export default Login;

