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

	AudioPlayer.player = d.querySelector('audio');
	
	registerPlugin(playAudio, d, 'Audio');
	registerField('audio', 'url', 'audioURL');
})();