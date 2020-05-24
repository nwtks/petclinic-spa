package petclinic.owner;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Pet extends PanacheEntity {
    public String name;
    public String birthDate;
    @ManyToOne
    public PetType type;
    @OneToMany
    public List<Visit> visits;
}
