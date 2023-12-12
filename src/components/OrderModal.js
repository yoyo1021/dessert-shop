import axios from "axios";
import { useEffect, useState } from "react"

function OrderModal({ closeModal, getOrders, tempOrder }) {
    const [tempData, setTempData] = useState({
        is_paid: ''
    });

    useEffect(() => {
        setTempData({
            is_paid: tempOrder.is_paid,
        });
    }, [tempOrder]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'is_paid') {
            setTempData({
                [name]: value,
            })
        }
    }

    const submit = async () => {
        const data = {
            data: {
                ...tempOrder,
                is_paid: tempData.is_paid === 'true' ? true : false,
            }
        }
        try {
            await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${tempOrder.id}`, data);
            closeModal();
            getOrders();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className='modal fade'
            tabIndex='-1'
            aria-labelledby='productModal'
            aria-hidden='true'
            id='orderModal'
        >
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='productModal'>
                            編輯${tempOrder.id}
                        </h1>
                        <button
                            type='button'
                            className='btn-close'
                            aria-label='Close'
                            onClick={closeModal}
                        />
                    </div>
                    <div className='modal-body'>
                        <div className="row">
                            <div className="col-md-6">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <td className="border-0"><h4>訂單資訊</h4></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>訂單編號</td>
                                            <td>{tempOrder.id}</td>
                                        </tr>
                                        <tr>
                                            <td>訂購時間</td>
                                            <td>{new Date(tempOrder.create_at * 1000).toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td>付款狀態</td>
                                            <td><p className={`${tempOrder.is_paid ? 'text-success' : 'text-danger'} fw-bold mb-0`}>{tempOrder.is_paid ? "已付款" : "未付款"}</p></td>
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
                                            <td>{tempOrder?.user?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>信箱</td>
                                            <td>{tempOrder?.user?.email}</td>
                                        </tr>
                                        <tr>
                                            <td>連絡電話</td>
                                            <td>{tempOrder?.user?.tel}</td>
                                        </tr>
                                        <tr>
                                            <td>運送地址</td>
                                            <td>{tempOrder?.user?.address}</td>
                                        </tr>
                                        <tr>
                                            <td>留言</td>
                                            <td>{tempOrder?.message?tempOrder?.message:"無"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="card rounded-0 py-4 mb-5">
                                    <div className="card-header border-bottom-0 bg-white px-4 py-0">
                                        <h2>購買項目</h2>
                                    </div>
                                    <div className="card-body px-4 py-0">
                                        <ul className="list-group list-group-flush">
                                            {Object.values(tempOrder?.products || {}).map((i) => {
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
                                                <div className="d-flex justify-content-between mt-2">
                                                    <p className="mb-0 h4 fw-bold">總計</p>
                                                    <p className="mb-0 h4 fw-bold">NT${tempOrder.total}</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <h2>修改訂單狀態</h2>
                                <div className="card rounded-0 py-4">
                                    <div className="card-body">
                                        <h4>付款狀態</h4>
                                        <select name="is_paid" className="w-75 p-1" id="" value={tempData.is_paid} onChange={handleChange}>
                                            <option value={false}>未付款</option>
                                            <option value={true}>已付款</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={closeModal} >
                            關閉
                        </button>
                        <button type='button' className='btn btn-primary'
                            onClick={submit}
                        >
                            儲存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderModal