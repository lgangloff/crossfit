package org.crossfit.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.beans.factory.annotation.Required;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A MembershipType.
 */
@Entity
@Table(name = "MEMBERSHIPTYPE")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MembershipType implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    

    @NotNull        
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull        
    @Column(name = "price", nullable = false)
    private String price;
    
    @Column(name = "open_access")
    private Boolean openAccess;

    @Max(value = 100)        
    @Column(name = "number_of_session")
    private Integer numberOfSession;

    @NotNull
    @Max(value = 20)        
    @Column(name = "number_of_session_per_week", nullable = false)
    private Integer numberOfSessionPerWeek;

    @NotNull
    @ManyToOne(optional=false)
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

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Boolean getOpenAccess() {
        return openAccess;
    }

    public void setOpenAccess(Boolean openAccess) {
        this.openAccess = openAccess;
    }

    public Integer getNumberOfSession() {
        return numberOfSession;
    }

    public void setNumberOfSession(Integer numberOfSession) {
        this.numberOfSession = numberOfSession;
    }

    public Integer getNumberOfSessionPerWeek() {
        return numberOfSessionPerWeek;
    }

    public void setNumberOfSessionPerWeek(Integer numberOfSessionPerWeek) {
        this.numberOfSessionPerWeek = numberOfSessionPerWeek;
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

        MembershipType membershipType = (MembershipType) o;

        if ( ! Objects.equals(id, membershipType.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "MembershipType{" +
                "id=" + id +
                ", name='" + name + "'" +
                ", price='" + price + "'" +
                ", openAccess='" + openAccess + "'" +
                ", numberOfSession='" + numberOfSession + "'" +
                ", numberOfSessionPerWeek='" + numberOfSessionPerWeek + "'" +
                '}';
    }
}
