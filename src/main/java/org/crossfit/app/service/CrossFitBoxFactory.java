package org.crossfit.app.service;

import java.util.Set;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.crossfit.app.domain.CrossFitBox;
import org.crossfit.app.exception.CrossFitBoxConfiguration;
import org.crossfit.app.repository.CrossFitBoxRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

import com.google.common.collect.Sets;

@Service
public class CrossFitBoxFactory {

    private final Logger log = LoggerFactory.getLogger(CrossFitBoxFactory.class);

    private static final Set<String> KNOW_HOSTS = Sets.newHashSet("localhost", "127.0.0.1");
    
    public static final CrossFitBox NO_BOX = new CrossFitBox();
    
	@Inject
	private CrossFitBoxRepository crossFitBoxRepository;
	
	@Autowired
	private HttpServletRequest request;
	
	@Bean()
    @Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
	public CrossFitBox getCurrentCrossFitBox(){
		String serverName = request.getServerName();
		CrossFitBox box = crossFitBoxRepository.findOneByWebsite(serverName);
		
		if (box == null){
			log.warn("Aucune box n'est recensée à l'adresse "+ request.getServerName());
			if (!KNOW_HOSTS.contains(serverName)){
				throw new CrossFitBoxConfiguration("Aucune box n'est recensée à l'adresse "+ request.getServerName());
			}
			box = NO_BOX;
		}
		else{
			log.debug("Current CorssFitBox: {}", box.getName());
		}
		
		return box;
	}
}
