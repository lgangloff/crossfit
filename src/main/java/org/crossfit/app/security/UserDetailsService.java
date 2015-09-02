package org.crossfit.app.security;

import org.crossfit.app.domain.Authority;
import org.crossfit.app.domain.CrossFitBox;
import org.crossfit.app.domain.User;
import org.crossfit.app.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import javax.inject.Inject;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Collections;
import java.util.List;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(UserDetailsService.class);

    @Inject
    private UserRepository userRepository;
    
    @Inject
    private CrossFitBox crossfitBox;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
        log.debug("Authenticating {} for CrossFitBox {} ({})", login, 
        		crossfitBox == null ? "null" : crossfitBox.getName(), 
        				crossfitBox == null ? "null" : crossfitBox.getWebsite());
        String lowercaseLogin = login.toLowerCase();
        Optional<User> userFromDatabase =  userRepository.findOneByLogin(lowercaseLogin);
        
        return userFromDatabase.map(user -> {
            if (!user.getActivated()) {
                throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
            }
            List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
                    .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                    .collect(Collectors.toList());
            
            if (crossfitBox != null && crossfitBox.getAdministrators().contains(user)){
            	grantedAuthorities.add(new SimpleGrantedAuthority(AuthoritiesConstants.MANAGER));
            }
            
            boolean isSuperAdmin = grantedAuthorities.contains(new SimpleGrantedAuthority(AuthoritiesConstants.ADMIN));
            
            if (crossfitBox == null && !isSuperAdmin){
            	throw new InternalAuthenticationServiceException(
            			"Aucune box n'est configuree et l'utilisateur " + lowercaseLogin + " na pas le role " + AuthoritiesConstants.ADMIN);
            }
            
            
            
            UserDetails userDetails = new org.springframework.security.core.userdetails.User(lowercaseLogin,
                    user.getPassword(),
                    grantedAuthorities);
            

            log.debug("User Authenticated {}", userDetails); 
            
            return userDetails;
        }).orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the database"));
    }
}
