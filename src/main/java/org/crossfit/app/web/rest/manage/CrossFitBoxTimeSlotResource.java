package org.crossfit.app.web.rest.manage;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.crossfit.app.domain.ClosedDay;
import org.crossfit.app.domain.TimeSlot;
import org.crossfit.app.domain.enumeration.Level;
import org.crossfit.app.repository.ClosedDayRepository;
import org.crossfit.app.repository.TimeSlotRepository;
import org.crossfit.app.service.CrossFitBoxSerivce;
import org.crossfit.app.service.TimeService;
import org.crossfit.app.web.rest.TimeSlotResource;
import org.crossfit.app.web.rest.dto.EventSourceDTO;
import org.crossfit.app.web.rest.dto.TimeSlotEventDTO;
import org.joda.time.DateTime;
import org.joda.time.LocalTime;
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
@RequestMapping("/manage")
public class CrossFitBoxTimeSlotResource extends TimeSlotResource {

    @Inject
    private CrossFitBoxSerivce boxService;
    @Inject
    private TimeService timeService;

    @Inject
    private TimeSlotRepository timeSlotRepository;
    
    @Inject
    private ClosedDayRepository closedDayRepository;
    
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
    	
    	List<ClosedDay> closedDays = closedDayRepository.findAllByBoxAndBetween(boxService.findCurrentCrossFitBox().get(), startAt, endAt);
    	
    	Map<Level, List<TimeSlot>> timeSlotByLevel = timeSlotRepository.findAll().stream()
    			.filter(slot -> slotNotInAnCloseDay(startAt, slot, closedDays))
    			.collect(
    			Collectors.groupingBy(TimeSlot::getRequiredLevel));
    	
    	
    	List<EventSourceDTO> eventSources = new ArrayList<>();
    	for (Entry<Level, List<TimeSlot>> entry : timeSlotByLevel.entrySet()) {

    		List<TimeSlotEventDTO> collect = entry.getValue().stream().map(slot->{
        		DateTime startDateTime = slot.getStartDateTime(startAt);
        		DateTime endDateTime = slot.getEndDateTime(startAt);
        		
        		TimeSlotEventDTO t = new TimeSlotEventDTO();
        		t.setId(slot.getId());
        		t.setStart(startDateTime);
        		t.setEnd(endDateTime);
        		t.setTitle(slot.getRequiredLevel() + " ("+ slot.getMaxAttendees() + " places)");
        		
        		return t;
        	}).collect(Collectors.toList());
    		
        	EventSourceDTO evt = new EventSourceDTO();
        	evt.setEditable(true);
        	evt.setEvents(collect);
        	String color = "blue";
        	switch (entry.getKey()) {
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
        	evt.setColor(color);
        	eventSources.add(evt);
        	
		}

		List<TimeSlotEventDTO> closedDaysAsDTO = closedDays.stream().map(closeDay -> {
			TimeSlotEventDTO t = new TimeSlotEventDTO();
			t.setId(null);
			t.setStart(closeDay.getStartAt());
			t.setEnd(closeDay.getEndAt());
			t.setTitle(closeDay.getName());
			return t;

		}).collect(Collectors.toList());
		EventSourceDTO evt = new EventSourceDTO();
    	evt.setEditable(false);
    	evt.setEvents(closedDaysAsDTO);
    	evt.setColor("#A0A0A0");
    	eventSources.add(evt);
    	
    	return new ResponseEntity<List<EventSourceDTO>>(eventSources, HttpStatus.OK);
    }
    
	private boolean slotNotInAnCloseDay(DateTime firstDateOfWeek, TimeSlot slot, List<ClosedDay> closedDays) {
		Optional<ClosedDay> closedDayContainingSlot = closedDays.stream()
				.filter( day-> day.isSlotInClosedDay(firstDateOfWeek, slot)).findFirst();
		return ! closedDayContainingSlot.isPresent();
	}


	@Override
	protected TimeSlot doSave(TimeSlot timeSlot) {
		timeSlot.setBox(boxService.findCurrentCrossFitBox().get());
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
