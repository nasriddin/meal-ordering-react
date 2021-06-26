import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";
import React from "react";
const Meals = (props) => {
    return(
        <>
            <MealsSummary />
            <AvailableMeals />
        </>
    )
}
export default Meals
