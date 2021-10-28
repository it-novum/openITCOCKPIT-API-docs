# openITCOCKPIT JSON API documentation

## Swagger / openAPI usage



### Helpful links

https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md

https://swagger.io/docs

https://inspector.swagger.io


### Production setup

Start webserver over project repository, browse at http://localhost:80
You can also browse to the project repository directory using any common webserver.

`docker run -v $PWD:/usr/share/nginx/html:ro -v $PWD/nginx-example.conf:/etc/nginx/conf.d/default.conf:ro -d -p 80:80 --name swagger-ui nginx`


### Development setup

Run the commands in the repository root directory.

Make sure, that the ports 80 and 81 are not used yet!

```
docker run -v $PWD:/usr/share/nginx/html:ro -v $PWD/nginx-example.conf:/etc/nginx/conf.d/default.conf:ro -d -p 80:80 --name swagger-ui nginx
docker run -d -p 81:8080 -e SWAGGER_FILE=/usr/share/nginx/html/oitc/index.yaml -v $PWD:/usr/share/nginx/html/oitc -v $PWD/external:/usr/share/nginx/html/external swaggerapi/swagger-editor
```

Note:
- Errors like `Semantic error at paths./commands/edit/{commandId}.json` can be ignored if they are triggered because of a path value like {commandId}.
- Copy the content of the edited index.yaml to the original file in your IDE to save your changes persistent


#### Start setup
```
docker start swagger-editor swagger-ui
```

#### Stop setup
```
docker stop swagger-editor swagger-ui
```

#### Remove setup
```
docker rm swagger-editor swagger-ui
```


### Developing process (hints)

1. Start the swagger-editor docker container as described with your custom repository path
2. Start the nginx docker container as described with your custom repository path
3. Open the repository in your IDE
4. Copy the content of the index.yaml in the swagger-editor web console
5. Build a new section (e.g. services/newfeature.json) in the index.yaml in the swagger-editor web console
6. After finishing the section (if it works), add the new section to the "real" index.yaml in your IDE. Replace the section contents with a new $ref url.
7. If you created a new section, create a new file in the "external" folder with the name of your section and past the contents. (see following scheme example)
8. If your section already exists, add your contents to the existing section file in the "external" folder. (see following scheme example)
9. Save the files and validate in the swagger-ui that your changes are working

#### You can not just Copy & Past the contents! Preserve the scheme of the existing section files! Raw example:
```
requests:
  existingfeature:
    post:
    		..........
  newfeature:
    get:
    		..........

components:
  schemas:
    newfeatureResponse:
      ...........
```



### Webserver adjustments (nginx)
Add the following lines to the webserver configuration of an openITCOCKPIT 4 instance.

```
add_header Access-Control-Allow-Origin "*";
add_header Access-Control-Allow-Methods "GET, POST, DELETE, PUT, PATCH, OPTIONS";
add_header Access-Control-Allow-Headers "Content-Type, Authorization";

if ($request_method = OPTIONS ) {
    return 200;
}
```

### Build custom swagger editor docker image

If [https://github.com/swagger-api/swagger-editor/pull/2072](https://github.com/swagger-api/swagger-editor/pull/2072) is merged, this custom image is not longer required

Start command with custom docker container:
`docker run -d -p 81:8080 -e SWAGGER_FILE=/usr/share/nginx/html/oitc/index.yaml -v $PWD:/usr/share/nginx/html/oitc -v $PWD/external:/usr/share/nginx/html/external --name swagger-editor srvitsmdrone01.master.dns:5000/swagger-editor`

Start command with original docker container (not working!):
`docker run -d -p 81:8080 -e SWAGGER_FILE=/usr/share/nginx/html/oitc/index.yaml -v $PWD:/usr/share/nginx/html/oitc -v $PWD/external:/usr/share/nginx/html/external --name swagger-editor swaggerapi/swagger-editor`


```
git clone -b envvars https://github.com/codeasashu/swagger-editor.git
cd swagger-editor
npm install
npm run build
docker build -t srvitsmdrone01.master.dns:5000/swagger-editor .
docker push srvitsmdrone01.master.dns:5000/swagger-editor
```
