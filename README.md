# openITCOCKPIT JSON API documentation

## Swagger / openAPI usage



### Helpful links

https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md

https://swagger.io/docs

https://inspector.swagger.io



### Docker commands

Replace "/path/to/repository" with the real repository path in your system!

Make sure, that the ports 80, 81, 82 are not used yet!


#### Start swagger-editor (required for developing) at http://localhost:80

```
docker run -d -p 80:8080 swaggerapi/swagger-editor
```

#### Start webserver over project repository (required for developing) at http://localhost:81

```
docker run --rm -v /path/to/repository/external:/usr/share/nginx/html:ro -v /path/to/repository/nginx-example.conf:/etc/nginx/conf.d/default.conf:ro -d -p 81:80 nginx
```
Example:

```
docker run --rm -v /home/timo/itc/openITCOCKPIT-API-docs/external:/usr/share/nginx/html:ro -v /home/timo/itc/openITCOCKPIT-API-docs/nginx-example.conf:/etc/nginx/conf.d/default.conf:ro -d -p 81:80 nginx
```


#### Start swagger-ui at http://localhost:82/swagger-ui to see the result

1. Start the nginx docker container as described with your custom repository path
2. Start swagger-ui:

```
docker run -p 82:8080 -e BASE_URL=/swagger-ui -e SWAGGER_JSON=/configs/index.json -v /path/to/repository:/configs swaggerapi/swagger-ui
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
Add the following lines to the webserver configuration of a openITCOCKPIT 4 development instance.

```
add_header Access-Control-Allow-Origin "*";
add_header Access-Control-Allow-Methods "GET, POST, DELETE, PUT, PATCH, OPTIONS";
add_header Access-Control-Allow-Headers "Content-Type, Authorization";

if ($request_method = OPTIONS ) {
    return 200;
}
```

