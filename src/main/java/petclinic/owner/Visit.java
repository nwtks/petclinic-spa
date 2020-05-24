package petclinic.owner;

import javax.persistence.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Visit extends PanacheEntity {
    public String visitDate;
    public String description;
}
