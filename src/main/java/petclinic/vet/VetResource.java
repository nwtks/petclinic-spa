package petclinic.vet;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import petclinic.Result;

@Path("vets")
public class VetResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getVets() {
        return Response.ok().entity(new Result<>(Vet.listAll(), null)).build();
    }
}
