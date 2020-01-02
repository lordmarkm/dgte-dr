package com.dgte.erp.rent;

import java.util.Optional;

import org.springframework.cloud.function.adapter.azure.AzureSpringBootRequestHandler;

import com.dgte.erp.rent.shared.dto.ApartmentDto;
import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;

public class ApartmentSaveHandler extends AzureSpringBootRequestHandler<ApartmentDto, ApartmentDto> {

    @FunctionName("save")
    public ApartmentDto execute(@HttpTrigger(name = "req", methods = {HttpMethod.GET,
            HttpMethod.POST}, authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<ApartmentDto>> request,
        ExecutionContext context) {

        return request.getBody().get();
        //return handleRequest(request.getBody().get(), context);
    }

}
