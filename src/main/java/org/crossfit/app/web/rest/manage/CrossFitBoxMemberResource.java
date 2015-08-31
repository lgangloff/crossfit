package org.crossfit.app.web.rest.manage;

import com.codahale.metrics.annotation.Timed;

import org.crossfit.app.domain.CrossFitBox;
import org.crossfit.app.domain.Member;
import org.crossfit.app.repository.MemberRepository;
import org.crossfit.app.web.rest.util.HeaderUtil;
import org.crossfit.app.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Member.
 */
@RestController
@RequestMapping("/manage")
public class CrossFitBoxMemberResource {

    private final Logger log = LoggerFactory.getLogger(CrossFitBoxMemberResource.class);

    @Inject
    private MemberRepository memberRepository;
    
    @Inject
    private CrossFitBox currentCrossFitBox;

    /**
     * GET  /members -> get all the members.
     */
    @RequestMapping(value = "/members",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Member>> getAll(@RequestParam(value = "page" , required = false) Integer offset,
                                  @RequestParam(value = "per_page", required = false) Integer limit)
        throws URISyntaxException {
    	
    	SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        if(authentication != null) {
            if (authentication.getPrincipal() instanceof UserDetails) {
                UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
                log.warn("Role of {} is {}", springSecurityUser.getUsername(), springSecurityUser.getAuthorities());
            }
        }
        
        Page<Member> page = memberRepository.findAll(currentCrossFitBox.getId(), PaginationUtil.generatePageRequest(offset, limit));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/manage/members", offset, limit);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
