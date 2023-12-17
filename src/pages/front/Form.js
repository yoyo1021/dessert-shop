import { useForm } from 'react-hook-form';
import { Input } from '../../components/FormElements';
import axios from 'axios';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import Loading from "../../components/Loading";
import { useState } from 'react';
import Stepper from '../../components/Stepper';

function Form() {
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched'
    });

    const navigate = useNavigate();
    const [isLoading, setIsLOading] = useState(false);
    const { cartData, getCart } = useOutletContext();

    const onSubmit = async (data) => {
        const { name, email, tel, address, message } = data;
        const form = {
            data: {
                user: {
                    name,
                    email,
                    tel,
                    address
                },
                message
            }
        }
        setIsLOading(true);
        const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/order`, form);
        getCart();
        setIsLOading(false);
        navigate(`/order/${res.data.orderId}`);
    }


    return (<>
        <div className="container full-height">
            <Loading isLoading={isLoading} />
            <Stepper activeStep={1} steps={[{ title: "確認商品" }, { title: "填寫資料" }, { title: "訂單完成" }]} />
            <div className="row flex-row-reverse justify-content-center pb-5 ">
                <div className="col-md-4">
                    <div className="border p-4 mb-2">
                        <h3 className="fw-bold mb-4">購買內容</h3>
                        {cartData?.carts?.map((i) => {
                            return (
                                <div className="d-flex mt-2" key={i.id}>
                                    <img src={i.product.imageUrl} alt="" className="me-2" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                                    <div className="w-100">
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-0 fw-bold">{i.product.content}</p>
                                            <p className="mb-0">NT${i.product.price}</p>
                                        </div>
                                        <p className="mb-0 fw-bold">x{i.qty}</p>
                                    </div>
                                </div>
                            )
                        })}
                        <table className="table mt-4 border-top border-bottom text-muted">
                            <tbody>
                                <tr>
                                    <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">小計</th>
                                    <td className="text-end border-0 px-0 pt-4">NT${cartData.total}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">折扣</th>
                                    <td className="text-end border-0 px-0 pt-0 pb-4">NT${cartData.total - Math.ceil(cartData.final_total)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-between mt-4">
                            <p className="mb-0 h4 fw-bold">總計</p>
                            <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="border p-4">
                            <h3 className="fw-bold mb-4">購買人資訊</h3>
                            <div className="mb-2">
                                <Input
                                    id='email'
                                    labelText='Email'
                                    type='email'
                                    errors={errors}
                                    register={register}
                                    rules={{
                                        required: 'Email 為必填',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Email 格式不正確',
                                        },
                                    }}
                                ></Input>
                            </div>
                            <div className="mb-2">
                                <Input
                                    id='name'
                                    type='text'
                                    errors={errors}
                                    labelText='使用者名稱'
                                    register={register}
                                    rules={{
                                        required: '使用者名稱為必填',
                                        maxLength: {
                                            value: 10,
                                            message: '使用者名稱長度不超過 10',
                                        },
                                    }}
                                ></Input>
                            </div>
                            <div className="mb-2">
                                <Input
                                    id='tel'
                                    labelText='電話'
                                    type='tel'
                                    errors={errors}
                                    register={register}
                                    rules={{
                                        required: '電話為必填',
                                        minLength: {
                                            value: 6,
                                            message: '電話不少於 6 碼'
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: '電話不超過 12 碼'
                                        }
                                    }}
                                ></Input>
                            </div>
                            <div className="mb-2">
                                <Input
                                    id='address'
                                    labelText='地址'
                                    type='address'
                                    errors={errors}
                                    register={register}
                                    rules={{
                                        required: '地址為必填',
                                    }}
                                ></Input>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="message" className="text-muted mb-2">備註</label>
                                <textarea className="form-control" rows="3" {...register('message')} id="message" placeholder="備註 ... "></textarea>
                            </div>
                        </div>

                        <div className="d-flex flex-md-row mt-4 justify-content-between align-items-center  w-100">
                            <Link to='/cart' className="btn text-dark "><i className="bi bi-arrow-left me-2"></i> 上一頁</Link>
                            <button type='submit' className="btn btn-primary py-3 px-7 ">送出表單</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    </>)
}

export default Form