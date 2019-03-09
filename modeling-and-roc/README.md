# Client-Server Visualization and Modeling


### There are two components for the displaying the visualization correctly.

1) A flask server which models the data and sends the values to 
be displayed in the visualization: Folder **roc_server**
2) A front-end, pages served by a python HTTP server: 
Folder **d3**


### Instructions to run:

#### Running the backend server

1) Browse to the folder roc_server in the command prompt
2) Make sure the dependencies are installed and that the environment variable FLASK\_APP is set to flask\_roc.py
3) Run the app with the command ```flask run```

#### Running the UI server

1) Browse to the folder: d3 in the command prompt
2) Type in ```python3 -m http.server```
3) On a browser go to http://0.0.0.0:8000/
4) Change the hyper-parameter c and the type of scaling
5) Click Plot
6) See the ROC plot being displayed


Important Note: If the plot is not displayed, please check if there is the following error on the javascript console:

```Access to fetch at 'http://127.0.0.1:5000/roc/standard/1' from origin 'http://0.0.0.0:8000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.```

If this error comes, please install this browser extension:

https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en

And the code should run as expected.
