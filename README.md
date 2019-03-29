# openITCOCKPIT JSON API documentation
### Swagger / openAPI usage
#### Helpful links

https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md

https://swagger.io/docs

https://inspector.swagger.io


#### Docker commands
##### Install swagger-editor (required for developing)

```docker pull swaggerapi/swagger-editor```

```docker run -d -p 80:8080 swaggerapi/swagger-editor```


##### Install swagger-ui

```docker pull swaggerapi/swagger-ui```

```docker run -p 80:8080 -e BASE_URL=/swagger-ui -e SWAGGER_JSON=/configs/index.json -v /path/to/repository:/configs swaggerapi/swagger-ui```

browse at: http://localhost/swagger-ui

#### Webserver adjustments (nginx)
Add the following lines to the webserver configuration of a openITCOCKPIT 4 development instance.

```
add_header Access-Control-Allow-Origin "*";
add_header Access-Control-Allow-Methods "GET, POST, DELETE, PUT, PATCH, OPTIONS";
add_header Access-Control-Allow-Headers "Content-Type, Authorization";

if ($request_method = OPTIONS ) {
    return 200;
}
```
