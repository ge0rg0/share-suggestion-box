share-suggestion-box
====================

Author: Jorge Elizondo

This project includes a suggestion box addon for Alfresco Share. This addon can be added as a link to any Alfresco Share Site. 

Installation
====================

The dashlet is packaged as a single JAR file for easy installation into Alfresco Share.

To install the dashlet, simply drop the share-suggestion-box\-\<version\>.jar file into the tomcat/shared/lib folder within your Alfresco installation, and restart the application server. You might need to create this folder if it does not already exist.

Building from Source
====================

A pom.xml file is provided to build a JAR file containing the custom files, which can then be installed into the tomcat/shared/lib folder of your Alfresco installation.

To build the JAR file, run Maven from the base project directory.

mvn clean install

The command should build a JAR file named share-suggestion-box\-\<version\>.jar in the target directory within your project, which you can then copy into the tomcat/shared/lib folder of your Alfresco installation.

After you have deployed the JAR file you will need to restart Tomcat to ensure it picks up the changes.

Usage
====================

Log in to Alfresco Share and navigate to the site where you want to add the suggestion box link.

Create a plain text document with a comma separated list of email addresses to send the suggestions to. You can save the document anywhere in the document library. It must have at least consumer rights for all site users. Copy the node reference, i.e. the last part of the url when you click on the document details. For example: workspace://SpacesStore/ae8650d8-5935-4e86-8986-47f183408814

Now you can add a link to the suggestion box form anywhere in your site: http://\<your_alfresco_share_url\>/share/page/site/\<your_site\>/suggestion-box?nodeRef=\<copied node reference\>

Freemarker Template support
============================

Additionally the email message sent to the recipient and the copy sent to the requester can be configured via freemarker templates (ftl) files in Alfresco. Just create a template like this one anywhere where the users of the site have consumer access. 

Now you can add a link to the suggestion box form anywhere in your site: http://\<your_alfresco_share_url\>/share/page/site/\<your_site\>/suggestion-box?nodeRef=\<copied node reference\>
http://\<your_alfresco_share_url\>/share/page/site/\<your_site\>/suggestion-box?nodeRef=\<copied node reference\>&templateRef=\<copied node reference for template file\>&templateCopyRef=\<copied node reference for user copy template file\>

Here's an example for an ftl template:

```
<html>
   <head>
      <style type="text/css"><!--
      body
      {
         font-family: Arial, sans-serif;
         font-size: 14px;
         color: #4c4c4c;
      }
      
      a, a:visited
      {
         color: #0072cf;
      }
      --></style>
   </head>
   
   <body bgcolor="#dddddd">
      <table width="100%" cellpadding="20" cellspacing="0" border="0" bgcolor="#dddddd">
         <tr>
            <td width="100%" align="center">
               <table width="70%" cellpadding="0" cellspacing="0" bgcolor="white" style="background-color: white; border: 1px solid #aaaaaa;">
                  <tr>
                     <td width="100%">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                           <tr>
                              <td style="padding: 10px 30px 0px;">
                                 <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                       <td>
                                          <div style="font-size: 14px; margin: 12px 0px 24px 0px; padding-top: 10px; border-top: 1px solid #aaaaaa;">

                                             <p>
                                                Dear User,
</p>
<p>
Someone just left a message for you in the <a href="${shareUrl}/page/site/sitename/suggestion-box?nodeRef=workspace://SpacesStore/ae8650d8-5935-4e86-8986-47f183408814&templateRef=workspace://SpacesStore/319cb5ab-4df1-47c5-bd0d-a4ee780d4dd7&templateCopyRef=workspace://SpacesStore/3776d11a-51eb-482a-8eeb-e6b8dfa40021">Suggestion Box</a>.
</p>
                                             
                                                <p>Name: ${senderName}</p>
                                                <p>Email: ${email}</p>
                                                <p>Message: </p>
                                                <p>${emailMessage}</p>
                                                <p></br>Best Regards,</p>
                                               <p>Alfresco</p>

                                          </div>
                                       </td>
                                    </tr>
                                 </table>
                              </td>
                           </tr>
<tr>
                              <td>
                                 <div style="border-top: 1px solid #aaaaaa;">&nbsp;</div>
                              </td>
                           </tr>
                           <tr>
                              <td style="padding: 0px 30px; font-size: 13px;">
                                 <p><i>This is an automatic email message generated by Alfresco. Please do not reply to this email as we are not able to respond to messages sent to this email address. </i></p>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <div style="border-bottom: 1px solid #aaaaaa;">&nbsp;</div>
                              </td>
                           </tr>
                           <tr>
                              <td style="padding: 10px 30px;">
                                 <img src="${shareUrl}/res/themes/xfel/images/app-logo.png" alt="" border="0" />
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
               </table>
            </td>
         </tr>
      </table>
   </body>
</html>
```

