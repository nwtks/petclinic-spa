package petclinic.owner;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("pettypes")
public class PetTypeResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPetTypes() {
        return Response.ok().entity(PetType.listAll()).build();
    }
}
