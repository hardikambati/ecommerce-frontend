import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';

function Products() {

    const [products, setProducts] = useState([]);
    const [queryproducts, setQueryproducts] = useState([])
    const [query, setQuery] = useState('');
    
    const [querystate, setQuerystate] = useState(false);
    const [err, setErr] = useState('');
    let history = useHistory();

    // to display all the products
    useEffect(() => {
        const auth = {headers: {
            'x-access-token': localStorage.getItem("token")
        }}



        axios
            .get("http://127.0.0.1:8000/products/all", auth)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    },[])
    

    // redirects to detailed view page 
    // sends id as a parameter
    function detailedView(id) {
        var product_id = {
            pathname: '/product-detail/' + id,
            data: id
        }
        history.push(product_id);
    }

    // submits query
    // takes the returned data & displays on new page
    function SearchPage(e) {
        e.preventDefault();

        if(!query) return;
        const val = {
            "query" : query
        }
        axios
            .post("http://127.0.0.1:8000/product/search/", val)
            .then(response => {
                    setQuerystate(true);
                    if(response.data === "failure") {
                        setErr("No results found");
                    } else {
                        setQueryproducts(response.data)
                    }
                })
            .catch(error => {
                console.log(error);
            })
    }
     
    switch(Boolean(localStorage.getItem("token"))) {
        case true:
            return (
                <div id="p-outer-outer">

                <div id="p-search-comp">
                    <div id="p-search">
                        <input type="text" 
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        placeholder="Search for a product" id="p-search-bar" />
                    </div>
                    <div id="p-search-icon" onClick={SearchPage}>
                        <SearchIcon fontSize="large" id="search-icon" />
                    </div>
                    
                    {querystate ? <div id="p-back-btn" onClick={e => {setQuerystate(false); setQuery('')}}>
                                    <div id="p-back-btn-text">BACK</div> 
                                </div> : <div></div>}
                </div>

                {/* if a word is searched */}
                {querystate ?   
                    <div> 
                    {err ?
                        // if no results are found
                        <div id="p-error-data">
                            <img src="/images/noresults.jpg" height="200" width="200" alt="no-results" />
                            <div id="p-search-err">{ err }</div>
                        </div>
                        : 
                        <div id="p-outer">
                            {queryproducts.map((product) => 
                                <div id='outer-card' onClick={() => detailedView(product.id)}>
                                    {/* change http... url to deployed website url */}
                                    <div id="p-img">
                                        <img src={ 'http://127.0.0.1:8000' + product.image } height="250" width="250" alt="error" />
                                    </div>
                                    <div id="p-data">
                                        <div id="p-title">{ product.name }</div> 
                                        <hr id="p-hr" />
                                        <div id="p-desc">{ product.description.slice(0, 26) }...</div>  
                                        <div id="p-price">${ product.cost }</div>
                                    </div>
                                    <button id="p-buy">Buy</button> 
                                    <button id="p-wish">Wishlist</button>
                                </div>
                            )}
                        </div>
                    } 
                    </div>
                    :
                    <div id="p-outer">
                        {products.map((product) => 
                            <div id='outer-card'>
                                {/* change http... url to deployed website url */}
                                <div id="p-img"  onClick={() => detailedView(product._id)}>
                                    <img src="images/download.jpeg" height="250" width="250" alt="error" />
                                </div>
                                <div id="p-data">
                                    <div id="p-title">{ product.name }</div> 
                                    <hr id="p-hr" />
                                    <div id="p-desc">{ product.description.slice(0, 26) }...</div>  
                                    <div id="p-price">₹{ product.cost }</div>
                                </div>
                                <button id="p-buy">Buy</button> 
                                <button id="p-wish">Wishlist</button>
                            </div>
                        )}
                    </div>
                }
                <div id="p-lower-nav">

                </div>
            </div>
            );

        case false:
            return (
                <div className="access-denied-container">
                    <div id="access-denied">403</div>
                    <div id="access-denied-msg">Access Denied</div>
                </div>
            );
        }

}
export { Products };