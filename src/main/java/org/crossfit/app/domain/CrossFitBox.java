package org.crossfit.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A CrossFitBox.
 */
@Entity
@Table(name = "CROSSFITBOX")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CrossFitBox implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    

    @NotNull        
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull        
    @Column(name = "website", nullable = false)
    private String website;

    @ManyToOne
    private FileDocument logo;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "CROSSFITBOX_ADMINISTRATORS",
               joinColumns = @JoinColumn(name="crossfitboxs_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="administratorss_id", referencedColumnName="ID"))
    private Set<User> administrators = new HashSet<>();

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

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public FileDocument getLogo() {
        return logo;
    }

    public void setLogo(FileDocument fileDocument) {
        this.logo = fileDocument;
    }

    public Set<User> getAdministrators() {
        return administrators;
    }

    public void setAdministrators(Set<User> users) {
        this.administrators = users;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CrossFitBox crossFitBox = (CrossFitBox) o;

        if ( ! Objects.equals(id, crossFitBox.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "CrossFitBox{" +
                "id=" + id +
                ", name='" + name + "'" +
                ", website='" + website + "'" +
                '}';
    }
}
