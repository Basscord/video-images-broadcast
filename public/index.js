const socket = io.connect(window.location.origin);

function broadcast() {  // eslint-disable-line no-unused-vars
	const video = document.querySelector('video');
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	navigator.mediaDevices.getUserMedia({ video : true })
	.then(function(stream) {
		video.srcObject = stream;
		setInterval(function() {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			const imageData = canvas.toDataURL("image/jpeg", 0.4);
			socket.emit('sendImage', { image : imageData });
		}, 100);
	}).catch(error => console.error(error));
}

function watch() {  // eslint-disable-line no-unused-vars
	const img = document.querySelector('img');
	socket.on('getImage', data => img.src = data.image);
}
