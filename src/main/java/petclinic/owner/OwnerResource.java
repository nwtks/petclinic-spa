package petclinic.owner;

import java.util.Arrays;

import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import petclinic.CacheControlUtils;
import petclinic.Result;

@Path("owners")
public class OwnerResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOwners(@QueryParam("filter") final String filter) {
        return Response.ok().entity(new Result<>(Owner.findLikeName(filter), null)).build();
    }

    @Path("{ownerId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOwner(@PathParam("ownerId") final Long ownerId) {
        return Response.ok()
                .entity(Owner.findByIdOptional(ownerId).map(owner -> new Result<>(owner, null))
                        .orElseGet(() -> new Result<>(null, Arrays.asList("Owner not found."))))
                .cacheControl(CacheControlUtils.noCache()).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response postOwner(final OwnerForm form) {
        final Owner owner = new Owner();
        owner.name = form.name;
        owner.address = form.address;
        owner.telephone = form.telephone;
        owner.persist();
        return Response.ok().entity(new Result<>(owner.id, null)).cacheControl(CacheControlUtils.noCache()).build();
    }

    @Path("{ownerId}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response putOwner(@PathParam("ownerId") final Long ownerId, final OwnerForm form) {
        return Response.ok().entity(Owner.<Owner>findByIdOptional(ownerId).map(owner -> {
            owner.name = form.name;
            owner.address = form.address;
            owner.telephone = form.telephone;
            return owner;
        }).map(owner -> new Result<>(owner.id, null))
                .orElseGet(() -> new Result<>(null, Arrays.asList("Owner not found."))))
                .cacheControl(CacheControlUtils.noCache()).build();
    }

    @Path("{ownerId}/pets/{petId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPet(@PathParam("ownerId") final Long ownerId, @PathParam("petId") final Long petId) {
        return Response.ok()
                .entity(Pet.findByIdOptional(petId).map(pet -> new Result<>(pet, null))
                        .orElseGet(() -> new Result<>(null, Arrays.asList("Pet not found."))))
                .cacheControl(CacheControlUtils.noCache()).build();
    }

    @Path("{ownerId}/pets")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response postPet(@PathParam("ownerId") final Long ownerId, final PetForm form) {
        return Response.ok().entity(PetType.<PetType>findByIdOptional(form.typeId)
                .map(type -> Owner.<Owner>findByIdOptional(ownerId).map(owner -> {
                    final Pet pet = new Pet();
                    pet.name = form.name;
                    pet.birthDate = form.birthDate;
                    pet.type = type;
                    pet.persist();
                    owner.pets.add(pet);
                    return pet;
                }).map(pet -> new Result<>(ownerId, null))
                        .orElseGet(() -> new Result<>(null, Arrays.asList("Owner not found."))))
                .orElseGet(() -> new Result<>(null, Arrays.asList("Pet type not found."))))
                .cacheControl(CacheControlUtils.noCache()).build();
    }

    @Path("{ownerId}/pets/{petId}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response putPet(@PathParam("ownerId") final Long ownerId, @PathParam("petId") final Long petId,
            final PetForm form) {
        return Response.ok().entity(
                PetType.<PetType>findByIdOptional(form.typeId).map(type -> Pet.<Pet>findByIdOptional(petId).map(pet -> {
                    pet.name = form.name;
                    pet.birthDate = form.birthDate;
                    pet.type = type;
                    return pet;
                }).map(pet -> new Result<>(ownerId, null))
                        .orElseGet(() -> new Result<>(null, Arrays.asList("Pet not found."))))
                        .orElseGet(() -> new Result<>(null, Arrays.asList("Pet type not found."))))
                .cacheControl(CacheControlUtils.noCache()).build();
    }

    @Path("{ownerId}/pets/{petId}/visits/{visitId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getVisit(@PathParam("ownerId") final Long ownerId, @PathParam("petId") final Long petId,
            @PathParam("visitId") final Long visitId) {
        return Response.ok()
                .entity(Visit.findByIdOptional(visitId).map(visit -> new Result<>(visit, null))
                        .orElseGet(() -> new Result<>(null, Arrays.asList("Visit not found."))))
                .cacheControl(CacheControlUtils.noCache()).build();
    }

    @Path("{ownerId}/pets/{petId}/visits")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response postVisit(@PathParam("ownerId") final Long ownerId, @PathParam("petId") final Long petId,
            final VisitForm form) {
        return Response.ok().entity(Pet.<Pet>findByIdOptional(petId).map(pet -> {
            final Visit visit = new Visit();
            visit.visitDate = form.visitDate;
            visit.description = form.description;
            visit.persist();
            pet.visits.add(visit);
            return visit;
        }).map(visit -> new Result<>(ownerId, null))
                .orElseGet(() -> new Result<>(null, Arrays.asList("Pet not found."))))
                .cacheControl(CacheControlUtils.noCache()).build();
    }

    @Path("{ownerId}/pets/{petId}/visits/{visitId}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response putVisit(@PathParam("ownerId") final Long ownerId, @PathParam("petId") final Long petId,
            @PathParam("visitId") final Long visitId, final VisitForm form) {
        return Response.ok().entity(Visit.<Visit>findByIdOptional(visitId).map(visit -> {
            visit.visitDate = form.visitDate;
            visit.description = form.description;
            return visit;
        }).map(visit -> new Result<>(ownerId, null))
                .orElseGet(() -> new Result<>(null, Arrays.asList("Visit not found."))))
                .cacheControl(CacheControlUtils.noCache()).build();
    }
}
