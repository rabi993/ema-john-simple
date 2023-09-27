/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../../Product/Product';
import Cart from '../../Cart/Cart';
import { addToDb, getShoppingCart } from '../../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect( ()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))


    },[])

    useEffect( ()=>{
        const storedCart = getShoppingCart();
        // console.log(storedCart)
        const savedCart =[];
        
        //step 1
        for(const id in storedCart){
            // console.log(id)
        
        // step 2 get the product by using id
            const addedProduct = products.find(product=> product.id ===id)
            // console.log(saveProduct)
            
            if(addedProduct){

        //step 3 get quantity of the product
            const quantity = storedCart[id];
            addedProduct.quantity= quantity;
        // step 4 add the added product to the saved cart
            savedCart.push(addedProduct);
            }
            console.log('added product', addedProduct)
        }
        // step 5 set the cart
        setCart(savedCart);
    },[products])


    const handleAddToCart =(product)=> {
        const newCart =[...cart, product];
        setCart(newCart);
        addToDb(product.id)

    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {/* <h2>Products Coming Here: {products.length} </h2> */}
                {
                    products.map(product => <Product
                        key={product.id}
                        product ={product}
                        handleAddToCart = {handleAddToCart}
                    ></Product>)
                }

            </div>
            <div className="cart-container">

               <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;