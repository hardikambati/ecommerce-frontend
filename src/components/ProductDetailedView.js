import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// ICONS
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


function ProductDetailedView() {

    const [product, setProduct] = useState('');
    const [desc, setDesc] = useState('');
    const [brought_before, setBB] = useState('');
    const [price, setPrice] = useState('');
    const [postedBy, setPostedBy] = useState('');

    const prev_page_data = useLocation();
    // const product_id = prev_page_data.data;

    const auth = {headers: {
        'x-access-token': localStorage.getItem("token")
    }}

    useEffect(() => {

        var product_id = window.location.href.split("/").pop();

        axios
        .get("http://127.0.0.1:8000/products/" + product_id, auth)
        .then(response => {
            setProduct(response.data.name);
            setDesc(response.data.description);
            setBB(response.data.brought_before);
            setPrice(response.data.cost);
            setPostedBy(response.data.posted_by)
        })
        .catch(error => {
            if(!product_id) {
                window.history.back();
            }
            console.log(error);
        })
    }, [])


    return (
        <div id="pd-wrap">
        {localStorage.getItem("token")
            ?
            <div>
                <div id="pd-ar-back" onClick={() => window.history.back()}>
                    <ArrowBackIosIcon />
                    <div id="pd-back">
                        back
                    </div>
                </div> 
    
                <div id="pd-outermost">
                    <div id="pd-outer">
                        <div id="pd-img-tag">   
                            <img src="/images/download.jpeg" height="320px" width="300px" alt="error" />
                        </div>

                        <div id="pd-data">
                            <div id="pd-data-name">
                                { product }
                            </div>
                            <hr id="pd-data-hr" />
                            <div id="pd-data-meta">
                                Posted By: { postedBy }   <br/><br/>
                            </div>
                            <div id="pd-data-meta">
                                { desc }   <br/>
                            </div>
                            <div id="pd-data-price">
                                ${ price }
                            </div>

                            <div id="pd-buttons">
                                <button id="pd-buy">buy</button>
                                <button id="pd-wishlist">wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div id="notoken-error">
                <div id="notoken-text">Login To Access this page</div>
            </div>
        }
        </div>
    );
}
export { ProductDetailedView };