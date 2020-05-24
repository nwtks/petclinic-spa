package petclinic.vet;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class VetRepository {
    public List<Vet> getAll() {
        return Arrays.asList(newVet(1L, "James Carter", Collections.emptyList()),
                newVet(2L, "Helen Leary", Arrays.asList(Specialty.findById(1L))),
                newVet(3L, "Linda Douglas", Arrays.asList(Specialty.findById(2L), Specialty.findById(3L))),
                newVet(4L, "Henry Stevens", Arrays.asList(Specialty.findById(2L))),
                newVet(5L, "Sharon Jenkins", Arrays.asList(Specialty.findById(1L))));
    }

    private static Vet newVet(final Long id, final String name, final List<Specialty> specialties) {
        final Vet vet = new Vet();
        vet.id = id;
        vet.name = name;
        vet.specialties = specialties;
        return vet;
    }
}
