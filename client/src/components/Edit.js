import React, { useContext, useEffect, useState } from 'react'
import { useParams,useHistory } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'


const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

   const {updata, setUPdata} = useContext(updatedata)

    const history = useHistory("");

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
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`/indclient/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data[0])
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const { client_name, email, mobile_number, address, subscription_start_date,subscription_end_date,password} = inpval;
        

        const res2 = await fetch(`/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                client_name, email, mobile_number, address, subscription_start_date,subscription_end_date,password
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/")
            setUPdata(data2);
        }

    }

    return (
        <div className="container">
            {/* <NavLink to="/">home2</NavLink> */}
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputClientName" className="form-label">Client Name</label>
                        <input type="text" value={inpval.client_name} onChange={setdata} name="client_name" className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEmail" className="htmlForm-label">Email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputMobile_Number" className="form-label">Mobile Number</label>
                        <input type="number" value={inpval.mobile_number} onChange={setdata} name="mobile_number" className="form-control"  />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type='password' name="password" value={inpval.password} onChange={setdata} className="form-control" id="" cols="30" rows="5"/>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputStartDate" className="form-label">Start Date</label>
                        <input type='date' value={inpval.subscription_start_date} onChange={setdata} name="subscription_start_date" className="form-control"  />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEndDate" className="form-label">End Date</label>
                        <input  type='date' value={inpval.subscription_end_date} onChange={setdata} name="subscription_end_date" className="form-control"  />
                    </div>
                 
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <textarea name="address" value={inpval.address} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;






