package petclinic.owner;

import javax.persistence.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class PetType extends PanacheEntity {
    public String name;
}
