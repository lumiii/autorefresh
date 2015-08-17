var Gmailer = {};
Gmailer.iframeURL = AutoRefresh.baseURL + 'gmail.html';

function sendEmail(options)
{
	Gmailer.iframe.contentWindow.postMessage(options, '*');
}

(function()
{
	var d = document.createElement('div');
	d.className = 'form-horizontal';

	var htmlStr = "<label for='emailAddress' class='control-label'>Address</label>";
	htmlStr += "<div>";
	htmlStr += "<input id='emailAddress' type='email' class='form-control'></input>";
	htmlStr += "</div>";
	htmlStr += "<label for='emailSubject' class='control-label'>Subject</label>";
	htmlStr += "<div>";
	htmlStr += "<input id='emailSubject' type='text' class='form-control'></input>";
	htmlStr += "</div>";

	d.innerHTML = htmlStr;

	var helpStr = "<h5>";
	helpStr += "<p>";
	helpStr += "This plugin sends you email notifications via your Gmail account.";
	helpStr += "</p>";
	helpStr += "<p>";
	helpStr += "The first step is to click the authorization button below the subject field. ";
	helpStr += "This will pop up a window from Gmail for you to complete authorization. ";
	helpStr += "If you do not see any button, you are already authorized.";
	helpStr += "</p>";
	helpStr += "<p>";
	helpStr += "Then, simply fill out the e-mail address and subject line for the e-mail message";
	helpStr += "</p>";
	helpStr += "</h5>";

	var iframe = document.createElement('iframe');
	iframe.src = Gmailer.iframeURL;
	iframe.style.height = '50px';
	Gmailer.iframe = iframe;

	d.appendChild(iframe);

	registerPlugin(sendEmail, d, 'Gmail', helpStr);
	registerField('email', 'address', 'emailAddress');
	registerField('email', 'subject', 'emailSubject');	
})();