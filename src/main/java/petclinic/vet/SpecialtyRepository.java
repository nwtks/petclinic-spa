package petclinic.vet;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SpecialtyRepository {
    private static final List<Specialty> SPECIALTIES = Arrays.asList(newSpecialty(1L, "Radiology"),
            newSpecialty(2L, "Surgery"), newSpecialty(3L, "Dentistry"));

    public List<Specialty> getAll() {
        return SPECIALTIES;
    }

    public Optional<Specialty> get(final Long id) {
        return SPECIALTIES.stream().filter(e -> e.id.equals(id)).findFirst();
    }

    private static Specialty newSpecialty(final Long id, final String name) {
        final Specialty specialty = new Specialty();
        specialty.id = id;
        specialty.name = name;
        return specialty;
    }
}
