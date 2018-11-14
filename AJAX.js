"use strict";
function loadDefinitions()
{
    var query = document.getElementById("queryTxtBox").value.toLowerCase();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById("result").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "request.php?q="+ query, true);
    xhttp.send();
}