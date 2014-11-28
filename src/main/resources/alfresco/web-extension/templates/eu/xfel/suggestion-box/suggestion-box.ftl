<#include "../../../org/alfresco/include/alfresco-template.ftl" />

<@templateHeader/>

<@templateBody>
   <div id="hd">
      <@region id="header" scope="global" protected=true />
      <@region id="title" scope="template" protected=true />
      <@region id="navigation" scope="template" protected=true />
   </div>
   <div id="bd">
      <div>
         <div id="yui-main">
            <div>
               <@region id="suggestion-box" scope="template" />
            </div>
         </div>
      </div>
   </div>
</@>

<@templateFooter>
   <div id="ft">
      <@region id="footer" scope="global" protected=true />
   </div>
</@>