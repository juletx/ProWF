//------------------------------------------------------------------------------
// Licensed Materials - Property of IBM
// Restricted Materials of IBM  - Modification is prohibited.
//
// com.ibm.rmc.publishing/layout/scripts/treebrowser.js
//
// (c) Copyright IBM Corporation 2004, 2005. All Rights Reserved. 
//
// Note to U.S. Government Users Restricted Rights:  Use, duplication or 
// disclosure restricted by GSA ADP  Schedule Contract with IBM Corp.
//------------------------------------------------------------------------------

// Here defines all the I18N specific messages used in the javascripts
var treebrowser_js_MESSAGE1 = "La configuración ya se muestra mediante las vistas";
var treebrowser_js_MESSAGE2 = "Mostrar las vistas";
var treebrowser_js_MESSAGE3 = "Inicio";

function loadTop()
{
  if(parent.frames.length!=0 && (parent.frames[1].name=="ory_toc" || parent.frames[1].name=="ory_toc_frame") )
  {
     alert(treebrowser_js_MESSAGE1);
  }
  else
  {
    var expires = new Date();
    expires.setTime (expires.getTime() + (1000 * 20));
    document.cookie = "rup_ory_doc=" + escape (document.URL) +
    "; expires=" + expires.toUTCString() +  "; path=/";

    var new_ory_doc_loc = null;

    for(i=document.links.length-1;i>=0;i--)
    {
       if(document.links[i].href.indexOf("index.html")!=-1)
       {
         new_ory_doc_loc = document.links[i].href;
         break;
       }
    }

    if(new_ory_doc_loc!=null)
    {
	if( self.name == "ory_doc" )
	{
		window.close();
		window.open( new_ory_doc_loc );		
	}
	else
	{
	       	top.location = new_ory_doc_loc;
	}
    }
   }
}


  function getImageUrl(image)
  {
    var new_ory_doc_loc=null;
    for(i=document.links.length-1;i>=0;i--)
    {
       if(document.links[i].href.indexOf("index.html")!=-1)
       {
         new_ory_doc_loc = document.links[i].href.substring(0,document.links[i].href.lastIndexOf("/"));
         new_ory_doc_loc = new_ory_doc_loc + "" + image;
         return new_ory_doc_loc;
       }
    }
    return null;
  }

MSFPhover =
(((navigator.appName == "Netscape") &&
  (parseInt(navigator.appVersion) >= 3 )) ||
  ((navigator.appName == "Microsoft Internet Explorer") &&
  (parseInt(navigator.appVersion) >= 4 )));

  function MSFPpreload(img)
  {
     var a=new Image();
     a.src=img;
     return a;
  }

    if(MSFPhover)
    {
        RupGray=MSFPpreload(getImageUrl('/images_rup/rup1.gif'));
        RupBlue=MSFPpreload(getImageUrl('/images_rup/rup1_a.gif'));
    }


//new code to display the load button or not
var ory_toc_exist = typeof parent.ory_toc;
if (ory_toc_exist == "undefined") {
   ory_toc_exist = typeof parent.ory_toc_frame;
}

if (ory_toc_exist == "undefined") {
	document.write("<a class=\"expandCollapseLink\" href=\"JavaScript:loadTop();\" onmouseover=\"if(MSFPhover) document['Home'].src=RupBlue.src; self.status=treebrowser_js_MESSAGE2; return true\" onmouseout=\"if(MSFPhover) document['Home'].src=RupGray.src; self.status= ' ';return true\"> <br> <img src=\"" + backPath + "images_rup/rup1.gif");
	document.write("\"  border=\"0\" align=\"absmiddle\" alt=\"" + treebrowser_js_MESSAGE2 + "\" name=\"" + treebrowser_js_MESSAGE3 + "\" width=\"16\" height=\"16\">" + treebrowser_js_MESSAGE2 + "<\/a>");
}
else {
	document.write("&nbsp;");
}
