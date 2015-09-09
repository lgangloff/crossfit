package org.crossfit.app.web.rest.dto;

import org.crossfit.app.domain.util.CustomDateTimeSerializer;
import org.joda.time.DateTime;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class TimeSlotEventDTO {

	private Long id;
	
	@JsonSerialize(using = CustomDateTimeSerializer.class)
	private DateTime start;

	@JsonSerialize(using = CustomDateTimeSerializer.class)
	private DateTime end;

	private String title;

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public DateTime getStart() {
		return start;
	}

	public void setStart(DateTime start) {
		this.start = start;
	}

	public DateTime getEnd() {
		return end;
	}

	public void setEnd(DateTime end) {
		this.end = end;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
