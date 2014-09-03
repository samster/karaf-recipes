karaf-recipes
=============
* Basic recipes for a Karaf project for Karaf 2.3.2.  Includes an example of a OSGI service, REST service, ui, kar app, and distribution

### How do I get set up? ###

* Run "mvn clean install" from the root directory
* Copy the tar.gz file from "distro/target" folder into the directory you want to run Karaf from.
* Extract the tar.gz file
* Run the "karaf" shell script inside "bin"

### URLs ###

* REST URL is at http://localhost:8181/cxf/rest
* UI URL is http://localhost:8181/ui
    * Uses linemanjs.  To run in standalone developer mode, run "mvn lineman:run" on   command line and access at URL http://localhost:8000/ui

### Notes ###

* Using Nexus repository manager, needed to add additional repositories
  * ServiceMix
    * Repository ID: servicemix
    * Repository Name: (Added) Apache ServiceMix Repository
    * Repository Type: proxy
    * Repository Policy: Release
    * Repository Format: maven2
    * Contained in groups: Public Repositories
    * Remote URL: http://svn.apache.org/repos/asf/servicemix/m2-repo/
  * SpringSource External Release 
    * Repository ID: com.springsource.repository.bundles.external
    * Repository Name: (Added) EBR External Release Repository
    * Repository Type: proxy
    * Repository Policy: Release
    * Repository Format: maven2
    * Contained in groups:
    * Remote URL: http://repository.springsource.com/maven/bundles/external/


