package com.dgte.shared.firebase;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;

import com.google.common.base.Strings;

public class FirebaseAuthenticationTokenFilter extends AbstractAuthenticationProcessingFilter {

    public static final String TOKEN_HEADER = "X-Firebase-Auth";

    public FirebaseAuthenticationTokenFilter() {
        super(new OrRequestMatcher(
            new AntPathRequestMatcher("/mobile-api/**"),
            new AntPathRequestMatcher("/api/**"),
            new AntPathRequestMatcher("/auth/**"),
            new AntPathRequestMatcher("/authorized/**")
        ));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        final String authToken = request.getHeader(TOKEN_HEADER);

        if (Strings.isNullOrEmpty(authToken)) {
            return new AnonymousAuthenticationToken("firebase-authentication-token-filter", "anonymousUser", AuthorityUtils.createAuthorityList("ROLE_ANONYMOUS"));
        }
        //This is used by xyz.quadx.xpay.gateway.FeignClientConfig.firebaseTokenInserter()
        FirebaseTokenHolder.set(authToken);

        return getAuthenticationManager().authenticate(new FirebaseAuthenticationToken(authToken));
    }

    /**
     * Make sure the rest of the filterchain is satisfied
     *
    */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult)
            throws IOException, ServletException {
        super.successfulAuthentication(request, response, chain, authResult);

        // As this authentication is in HTTP header, after success we need to continue the request normally
        // and return the response as if the resource was not secured at all
        chain.doFilter(request, response);
    }
}