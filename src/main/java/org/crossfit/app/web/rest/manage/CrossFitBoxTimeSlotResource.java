package org.crossfit.app.web.rest.manage;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.crossfit.app.domain.TimeSlot;
import org.crossfit.app.domain.enumeration.Level;
import org.crossfit.app.repository.TimeSlotRepository;
import org.crossfit.app.service.CrossFitBoxSerivce;
import org.crossfit.app.service.TimeZoneService;
import org.crossfit.app.web.rest.TimeSlotResource;
import org.crossfit.app.web.rest.dto.EventSourceDTO;
import org.crossfit.app.web.rest.dto.TimeSlotEventDTO;
import org.joda.time.DateTime;
import org.joda.time.LocalTime;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
    private TimeZoneService timeZoneService;

    @Inject
    private TimeSlotRepository timeSlotRepository;
    
    /**
     * GET  /timeSlots -> get all the timeSlots.
     */
    @RequestMapping(value = "/timeSlotsAsEvent",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<EventSourceDTO> getAll() {
    	DateTime now = timeZoneService.now();
    	
    	Map<Level, List<TimeSlot>> timeSlotByLevel = timeSlotRepository.findAll().stream().collect(
    			Collectors.groupingBy(TimeSlot::getRequiredLevel));
    	
    	
    	List<EventSourceDTO> eventSources = new ArrayList<>();
    	for (Entry<Level, List<TimeSlot>> entry : timeSlotByLevel.entrySet()) {

    		List<TimeSlotEventDTO> collect = entry.getValue().stream().map(slot->{
        		DateTime slotDateDay = now.dayOfWeek().setCopy(slot.getDayOfWeek());
        		LocalTime start = slot.getStartTime();
        		LocalTime end = slot.getEndTime();
        		
        		DateTime startDateTime = slotDateDay.withTime(start.getHourOfDay(), start.getMinuteOfHour(), 0, 0);
        		DateTime endDateTime = slotDateDay.withTime(end.getHourOfDay(), end.getMinuteOfHour(), 0, 0);
        		
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
    	return eventSources;
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
