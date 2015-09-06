package org.crossfit.app.repository;

import org.crossfit.app.domain.TimeSlot;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the TimeSlot entity.
 */
public interface TimeSlotRepository extends JpaRepository<TimeSlot,Long> {

}
