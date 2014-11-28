function main()
{
    if (page.url.args["nodeRef"] == undefined)
    {
        // redirect to error page
        status.code = 400;
        status.message = "One or more parameters are missing";
        return;
    }

    var nodeRef = page.url.args.nodeRef;
    
    // Call the repo for metadata
    var json = remote.call("/api/metadata?nodeRef=" + nodeRef)
    var node = eval('(' + json + ')');
    
    
    if (node != null) 
    {
        // property namespaces
        var mcns = "{http://www.alfresco.org/model/content/1.0}";
        var msns = "{http://www.alfresco.org/model/system/1.0}";
        
        // extract metadata
        var storeType = node.properties[msns + "store-protocol"];
        var storeId = node.properties[msns + "store-identifier"];
        var nodeId = node.properties[msns + "node-uuid"];
        var name = node.properties[mcns + "name"];

        var contentUrl = "/api/node/content/" +storeType+ "/" +storeId + "/" + nodeId + "?" + encodeURIComponent(name)

        var contentData = remote.call(contentUrl);
        model.content = contentData;
        
    }
    
}

main();