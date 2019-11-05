package com.dgte.erp.games.validator;

import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.dgte.erp.games.domain.OrderType;
import com.dgte.erp.games.dto.PublicOrderDto;

@Component
public class OrderValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        boolean supported = clazz.isAssignableFrom(PublicOrderDto.class);
        return supported;
    }

    @Override
    public void validate(Object target, Errors errors) {
        PublicOrderDto order = (PublicOrderDto) target;

        if (order.getType() == OrderType.BUY_OR_RENT) {
            if ((order.getBuyOrderItems() == null || order.getBuyOrderItems().isEmpty()) && (order.getRentOrderItems() == null || order.getRentOrderItems().isEmpty())) {
                errors.rejectValue("buyOrderItems", "empty", "one of buy or rent order items mustn't be empty when buying or renting");
            }
            if (null == order.getBuyDeliveryAddress() || Strings.isEmpty(order.getBuyDeliveryAddress().getLine1())) {
                errors.rejectValue("buyDeliveryAddress", "empty", "delivery address can't be empty when buying or renting");
            }
        }

        if (order.getType() == OrderType.SELL) {
            if (order.getSellOrderItems() == null || order.getSellOrderItems().isEmpty()) {
                errors.rejectValue("sellOrderItems", "empty", "sell order items mustn't be empty when selling");
            }
            if (null == order.getBuyDeliveryAddress() || Strings.isEmpty(order.getBuyDeliveryAddress().getLine1())) {
                errors.rejectValue("sellDeliveryAddress", "empty", "delivery address can't be empty when selling");
            }
        }
    }

}
