function fireAlertMessage(options)
{
	showModalDialog("Notification!", "<h1 class='jumbotron' style='text-align:center'>" + options.message + "</div>");
}

(function()
{
	var d = document.createElement('span');

	var helpStr = "<h5>";
	helpStr += "A super simple notification. This pops an alert message dialog on your browser.";
	helpStr += "</h5>";

	registerPlugin(fireAlertMessage, d, 'Alert Modal Dialog', helpStr);
})();