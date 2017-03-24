angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})


.factory('Connexion', function($http) { 

 return {
    postAsync: function(data) {
       return $http.post('http://carbillet.net/api-digitalGrenoble/credentials/',data)
         .then(function(response) {
            return response;
          });
  
    },
    putAsync: function(data) {
       return $http.put('http://carbillet.net/api-digitalGrenoble/users/',data)
         .then(function(response) {
            return response;
          });
  
    },
    getAsync: function(data) {
       return $http.get('http://carbillet.net/api-digitalGrenoble/users/')
        .then(function (response) {
          return response;
        });
    },
    getOneAsync: function(id) {
      return $http.get('http://carbillet.net/api-digitalGrenoble/users/')
        .then(function(response) {
          for (var i = 0; i < response.data.users.length; i++) {
            if (response.data.users[i].idUser === id) {
              return response.data.users[i];
            }
          }
          return null;
        });
    }
  }
});
