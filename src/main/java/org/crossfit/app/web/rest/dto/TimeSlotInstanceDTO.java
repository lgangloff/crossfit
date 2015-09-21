package org.crossfit.app.web.rest.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.crossfit.app.domain.Booking;
import org.crossfit.app.domain.TimeSlot;
import org.crossfit.app.domain.enumeration.BookingStatus;
import org.crossfit.app.domain.enumeration.Level;
import org.crossfit.app.domain.enumeration.TimeSlotStatus;
import org.crossfit.app.domain.util.CustomDateTimeSerializer;
import org.joda.time.DateTime;
import org.joda.time.Interval;
import org.joda.time.LocalDate;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * C'est un créneau horaire, à une date donnée... une instance de time slot quoi
 * !
 * 
 * @author lgangloff
 *
 */
public class TimeSlotInstanceDTO {

	private DateTime date;

	private TimeSlot slot;

	private List<Booking> bookings = new ArrayList<>();

	public TimeSlotInstanceDTO(DateTime date, TimeSlot slot) {
		super();
		this.date = date;
		this.slot = slot;
	}

	public Long getId() {
		return slot.getId();
	}

	public LocalDate getDate() {
		return date.toLocalDate();
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

	public List<Booking> getValidatedBookings() {
		return bookings.stream().filter(b->{return b.getStatus() == BookingStatus.VALIDATED;}).collect(Collectors.toList());
	}
	public List<Booking> getWaitingBookings() {
		return bookings.stream().filter(b->{return b.getStatus() == BookingStatus.ON_WAINTING_LIST;}).collect(Collectors.toList());
	}

	public void setBookings(List<Booking> bookings) {
		this.bookings = new ArrayList<>(bookings);
	}
	
	public TimeSlotStatus getAvailability(){
		// Si le membre n'a pas le droit
		if(true){
			return TimeSlotStatus.NOT_ABLE;
		}
		// Si le membre a déjà reservé
		if(false){
			return TimeSlotStatus.BOOKED;
		}
		// retourne l'état de la dispo
		if(getPercentFree()>25){
			return TimeSlotStatus.ALMOST_FULL;
		}else if(getPercentFree()<25){
			return TimeSlotStatus.ALMOST_FULL;
		}else{
			return TimeSlotStatus.FULL;
		}
	}
	private int getPercentFree(){
		return 100-(Integer.divideUnsigned(100, this.getMaxAttendees())) * this.getValidatedBookings().size();
	}

	@Override
	public String toString() {
		return "[" + getStart() + "->" + getEnd() + "]";
	}


	public boolean contains(DateTime start, DateTime end) {
		return this.toInterval().contains(new Interval(start, end));
	}

	protected Interval toInterval() {
		return new Interval(this.getStart(), this.getEnd());
	}

}
