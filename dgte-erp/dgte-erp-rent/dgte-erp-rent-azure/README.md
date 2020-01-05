https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#v2
npm install -g azure-functions-core-tools@3

Install Azure CLI
https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest

mvn clean install
dgte-erp-rent-azure/mvn spring-boot:run (Run as pure spring boot 8080)
dgte-erp-rent-azure/mvn azure-functions:run (Run as spring boot on Azure func 7071)

Spring Security + Azure Active Directory
https://docs.microsoft.com/en-us/azure/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-active-directory