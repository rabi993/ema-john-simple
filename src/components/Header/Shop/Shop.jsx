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
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json')
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
            // console.log('added product', addedProduct)
        }
        // step 5 set the cart
        setCart(savedCart);
    },[products])


    const handleAddToCart =(product)=> {
        
       
         

        const newCart =[...cart, product];

        //option 3 from cart.jsx

        // let newCart = [];
        //if product doesn't exist in the cart, then set quantity =1
        // if exist update quantity by 1
        // const exists = cart.find(pd => pd.id===product.id);
        // if(!exists){
        //     product.quantity =1;
        //     newCart = [...cart, product]
        // }
        // else{
        //     exists.quantity = exists.quantity + 1 ;
        //     const remaining = cart.filter(pd => pd.id !== product.id);
        //     newCart= [...remaining, exists];
        // }


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