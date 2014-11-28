/**
 * Suggestion Box component.
 * 
 * @namespace Alfresco
 * @class Alfresco.SuggestionBox
 */
(function()
{
   /**
    * YUI Library aliases
    */
   var Dom = YAHOO.util.Dom,
      Event = YAHOO.util.Event;
      
   /**
    * SuggestionBox constructor.
    * 
    * @param {String} htmlId The HTML id of the parent element
    * @return {Alfresco.SuggestionBox} The new SuggestionBox instance
    * @constructor
    */
   Alfresco.SuggestionBox = function(htmlId)
   {
      Alfresco.SuggestionBox.superclass.constructor.call(this, "Alfresco.SuggestionBox", htmlId, ["button"]);
      return this;
   }
   
   YAHOO.extend(Alfresco.SuggestionBox, Alfresco.component.Base,
   {
      /**
       * Object container for initialization options
       *
       * @property options
       * @type object
       */
      options:
      {
         /**
          * Site
          * 
          * @property site
          * @type strtring
          * @default null
          */
         site: null
      },
   
      /**
       * Fired by YUI when parent element is available for scripting.
       * Component initialisation, including instantiation of YUI widgets and event listener binding.
       *
       * @method onReady
       */
      onReady: function UP_onReady()
      {
         // Reference to self used by inline functions
         var me = this;
         
         // Buttons
         this.widgets.ok = Alfresco.util.createYUIButton(this, "send-button", null,
            {
               type: "submit"
            });
         this.widgets.cancel = Alfresco.util.createYUIButton(this, "cancel-button", this.onCancel);
         
         // Form definition
         var form = new Alfresco.forms.Form(this.id + "-suggestion-form");
         form.setSubmitElements(this.widgets.ok);
         form.setShowSubmitStateDynamically(true);
         form.setSubmitAsJSON(true);
         form.ajaxSubmitMethod = Alfresco.util.Ajax.POST;

         form.setAJAXSubmit(true,
         {
            successCallback:
            {
               fn: this.onSuccess,
               scope: this
            }
         });
                  
         // Form field validation
         form.addValidation(this.id + "-message", Alfresco.forms.validation.mandatory, null, "keyup");
         form.addValidation(this.id + "-email", Alfresco.forms.validation.email, null, "keyup");

          // Initialise the form
         form.init();
         
         // Finally show the main component body here to prevent UI artifacts on YUI button decoration
         Dom.setStyle(this.id + "-body", "display", "block");
      },

      /**
       * YUI WIDGET EVENT HANDLERS
       * Handlers for standard events fired from YUI widgets, e.g. "click"
       */
      
      /**
       * Save Changes form submit success handler
       *
       * @method onSuccess
       * @param response {object} Server response object
       */
      onSuccess: function UP_onSuccess(response)
      {
         if (response && response.json)
         {
            if (response.json.success)
            {
               Alfresco.util.PopupManager.displayMessage(
               {
                  text: Alfresco.util.message("suggestion.box.post.message", this.name)
               });
               this.navigateToDashboard();
            }
            else if (response.json.message)
            {
               Alfresco.util.PopupManager.displayPrompt(
               {
                  text: response.json.message
               });
            }
         }
         else
         {
            Alfresco.util.PopupManager.displayPrompt(
            {
               text: Alfresco.util.message("message.failure", response.serverResponse.responseText)
            });
         }
      },
              
          
      /**
       * Cancel Changes button click handler
       *
       * @method onCancel
       * @param e {object} DomEvent
       * @param p_obj {object} Object passed back from addListener method
       */
      onCancel: function UP_onCancel(e, p_obj)
      {
         this.navigateToDashboard();
      },
      
      /**
       * Perform URL navigation back to dashboard
       * 
       * @method navigateToPrevious
       */
      navigateToDashboard: function UP_navigateToDashboard()
      {
         var pageIndex = document.location.href.lastIndexOf('?');
         var url = document.location.href.substring(0, pageIndex + 1);
         pageIndex = url.lastIndexOf('/');
         var href = url.substring(0, pageIndex + 1) + "dashboard";
         if (href.indexOf(this.options.site) >= 0) {
             document.location.href = href;
         }
      }
   });
})();