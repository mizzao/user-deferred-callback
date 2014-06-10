if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to user-deferred-callback.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
	Meteor.call("print-userId");
    }
  });

    Meteor.startup(function() {
	if( !Meteor.userId() ) {
	    Meteor.insecureUserLogin("luser");
	}
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

    Meteor.methods({
	"print-userId": function() {
	    console.log(Meteor.userId());
	    console.log(Meteor.user());
	    Meteor.defer(function() {
		console.log(Meteor.userId());
		console.log(Meteor.user());	    
	    });
	}
    });
}
