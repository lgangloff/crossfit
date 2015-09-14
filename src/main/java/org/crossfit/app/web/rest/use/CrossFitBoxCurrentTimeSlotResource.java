package org.crossfit.app.web.rest.use;

import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.crossfit.app.domain.Booking;
import org.crossfit.app.domain.ClosedDay;
import org.crossfit.app.domain.TimeSlot;
import org.crossfit.app.domain.enumeration.Level;
import org.crossfit.app.repository.BookingRepository;
import org.crossfit.app.repository.ClosedDayRepository;
import org.crossfit.app.repository.TimeSlotRepository;
import org.crossfit.app.service.CrossFitBoxSerivce;
import org.crossfit.app.service.TimeService;
import org.crossfit.app.service.TimeSlotService;
import org.crossfit.app.web.rest.TimeSlotResource;
import org.crossfit.app.web.rest.dto.TimeSlotInstanceDTO;
import org.crossfit.app.web.rest.dto.calendar.EventDTO;
import org.crossfit.app.web.rest.dto.calendar.EventSourceDTO;
import org.crossfit.app.web.rest.manage.CrossFitBoxBookingResource;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

/**
 * REST controller for managing imeSlot.
 */
@RestController
@RequestMapping("/use")
public class CrossFitBoxCurrentTimeSlotResource extends TimeSlotResource {

	private final Logger log = LoggerFactory.getLogger(CrossFitBoxBookingResource.class);

    @Inject
    private CrossFitBoxSerivce boxService;
    
    @Inject
    private TimeService timeService;

    @Inject
    private TimeSlotRepository timeSlotRepository;
    
    @Inject
    private TimeSlotService timeSlotService;
    
    @Inject
    private ClosedDayRepository closedDayRepository;
    
    @Inject
    private BookingRepository bookingRepository;
    
    /**
     * GET  /timeSlots -> get all the timeSlots.
     */
    @RequestMapping(value = "/timeSlotsAsEvent",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<EventSourceDTO>> getAll(
    		@RequestParam(value = "start", required = false) String startStr,
    		@RequestParam(value = "end", required = false) String endStr) {
    	

    	DateTime startAt = timeService.parseDateAsUTC("yyyy-MM-dd", startStr);
    	DateTime endAt = timeService.parseDateAsUTC("yyyy-MM-dd", endStr);
    	
    	if (startAt == null || endAt == null){
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	}
    	
    	List<Booking> bookings = bookingRepository.findAll(boxService.findCurrentCrossFitBox(), startAt, endAt);
    	List<TimeSlotInstanceDTO> slotInstances = timeSlotService.findAllTimeSlotInstance(startAt, endAt);
    	
    	List<EventSourceDTO> eventSources =  
    			timeSlotService.findAllTimeSlotInstance(startAt, endAt).stream() //Les timeslot instance
			.map(event -> {
				event.setBookings(
    				bookings.stream()
    				.filter(b -> {return event.contains(b.getStartAt(), b.getEndAt());})
    	    		.sorted( (b1, b2) -> { return b1.getCreatedDate().compareTo(b2.getCreatedDate());} )
    				.collect(Collectors.toList()));
				return event;
			})
    		.collect(
				Collectors.groupingBy(TimeSlotInstanceDTO::getRequiredLevel)) //Groupé par level
			
			.entrySet().stream() //pour chaque level
			
			.map(entry -> {
	        	List<EventDTO> events = entry.getValue().stream() //On créé la liste d'evenement
	    			.map(slotInstance ->{
						return new EventDTO(slotInstance);
	    			}).collect(Collectors.toList());
				
				EventSourceDTO evt = new EventSourceDTO(); //On met cette liste d'évènement dans EventSource
	        	evt.setEditable(false);
				evt.setEvents(events);
	        	evt.setColor(getColor(entry.getKey()));
	        	return evt;
			})
			.collect(Collectors.toList()); 
    	
    	//Pareil pour les jours fériés
    	List<ClosedDay> closedDays = closedDayRepository.findAllByBoxAndBetween(boxService.findCurrentCrossFitBox(), startAt, endAt);
		List<EventDTO> closedDaysAsDTO = closedDays.stream().map(closeDay -> {
			return new EventDTO(closeDay);

		}).collect(Collectors.toList());
		EventSourceDTO evt = new EventSourceDTO();
    	evt.setEditable(false);
    	evt.setEvents(closedDaysAsDTO);
    	evt.setColor("#A0A0A0");
    	eventSources.add(evt);
    	
    	return new ResponseEntity<List<EventSourceDTO>>(eventSources, HttpStatus.OK);
    }

	private static String getColor(Level level) {
		String color = "blue";
		switch (level) {
			case FOUNDATION:
				color = "#0000FF";
				break;
			case NOVICE:
				color = "#0174DF";
				break;
			case MIDDLE:
				color = "#DF7401";
				break;
			case SKILLED:
				color = "#FF4000";
				break;

		}
		return color;
	}


	@Override
	protected TimeSlot doSave(TimeSlot timeSlot) {
		timeSlot.setBox(boxService.findCurrentCrossFitBox());
		return super.doSave(timeSlot);
	}

	@Override
	protected Page<TimeSlot> doFindAll(Integer offset, Integer limit) {
		return super.doFindAll(offset, limit); //TODO: Filtrer par box
	}

	@Override
	protected TimeSlot doGet(Long id) {
		return super.doGet(id); //TODO: Filtrer par box
	}

	@Override
	protected void doDelete(Long id) {
		TimeSlot timeSlot = timeSlotRepository.findOne(id);
		if (timeSlot.getBox().equals(boxService.findCurrentCrossFitBox())){
			timeSlotRepository.delete(timeSlot);
		}
	}

}
