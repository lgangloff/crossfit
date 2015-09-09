package org.crossfit.app.service;

import java.util.Arrays;
import java.util.List;
import java.util.TimeZone;

import javax.inject.Inject;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TimeZoneService {
    private final Logger log = LoggerFactory.getLogger(TimeZoneService.class);

    @Inject
    private CrossFitBoxSerivce boxService;

    public List<String> getAvailableTimeZones(){
    	return Arrays.asList(TimeZone.getAvailableIDs());
    }
    
    public TimeZone getCurrentTimeZome(){
    	String boxTimeZoneID = boxService.findCurrentCrossFitBox().get().getTimeZoneId();
    	TimeZone res = boxTimeZoneID != null ? TimeZone.getTimeZone(boxTimeZoneID) : TimeZone.getTimeZone("UTC");
    	log.debug("Using TimeZone " + res.getDisplayName());
    	return res;
    }

    public DateTime now(){
    	return DateTime.now(DateTimeZone.forTimeZone(getCurrentTimeZome()));
    }
}
