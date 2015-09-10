package org.crossfit.app.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.crossfit.app.domain.util.CustomDateTimeDeserializer;
import org.crossfit.app.domain.util.CustomDateTimeSerializer;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A ClosedDay.
 */
@Entity
@Table(name = "CLOSEDDAY")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ClosedDay implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    

    @NotNull        
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull        
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    @JsonSerialize(using = CustomDateTimeSerializer.class)
    @JsonDeserialize(using = CustomDateTimeDeserializer.class)
    @Column(name = "start_at", nullable = false)
    private DateTime startAt;

    @NotNull        
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    @JsonSerialize(using = CustomDateTimeSerializer.class)
    @JsonDeserialize(using = CustomDateTimeDeserializer.class)
    @Column(name = "end_at", nullable = false)
    private DateTime endAt;

    @ManyToOne
    private CrossFitBox box;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DateTime getStartAt() {
        return startAt;
    }

    public void setStartAt(DateTime startAt) {
        this.startAt = startAt;
    }

    public DateTime getEndAt() {
        return endAt;
    }

    public void setEndAt(DateTime endAt) {
        this.endAt = endAt;
    }

    public CrossFitBox getBox() {
        return box;
    }

    public void setBox(CrossFitBox crossFitBox) {
        this.box = crossFitBox;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClosedDay closedDay = (ClosedDay) o;

        if ( ! Objects.equals(id, closedDay.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ClosedDay{" +
                "id=" + id +
                ", name='" + name + "'" +
                ", startAt='" + startAt + "'" +
                ", endAt='" + endAt + "'" +
                '}';
    }
    
    public boolean isSlotInClosedDay(DateTime firstDateOfWeek, TimeSlot slot){
		DateTime slotStartTime = slot.getStartDateTime(firstDateOfWeek);
		boolean slotInClosedDate = slotStartTime.isBefore(getEndAt()) && (
				slotStartTime.isAfter(getStartAt())  || slotStartTime.isEqual(getStartAt()) );
		return slotInClosedDate;
    }
}
