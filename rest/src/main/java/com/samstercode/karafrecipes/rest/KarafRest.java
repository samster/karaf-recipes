package com.samstercode.karafrecipes.rest;

import com.samstercode.karafrecipes.svc.KarafSvc;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import org.apache.commons.io.IOUtils;
import org.apache.cxf.rs.security.cors.CorsHeaderConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * @author samster
 */
@Path("/hellos")
@Produces({"application/json"})
@Api(value = "/hellos", description = "REST Operations on hellos collection")
public class KarafRest {

    private static final transient Logger LOGGER = LoggerFactory.getLogger(KarafRest.class);

    private List<KarafSvc> karafSvcList;
    private List<KarafSvc> cachedKarafSvcList;

    @Context
    UriInfo uriInfo;

    @GET
    @Path("/")
    @Produces("application/json")
    @ApiOperation(value = "Returns all hellos",
            notes = "Returns all hellos from collection",
            response = String.class)
    public Response sayHelloWorld() {
        LOGGER.debug("Entering sayHelloWorld()");

        String returnString = "Unavailable";

        if (cachedKarafSvcList.isEmpty()) {
            LOGGER.debug("Karaf service unavailable");
        } else {
            returnString = cachedKarafSvcList.get(0).getHelloWorld();
        }

        return Response.ok(returnString, MediaType.APPLICATION_JSON).
                header(CorsHeaderConstants.HEADER_AC_ALLOW_ORIGIN, "*").build();
    }

    @GET
    @Path("/api-docs")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSwaggerUiApi()
    {
        String responseStr = null;
        try
        {
            InputStream resourceAsStream = KarafRest.class.getResourceAsStream("/generated/apidocs/hellos.json");
            StringWriter writer = new StringWriter();
            IOUtils.copy(resourceAsStream, writer);
            responseStr = writer.toString();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return Response.ok(responseStr, MediaType.APPLICATION_JSON).header(CorsHeaderConstants.HEADER_AC_ALLOW_ORIGIN, "*").build();
    }

    @GET
    @Path("/api-html")
    @Produces(MediaType.TEXT_HTML)
    public Response getApiAsHtml()
    {
        String responseStr = null;
        try
        {
            InputStream resourceAsStream = KarafRest.class.getResourceAsStream("/generated/strapdown.html");
            StringWriter writer = new StringWriter();
            IOUtils.copy(resourceAsStream, writer);
            responseStr = writer.toString();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return Response.ok(responseStr, MediaType.TEXT_HTML).header(CorsHeaderConstants.HEADER_AC_ALLOW_ORIGIN, "*").build();
    }

    private synchronized void sortKarafSvcList() {
        if (karafSvcList != null) {
            cachedKarafSvcList = new ArrayList<KarafSvc>(karafSvcList);
        }
    }

    public void bind(KarafSvc karafSvc) {
        LOGGER.debug("entering bind()");
        sortKarafSvcList();
    }

    public synchronized void unbind(KarafSvc karafSvc) {
        LOGGER.debug("entering unbind()");
        if (cachedKarafSvcList != null) {
            cachedKarafSvcList.remove(karafSvc);
        }
    }

    public void setKarafSvcList(List<KarafSvc> karafSvcList) {
        LOGGER.debug("entering setKarafSvcList()");
        this.karafSvcList = karafSvcList;
        sortKarafSvcList();
    }

}