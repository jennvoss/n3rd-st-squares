(function($) {

    // Apigee credentials
    var apigeeClient = new Apigee.Client({
        orgName: 'jvoss', // Your organization name. You'll find this in the admin portal.
        appName: 'n3rd-st-squares', // Your App Services app name. It's in the admin portal.
        logging: false, // optional - turn on logging, off by default
        buildCurl: false // optional - log network calls in the console, off by default
    }),
    apigeeGetURL = 'https://api.usergrid.com/' + apigeeClient.orgName + '/' + apigeeClient.appName + '/';


    function createAccount() {
        var getUsers = $.Deferred();

        // query apigee for a list of all usernames
        // returns an array for each user entity with the username value at 0
        $.get(apigeeGetURL + 'users?ql=select%20username')
            .done(function(response) {
                var users = response.list,
                    usernames = [],
                    user, i;

                // consolidate the users list into a single array of only the username values
                for (i = 0; i < users.length; i++) {
                    user = users[i];
                    usernames.push(user[0]);
                }

                // resolve the getUsers deferred object with the list of usernames
                getUsers.resolve(usernames);
            });

        // add new user
        function addUser() {
            // Variable to collect data to send with the request.
            // password, email and name are optional for the user entity, but required for the signup method
            // If you do not want these set in your user entity, set their values to null
            var userName = $("#user_name").val(), // TODO: make sure the userName value is unique.
                password = null,
                email = null,
                name = null;

            getUsers.done(function(users) {
                // validate the username
                if ($.inArray(userName, users) >= 0) {
                    // username already exists
                    console.log('username is taken');
                    return;
                }

                // Call an SDK method to create a new user with data collected from the form.
                apigeeClient.signup(userName, password, email, name, function (error, entity, data) {
                    if (error) {
                        var message = "Unable to add a user. " + data;
                        apigeeClient.logError({tag:"addUser", logMessage:message});
                    } else {
                        // User was added successfully
                        console.log('user successfully added');
                    }
                });
            });
        }

        // bind events to the add user form
        $('#frm_add_user').submit(function(e) {
            e.preventDefault();
            if ($("#user_name").val()) {
                addUser();
            } else {
                console.log('please enter a username');
            }
        });
    }


$(document).ready(function() {
    createAccount();
});

})(jQuery);
