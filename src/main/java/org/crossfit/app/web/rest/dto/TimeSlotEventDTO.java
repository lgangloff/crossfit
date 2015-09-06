package org.crossfit.app.web.rest.dto;

import org.crossfit.app.domain.util.CustomDateTimeSerializer;
import org.joda.time.DateTime;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class TimeSlotEventDTO {

	@JsonSerialize(using = CustomDateTimeSerializer.class)
	private DateTime start;

	@JsonSerialize(using = CustomDateTimeSerializer.class)
	private DateTime end;

	private String title;

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
