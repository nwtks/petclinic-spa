package petclinic.vet;

import javax.persistence.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Specialty extends PanacheEntity {
    public String name;
}
