package com.dgte.shared.firebase;

import java.util.Collection;
import java.util.List;

import org.springframework.core.style.ToStringCreator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class FirebaseUserDetails implements UserDetails {
    private static final long serialVersionUID = 1L;

    private final boolean enabled = true;
    private final boolean credentialsNonExpired = true;
    private final boolean accountNonLocked = true;
    private final boolean accountNonExpired = true;
    private final String password = null;
    private String username = null;
    private String displayName = null;
    private String photoUrl;
    private String id = null;
    private String fbLink = null;
    private List<? extends GrantedAuthority> authorities;

    public FirebaseUserDetails(String email, String uid) {
        this.username = email;
        this.id = uid;
    }

    @Override
    public String toString() {
        return new ToStringCreator(this)
                .append("un", username)
                .append("name", displayName)
                .toString();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    public String getPassword() {
        return password;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getFbLink() {
        return fbLink;
    }

    public void setFbLink(String fbLink) {
        this.fbLink = fbLink;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

}
