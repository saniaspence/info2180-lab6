"use strict";
function loadDefinitions(allSearch)
{
    var query = document.getElementById("queryTxtBox").value.toLowerCase();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            parseXMLData(this, allSearch, query);
        }
    };
    xhttp.open("GET", "request.php", true);
    xhttp.send();
}

function parseXMLData(xml, allSearch, query) 
{
    var i;
    var xmlDoc = xml.responseXML;
    var allDef="<ol>";
    var x = xmlDoc.getElementsByTagName("definition");
    var notFound = true;
    
    if (allSearch) // Returns all definitions
    {
        for (i = 0; i <x.length; i++) 
        { 
            allDef += "<li>" + "<h3>" + x[i].getAttributeNode("name").value + "</h3>" + // prints the name attribute of the definition
            "<p>" + x[i].childNodes[0].nodeValue + "</p>" +                             // prints the definition of the word
            "<p> - " + x[i].getAttributeNode("author").value + "</p>" +                 // prints the name attribute of the definition
            "</li>";  
        }
        allDef += "</ol>";
        document.getElementById("result").innerHTML = allDef;
    }
    else // Returns only a single entry
    {
        for (i = 0; i <x.length; i++) 
        { 
            if (x[i].getAttributeNode("name").value.toLowerCase() == query)
            {
                document.getElementById("result").innerHTML  = "<ol><li>" + "<h3>" + x[i].getAttributeNode("name").value + "</h3>" + 
                "<p>" + x[i].childNodes[0].nodeValue + "</p>" +                             
                "<p> - " + x[i].getAttributeNode("author").value + "</p>" +                 
                "</li></ol>";
                notFound = false;
                break;
            }
            
        }
        
        if(notFound) // No results found
        {
            document.getElementById("result").innerHTML  = "<h3>No Results found for: '" + query + "'</h3>";
        }
    }
}