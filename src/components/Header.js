import React, { useEffect, useState, useCallback } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import cart from './cart.gif';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import './style.css';
import { DLT } from '../redux/actions/action';

const Header = () => {
    const getData = useSelector((state) => state.cartReducer.carts);
    const [anchorEl, setAnchorEl] = useState(null);
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id) => {
        dispatch(DLT(id));
    };

    const total = useCallback(() => {
        let totalPrice = 0;
        getData.forEach((item) => {
            totalPrice += item.price * item.qnty;
        });
        setPrice(totalPrice);
    }, [getData]);

    useEffect(() => {
        total();
    }, [total]);

    return (
        <Navbar bg="dark" data-bs-theme="dark" style={{ height: "60px" }}>
            <Container>
                <NavLink to="/" className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/" className="text-decoration-none text-light">Home</Nav.Link>
                </Nav>
                <Badge badgeContent={getData.length} color="primary"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
                </Badge>
            </Container>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    getData.length ?
                        <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Photo</TableCell>
                                        <TableCell>Details</TableCell>
                                        <TableCell>Remove</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        getData.map((e, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                   <NavLink to={`/cart/${e.id}`} onClick={handleClose}><img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="restaurant" /></NavLink> 
                                                </TableCell>
                                                <TableCell>
                                                    <p>{e.rname}</p>
                                                    <p>Price : ₹{e.price}</p>
                                                    <p>Quantity : {e.qnty}</p>
                                                    <p style={{ color: "red", fontSize: 20, cursor: "pointer" }}>
                                                        <i className='fas fa-trash smalltrash'></i>
                                                    </p>
                                                </TableCell>
                                                <TableCell style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={()=>dlt(e.id)} >
                                                    <i className='fas fa-trash largetrash'></i>
                                                </TableCell>
                                            </TableRow>
                                            
                                        ))
                                    } 
                                    <p className='text-center'>Total : ₹ {price}</p>
                                </TableBody>
                            </Table>
                        </div> :
                        <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
                            <i className='fas fa-close' style={{ cursor: 'pointer', position: "absolute", top: 2, right: 20, fontSize: 23 }} onClick={handleClose}></i>
                            <p style={{ fontSize: 22 }}>Your Cart is empty</p>
                            <img src={cart} alt="cart" style={{ width: '100px' }} />
                        </div>
                }
            </Menu>
        </Navbar>
    );
};

export default Header;
