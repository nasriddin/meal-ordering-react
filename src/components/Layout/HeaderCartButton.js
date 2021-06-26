import React, {useContext, useEffect, useState} from "react";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext)
    const [btnHighlight, setBtnHighlight] = useState(false)

    const {items} = cartCtx;
    const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0)
    const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ''}`;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnHighlight(true)
        const timer = setTimeout(() => {
            setBtnHighlight(false)
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [items])
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>
                Your cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}
export default HeaderCartButton;
