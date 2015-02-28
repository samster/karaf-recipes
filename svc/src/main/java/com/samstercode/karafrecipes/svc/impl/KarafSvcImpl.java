package com.samstercode.karafrecipes.svc.impl;

import com.samstercode.karafrecipes.svc.KarafSvc;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

/**
 * @author samster
 */
public class KarafSvcImpl implements KarafSvc {

    private static final transient Logger LOGGER = LoggerFactory.getLogger(KarafSvcImpl.class);
    private String message;

    @Override
    public String getHelloWorld() {
        LOGGER.debug("Entering getHelloWorld()");
        return "{ \"message\": " + "\"" + this.message + "\"}";
    }

    public void updateProperties(final Map<String, ?> properties) {
        final String oldMessageValue = this.message;
        LOGGER.debug("Entering updateProperties()");
        if (properties == null) {
            LOGGER.debug("Properties is null");
        } else {
            for (Map.Entry<String, ?> entry : properties.entrySet()) {
                String key = entry.getKey();
                Object value = entry.getValue();
                if (value == null) {
                    continue;
                }
                if (key.equals("message") && (value instanceof String)) {
                    LOGGER.debug("Changing message from {} to {}", oldMessageValue, value);
                    this.message = (String) value;
                }
            }
            if (oldMessageValue.equals(this.message)) {
                LOGGER.debug("New property is identical to old");
                return;
            }
        }
    }

    public void setMessage(String message) {
        LOGGER.debug("Entering setMesssage");
        this.message = message;
    }

}
