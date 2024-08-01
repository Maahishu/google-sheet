
    var CLIENT_ID = '674288742224-ptccut2amsiib2srglbfpmlfl987njmu.apps.googleusercontent.com'; // Replace with your client ID

    function handleClientLoad() {
        console.log('this')
        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCredentialResponse
        });
        console.log('that')
      google.accounts.id.prompt();
    }

    function handleCredentialResponse(response) {
        console.log(response)
        console.log('those')        
      if (response.credential) {
        var token = response.credential;
        listFiles(token);
      } else {
        console.error('No credential response received');
      }
    }

    function listFiles(token) {
    console.log('these')        
      fetch(`https://www.googleapis.com/drive/v3/files?key=AIzaSyAYnLuGyqLDN3E7X_iLy6EWsjAXsGAXA-k`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        var files = data.files;
        if (files.length > 0) {
          var output = 'Files:<br>';
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            output += `${file.name} (${file.mimeType})<br>`;
          }
          document.getElementById('content').innerHTML = output;
        } else {
          document.getElementById('content').innerHTML = 'No files found.';
        }
      })
      .catch(error => console.error('Error listing files:', error));
    }
