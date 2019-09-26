package com.dgte.erp.games.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter  {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
            .logout()
                .logoutUrl("/logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessHandler(httpOkLogoutHandler())
                .permitAll()
            .and()
                .authorizeRequests()
                .anyRequest().permitAll()
            .and()
            .csrf().disable();
    }

    @Bean
    public LogoutSuccessHandler httpOkLogoutHandler() {
        return new LogoutSuccessHandler() {
            @Override
            public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication arg2)
                    throws IOException, ServletException {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().flush();
            }
        };
    }

}
