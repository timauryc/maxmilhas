CONTENTS OF THIS FILE
---------------------
   
 * Introduction
 * Usage (Docker deploy)
 * Usage (Without docker)
 * Usage (API)
 * Usage (web client)
 * Automated tests
 * Project structure   
 * Developer


 INTRODUCTION
------------

This is a technical test for MaxMilhas, it has the objetive of showing the developer skills and logical thinking. It consist on a REST API with a CRUD for CPFs and a web client for the same operations, also it counts with a webview for server uptime info. 


USAGE (Docker deploy)
------

The project can be dockerized and tested as a running container, the exposed port in the dockerfile is 8080.

- Build the docker image:
    $ docker build -t <your username>/<image name> /path/to/dockerfile
- Run the image:
    $ docker run -p <port of you choice>:8080 -d <your username>/<image name>
- At that point the app should be accesible at <machine address>:<port of you choice>.


USAGE (Without Docker)
------

The project can be tested without running on a container too.

- Install dependencies
   $ npm install (on project directory)
- Run with the node command
   $ node /path/to/project/server.js
- The default port is 8080 unless you set another one on process.env.PORT
- At that point the app should be accesible at <machine address>:<port>.

USAGE (API)
------

The project has 5 routes...

GET /cpf/:cpfNumber/estado

    - Returns the queried cpf state if exist
    - Usage example 
        http://localhost:8080/cpf/111.111.111-11/estado
    - Example response 
        {
            _id:"111.111.111-11",
            status: "FREE"
        }

POST /cpf

    - Inserts a cpf
    - Usage example 
        http://localhost:8080/cpf

        body = {
            _id:"111.111.111-11",
            status: "FREE"
        }
    - Example response 
        {
            _id:"111.111.111-11",
            status: "FREE"
        }


DELETE /cpf/:cpfNumber

    - Deletes a cpf from database
    - Usage example 
        http://localhost:8080/cpf/111.111.111-11
    - Example response 
        {
            totalDeleted:1
        }

PATCH /cpf/estado

    - Alters the status of a cpf
    - Usage example 
        http://localhost:8080/cpf/estado

        body = {
            _id:"111.111.111-11",
            status: "BLOCK"
        }
    - Example response 
        {
           totalReplaced:1
        }

GET /server/status

    - Returns uptime info of the server
    - Usage example
        http://localhost:8080/server/status
    - Example response 
        {
            "uptime": 26.516,
            "queriesCount": 0,
            "totalBlacklistedCPFs": 3
        }


USAGE (Web Client)
------

On the browser

GET / 
    - Webview for querying, deleting, inserting and modifying CPFs

GET /status 
    - Webview for viewing server uptime, number of queries and number of blacklisted CPFs


AUTOMATED TESTS
------

For triggering the automated tests : npm test (on project directory)

PROJECT STRUCTURE
------

The project has the following structure
    
├── controllers
|   ├── cpf.js
|   ├── database.js   
|   └── status.js
├── routes
|   ├── cpf.js
|   └── server.js
├── views
|   ├── cpf.html
|   └── status.html
├── public
|   ├── cpfClient.js
|   └── serverClient.js
├── test
|   └── server.specs.js


For the API, the use the controllers, to delegate the logical layer, cpf and status controllers consume the database controller.

For the web client the views cpf and status consume the cpfClient and the serverClient for logical layer, the both consume the API throught AJAX calls.

DEVELOPER
-----------
 * Carlos Timaury - carlos.timaury@minutrade.com