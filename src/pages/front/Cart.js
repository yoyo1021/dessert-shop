import axios from "axios";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Loading from "../../components/Loading";
import Swal from 'sweetalert2';

function Cart() {

    const { cartData, getCart } = useOutletContext();
    const [isLoadingQty, setIsLoadingQty] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [couponCode,setCouponCode] = useState('')

    const removeCartItem = async (id) => {
        try {
            setIsLoading(true);
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
            console.log(res);
            getCart();
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    const updateCartItem = async (item, qty) => {
        const data = {
            data: {
                product_id: item.id,
                qty: qty,
            }
        }
        setIsLoadingQty([...isLoadingQty, item.id])
        try {
            const res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`, data);
            console.log(res);
            setIsLoadingQty(isLoadingQty.filter((loading) => loading !== item.id))
            getCart();
        } catch (error) {
            console.log(error)
        }
    }


    const useCoupon = async()=>{
        try {
            const data = {
                data:{
                    code:couponCode,
                }
            }
            setIsLoading(true);
            const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,data);
            getCart();
            Swal.fire({
                title: '使用成功!',
                text: `${res.data.message}`,
                icon: 'success',
                confirmButtonText: 'ok'
            })
            setIsLoading(false);
            
            //console.log('coupon',res)
        } catch (error) {
            console.log(error.response.data.message);
            Swal.fire({
                title: '使用失敗!',
                text: `${error.response.data.message}`,
                icon: 'warning',
                confirmButtonText: 'ok'
            })
            setIsLoading(false);
        }
        
    }


    return (<>
        <div className="container">
            <Loading isLoading={isLoading} />
            {cartData?.carts?.length === 0 ? (
                <>
                    <div className="py-7 full-height">
                        <div className="text-center mb-5">
                            <i className="bi bi-cart-plus" style={{ fontSize: '160px' }}></i>
                            <h2>您的購物車沒有商品!</h2>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to='/products' className="btn btn-outline-primary px-5 py-3"> 去購物 </Link>
                        </div>
                    </div>

                </>
            ) : (
                <>
                    <div className=" bg-white py-5" style={{ minHeight: 'calc(100vh - 56px - 76px)' }}>
                        <div className="d-flex justify-content-between">
                            <h2 className="mt-2">購物車清單</h2>
                        </div>
                        {/* <table className="table">
                            <thead className="table-light">
                                <tr>
                                    <td scope="col">商品</td>
                                    <td scope="col">數量</td>
                                    <td scope="col">金額</td>
                                    <td scope="col">刪除</td>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData?.carts?.map((i) => {
                                    return (
                                        <tr key={i.id}>
                                            <td className="align-middle">
                                                <img src={i.product.imageUrl} className="object-cover me-3" alt="" style={{ width: '120px', objectFit: 'cover' }} />
                                                <p className="d-inline-block mb-0 fw-bold">{i.product.title}</p>
                                            </td>
                                            <td className="align-middle" scope="col">
                                                <div className="input-group w-75 align-items-center">
                                                    <select name="" id="" className="form-select" value={i.qty} onChange={(e) => updateCartItem(i, Number(e.target.value))} disabled={isLoadingQty.includes(i.id)}>
                                                        {
                                                            [...(new Array(20))].map((i, num) => {
                                                                return (
                                                                    <option value={num + 1} key={num}>{num + 1}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <p className="mb-0 ms-auto">NT${i.final_total}</p>
                                            </td>
                                            <td className="align-middle">
                                                <button type="button" className="btn " style={{ top: '5px', right: '10px' }} onClick={() => removeCartItem(i.id)}><i className="bi bi-x-lg"></i></button>
                                            </td>
                                        </tr>

                                    )
                                })}
                            </tbody>
                        </table> */}
                        {/* {cartData?.carts?.map((i) => {
                            return (
                                <div className="d-flex mt-4 bg-light" key={i.id}>
                                    <img src={i.product.imageUrl} className="object-cover" alt="" style={{ width: '120px', objectFit: 'cover' }} />
                                    <div className="w-100 p-3 position-relative">
                                        <button type="button" className="btn  position-absolute" style={{ top: '5px', right: '10px' }} onClick={() => removeCartItem(i.id)}><i className="bi bi-x-lg"></i></button>
                                        <p className="mb-0 fw-bold">{i.product.title}</p>
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <div className="input-group w-50 align-items-center">
                                                <select name="" id="" className="form-select" value={i.qty} onChange={(e) => updateCartItem(i, Number(e.target.value))} disabled={isLoadingQty.includes(i.id)}>
                                                    {
                                                        [...(new Array(20))].map((i, num) => {
                                                            return (
                                                                <option value={num + 1} key={num}>{num + 1}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <p className="mb-0 ms-auto">NT {i.final_total}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })} */}
                        {cartData?.carts?.map((i) => {
                            return (
                                <div className="card mb-3" key={i.id}>
                                    <div className="card-body position-relative">
                                        <div className="d-flex align-items-end">
                                            <img src={i.product.imageUrl} className="object-cover rounded " alt={i.product.title} style={{ width:'150px',height:'100px' }} />
                                            <div className="p-3 w-100">
                                                <div className="d-flex justify-content-between mb-3">
                                                    <h5 className="d-inline-block mb-0 fw-bold">{i.product.title}</h5>
                                                    <button type="button" className="btn p-0 position-absolute" style={{ top: '10px', right: '11px' }} onClick={() => removeCartItem(i.id)}><i className="bi bi-x-lg"></i></button>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="input-group w-50 ">
                                                        <select name="" id="" className="form-select" value={i.qty} onChange={(e) => updateCartItem(i, Number(e.target.value))} disabled={isLoadingQty.includes(i.id)}>
                                                            {
                                                                [...(new Array(20))].map((i, num) => {
                                                                    return (
                                                                        <option value={num + 1} key={num}>{num + 1}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <p className="mb-0 ms-auto">NT${i.total}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="mt-3 d-flex justify-content-end">
                            <input type="text" className="form-control w-25 me-3" onChange={(e)=>setCouponCode(e.target.value)}/>
                            <button type="button" className={`btn btn-primary ${couponCode?'':'disabled'}`} onClick={useCoupon}>優惠碼</button>
                        </div>
                        <hr />
                        <table className="table mt-4 text-muted">
                            <tbody>
                                <tr>
                                    <th scope="row" className="border-0 px-0 font-weight-normal">小計</th>
                                    <td className="text-end border-0 px-0">NT${cartData.total}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border-0 px-0 pt-0 font-weight-normal">折扣</th>
                                    <td className="text-end border-0 px-0 pt-0">NT${cartData.total - Math.ceil(cartData.final_total)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-between mt-4">
                            <p className="mb-0 h4 fw-bold">總計</p>
                            <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <Link to="/products" className="btn btn-dark btn-block  rounded  ">繼續購物</Link>
                            <Link to="/form" className="btn btn-primary btn-block  rounded  ">填寫資料</Link>
                        </div>

                    </div>
                </>
            )}

        </div>
    </>)
}
export default Cart