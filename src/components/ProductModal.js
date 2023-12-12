import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"
import { MessageContext, handleSuccessMessage, handleErrorMessage } from "../store/messageStore";
import Loading from "./Loading";

function ProductModal({ closeProductModal, getProducts, type, tempProduct }) {
    const [tempData, setTempData] = useState({
        "title": "",
        "category": "",
        "origin_price": 100,
        "price": 300,
        "unit": "",
        "description": "",
        "content": "",
        "is_enabled": 1,
        "imageUrl": "",
        "imagesUrl": [],
    });
    const [isLoading, setIsLoading] = useState(false)
    const [, dispatch] = useContext(MessageContext);
    const imagesRef = useRef(null)

    useEffect(() => {
        if (type === 'create') {
            setTempData({
                "title": "",
                "category": "",
                "origin_price": 100,
                "price": 300,
                "unit": "",
                "description": "",
                "content": "",
                "is_enabled": 1,
                "imageUrl": "",
                "imagesUrl": [],
            })
        } else if (type === 'edit') {
            setTempData(tempProduct)
        }
    }, [type, tempProduct])

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['price', 'origin_price'].includes(name)) {
            setTempData({
                ...tempData,
                [name]: Number(value),
            })
        } else if (name === 'is_enabled') {
            setTempData({
                ...tempData,
                [name]: Boolean(e.target.checked),
            })
        } else {
            setTempData({
                ...tempData,
                [name]: value,
            })
        }
    }

    const uploadImgs = async () => {
        const imgs = tempData?.imagesUrl ? [...tempData.imagesUrl] : [];
        const files = [...imagesRef.current.files]
        let index = 0;
        for (let i = 0; i < files.length; i++) {
            index += 1;
            const formData = new FormData();
            formData.append('image', files[i]);
            try {
                setIsLoading(true)
                const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
                    formData);
                console.log(res)
                imgs.push(res.data.imageUrl);
                if (index === files.length) {
                    setTempData({
                        ...tempData,
                        imagesUrl: [...imgs]
                    })
                };
                setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
    }

    const removeImage = (i) => {
        const arr = tempData.imagesUrl;
        arr.splice(i, 1);
        setTempData({
            ...tempData,
            imagesUrl: [...arr]
        })
    }

    const submit = async () => {
        try {
            let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
            let method = 'post';
            if (type === 'edit') {
                api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
                method = 'put'
            }
            const res = await axios[method](api, {
                data: tempData
            });
            handleSuccessMessage(dispatch, res);
            closeProductModal();
            getProducts();
        } catch (error) {
            //console.log(error);
            handleErrorMessage(dispatch, error);
        }
    }

    return (
        <div
            className='modal fade'
            tabIndex='-1'
            aria-labelledby='productModal'
            aria-hidden='true'
            id='productModal'
        >
            <Loading isLoading={isLoading} />
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='productModal'>
                            {type === 'create' ? '建立新商品' : `編輯${tempProduct.title}`}
                        </h1>
                        <button
                            type='button'
                            className='btn-close'
                            aria-label='Close'
                            onClick={closeProductModal}
                        />
                    </div>
                    <div className='modal-body'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='image'>
                                        輸入圖片網址
                                        <input
                                            type='text'
                                            name='imageUrl'
                                            id='image'
                                            placeholder='請輸入圖片連結'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.imageUrl}
                                        />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='imagesUrl'>
                                        或 上傳圖片
                                        <input
                                            type='file'
                                            id='imagesUrl'
                                            name="imagesUrl"
                                            className='form-control'
                                        />
                                    </label>
                                </div>
                                <img src={tempData.imageUrl} alt='' className='img-fluid' />
                            </div>

                            <div className='col-sm-8'>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='title'>
                                        標題
                                        <input
                                            type='text'
                                            id='title'
                                            name='title'
                                            placeholder='請輸入標題'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.title}
                                        />
                                    </label>
                                </div>
                                <div className='row'>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='category'>
                                            分類
                                            <input
                                                type='text'
                                                id='category'
                                                name='category'
                                                placeholder='請輸入分類'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.category}
                                            />
                                        </label>
                                    </div>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='unit'>
                                            單位
                                            <input
                                                type='unit'
                                                id='unit'
                                                name='unit'
                                                placeholder='請輸入單位'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.unit}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='origin_price'>
                                            原價
                                            <input
                                                type='number'
                                                id='origin_price'
                                                name='origin_price'
                                                placeholder='請輸入原價'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.origin_price}
                                            />
                                        </label>
                                    </div>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='price'>
                                            售價
                                            <input
                                                type='number'
                                                id='price'
                                                name='price'
                                                placeholder='請輸入售價'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.price}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <hr />
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='description'>
                                        產品描述
                                        <textarea
                                            type='text'
                                            id='description'
                                            name='description'
                                            placeholder='請輸入產品描述'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.description}
                                        />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='content'>
                                        說明內容
                                        <textarea
                                            type='text'
                                            id='content'
                                            name='content'
                                            placeholder='請輸入產品說明內容'
                                            className='form-control'
                                            onChange={handleChange}
                                            value={tempData.content}
                                        />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <div className='form-check'>
                                        <label
                                            className='w-100 form-check-label'
                                            htmlFor='is_enabled'
                                        >
                                            是否啟用
                                            <input
                                                type='checkbox'
                                                id='is_enabled'
                                                name='is_enabled'
                                                placeholder='請輸入產品說明內容'
                                                className='form-check-input'
                                                onChange={handleChange}
                                                checked={Boolean(tempData.is_enabled)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='modal-body'>
                        <div>
                            <label className='d-flex justify-content-center' htmlFor='customFile'>
                                <button type="button" className="btn btn-outline-primary d-flex align-items-center"
                                    onClick={() => imagesRef.current.click()} ><i className="bi bi-cloud-arrow-up fs-4 me-1"></i>上傳其他圖片</button>
                                <input
                                    type='file'
                                    id='customFile'
                                    className='form-control d-none'
                                    ref={imagesRef}
                                    onChange={uploadImgs}
                                    multiple
                                />
                            </label>
                            <div className="d-flex flex-wrap">
                                {tempData?.imagesUrl?.map((item, i) => {
                                    return (
                                        <div className="d-flex align-items-center mt-3 mx-1" key={i}>
                                            <div className="position-relative m-auto">
                                                <img style={{ height: '135px', width: '135px', objectFit: 'cover' }} src={item} alt="商品圖片" />
                                                <button type="button" className="btn btn-dark fw-bold rounded-circle position-absolute d-flex align-items-center justify-content-center" style={{ top: '0', right: '0', height: '2rem', width: '2rem' }}
                                                    onClick={() => removeImage(i)}
                                                ><i className="bi bi-x fs-4"></i></button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>


                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={closeProductModal} >
                            關閉
                        </button>
                        <button type='button' className='btn btn-primary' onClick={submit}>
                            儲存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModal




