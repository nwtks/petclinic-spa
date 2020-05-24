package petclinic.owner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class OwnerRepository {
    private static final List<Owner> OWNERS = new ArrayList<>();

    public List<Owner> findByName(final String name) {
        if (name == null || name.isEmpty()) {
            return OWNERS;
        }
        return OWNERS.stream().filter(o -> o.name != null && o.name.startsWith(name)).collect(Collectors.toList());
    }

    public Optional<Owner> getOwner(final Long ownerId) {
        return OWNERS.stream().filter(o -> o.id.equals(ownerId)).findFirst();
    }

    public Optional<Owner> addOwner(final String name, final String address, final String telephone) {
        final Owner owner = new Owner();
        owner.id = UUID.randomUUID().getMostSignificantBits();
        owner.name = name;
        owner.address = address;
        owner.telephone = telephone;
        owner.pets = new ArrayList<>();
        OWNERS.add(owner);
        return Optional.of(owner);
    }

    public Optional<Owner> updateOwner(final Long ownerId, final String name, final String address,
            final String telephone) {
        return getOwner(ownerId).map(owner -> {
            owner.name = name;
            owner.address = address;
            owner.telephone = telephone;
            return owner;
        });
    }

    public Optional<Pet> getPet(final Long ownerId, final Long petId) {
        return getOwner(ownerId).flatMap(owner -> owner.pets.stream().filter(p -> p.id.equals(petId)).findFirst());
    }

    public Optional<Pet> addPet(final Long ownerId, final String name, final String birthDate, final PetType type) {
        return getOwner(ownerId).map(owner -> {
            final Pet pet = new Pet();
            pet.id = UUID.randomUUID().getMostSignificantBits();
            pet.name = name;
            pet.birthDate = birthDate;
            pet.type = type;
            pet.visits = new ArrayList<>();
            owner.pets.add(pet);
            return pet;
        });
    }

    public Optional<Pet> updatePet(final Long ownerId, final Long petId, final String name, final String birthDate,
            final PetType type) {
        return getPet(ownerId, petId).map(pet -> {
            pet.name = name;
            pet.birthDate = birthDate;
            pet.type = type;
            return pet;
        });
    }

    public Optional<Visit> getVisit(final Long ownerId, final Long petId, final Long visitId) {
        return getPet(ownerId, petId).flatMap(pet -> pet.visits.stream().filter(v -> v.id.equals(visitId)).findFirst());
    }

    public Optional<Visit> addVisit(final Long ownerId, final Long petId, final String visitDate,
            final String description) {
        return getPet(ownerId, petId).map(pet -> {
            final Visit visit = new Visit();
            visit.id = UUID.randomUUID().getMostSignificantBits();
            visit.visitDate = visitDate;
            visit.description = description;
            pet.visits.add(visit);
            return visit;
        });
    }

    public Optional<Visit> updateVisit(final Long ownerId, final Long petId, final Long visitId, final String visitDate,
            final String description) {
        return getVisit(ownerId, petId, visitId).map(visit -> {
            visit.visitDate = visitDate;
            visit.description = description;
            return visit;
        });
    }
}
