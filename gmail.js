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

	var iframe = document.createElement('iframe');
	iframe.src = Gmailer.iframeURL;
	iframe.style.height = '50px';
	Gmailer.iframe = iframe;

	d.appendChild(iframe);

	registerPlugin(sendEmail, d, 'Gmail');
	registerField('email', 'address', 'emailAddress');
	registerField('email', 'subject', 'emailSubject');	
})();