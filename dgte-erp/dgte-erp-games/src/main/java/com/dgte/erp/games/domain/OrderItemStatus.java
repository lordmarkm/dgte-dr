package com.dgte.erp.games.domain;

public enum OrderItemStatus {

    NEW,

    /**
     * Buy, Sell - fulfilled
     * Rent - Rented out and then returned
     */
    FULFILLED,

    /**
     * Buy, Rent - unfulfilled due to out of stock
     * Sell - unfulfilled due to item not received
     */
    UNFULFILLED,

    /**
     * Buy, Sell - Not applicable
     * Rent - rented out
     */
    RENTED,

    /**
     * Buy, Sell - Not applicable
     * Rent - Rented past return due date
     */
    OVERDUE,

    /**
     * Buy, Sell - Not applicable
     * Rent - Rented past absconded date & considered sold (deposit amount zeroed)
     */
    ABSCONDED

}
