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
    var templateRef = null;
    var templateCopyRef = null;
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
        else if (field.equals("templateRef"))
        {
            templateRef = new String(json.get(field));
        }
        else if (field.equals("templateCopyRef"))
        {
            templateCopyRef = new String(json.get(field));
        }
    }

    if (nodeRef == null) {
        logger.log(msg.get("email.addressees.required"));
        model.success = false;
        model.errormsg = msg.get("email.addressees.required");
        return;
    }

    var node = search.findNode(nodeRef);

    var templateRefNode = null
    if (templateRef != null) {
        templateRefNode = search.findNode(templateRef);
    }

    var templateCopyRefNode = null
    if (templateCopyRef != null) {
        templateCopyRefNode = search.findNode(templateCopyRef);
    }

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

            var arrayOfEmails = emailAddresses.split(",");

            for (var i = 0; i < arrayOfEmails.length; i++) {
                sendEmail(arrayOfEmails[i], site, sendername, email, message, templateRefNode);
            }

            email = email.replace(/^\s+|\s+$/gm, '');
            if (email && email !== "") {
                sendEmail(email, site, sendername, email, message, templateCopyRefNode);
            }

        } catch (e)
        {
            javascriptlogger.error(e);
            model.exception = true;
            model.errormsg = e.message;
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

function sendEmail(emailAddresses, site, sendername, email, message, template)
{
    var mail = actions.create("mail");

    mail.parameters.to = emailAddresses;

    javascriptlogger.debug("Sending email to: " + mail.parameters.to);

    // Sendername
    if (!sendername || sendername.replace(/^\s+|\s+$/gm, '') === "") {
        sendername = msg.get("suggestion.box.anonymous");
    } else {
        sendername = sendername.replace(/^\s+|\s+$/gm, '');
    }

    if (!email || email.replace(/^\s+|\s+$/gm, '') === "") {
        email = msg.get("suggestion.box.anonymous");
    } else {
        email = email.replace(/^\s+|\s+$/gm, '')
    }
    
    // Message subject
    if (emailAddresses !== email) {
        mail.parameters.subject = msg.get("suggestion.box.subject", [sendername, site]);
    } else {
        mail.parameters.subject = msg.get("suggestion.box.subject.copy");
    }
    
    // Message body
    javascriptlogger.debug("Getting email body: " + message);
    if (template === null) {
        if (emailAddresses !== email) {
            mail.parameters.text = msg.get("suggestion.box.email.message", [site, sendername, email, message]);
        } else {
            mail.parameters.text = msg.get("suggestion.box.email.copy", [sendername, site, message]);
        }
        javascriptlogger.debug("Email text is: " + mail.parameters.text);
    } else {
        // Map of variables to be used in the template
        var map = new Object();
        map["site"] = site;
        map["senderName"] = sendername;
        map["email"] = email;
        map["emailMessage"] = message.toString().replace(/\n/g, "<br />");
        javascriptlogger.debug("Email text is: " + map["emailMessage"]);
        mail.parameters.template = template;
         // Map of variables to be used in the template
        mail.parameters.template_model = map;
    }

    // Execute e-mail send action
    mail.execute(companyhome);

}

main();