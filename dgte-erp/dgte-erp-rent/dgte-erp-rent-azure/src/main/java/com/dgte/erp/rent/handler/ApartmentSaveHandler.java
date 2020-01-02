package com.dgte.erp.rent.handler;

import java.util.Optional;

import org.springframework.cloud.function.adapter.azure.AzureSpringBootRequestHandler;
import org.springframework.stereotype.Component;

import com.dgte.erp.rent.shared.dto.ApartmentDto;
import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;

@Component
public class ApartmentSaveHandler extends AzureSpringBootRequestHandler<ApartmentDto, ApartmentDto> {

    @FunctionName("save")
    public ApartmentDto execute(@HttpTrigger(name = "req", methods = {HttpMethod.GET,
            HttpMethod.POST}, authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<ApartmentDto>> request,
        ExecutionContext context) {

        context.getLogger().info(
                String.format("Request for : [%s]",
                        request.getBody())
        );

        return super.handleRequest(request.getBody().get(), context);
    }

}
