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
            ui.preauthorizeApiKey("ApiKeyAuth", "d2083e61fee067077ac239b7d89084f31c16a66f5e2908f6f74009492b600d3d90db2c5f6175ff199c31e1adbdcf6cf089ecadaf1c93c776bc19c7f41feb42b58f2637883b1a1273035f0ade592415f5");
        }
    });
    // End Swagger UI call region

    var topbars = document.getElementsByClassName("topbar");
    for(i = 0; i < topbars.length; i++){
        topbars[i].parentNode.removeChild(topbars[i]);
    }

    window.ui = ui
};