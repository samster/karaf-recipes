karaf-recipes
=============

Basic recipes for a Karaf project.  Includes an example of a OSGI service, REST service, ui, kar app, and distribution

### How do I get set up? ###

* Run "mvn clean install" from the root directory
* Copy the tar.gz file from "distro/target" folder into the directory you want to run Karaf from.
* Extract the tar.gz file
* Run the "karaf" shell script inside "bin"

### URLs ###

* REST URL is at http://localhost:8181/cxf/rest
* UI URL is http://localhost:8181/ui.  Uses linemanjs.  To run in standalone developer mode, run "mvn lineman:run" on command line and access at URL http://localhost:8000/ui
