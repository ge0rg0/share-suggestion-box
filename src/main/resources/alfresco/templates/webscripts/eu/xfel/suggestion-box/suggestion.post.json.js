/**
 * Suggestion Box Post method
 * 
 * @method POST
 */

function main()
{

    var sendername = null;
    var email = null;
    var message = null;
    var nodeRef = null;
    var site = null;
    var names = json.names();
    for (var i = 0; i < names.length(); i++)
    {
        var field = names.get(i);

        // look and set simple text input values
        if (field.equals("name"))
        {
            sendername = new String(json.get(field));
        }
        else if (field.equals("email"))
        {
            email = new String(json.get(field));
        }
        else if (field.equals("message"))
        {
            message = new String(json.get(field));
        }
        else if (field.equals("nodeRef"))
        {
            nodeRef = new String(json.get(field));
        }
        else if (field.equals("site"))
        {
            site = new String(json.get(field));
        }
    }

    if (nodeRef == null) {
        logger.log(msg.get("email.addressees.required"));
        model.success = false;
        model.errormsg = msg.get("email.addressees.required");
        return;
    }
    // Call the repo for metadata
    /*var json_metadata = remote.call("/api/metadata?nodeRef=" + nodeRef)
    var node = eval('(' + json_metadata + ')');*/
    

    var node = search.findNode(nodeRef);

    if (node != null)
    {
        var emailAddresses = node.content;

        if (!emailAddresses) {
            javascriptlogger.debug(msg.get("email.addressees.required"));
            model.success = false;
            model.errormsg = msg.get("email.addressees.required");
            return;
        }

        if (!message) {
            javascriptlogger.debug(msg.get("message.body.required"));
            model.success = false;
            model.errormsg = msg.get("message.body.required");
            return;
        }

        try {
            
            //var arrayOfEmails = emailAddresses.split(/[;,]+/);
            var arrayOfEmails = emailAddresses.split(",");
            
            for (var i = 0; i < arrayOfEmails.length; i++) {
                sendEmail(arrayOfEmails[i], site, sendername, email, message, node);
            }
            
        } catch (e)
        {
            javascriptlogger.error(e);
            model.exception = true;
            model.errormsg =  e.message;
            model.success = false;
            return;
        }


        model.success = true;

    } else {
        javascriptlogger.error("Unknown error " + msg.get("email.addressees.required"));
        model.success = false;
        model.errormsg = msg.get("email.addressees.required");
    }

}

function sendEmail(emailAddresses, site, sendername, email, message, node)
{
    var mail = actions.create("mail");
        
    mail.parameters.to = emailAddresses;
    
    // Subject of e-mail
    mail.parameters.subject = msg.get("suggestion.box.subject", [site]);

    // Message body
    if (!sendername || sendername.replace(/^\s+|\s+$/gm,'') === "") {
        sendername = msg.get("suggestion.box.anonymous");
    }

    if (!email || email.replace(/^\s+|\s+$/gm,'') === "") {
        email = msg.get("suggestion.box.anonymous");
    }

    mail.parameters.text = msg.get("suggestion.box.email.message", [site, sendername, email, message]);

    // Execute e-mail send action
    mail.execute(node);

}

main();