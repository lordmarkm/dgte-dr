package com.dgte.erp.rent;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.Nullable;

import com.azure.data.cosmos.CosmosKeyCredential;
import com.microsoft.azure.spring.data.cosmosdb.config.AbstractCosmosConfiguration;
import com.microsoft.azure.spring.data.cosmosdb.config.CosmosDBConfig;
import com.microsoft.azure.spring.data.cosmosdb.core.ResponseDiagnostics;
import com.microsoft.azure.spring.data.cosmosdb.core.ResponseDiagnosticsProcessor;
import com.microsoft.azure.spring.data.cosmosdb.repository.config.EnableReactiveCosmosRepositories;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableReactiveCosmosRepositories
public class PersistenceConfig  extends AbstractCosmosConfiguration {

    @Value("${azure.cosmosdb.uri}")
    private String uri;

    @Value("${azure.cosmosdb.key}")
    private String key;

    @Value("${azure.cosmosdb.secondaryKey}")
    private String secondaryKey;

    @Value("${azure.cosmosdb.database}")
    private String dbName;

    @Value("${azure.cosmosdb.populateQueryMetrics}")
    private boolean populateQueryMetrics;
    
    private CosmosKeyCredential cosmosKeyCredential;

    @Bean
    public CosmosDBConfig getConfig() {
        this.cosmosKeyCredential = new CosmosKeyCredential(key);
        CosmosDBConfig cosmosdbConfig = CosmosDBConfig.builder(uri, 
            this.cosmosKeyCredential, dbName).build();
        cosmosdbConfig.setPopulateQueryMetrics(populateQueryMetrics);
        cosmosdbConfig.setResponseDiagnosticsProcessor(new ResponseDiagnosticsProcessorImplementation());
        return cosmosdbConfig;
    }
    
    public void switchToSecondaryKey() {
        this.cosmosKeyCredential.key(secondaryKey);
    }
    
    private static class ResponseDiagnosticsProcessorImplementation implements ResponseDiagnosticsProcessor {
    
        @Override
        public void processResponseDiagnostics(@Nullable ResponseDiagnostics responseDiagnostics) {
            log.info("Response Diagnostics {}", responseDiagnostics);
        }
    }

}
