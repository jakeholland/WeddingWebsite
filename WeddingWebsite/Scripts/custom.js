Parse.initialize("OC2yZnNrNbBtInQvOyf8dskWuoUliy0SHfjkWBop", "lrSV9WVgeaLbi9yVgm52IU4y8GOo0k3MDhHTJZ9j");
var url = "https://api.mailgun.net/v2/jakeandtaylor.com/lists/wedding@jakeandtaylor.com/members";
var APIKey = "key-6690ae2049949a9b02539f5ab8e96a2a";

function addToMailingList(email, name) {
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'jsonp',
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YXBpOmtleS02NjkwYWUyMDQ5OTQ5YTliMDI1MzlmNWFiOGU5NmEyYQ==");
        },
        data: {
            address: email,
            name: name
        },
        success: function () {
            alert("Success");
        },
        error: function () {
            alert('Failed!');
        },
    });
}

function rsvpEmail(formObj) {
    Parse.Cloud.run('rsvpEmail', formObj, {
        success: function (result) {
            //console.log(result);

            //addToMailingList(formObj.email, formObj.name);

        },
        error: function (error) {
            console.log(error);
        }
    });
};


$(document).ready(function () {
    //Parse.Analytics.track('visited', "111.111.111.111");

    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: true,
        pauseOnHover: true,
        slideshowSpeed: 15000
    });

    $('#rsvpForm')
        .bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'Your name is required.'
                        }
                    }
                },
                numberAttending: {
                    feedbackIcons: 'false',
                    validators: {
                        notEmpty: {
                            message: 'The number attending is required.'
                        }
                    }
                },
                email: {
                    enabled: false,
                    validators: {
                        emailAddress: {
                            message: 'The email must be valid.'
                        }
                    }
                }
            }
        })
    .on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();

        var GuestList = Parse.Object.extend("GuestList");
        var rsvpObject = new GuestList();
        var formObj = {
            name: $('#name').val(),
            guestNames: $('#guestNames').val(),
            numberAttending: $('#numberAttending').val(),
            email: $('#email').val(),
            song: $('#song').val(),
            comments: $('#comments').val()
        };
        rsvpObject.save(formObj).then(function (object) {
            $('#rsvpColumn:input').attr("disabled", true);
            var user = { name: $('#name').val() }
            Parse.Analytics.track('submittedRSVP', user);
            if ($('#email').val().length > 0) {
                rsvpEmail(formObj);
            }
            alert("Thank you for RSVP-ing!");
        }
        );
    })
    //Enable email validation if the user decides to put one in.
    .on('keyup', '[name="email"]', function () {
        var isEmpty = $(this).val() == '';
        $('#rsvpForm')
            .bootstrapValidator('enableFieldValidators', 'email', !isEmpty);

        if ($(this).val().length == 1) {
            $('#rsvpForm').bootstrapValidator('validateField', 'email');
        }
    });
});