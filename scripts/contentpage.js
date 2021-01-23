//------------------------------------------------------------------------------
// Licensed Materials - Property of IBM
// Restricted Materials of IBM  - Modification is prohibited.
//
// com.ibm.rmc.publishing/layout/scripts/contentpage.js
//
// (c) Copyright IBM Corporation 2004, 2005. All Rights Reserved. 
//
// Note to U.S. Government Users Restricted Rights:  Use, duplication or 
// disclosure restricted by GSA ADP  Schedule Contract with IBM Corp.
//------------------------------------------------------------------------------

var collapseSectionsByDefault = false;
var firstSection;
var expandImage;
var collapseImage;
var expandAllImage;
var collapseAllImage;
var backToTopImage;
var shimImage;
var expandMessage = "Expandir todas las secciones";
var collapseMessage = "Contraer todas las secciones ";
var backMessage = "Volver al inicio";

// Creates the collapsible section links.
function createSectionLinks(tagName, classSelector, imgPath) {
	expandImage = imgPath + 'expand.gif';	
	collapseImage = imgPath + 'collapse.gif';
	expandAllImage = imgPath + 'expand_all.gif';	
	collapseAllImage = imgPath + 'collapse_all.gif';
	backToTopImage = imgPath + 'back_to_top.gif';
	shimImage = imgPath + 'shim.gif';
	
	if (document.getElementsByTagName) {
		var elements = document.getElementsByTagName(tagName);
		var sectionElements = new Array(elements.length);
		var totalLinks = 0;
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			if (element.className == classSelector) {
				sectionElements[totalLinks++] = element;
			}
		}
		sectionElements.length = totalLinks;
		sectionCollapseDivs = new Array(totalLinks);
		sectionCollapseLinks = new Array(totalLinks);
		firstSection = sectionElements[0];
		for (var i = 0; i < sectionElements.length; i++) {
			var element = sectionElements[i];
			var siblingContainer;
			if (document.createElement && (siblingContainer = document.createElement('div')) && siblingContainer.style) {	
				var nextSibling = element.nextSibling;
				element.parentNode.insertBefore(siblingContainer, nextSibling);
				var nextElement = sectionElements[i + 1];
				while (nextSibling != nextElement && nextSibling != null && nextSibling.className != 'copyright') {
					var toMove = nextSibling;
					nextSibling = nextSibling.nextSibling;
					siblingContainer.appendChild(toMove);
				}
				if (collapseSectionsByDefault) {
    				siblingContainer.style.display = 'none';
    			}
    			sectionCollapseDivs[i] = siblingContainer;
    			createCollapsibleSection(element, siblingContainer, i);
			}
			else {
				return;
			}
		}
		createExpandCollapseAllSectionsLinks(sectionElements[0]);
	}
}

// Creates a collapsible section.
function createCollapsibleSection(element, siblingContainer, index) {
	if (document.createElement) {
		// Add a spacing between the sections.
		var sectionSeparator = document.createElement('img');
		sectionSeparator.src = shimImage;
		sectionSeparator.height = '3';
		sectionSeparator.border = '0';
		sectionSeparator.align = 'absmiddle';
		element.parentNode.insertBefore(sectionSeparator, element);
		
		// Add a expand/collapse link to the section heading.
		var span = document.createElement('span');
		var link = document.createElement('a');
		link.collapseDiv = siblingContainer;
		link.href = '#';
		var image = document.createElement('img');
		if (collapseSectionsByDefault) {
			image.src = expandImage;
		}
		else {
			image.src = collapseImage;
		}
		image.width = '17';
		image.height = '15';
		image.border = '0';
		image.align = 'absmiddle';
		link.appendChild(image);
		link.onclick = expandCollapseSection;
		sectionCollapseLinks[index] = link;
		span.appendChild(link);
		element.insertBefore(span, element.firstChild);
		element.appendChild(document.createTextNode(String.fromCharCode(160)));
		element.appendChild(document.createTextNode(String.fromCharCode(160)));
    	
		// Add a Back To Top link in the section heading.
		createBackToTopLink(siblingContainer);
	}
}

// Creates a Back to top link.
function createBackToTopLink(element) {
	var div;
	
	if (document.createElement && (div = document.createElement('div'))) {
		div.className = 'backToTopLink';
		div.align = 'right';
		var image = document.createElement('img');
		image.src = backToTopImage;
		image.width = '16';
		image.height = '16';
		image.border = '0';
		image.align = 'absmiddle';		
		var link = document.createElement('a');
		link.className = 'backToTopLink';
		link.href = '#';
		link.appendChild(image);
		var span = document.createElement('span');
		span.className = 'backToTopLink';
		span.appendChild(document.createTextNode(backMessage));		
		link.appendChild(span);
		div.appendChild(link);
		element.appendChild(div);
	}
}

// Expands or collapses a section based on the received event.
function expandCollapseSection(evt) {
	if (this.collapseDiv.style.display == '') {
		this.parentNode.parentNode.nextSibling.style.display = 'none';
		this.firstChild.src = expandImage;
	}
	else {
		this.parentNode.parentNode.nextSibling.style.display = '';
		this.firstChild.src = collapseImage;
	}
	if (evt && evt.preventDefault) {
		evt.preventDefault();
	}
	return false;
}

// Creates the Expand All and Collapse All Sections links.
function createExpandCollapseAllSectionsLinks(firstElement) {
	var div;
		
	if (document.createElement && (div = document.createElement('div'))) {
		div.className = 'expandCollapseLink';
		div.align = 'right';
		var image = document.createElement('img');
		image.src = expandAllImage;
		image.width = '16';
		image.height = '16';
		image.border = '0';
		image.align = 'absmiddle';		
		var link = document.createElement('a');
		link.className = 'expandCollapseLink';
		link.href = '#';
		link.appendChild(image);
		link.onclick = expandAll;
		var span = document.createElement('span');
		span.className = 'expandCollapseText';
		span.appendChild(document.createTextNode(expandMessage));
		link.appendChild(span);
		div.appendChild(link);
		div.appendChild(document.createTextNode(String.fromCharCode(160)));
		div.appendChild(document.createTextNode(String.fromCharCode(160)));
		div.appendChild(document.createTextNode(String.fromCharCode(160)));
		div.appendChild(document.createTextNode(String.fromCharCode(160)));						
		
		image = document.createElement('img');
		image.src = collapseAllImage;
		image.width = '16';
		image.height = '16';
		image.border = '0';
		image.align = 'absmiddle';
		link = document.createElement('a');
		link.className = 'expandCollapseLink';
		link.href = '#';
		link.appendChild(image);
		link.onclick = collapseAll;
		span = document.createElement('span');
		span.className = 'expandCollapseText';
		span.appendChild(document.createTextNode(collapseMessage));				
		link.appendChild(span);
		div.appendChild(link);
		
		/*
		var overviewSeparator = document.getElementById("overviewSeparator");
		overviewSeparator.parentNode.insertBefore(div, overviewSeparator);
		*/
		if (firstSection != null) {
			firstSection.parentNode.insertBefore(div, firstSection);
		}
	}
}

// Expands all sections.
function expandAll(evt) {
	 for (var i = 0; i < sectionCollapseDivs.length; i++) {
	 	sectionCollapseDivs[i].style.display = '';
	 	sectionCollapseLinks[i].firstChild.src = collapseImage;
	 }
	 if (evt && evt.preventDefault) {
	 	evt.preventDefault();
	 }
	 return false;
}

// Collapses all sections.
function collapseAll(evt) {
	for (var i = 0; i < sectionCollapseDivs.length; i++) {
		sectionCollapseDivs[i].style.display = 'none';
		sectionCollapseLinks[i].firstChild.src = expandImage;
	}
	if (evt && evt.preventDefault) {
		evt.preventDefault();
	}
	return false;
}

// This temporary function helps to resolve Javascript errors in the migrated RUP
// content pages. It will be removed once the corresponding .js files are being
// migrated along with the HTML content pages.
function ReferenceHelpTopic (topicName, book , fileName) {
   document.write("<i>"+ topicName + "<\/i>");
}







