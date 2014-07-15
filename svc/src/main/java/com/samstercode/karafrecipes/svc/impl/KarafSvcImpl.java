package com.samstercode.karafrecipes.svc.impl;

import com.samstercode.karafrecipes.svc.KarafSvc;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author samster
 */
public class KarafSvcImpl implements KarafSvc {

    private static final transient Logger LOGGER = LoggerFactory.getLogger(KarafSvcImpl.class);

    @Override
    public String getHelloWorld() {
        LOGGER.trace("Entering getHelloWorld()");
        return "{ \"message\": \"Hello World\" }";
    }

}
