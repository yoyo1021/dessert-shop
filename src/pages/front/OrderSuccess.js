import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Swal from 'sweetalert2';

function OrderSuccess() {

    const { orderId } = useParams();
    const [orderData, setOrderData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getOrder = async (orderId) => {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`);
        setOrderData(res.data.order);
    }

    const payOrder = async () => {
        const data = {
            order: orderData
        }
        try {
            setIsLoading(true)
            const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/pay/${orderId}`, data);
            Swal.fire({
                title: 'Success!',
                text: `${res.data.message}`,
                icon: 'success',
                confirmButtonText: 'ok'
            })
            getOrder(orderId);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Fail!',
                text: `${error.data.message}`,
                icon: 'warning',
                confirmButtonText: 'ok'
            })
        }
    }

    useEffect(() => {
        getOrder(orderId);
    }, [])

    return (<>
        <div className="container full-height">
            <Loading isLoading={isLoading} />
            <div className="mt-5 mb-7">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="text-center text-md-start mb-3">{orderData.is_paid ? "付款" : "訂單"}完成 <i className="bi bi-check-circle text-success"></i></h2>
                        <p>親愛的顧客，感謝您在本平台訂購商品。我們非常感激您對我們的信任和支持，讓我們有機會為您提供更優質的服務。</p>
                        <table className="table ">
                            <thead>
                                <tr>
                                    <td className="border-0"><h4>訂單資訊</h4></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>訂單編號</td>
                                    <td>{orderData.id}</td>
                                </tr>
                                <tr>
                                    <td>訂購時間</td>
                                    <td>{new Date(orderData.create_at * 1000).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td>付款狀態</td>
                                    <td><p className={`${orderData.is_paid ? 'text-success' : 'text-danger'} fw-bold mb-0`}>{orderData.is_paid ? "已付款" : "未付款"}</p></td>
                                </tr>
                            </tbody>

                            <thead>
                                <tr>
                                    <td className="border-0 "><h4 className="mt-4">聯絡資訊</h4></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>姓名</td>
                                    <td>{orderData?.user?.name}</td>
                                </tr>
                                <tr>
                                    <td>信箱</td>
                                    <td>{orderData?.user?.email}</td>
                                </tr>
                                <tr>
                                    <td>連絡電話</td>
                                    <td>{orderData?.user?.tel}</td>
                                </tr>
                                <tr>
                                    <td>運送地址</td>
                                    <td>{orderData?.user?.address}</td>
                                </tr>
                                <tr>
                                    <td>留言</td>
                                    <td>{orderData?.message ? orderData?.message : '無'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                        <div className="card rounded-0 py-4">
                            <div className="card-header border-bottom-0 bg-white px-4 py-0">
                                <h2>購買項目</h2>
                            </div>
                            <div className="card-body px-4 py-0">
                                <ul className="list-group list-group-flush">
                                    {Object.values(orderData?.products || {}).map((i) => {

                                        return (
                                            <li className="list-group-item px-0" key={i.id}>
                                                <div className="d-flex mt-2">
                                                    <img src={i.product.imageUrl} alt="" className="me-2" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                                    <div className="w-100 d-flex flex-column">
                                                        <div className="d-flex justify-content-between fw-bold">
                                                            <h5>{i.product.content}</h5>
                                                            <p className="mb-0">x{i.qty}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between mt-auto">
                                                            <p className="text-muted mb-0"><small>NT${i.product.price}</small></p>
                                                            <p className="mb-0">NT${i.total}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                    <li className="list-group-item px-0 pb-0">
                                        {/* <table className="table text-muted">
                                            <tbody>
                                                <tr>
                                                    <th scope="row" className="border-0 px-0 font-weight-normal">Lorem ipsum</th>
                                                    <td className="text-end border-0 px-0">NT$24,000</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className="border-0 px-0 pt-0 font-weight-normal">Payment</th>
                                                    <td className="text-end border-0 px-0 pt-0">ApplePay</td>
                                                </tr>
                                            </tbody>
                                        </table> */}
                                        <div className="d-flex justify-content-between mt-2">
                                            <p className="mb-0 h4 fw-bold">總計</p>
                                            <p className="mb-0 h4 fw-bold">NT${orderData.total}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-5">
                    <Link to='/' className="btn btn-dark">回首頁</Link>
                    {orderData.is_paid ? (<>

                    </>) : (
                        <>
                            <button type="button" className="btn btn-primary" onClick={() => payOrder(orderId)}>前往付款</button>
                        </>
                    )}

                </div>

            </div>
        </div>
    </>)
}
export default OrderSuccess