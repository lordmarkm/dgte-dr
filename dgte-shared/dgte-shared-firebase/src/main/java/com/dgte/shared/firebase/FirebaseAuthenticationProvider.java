package com.dgte.shared.firebase;

import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.stereotype.Component;

import com.dgte.shared.firebase.client.CustomerAuthorityClient;
import com.dgte.shared.firebase.user.client.UserAuthorityClient;
import com.google.api.core.ApiFuture;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

@Component
public class FirebaseAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

    private static final Logger LOG = LoggerFactory.getLogger(FirebaseAuthenticationProvider.class);

    @Autowired
    private FirebaseAuth firebaseAuth;

    @Autowired(required = false)
    private UserAuthorityClient userAuthorityClient;

    @Override
    public boolean supports(Class<?> authentication) {
        return (FirebaseAuthenticationToken.class.isAssignableFrom(authentication));
    }

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails,
            UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
    }

    @Override
    protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication)
            throws AuthenticationException {

        LOG.info("Attempting to authenticate w/ firebase. Provided username={}", username);
        final FirebaseAuthenticationToken authenticationToken = (FirebaseAuthenticationToken) authentication;
        LOG.info("Provided token={}", authenticationToken.getToken());
        ApiFuture<FirebaseToken> task = firebaseAuth.verifyIdTokenAsync(authenticationToken.getToken());
        try {
            FirebaseToken token = task.get();
            FirebaseUserDetails fbud = new FirebaseUserDetails(token.getEmail(), token.getUid());
            fbud.setDisplayName(token.getName());
            fbud.setPhotoUrl(task.get().getPicture());
            setAuthorities(fbud);

            LOG.info("Returning authenticated user={}", fbud);
            return fbud;
        } catch (InterruptedException | ExecutionException e) {
            LOG.error("Invalid login.", e);
            throw new SessionAuthenticationException(e.getMessage());
        }
    }

    private void setAuthorities(FirebaseUserDetails fbud) {
        if (null != userAuthorityClient) {
            fbud.setAuthorities(userAuthorityClient.getUserAuthorities(fbud.getUsername()).getBody());
        } else {
            LOG.warn("No authority client is defined! User will have no authorities in this Spring context");
        }
    }

}
