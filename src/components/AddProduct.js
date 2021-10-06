import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AddProduct() {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [bb, setBb] = useState('');
    const [img, setImg] = useState();
    const [imageprev, setImageprev] = useState('');
    let history = useHistory();

    function submitProductDetails(e) {
        e.preventDefault();

        if(!name || !desc || !price) return;
        
        const auth = {headers: {
            'x-access-token': localStorage.getItem("token")
        }}

        const data = {
            'name': name, 
            'description': desc,        
            'cost': price
        }

        axios
            .post('http://127.0.0.1:8000/products/add', data, auth)
            .then(response => {
                history.push('/products')
            })
            .catch(error => {
                console.log(error);
            })
    }   

    function handleImageChange(e) {
        setImageprev(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div>
        {localStorage.getItem("token") ? 
            <div id="add-outermost">
                <div id="add-outer">
                    {imageprev ? 
                        <div id="add-img">
                            <img src={imageprev} height="280px" width="300px" alt="preview" />
                        </div>
                        :
                        <div id="add-img-tag">
                            <div id="add-img-tag-stat">
                                Image Preview
                            </div>    
                        </div>
                    }

                    <div id="add-data">
                        <form onSubmit={submitProductDetails}>
                            <input type="text" placeholder="Name" 
                                value={name} onChange={e => setName(e.target.value)} id="add-name" required />   <br/><br/><br/>
                            <input type="text" placeholder="Description" 
                                value={desc} onChange={e => setDesc(e.target.value)} id="add-desc" required />   <br/><br/><br/>
                            <input type="text" placeholder="Price" 
                                value={price} onChange={e => setPrice(e.target.value)} id="add-price" required />  <br/><br/><br/>
                            <input type="file" placeholder="Image" 
                                id="add-img-data" onChange={e=>{setImg(e.target.files[0]); handleImageChange(e)}} accept="image/*" />    <br/><br/><br/>
                            <button type="submit" id="add-btn">ADD</button>
                        </form>
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
export { AddProduct };