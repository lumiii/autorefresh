var TwilioText = {};

TwilioText.credentials = 
[
	{
		country: "US",
		user: "ACcb57a62cca15e227defe2d707ee4f5fb",
		pass: "b0c037f699173482ffc1a9e9e6028e95",
		number: "+13237458789"
	},
	{
		country: "Canada",
		user: "AC3b1e889361ec31672e05a705fbbcca09",
		pass: "c6db1d986d9a2e4097aa017aa85c6f90",
		number: "+16043300104"
	}
];

TwilioText.urlChunks = {};
TwilioText.urlChunks.text = [
	"https://",
	"@api.twilio.com/2010-04-01/Accounts/",
	"/Messages.json"
];
TwilioText.urlChunks.verify = [
	"https://",
	"@api.twilio.com/2010-04-01/Accounts/",
	"/OutgoingCallerIds.json"
];

function constructTextBody(options)
{
	var credential = findCredential(options.SMS.country);
	var body = options.message;
	if (body == '')
	{
		body = 'Notification message';
	}
	
	var str = "Body=" + encodeURIComponent(body) + "&" +
		"To=" + encodeURIComponent(options.SMS.to) + "&" +
		"From=" + encodeURIComponent(credential.number);

	return str;
}

function constructVerifyBody(options)
{
	return "PhoneNumber=" + encodeURIComponent(options.SMS.to);
}

function credString(credential)
{
	return credential.user + ":" + credential.pass;
}

function findCredential(country)
{
	var credentials = TwilioText.credentials;
	var length = credentials.length;
	for (var i = 0; i < length; i++)
	{
		if (country == credentials[i].country)
		{
			return credentials[i];
		}
	}

	return null;
}

function twilioFireText(options)
{
	var credential = findCredential(options.SMS.country);

	if (credential != null)
	{
		var xhr = new XMLHttpRequest();
		var credentialString = credString(credential);
		var url = 
			TwilioText.urlChunks.text[0] + credentialString +
			TwilioText.urlChunks.text[1] + credential.user +
			TwilioText.urlChunks.text[2];
		xhr.open("POST", url);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Authorization', 'Basic ' + btoa(credentialString));
		xhr.send(constructTextBody(options));
	}
}

function twilioVerifyNumber(options)
{
	var credential = findCredential(options.SMS.country);

	if (credential != null)
	{
		var xhr = new XMLHttpRequest();
		var credentialString = credString(credential);
		var url = 
			TwilioText.urlChunks.verify[0] + credentialString +
			TwilioText.urlChunks.verify[1] + credential.user +
			TwilioText.urlChunks.verify[2];
		xhr.open("POST", url);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Authorization', 'Basic ' + btoa(credentialString));
		xhr.send(constructVerifyBody(options));
	}	
}

(function()
{
	var d = document.createElement('div');

	var htmlStr = "<label for='twilioBlock'>Text telephone number (format +16043214567)</label>";
	htmlStr += "<div id='twilioBlock'>";
	htmlStr += "<div class='col-md-3'>";
	htmlStr += "<select class='form-control' id='twilioRegion'>";
	htmlStr += "<option value='US'>US</option>";
	htmlStr += "<option value='Canada'>Canada</option>";	
	htmlStr += "</select>";
	htmlStr += "</div>";
	htmlStr += "<div class='col-md-6'>";
	htmlStr += "<input class='form-control' id='twilioNumber' type='tel' placeholder='+16045555555'></input>";
	htmlStr += "</div>";
	htmlStr += "<div class='col-md-3'>";	
	htmlStr += "<button id='twilioVerify' class='btn btn-warning'>Verify Number</button>";
	htmlStr += "</div>";
	htmlStr += "</div>";

	d.innerHTML = htmlStr;

	var b = d.querySelector('#twilioVerify');
	b.addEventListener('click', updateOptions);
	b.addEventListener('click', twilioVerifyNumber);

	registerPlugin(twilioFireText, d, 'SMS');
	registerField('SMS', 'country', 'twilioRegion');
	registerField('SMS', 'to', 'twilioNumber');
})();