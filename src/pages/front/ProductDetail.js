import axios from "axios";
import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

function ProductDetail() {
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const { getCart } = useOutletContext()

    const getProduct = async (id) => {
        setIsLoading(true);
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
        setProduct(res.data.product);
        setIsLoading(false);
    }

    const addToCart = async () => {
        const data = {
            data: {
                product_id: product.id,
                qty: qty,
            }
        }
        setIsLoading(true);
        try {
            const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data);
            getCart()
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getProduct(id)
    }, [id])

    return (<>
        <div className="container full-height py-3">
            <Loading isLoading={isLoading} />
            <div className="row">
                <div className="col-md-7">
                    <img src={product.imageUrl} alt="" className="w-100 object-cover rounded" style={{ maxHeight: '500px' }} />
                </div>
                <div className="col-md-5 py-3">
                    <h2 className="mb-3 fw-bold">{product.title}</h2>
                    <p>{product.description}</p>
                    <p className="mb-1" style={{ textDecoration: 'line-through', fontSize: '16px' }}>NT$ {product.origin_price}</p>
                    <h2 className="fw-bold text-primary mb-3">NT$ {product.price} / {product.unit}</h2>
                    <div className="d-flex mt-5">
                        <div className="input-group border rounded me-2">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-primary rounded-0 border-0 py-3" type="button" id="button-addon1" onClick={() => setQty((pre) => pre === 1 ? pre : pre - 1)}>
                                    <i className="bi bi-dash-lg"></i>
                                </button>
                            </div>
                            <input type="number" value={qty} className="form-control border-0 text-center my-auto shadow-none" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" readOnly />
                            <div className="input-group-append">
                                <button className="btn btn-outline-primary rounded-0 border-0 py-3" type="button" id="button-addon2" onClick={() => setQty((pre) => pre + 1)}>
                                    <i className="bi bi-plus-lg"></i>
                                </button>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary w-100 rounded" onClick={() => addToCart()} disabled={isLoading}>加入購物車</button>
                    </div>

                </div>
            </div>
            {/* 
            <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
                <div className="card border-0">
                    <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        <div className="d-flex justify-content-between align-items-center pe-1">
                            <h4 className="mb-0">
                                Lorem ipsum
                            </h4>
                            <i className="fas fa-minus"></i>
                        </div>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="card-body pb-5">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                        </div>
                    </div>
                </div>
                <div className="card border-0">
                    <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                        <div className="d-flex justify-content-between align-items-center pe-1">
                            <h4 className="mb-0">
                                Lorem ipsum
                            </h4>
                            <i className="fas fa-plus"></i>
                        </div>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="card-body pb-5">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                        </div>
                    </div>
                </div>
                <div className="card border-0">
                    <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingThree" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                        <div className="d-flex justify-content-between align-items-center pe-1">
                            <h4 className="mb-0">
                                Lorem ipsum
                            </h4>
                            <i className="fas fa-plus"></i>
                        </div>
                    </div>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="card-body pb-5">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                        </div>
                    </div>
                </div>
            </div> */}


        </div>

    </>)
}
export default ProductDetail