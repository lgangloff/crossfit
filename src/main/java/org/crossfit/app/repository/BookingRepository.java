package org.crossfit.app.repository;

import org.crossfit.app.domain.Booking;
import org.crossfit.app.domain.CrossFitBox;
import org.joda.time.DateTime;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Booking entity.
 */
public interface BookingRepository extends JpaRepository<Booking,Long> {

    @Query("select b from Booking b where b.box =:box AND b.startAt between :start and :end")
	List<Booking> findAll(@Param("box") CrossFitBox box, @Param("start") DateTime start, @Param("end") DateTime end);

}