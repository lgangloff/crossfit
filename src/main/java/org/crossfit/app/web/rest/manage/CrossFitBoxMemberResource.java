package org.crossfit.app.web.rest.manage;

import javax.inject.Inject;

import org.crossfit.app.domain.Member;
import org.crossfit.app.repository.AuthorityRepository;
import org.crossfit.app.repository.MemberRepository;
import org.crossfit.app.security.AuthoritiesConstants;
import org.crossfit.app.service.CrossFitBoxSerivce;
import org.crossfit.app.web.rest.MemberResource;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.Sets;

/**
 * REST controller for managing Member.
 */
@RestController
@RequestMapping("/manage")
public class CrossFitBoxMemberResource extends MemberResource {

    private final Logger log = LoggerFactory.getLogger(CrossFitBoxMemberResource.class);

    @Inject
    private MemberRepository memberRepository;

    @Inject
    private CrossFitBoxSerivce boxService;

    @Inject
    private AuthorityRepository authorityRepository;

    @Inject
    private PasswordEncoder passwordEncoder;

	@Override
	protected Member doSave(Member member) {
		String baselogin =
				member.getUser().getFirstName().substring(0, 1).toLowerCase() +
				member.getUser().getLastName().toLowerCase();
		String login = baselogin;
		int i = 2;
		while (memberRepository.findOneByLogin(login) != null) {
			login = baselogin + i;
			i++;
		}
		member.getUser().setActivated(true);
		member.getUser().setAuthorities(Sets.newHashSet(authorityRepository.findOne(AuthoritiesConstants.USER)));
		member.getUser().setCreatedBy(((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
		member.getUser().setCreatedDate(DateTime.now());
		member.getUser().setLogin(login);
		member.getUser().setPassword(passwordEncoder.encode(login + DateTime.now().getYear()));
		
		member.setBox(boxService.findCurrentCrossFitBox());
		return super.doSave(member);
	}

	@Override
	protected Page<Member> doFindAll(Pageable generatePageRequest) {
		return memberRepository.findAll(boxService.findCurrentCrossFitBox(), generatePageRequest);
	}

	@Override
	protected Member doGet(Long id) {
		return memberRepository.findOne(id, boxService.findCurrentCrossFitBox());
	}

	@Override
	protected void doDelete(Long id) {
		Member memberToDelete = memberRepository.findOne(id);
		if (memberToDelete.getBox().equals(boxService.findCurrentCrossFitBox())){
			memberRepository.delete(memberToDelete);
		}
	}
    

    
}
