var AudioPlayer = {};

function playAudio(options)
{
	AudioPlayer.player.src = options.audio.url;
}

(function()
{
	var d = document.createElement('div')
	var htmlStr = "<label for='audioURL'>Audio URL</label>";
	htmlStr += "<input id='audioURL' type='text' class='form-control'></input>";
	htmlStr += "<div>";
	htmlStr += "<audio controls='true' loop='true' autoplay='true'></audio>";
	htmlStr += "</div>";

	d.innerHTML = htmlStr;

	var helpStr = "<h5>";
	helpStr += "<p>";
	helpStr += "This notification plays an audio file from your computer. Make sure your volume is on to hear it.";
	helpStr += "</p>";
	helpStr += "<p>";
	helpStr += "A URL to a common music file type must be inputted into the Audio URL field. ";
	helpStr += "This should be mp3, wav, etc. This audio file will play on loop upon notification.";
	helpStr += "</p>";
	helpStr += "<p>";
	helpStr += "If you do not have a audio URL handy, a sample one can be used: ";
	helpStr += "</p>";
	helpStr += "<p>";
	helpStr += "https://dl.dropboxusercontent.com/u/25255870/11.mp3";
	helpStr += "</p>";
	helpStr += "</h5>";

	AudioPlayer.player = d.querySelector('audio');
	
	registerPlugin(playAudio, d, 'Audio', helpStr);
	registerField('audio', 'url', 'audioURL');
})();