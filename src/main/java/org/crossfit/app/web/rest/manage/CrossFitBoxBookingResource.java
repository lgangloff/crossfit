package org.crossfit.app.web.rest.manage;

import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.crossfit.app.domain.Booking;
import org.crossfit.app.repository.BookingRepository;
import org.crossfit.app.service.CrossFitBoxSerivce;
import org.crossfit.app.service.TimeService;
import org.crossfit.app.service.TimeSlotService;
import org.crossfit.app.web.rest.dto.TimeSlotInstanceDTO;
import org.crossfit.app.web.rest.dto.planning.PlanningDTO;
import org.crossfit.app.web.rest.dto.planning.PlanningDayDTO;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

/**
 * REST controller for managing Booking.
 */
@RestController
@RequestMapping("/manage")
public class CrossFitBoxBookingResource {

    private final Logger log = LoggerFactory.getLogger(CrossFitBoxBookingResource.class);

    @Inject
    private BookingRepository bookingRepository;

    @Inject
    private TimeService timeService;

    @Inject
    private TimeSlotService timeSlotService;
    @Inject
    private CrossFitBoxSerivce boxService;

    /**
     * GET  /bookings -> get all the bookings.
     */
    @RequestMapping(value = "/planning",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<PlanningDTO> get(@RequestParam(value = "page" , required = false, defaultValue = "0") Integer offset,
                                  @RequestParam(value = "per_page", required = false, defaultValue = "7") Integer limit)
        throws URISyntaxException {
        
    	DateTime start = timeService.now().plusDays((offset < 0 ? 0 : offset) * limit);
    	DateTime end = start.plusDays(limit <= 0 ? 1 : limit);
    	
    	if (Days.daysBetween(start, end).getDays() > 7){
    		log.warn("Le nombre de jour recherche est trop important: " + Days.daysBetween(start, end).getDays());
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	}

    	List<Booking> bookings = bookingRepository.findAll(boxService.findCurrentCrossFitBox(), start, end);
    	List<TimeSlotInstanceDTO> slotInstances = timeSlotService.findAllTimeSlotInstance(start, end);
    	
    	List<PlanningDayDTO> days = 
			slotInstances.stream().map(slot ->{
	    		slot.setBookings(bookings.stream().filter(b -> {return slot.contains(b.getStartAt(), b.getEndAt());}).collect(Collectors.toList()));
	    		return slot;
	    	})
    		.sorted( (s1, s2) -> { return s1.getStart().compareTo(s2.getStart());} )
    		.collect(Collectors.groupingBy(TimeSlotInstanceDTO::getDate))
    		.entrySet().stream()
    		.map(entry -> {
    			return new PlanningDayDTO(entry.getKey(), entry.getValue());
    		})
    		.collect(Collectors.toList());
    	
    	
    	
    	return new ResponseEntity<>(new PlanningDTO(days) , HttpStatus.OK);
    }

    


}
