<#if !exception??>
{
   "success": <#if success??>${success?string}</#if>,
   "message": "<#if errormsg??>${errormsg}</#if>"
}
<#else>
${errormsg}
</#if>