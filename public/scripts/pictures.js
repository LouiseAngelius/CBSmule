import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dvbypemez', 
  api_key: '531461326658898', 
  api_secret: 'Jg6sFlcvP-78Iq6KF54oXZIf_2w' 
});

// Fetch and display images
fetch('/pictures')
  .then(response => response.json())
  .then(images => {
    const container = document.getElementById('image-container');
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.secure_url;
      imgElement.alt = image.original_filename;
      container.appendChild(imgElement);
    });
  })
  .catch(error => console.error(error));