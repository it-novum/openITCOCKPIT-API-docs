window.onload = function(){

    // Begin Swagger UI call region
    const ui = SwaggerUIBundle({
        url: "./index.yaml",
        "dom_id": "#swagger-ui",
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        onComplete: function(){
            // Default API key
            ui.preauthorizeApiKey("ApiKeyAuth", "bcc965e7e782d0ce1d86c5c9dfae7aebbd3587e2f90f7e641e795da7f06706e6904d57de3bd600c9b20627737069fc38c4ffd760f777f877f9b7df050029d3ca1df681d807bec276302235fd7193717b");
        }
    });
    // End Swagger UI call region

    var topbars = document.getElementsByClassName("topbar");
    for(i = 0; i < topbars.length; i++){
        topbars[i].parentNode.removeChild(topbars[i]);
    }

    window.ui = ui
};