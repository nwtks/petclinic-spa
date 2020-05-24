package petclinic.owner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PetTypeRepository {
    private static final List<PetType> PET_TYPES = Arrays.asList(newPetType(1L, "Cat"), newPetType(2L, "Dog"),
            newPetType(3L, "Lizard"), newPetType(4L, "Snake"), newPetType(5L, "Bird"), newPetType(6L, "Hamster"));

    public List<PetType> getAll() {
        return PET_TYPES;
    }

    public Optional<PetType> get(final Long id) {
        return PET_TYPES.stream().filter(e -> e.id.equals(id)).findFirst();
    }

    private static PetType newPetType(final Long id, final String name) {
        final PetType petType = new PetType();
        petType.id = id;
        petType.name = name;
        return petType;
    }
}
