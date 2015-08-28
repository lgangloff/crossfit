package org.crossfit.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;


/**
 * A FileDocument.
 */
@Entity
@Table(name = "FILEDOCUMENT")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FileDocument implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    
    @Column(name = "uuid")
    private String uuid;

    @NotNull        
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Size(max = 5000000)        
    @Lob
    @Column(name = "content", nullable = false)
    private byte[] content;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FileDocument fileDocument = (FileDocument) o;

        if ( ! Objects.equals(id, fileDocument.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "FileDocument{" +
                "id=" + id +
                ", uuid='" + uuid + "'" +
                ", name='" + name + "'" +
                ", content='" + content + "'" +
                '}';
    }
}
