function fireAlertMessage(options)
{
	alert(options.message);
}

(function()
{
	var d = document.createElement('span');

	registerPlugin(fireAlertMessage, d, 'Alert Modal Dialog');
})();