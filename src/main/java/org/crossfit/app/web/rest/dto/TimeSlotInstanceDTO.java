package org.crossfit.app.web.rest.dto;

import org.crossfit.app.domain.TimeSlot;
import org.crossfit.app.domain.enumeration.Level;
import org.crossfit.app.domain.util.CustomDateTimeSerializer;
import org.joda.time.DateTime;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * C'est un créneau horaire, à une date donnée... une instance de time slot quoi !
 * 
 * @author lgangloff
 *
 */
public class TimeSlotInstanceDTO {

	private DateTime date;
	
	private TimeSlot slot;
	
	
	public TimeSlotInstanceDTO(DateTime date, TimeSlot slot) {
		super();
		this.date = date;
		this.slot = slot;
	}

	public Long getId() {
		return slot.getId();
	}

	@JsonSerialize(using = CustomDateTimeSerializer.class)
	public DateTime getStart() {
		return date.withTime(slot.getStartTime().getHourOfDay(), slot.getStartTime().getMinuteOfHour(), 0, 0);
	}

	@JsonSerialize(using = CustomDateTimeSerializer.class)
	public DateTime getEnd() {
		return date.withTime(slot.getEndTime().getHourOfDay(), slot.getEndTime().getMinuteOfHour(), 0, 0);
	}

	public Integer getMaxAttendees() {
		return slot.getMaxAttendees();
	}

	public Level getRequiredLevel() {
		return slot.getRequiredLevel();
	}

	@Override
	public String toString() {
		return "[" + getStart() + "->" + getEnd() + "]";
	}
	
	
}
