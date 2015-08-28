package org.crossfit.app.repository;

import org.crossfit.app.domain.Member;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Member entity.
 */
public interface MemberRepository extends JpaRepository<Member,Long> {

    @Query("select m from Member m where m.user.login = ?#{principal.username}")
    List<Member> findByUserIsCurrentUser();

}
