package org.crossfit.app.repository;

import org.crossfit.app.domain.CrossFitBox;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the CrossFitBox entity.
 */
public interface CrossFitBoxRepository extends JpaRepository<CrossFitBox,Long> {

    @Query("select distinct crossFitBox from CrossFitBox crossFitBox left join fetch crossFitBox.administratorss")
    List<CrossFitBox> findAllWithEagerRelationships();

    @Query("select crossFitBox from CrossFitBox crossFitBox left join fetch crossFitBox.administratorss where crossFitBox.id =:id")
    CrossFitBox findOneWithEagerRelationships(@Param("id") Long id);

}
