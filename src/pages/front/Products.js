import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { Link, useOutletContext } from "react-router-dom";
import Loading from "../../components/Loading";

function Products() {

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setIsLOading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('所有商品');
    const { getCart } = useOutletContext();

    const getProducts = async (category, page = 1) => {
        try {
            setIsLOading(true);
            if (category === '所有商品') {
                const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
                setProducts(res.data.products);
                setPagination(res.data.pagination);
            }
            else {
                console.log(category, page)
                const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?category=${category}&page=${page}`);
                setProducts(res.data.products);
                setPagination(res.data.pagination);
            }
            setIsLOading(false);
        } catch (error) {
            console.log(error);
            setIsLOading(false);
        }
    }

    const getAllProducts = async () => {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
        const all = res.data.products;
        let categoryList = ['所有商品']
        all.map(i => {
            categoryList.push(i.category)
        })
        setCategories([...new Set(categoryList)]);
    }

    const addToCart = async (id) => {
        const data = {
            data: {
                product_id: id,
                qty: 1
            }
        }
        try {
            setIsLOading(true);
            const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data);
            getCart();
            setIsLOading(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts('所有商品', 1);
        getAllProducts()
    }, [])

    return (
        <>
            <div className="container mt-md-5 mt-3 mb-7 full-height">
                <Loading isLoading={isLoading} />
                <div className="row">
                    <div className="col-lg-2">
                        <h4 className="d-none d-lg-flex">產品類型</h4>

                        <ul className="list-group d-lg-block" style={{ flexFlow: 'row wrap' }}>
                            {categories.map((category, i) => {
                                return (
                                    <li className="list-group-item border-0 " key={i}>
                                        <button className={`btn w-100 rounded ${currentCategory === category ? 'btn-primary' : ''}`} onClick={(e) => {
                                            setCurrentCategory(category)
                                            getProducts(category, 1)
                                        }}>{category}</button>
                                    </li>
                                )
                            })}
                        </ul>


                    </div>
                    <div className="col-lg-10">
                        <div className="row">
                            {products.map((product) => {
                                return (
                                    <div className="col-md-6 col-lg-4 col-xl-3 px-4" key={product.id}>
                                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }} className="card  mb-4 border-0">
                                            <div className="img-wrapper position-relative">
                                                <img src={product.imageUrl} className="card-img-top  object-cover " height='250px' alt="..." />
                                                <div className="detail-icon fs-5 fw-bold text-primary position-absolute top-50 start-50 translate-middle">
                                                    <i className="bi bi-search"></i> 查看更多
                                                </div>
                                            </div>
                                            <div className="card-body ">
                                                <h4 className="mb-4 mt-2 text-center fw-bold">{product.title}</h4>
                                                <div className="d-flex justify-content-center align-items-end">
                                                    <p className="text-muted mb-0 me-2" style={{ textDecoration: 'line-through', fontSize: '12px' }}>原價 NT${product.origin_price}</p>
                                                    <p className="mb-0">特價 NT${product.price}</p>
                                                </div>

                                                {/* <p className="card-text text-muted mb-0">{product.description}</p> */}
                                            </div>
                                            <div className="card-footer bg-white border-top-0 d-flex justify-content-center align-items-center pb-3">
                                                <button type="button" className="btn btn-primary w-75 "
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        addToCart(product.id)
                                                    }}>加入購物車</button>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        <nav className="d-flex justify-content-center">
                            <Pagination pagination={pagination} changePage={getProducts} currentCategory={currentCategory} />
                        </nav>
                    </div>

                </div>



            </div>
        </>
    )
}
export default Products