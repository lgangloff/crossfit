package org.crossfit.app.repository;

import org.crossfit.app.domain.Booking;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Booking entity.
 */
public interface BookingRepository extends JpaRepository<Booking,Long> {

}
