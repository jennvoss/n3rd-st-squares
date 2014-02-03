(function($) {

    // Apigee credentials
    var apigeeClient = new Apigee.Client({
        orgName: 'jvoss', // Your organization name. You'll find this in the admin portal.
        appName: 'n3rd-st-squares', // Your App Services app name. It's in the admin portal.
        logging: false, // optional - turn on logging, off by default
        buildCurl: false // optional - log network calls in the console, off by default
    });

})(jQuery);
