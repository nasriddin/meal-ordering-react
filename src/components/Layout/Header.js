import React from "react";
import classes from './Header.module.css';
import bannerImg from '../../assets/img.png'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {

    return (
        <>
            <header className={classes.header}>
                <h1>Order Meals</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={bannerImg} alt="A table full of food!"/>
            </div>

        </>
    )

}
export default Header;
