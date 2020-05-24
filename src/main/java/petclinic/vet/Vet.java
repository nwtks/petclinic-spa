package petclinic.vet;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Vet extends PanacheEntity {
    public String name;
    @ManyToMany
    public List<Specialty> specialties;
}
