package org.crossfit.app.service;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.crossfit.app.domain.CrossFitBox;
import org.crossfit.app.exception.CrossFitBoxConfiguration;
import org.crossfit.app.repository.CrossFitBoxRepository;
import org.crossfit.app.security.UserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

@Service
public class CrossFitBoxFactory {

    private final Logger log = LoggerFactory.getLogger(CrossFitBoxFactory.class);

    
	@Inject
	private CrossFitBoxRepository crossFitBoxRepository;
	
	@Autowired
	private HttpServletRequest request;
	
	@Bean()
    @Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
	public CrossFitBox getCurrentCrossFitBox(){
		CrossFitBox box = crossFitBoxRepository.findOneByWebsite(request.getServerName());
		
		if (box == null){
			log.warn("Aucune box n'est recensée à l'adresse "+ request.getServerName());
			throw new CrossFitBoxConfiguration("Aucune box n'est recensée à l'adresse "+ request.getServerName());
		}
		
		log.debug("Current CorssFitBox: {}", box.getName());
		
		return box;
	}
}
