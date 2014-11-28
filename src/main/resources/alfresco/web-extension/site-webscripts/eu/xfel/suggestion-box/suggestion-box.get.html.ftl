<#assign el=args.htmlid?html>
<script type="text/javascript">//<![CDATA[
   var suggestionBox = new Alfresco.SuggestionBox("${el}").setOptions(
   {
      site: "${page.url.templateArgs.site}"
   }).setMessages(
      ${messages}
   );
//]]></script>

<div id="${el}-body" class="form-container">
    <div class="page-title theme-bg-color-1 theme-border-1">
        <div class="title">
           <h1 class="theme-color-3"><span>${msg("header.suggestion.box")} </span> </h1>
        </div>
     </div>
    <form id="${el}-suggestion-form" action="${url.context}/proxy/alfresco/eu/xfel/suggestion-box/suggestion" method="post">

        <fieldset>
         <input type="hidden" id="${el}-nodeRef" name="nodeRef" value="${page.url.args["nodeRef"]}" />
         <input type="hidden" id="${el}-site" name="site" value="${page.url.templateArgs.site}" />
        <div>
            ${msg("suggestion.box.intro")}
            </br>
        </div>
        <div class="form-field row">
            <span class="label"><label for="${el}-name">${msg("suggestion.box.name")}</label></span></br>
            <span class="input"><input id="${el}-name" name="name" type="text" title="${msg("suggestion.box.name")}" tabindex="1"></span></br></br>
        </div>
        <div class="form-field row">
            <span class="label"><label for="${el}-email">${msg("suggestion.box.email")}</label></span></br>
            <span class="input"><input id="${el}-email" name="email" type="text" title="${msg("suggestion.box.email")}" tabindex="2"></span></br></br>
        </div>
        <div class="form-field row">
            <span class="label"><label for="${el}-message">${msg("suggestion.box.body")}</label></span></br>
            <span class="input"><textarea id="${el}-message" name="message" title="${msg("suggestion.box.body")}" tabindex="3" cols="60" rows="10" style="width: 383px; height: 152px;"></textarea></span></br></br>
        </div>

      <hr/>
      <div class="yui-gd">
            <div class="yui-u first">&nbsp;</div>
            <div class="yui-u">
                <div class="buttons">
                   <button id="${el}-send-button" name="send">${msg("button.send")}</button>
                   <button id="${el}-cancel-button" name="cancel">${msg("button.cancel")}</button>
                </div>
            </div>
         </div>
        </fieldset>
    </form>
<div>