package org.crossfit.app.repository;

import org.crossfit.app.domain.MembershipType;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the MembershipType entity.
 */
public interface MembershipTypeRepository extends JpaRepository<MembershipType,Long> {

}
