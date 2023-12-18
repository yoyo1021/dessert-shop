import { useEffect, useRef, useState } from "react";
import SwiperBanner from "../../components/SwiperBanner";
import axios from 'axios';
import { Link } from "react-router-dom";




function Home() {

    const bannerImg = [

        {
            id: 2,
            image: "https://images.unsplash.com/photo-1570038283490-0c2b8fe95b2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1600067367605-17c48d9c5236?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1618105965240-9aa565e73a0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGNvZmZlZSUyMHNob3B8ZW58MHx8MHx8fDA%3D"
        },
        {
            id: 4,
            image: "https://plus.unsplash.com/premium_photo-1664205765797-c0016001b237?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fHN0cmF3YmVycnklMjBjYWtlfGVufDB8fDB8fHww"
        }

    ]

    const [classic, setClassic] = useState([]);
    const [season, setSeason] = useState([]);
    const [iscopy,setIsCopy] = useState(false);
    const copyRef = useRef(null);

    const getDesserts = async () => {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?category=甜點&page=1`);
        setClassic(res.data.products.slice(0, 4))
    }

    const getSeasonDesserts = async () => {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?category=季節限定&page=1`);
        setSeason(res.data.products.slice(0, 4))
    }

    const copyCoupon = ()=>{
        //console.log(copyRef.current.innerText)
        setIsCopy(true);
        setTimeout(()=>{
            setIsCopy(false);
        },2000)
    }

    useEffect(() => {
        getDesserts();
        getSeasonDesserts();
    }, [])
    return (
        <>
            <SwiperBanner bannerImg={bannerImg}></SwiperBanner>

            <section className="py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-3">
                            <h4 className="text-center fw-bold border-bottom mb-4 pb-3">歡慶開幕</h4>
                            <h4 className="text-center text-md-start">開幕優惠，即日起輸入優惠碼 【DESERT8】 享全館商品打8折</h4>
                        </div>
                        <div className="col-md-6 ">
                            <div className="row align-items-center ">
                                <div className="col-md-6 mb-3">
                                    <div className="border p-3 text-center ">優惠碼 【<span ref={copyRef}>DESERT8</span>】</div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-center d-md-block">
                                    <button type="button" className={`btn btn-primary ${iscopy?'disabled':''}`} onClick={()=>copyCoupon()}>{iscopy?"複製成功":"複製優惠碼"}</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </section>
            <section className="py-5 bg-light">
                <div className="container">
                    <h4 className="text-center fw-bold border-bottom mb-4 pb-3">經典甜點</h4>
                    <div className="row">
                        {classic.map((i) => {
                            return (
                                <div className="col-md-6 col-lg-3" key={i.id}>
                                    <Link to={`/product/${i.id}`} style={{ textDecoration: 'none' }} className="card  mb-4 border-0">
                                        <div className="img-wrapper position-relative">
                                            <img src={i.imageUrl} className="card-img-top  object-cover " height='250px' alt="..." />
                                            <div className="detail-icon fs-5 fw-bold text-primary position-absolute top-50 start-50 translate-middle">
                                                <i className="bi bi-search"></i> 查看更多
                                            </div>
                                        </div>
                                        <div className="card-body ">
                                            <h4 className="mb-4 mt-2 text-center fw-bold">{i.title}</h4>
                                            <div className="d-flex justify-content-center align-items-end">
                                                <p className="text-muted mb-0 me-2" style={{ textDecoration: 'line-through', fontSize: '12px' }}>原價 NT${i.origin_price}</p>
                                                <p className="mb-0">特價 NT${i.price}</p>
                                            </div>

                                            {/* <p className="card-text text-muted mb-0">{i.description}</p> */}
                                        </div>
                                        {/* <div className="card-footer bg-white border-top-0 d-flex justify-content-center align-items-center pb-3">
                                            <button type="button" className="btn btn-primary w-75 "
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(product.id)
                                                }}>加入購物車</button>
                                        </div> */}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </section>
            <section className="py-5 " >
                <div className="container">
                    <h4 className="text-center fw-bold  border-bottom mb-4 pb-3">季節限定</h4>
                    <div className="row">
                        {season.map((i) => {
                            return (
                                <div className="col-md-6 col-lg-3" key={i.id}>
                                    <Link to={`/product/${i.id}`} style={{ textDecoration: 'none' }} className="card  mb-4 border-0">
                                        <div className="img-wrapper position-relative">
                                            <img src={i.imageUrl} className="card-img-top  object-cover " height='250px' alt="..." />
                                            <div className="detail-icon fs-5 fw-bold text-primary position-absolute top-50 start-50 translate-middle">
                                                <i className="bi bi-search"></i> 查看更多
                                            </div>
                                        </div>
                                        <div className="card-body ">
                                            <h4 className="mb-4 mt-2 text-center fw-bold">{i.title}</h4>
                                            <div className="d-flex justify-content-center align-items-end">
                                                <p className="text-muted mb-0 me-2" style={{ textDecoration: 'line-through', fontSize: '12px' }}>原價 NT${i.origin_price}</p>
                                                <p className="mb-0">特價 NT${i.price}</p>
                                            </div>

                                            {/* <p className="card-text text-muted mb-0">{i.description}</p> */}
                                        </div>
                                        {/* <div className="card-footer bg-white border-top-0 d-flex justify-content-center align-items-center pb-3">
                                            <button type="button" className="btn btn-primary w-75 "
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(product.id)
                                                }}>加入購物車</button>
                                        </div> */}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </section>
        </>
    )
}

export default Home