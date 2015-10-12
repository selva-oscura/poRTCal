  Template.hello.events({
    "click .makeCall": function () {
      var user = this;
      if(user){
        console.log('trying to call',user.profile.peerId);
      }
      var outgoingCall = peer.call(user.profile.peerId, window.localStream);
      window.currentCall = outgoingCall;
      outgoingCall.on('stream', function (remoteStream) {
        window.remoteStream = remoteStream;
        var video = document.getElementById("theirVideo")
        video.src = URL.createObjectURL(remoteStream);
      });
    },
    "click #endCall": function () {
      console.log('click');
      window.currentCall.close();
    }
  });

  Template.hello.helpers({
    users: function () {
      // exclude the currentUser
      var userIds = Presences.find().map(function(presence) {return presence.userId;});
      return Meteor.users.find({_id: {$in: userIds, $ne: Meteor.userId()}});
          // return Meteor.users.find();
    }
  });

  Template.hello.onCreated(function () {
    Meteor.subscribe("presences");
    Meteor.subscribe("users");

    window.peer = new Peer({
      key: 'oa3p00axxzu84cxr',  // change this key
      debug: 3,
      config: {'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
        { url: 'stun:stun1.l.google.com:19302' },
      ]}
    });

    // This event: remote peer receives a call
    peer.on('open', function () {
      $('#myPeerId').text(peer.id);
      var avatar = "avatar"+Math.floor(Math.random()*10);
      // update the current user's profile
      Meteor.users.update({_id: Meteor.userId()}, {
        $set: {
          profile: { peerId: peer.id, avatar:avatar}
        }
      });
    });

    // This event: remote peer receives a call
    peer.on('call', function (incomingCall) {
      window.currentCall = incomingCall;
      incomingCall.answer(window.localStream);
      incomingCall.on('stream', function (remoteStream) {
        window.remoteStream = remoteStream;
        var video = document.getElementById("theirVideo")
        video.src = URL.createObjectURL(remoteStream);
      });
    });

    navigator.getUserMedia = ( navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia );

    // get audio/video
    navigator.getUserMedia({audio:true, video: true}, function (stream) {
      //display video
      var video = document.getElementById("myVideo");
      video.src = URL.createObjectURL(stream);
      window.localStream = stream;
    }, function (error) { console.log(error); }
    );

  });
