package com.dgte.erp.rent.handler;

import java.util.List;
import java.util.Optional;

import org.springframework.cloud.function.adapter.azure.AzureSpringBootRequestHandler;

import com.dgte.erp.rent.shared.dto.ApartmentDto;
import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;

public class FindAllApartmentsHandler extends AzureSpringBootRequestHandler<Optional<?>, List<ApartmentDto>> {

    @FunctionName("findAllApartments")
    public List<ApartmentDto> findAllApartments(@HttpTrigger(name = "req",
            methods = {HttpMethod.GET},
            authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<?>> request,
        ExecutionContext context) {

        context.getLogger().info(String.format("Find all apartments"));
        return super.handleRequest(Optional.empty(), context);

    }

}
