import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'




const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { udata, setUdata } = useContext(adddata);

    const {updata, setUPdata} = useContext(updatedata);

    const {dltdata, setDLTdata} = useContext(deldata);

    const getdata = async () => {
        
        const res = await fetch("/getclients", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);
//         console.log(`UTC date (iso): ${data.subscription_start_date.format("YYYY-MM-DD HH:mm:ss")}`);
// console.log(`IST date (iso): ${data.subscription_start_date.format("YYYY-MM-DD HH:mm:ss")}`);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`/deleteclient/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
        }

    }


    return (

        <>
            {
                udata ?
                    <>
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.client_name}</strong>  added succesfully!
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.client_name}</strong>  updated succesfully!
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.client_name}</strong>  deleted succesfully!
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }


            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Add data</NavLink>
                    </div>

                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                            <th scope="col">ID</th>
                                <th scope="col">Client Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile number</th>
                                <th scope="col">Address</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserdata.map((element) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{element.id}</th>
                                                <td>{element.client_name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.mobile_number}</td>
                                                <td>{element.address}</td>
                                                <td>{element.subscription_start_date}</td>
                                                
                                                <td>{element.subscription_end_date}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${element.id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`edit/${element.id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteuser(element.id)}><DeleteOutlineIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
            </div>
        </>
    )
}

export default Home


















