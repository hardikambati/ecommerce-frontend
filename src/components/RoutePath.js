import Route from 'react-router-dom/Route';
import { Home } from './Home';
import { Products } from './Products';
import { AddProduct } from './AddProduct';
import { MyProducts } from './MyProducts';
import { ProductDetailedView } from './ProductDetailedView';
import { AdminDashBoard } from './AdminDashBoard';

// defines all route path's
function RoutePath() {
    return (

        <div id="main-outer">
        <Route path="/" exact strict render = {
                () => {
                    return (
                        <Home />
                    );
                }
        }/>

        <Route path="/products" exact strict render = {
            () => {
                return (
                    <Products />
                );
            }
        }/>

        <Route path="/myproducts" exact strict render = {
            () => {
                return (
                    <MyProducts />
                );
            }
        }/>

        <Route path="/product/add" exact strict render = {
            () => {
                return (
                    <AddProduct />
                );
            }
        }/>

        <Route path="/product-detail/:id" exact strict render = {
            () => {
                return (
                    <ProductDetailedView />
                );
            }
        }/>

        <Route path="/admin/dashboard" exact strict render = {
            () => {
                return (
                    <AdminDashBoard />
                );
            }
        }/>
    </div>   
    );
}
export { RoutePath };