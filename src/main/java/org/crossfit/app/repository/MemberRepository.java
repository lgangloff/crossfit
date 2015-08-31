package org.crossfit.app.repository;

import org.crossfit.app.domain.CrossFitBox;
import org.crossfit.app.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Member entity.
 */
public interface MemberRepository extends JpaRepository<Member,Long> {

    @Query("select m from Member m where m.user.login = ?#{principal.username}")
    List<Member> findByUserIsCurrentUser();

    @Query("select m from Member m where m.box.id = :boxId")
	Page<Member> findAll(@Param("boxId") Long boxId, Pageable pageable);

}
