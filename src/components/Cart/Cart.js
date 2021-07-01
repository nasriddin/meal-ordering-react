import Modal from "../UI/Modal";
import classes from './Cart.module.css'
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from './Checkout'

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmited, setIsSubmited] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmited(true);
        await fetch('https://mealordertest-a125b-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmited(false);
        setDidSubmit(true);
        cartCtx.clearCart()
    }
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    }
    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) =>
            <CartItem key={item.id}
                      name={item.name}
                      price={item.price}
                      amount={item.amount}
                      onRemove={cartItemRemoveHandler.bind(null, item.id)}
                      onAdd={cartItemAddHandler.bind(null, item)}/>)}
    </ul>;
    const modalActions = (<div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>);

    const cartModalContent = (
        <>
            {cartItems}

            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCancel}/>}
            {!isCheckout && modalActions}



        </>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = (
        <>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </>
    );
    return (
        <Modal onClose={props.onClose}>
            {!isSubmited && !didSubmit && cartModalContent}
            {isSubmited && isSubmittingModalContent}
            {!isSubmited && didSubmit && didSubmitModalContent}
        </Modal>
    )
}
export default Cart;
