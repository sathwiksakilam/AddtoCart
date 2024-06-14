import React, { useEffect, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/actions/action';
import { Container, Row, Col, Image } from 'react-bootstrap';

export const CardsDetails = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = useSelector((state) => state.cartReducer.carts);

    const compare = useCallback(() => {
        let comparedata = getData.filter((e) => {
            return e.id == id;
        });
        setData(comparedata);
    }, [getData, id]);

    useEffect(() => {
        compare();
    }, [compare]);

    const send = (element) => {
        dispatch(ADD(element));
    };

    const dlt = (id) => {
        dispatch(DLT(id));
        navigate("/");
    };

    const remove = (item) => {
        dispatch(REMOVE(item));
    };

    return (
        <>
            <Container className='mt-2'>
                <h2 className='text-center'>Items Details Page</h2>

                <section className='mt-3'>
                    <div className='itemsdetails'>
                        {
                            data.map((ele) => {
                                return (
                                    <Row key={ele.id}>
                                        <Col md={4} className='items_img'>
                                            <Image src={ele.imgdata} alt="" fluid />
                                        </Col>
                                        <Col md={8} className='details'>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Restaurant</strong> : {ele.rname} </p>
                                                            <p><strong>Price</strong> : ₹ {ele.price}</p>
                                                            <p><strong>Dishes</strong> : {ele.address}</p>
                                                            <p><strong>Total</strong> : {ele.price * ele.qnty} </p>
                                                            <div className='mt-5 d-flex justify-content-between align-items-center' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                                                                <span style={{ fontSize: 24 }} onClick={ele.qnty <= 1 ? () => dlt(ele.id) : () => remove(ele)}>-</span>
                                                                <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                                                                <span style={{ fontSize: 24 }} onClick={() => send(ele)}>+</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{ele.rating} ★</span></p>
                                                            <p><strong>Order Review :</strong> <span>{ele.somedata}</span></p>
                                                            <p><strong>Remove :</strong> <span><i className='fas fa-trash' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(ele.id)}></i></span></p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                );
                            })
                        }
                    </div>
                </section>
            </Container>
        </>
    );
}
