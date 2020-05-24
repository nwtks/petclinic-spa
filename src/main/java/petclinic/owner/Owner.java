package petclinic.owner;

import java.util.Collections;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Owner extends PanacheEntity {
    public String name;
    public String address;
    public String telephone;
    @OneToMany
    public List<Pet> pets;

    public static List<Owner> findLikeName(final String name) {
        if (name == null || name.isEmpty()) {
            return Collections.emptyList();
        }
        return find("name like ?1", name + "%").list();
    }
}
