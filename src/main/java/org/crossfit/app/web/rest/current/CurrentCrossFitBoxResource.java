package org.crossfit.app.web.rest.current;

import com.codahale.metrics.annotation.Timed;
import org.crossfit.app.domain.CrossFitBox;
import org.crossfit.app.repository.CrossFitBoxRepository;
import org.crossfit.app.service.CrossFitBoxSerivce;
import org.crossfit.app.service.TimeService;
import org.crossfit.app.web.rest.util.HeaderUtil;
import org.crossfit.app.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

/**
 * REST controller for managing CrossFitBox.
 */
@RestController
@RequestMapping("/public")
public class CurrentCrossFitBoxResource {

    private final Logger log = LoggerFactory.getLogger(CurrentCrossFitBoxResource.class);

    @Inject
    private CrossFitBoxSerivce boxService;
    
    @Inject
    private TimeService timeZoneService;

    /**
     * GET  /currentCrossFitBox -> get the "current" crossFitBox resolve by hostname.
     */
    @RequestMapping(value = "/currentCrossFitBox",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<CrossFitBox> get() {
        log.debug("REST request to get current CrossFitBox");
        return boxService.findCurrentCrossFitBox()
            .map(crossFitBox -> new ResponseEntity<>(
                crossFitBox,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @RequestMapping(value = "/timezone",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<String> getTimeZones() {
        log.debug("REST request to get available timezone");
        return timeZoneService.getAvailableTimeZones();
    }
}
