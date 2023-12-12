import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AdminPagination from "../../components/AdminPagination";
import OrderModal from "../../components/OrderModal";
import DeleteModal from "../../components/DeleteModal";
import { Modal } from "bootstrap";
import Loading from "../../components/Loading";

function AdminOrders() {

    const [orders,setOrders] = useState([]);
    const [pagination,setPagination] = useState({});
    const [tempOrder,setTempOrder] = useState({});
    const [isLoading,setIsLoading] = useState(false);

    const orderMoadal = useRef(null);
    const deleteModal = useRef(null);

    const getOrders = async(page=1)=>{
        setIsLoading(true);
        const res= await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`);
        setOrders(res.data.orders);
        setPagination(res.data.pagination);
        setIsLoading(false);
    }

    

    useEffect(()=>{
        orderMoadal.current = new Modal('#orderModal',{
            backdrop:'static'
        });
        deleteModal.current = new Modal('#deleteModal',{
            backdrop:'static'
        })
        getOrders()
    },[])

    const openOrderModal = (order)=>{
        setTempOrder(order)
        orderMoadal.current.show()
    }

    const openDeleteModal = (order)=>{
        setTempOrder(order)
        deleteModal.current.show()
    }

    const closeModal = ()=>{
        orderMoadal.current.hide()
    }

    const closeDeleteModal = ()=>{
        deleteModal.current.hide()
    }

    const deleteOrder = async(id)=>{
        try {
            setIsLoading(true);
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`);
            getOrders();
            closeDeleteModal();
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-3">
            <Loading isLoading={isLoading} />
            <OrderModal closeModal={closeModal} tempOrder={tempOrder} getOrders={getOrders}/>
            <DeleteModal close={closeDeleteModal} text={tempOrder.id} deleteProduct={deleteOrder} id={tempOrder.id} />
            <h3>訂單列表</h3>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">編號</th>
                        <th scope="col">訂單日期</th>
                        <th scope="col">總金額</th>
                        <th scope="col">付款狀態</th>
                        <th scope="col">編輯/刪除</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{new Date(order.create_at*1000).toLocaleDateString()}</td>
                                <td>NT${order.total}</td>
                                <td><p className={`${order.is_paid?'text-success':'text-danger'} mb-0`}>{order.is_paid? '已付款' : '未付款'}</p></td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => openOrderModal(order)}
                                    >
                                        編輯
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm ms-2"
                                        onClick={() => openDeleteModal(order)}
                                    >
                                        刪除
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <AdminPagination pagination={pagination} changePage={getOrders} />

        </div>
    )
}

export default AdminOrders