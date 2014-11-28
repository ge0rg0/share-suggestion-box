share-suggestion-box
====================

Author: Jorge Elizondo

This project includes a suggestion box addon for Alfresco Share. This addon can be added as a link to any Alfresco Share Site. 

Installation
====================

The dashlet is packaged as a single JAR file for easy installation into Alfresco Share.

To install the dashlet, simply drop the share-suggestion-box-<version>.jar file into the tomcat/shared/lib folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

Building from Source
====================

A pom.xml file is provided to build a JAR file containing the custom files, which can then be installed into the tomcat/shared/lib folder of your Alfresco installation.

To build the JAR file, run Maven from the base project directory.

mvn clean install

The command should build a JAR file named share-suggestion-box-<version>.jar in the target directory within your project, which you can then copy into the tomcat/shared/lib folder of your Alfresco installation.

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

Usage
====================

Log in to Alfresco Share and navigate to the site where you want to add the suggestion box link.

Create a plain text document with a comma separated list of email addresses to send the suggestions to. You can save the document anywhere in the document library. It must have at least consumer rights for all site users. Copy the node reference, i.e. the last part of the url when you click on the document details. For example: workspace://SpacesStore/ae8650d8-5935-4e86-8986-47f183408814

Now you can add a link to the suggestion box form anywhere in your site: http://\<your_alfresco_share_url\>/share/page/site/\<your_site\>/suggestion-box?nodeRef=\<copied node reference\>

