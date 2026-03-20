import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

const ProductList = () => {
    const [showCart, setShowCart] = useState(false); 
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // Calculate total quantity for the cart icon
    const calculateTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    // Check if item is already in cart to disable button
    const isAddedToCart = (productName) => {
        return cartItems.some(item => item.name === productName);
    };

    const plantsArray = [
        /* Your plants data array here */
    ];

    return (
        <div>
            <div className="navbar">
                <div className="cart" onClick={(e) => handleCartClick(e)}>
                    <a href="#">
                        <h1 className="cart_icon">
                            <span className="cart_quantity_count">{calculateTotalQuantity()}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                                <rect width="156" height="156" fill="none"></rect>
                                <circle cx="80" cy="216" r="12"></circle>
                                <circle cx="184" cy="216" r="12"></circle>
                                <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.3A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path>
                            </svg>
                        </h1>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1>{category.category}</h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-cost">{plant.cost}</div>
                                        <button 
                                            className={`product-button ${isAddedToCart(plant.name) ? 'added' : ''}`} 
                                            disabled={isAddedToCart(plant.name)}
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {isAddedToCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
};

export default ProductList;