import ReactTable from "react-table";  
import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { PagesSharp } from "@material-ui/icons";

function AdminDashBoard() {

    const [allUsers, setAllUsers] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [ID, setID] = useState('');
    const [adminCount, setAdminCount] = useState([]);

    const [isLogged, setIsLogged] = useState(false);
    
    useEffect(() => {

        const auth = {headers: {
            'x-access-token': localStorage.getItem("token")
        }}
        
        axios
        .get("http://127.0.0.1:8000/me", auth)
        .then(response => {
            setFullName(response.data.full_name);
            setEmail(response.data.email);
            setID(response.data._id);
        })
        
        axios
        .get('http://127.0.0.1:8000/admin/dashboard/', auth)
        .then(response => {
                console.log(response.data);
                setAllUsers(response.data.all_users);
                setAllProducts(response.data.all_products);
                setAdminCount(response.data.admin_count);
            })
            .catch(err => {
                alert('Internal Server Error');
            })

    }, [])

    switch(true) {

        case true:
            return (
                <div className="profile-container">
                    
                    <div className="profile-main">
    
                        <div id="profile-card1">
                            <img src="/images/profile3.jpg" id="profile-img" />
                            <div id="profile-data1">
                                <div id="profile-name">{fullName}</div>
                                <div id="profile-email">{email}</div>
                                <div id="profile-loc">{ID}</div>
                            </div>
                        </div>
    
    
                        <div id="profile-card2">
                                <div id="profile-data-row">
                                    <div id="profile-data-head">Number of Users</div>
                                    <div id="profile-data-nohead">{allUsers.length}</div>
                                </div>
    
                                <hr id="profile-hr-inner" />
    
                                <div id="profile-data-row">
                                    <div id="profile-data-head">Number of Products</div>
                                    <div id="profile-data-nohead">{allProducts.length}</div>
                                </div>
    
                                <hr id="profile-hr-inner" />
    
                                <div id="profile-data-row">
                                    <div id="profile-data-head">Trafficking</div>
                                    <div id="profile-data-nohead">1500/day</div>
                                </div>

                                <hr id="profile-hr-inner" />
    
                                <div id="profile-data-row">
                                    <div id="profile-data-head">Profits</div>
                                    <div id="profile-data-nohead">500000</div>
                                </div>
            
                        </div>
                        
                    </div>

                    {/* -------------------------------------------------------------------- */}

                    <div className="myposts-main-cont">
                    <div className="myposts-work-container">

                    <h1 style={{fontFamily: "sans-serif", marginBottom: "3%"}}>USERS</h1>
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell><b>User ID</b></TableCell>
                                <TableCell align="right"><b>Full Name</b></TableCell>
                                <TableCell align="right"><b>Email&nbsp;(g)</b></TableCell>
                                <TableCell align="right"><b>Is Admin&nbsp;(g)</b></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {allUsers.map((user) => (
                                <TableRow
                                key={user._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {user._id}
                                </TableCell>
                                <TableCell align="right">{user.full_name}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                {user.isAdmin ?
                                    <TableCell align="right">True</TableCell>
                                        :
                                    <TableCell align="right">False</TableCell>
                                }
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>

                    
                    </div>
                    <br/><br/>
                </div>

                <div className="myposts-main-cont">
                    <div className="myposts-work-container">

                    <h1 style={{fontFamily: "sans-serif", marginBottom: "3%"}}>PRODUCTS</h1>
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell><b>Product ID</b></TableCell>
                                <TableCell align="right"><b>Name</b></TableCell>
                                <TableCell align="right"><b>Posted By&nbsp;(g)</b></TableCell>
                                <TableCell align="right"><b>Cost&nbsp;(g)</b></TableCell>
                                <TableCell align="right"><b>Offer&nbsp;(g)</b></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {allProducts.map((prod) => (
                                <TableRow
                                key={prod._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {prod._id}
                                </TableCell>
                                <TableCell align="right">{prod.name}</TableCell>
                                <TableCell align="right">{prod.posted_by}</TableCell>
                                <TableCell align="right">{prod.cost}</TableCell>
                                {prod.offer ?
                                    <TableCell align="right">True</TableCell>
                                        :
                                    <TableCell align="right">False</TableCell>
                                }
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>

                    
                    </div>
                    <br/><br/>
                </div>

                </div>
            );
        
        case false:
            return (
                <div className="access-denied-container">
                    <div id="access-denied">403</div>
                    <div id="access-denied-msg">Access Denied</div>
                </div>
            );
        }
}

export {AdminDashBoard};