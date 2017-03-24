angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})



.controller('GeolocCtrl', function($scope, $http, $cordovaGeolocation, Connexion,$location) {  
//geoloc
var posOptions = {timeout: 10000, enableHighAccuracy: false};
$cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.lat  = position.coords.latitude
      $scope.long = position.coords.longitude
      $scope.map = {
      center: [$scope.lat,$scope.long],
      };
      $scope.marker = {
        position: [$scope.lat, $scope.long],
        decimals: 4,
      }
    }, function(err) {
      console.log("erreur de chargement");
    });
   //données de l'api
  Connexion.getAsync()           
  .then(function(response) {
      $scope.users = response.data.users;
      var tab = [];
      $scope.location = function(position) {
      for (var i = 0; i< $scope.users.length ; i ++){
            if (position == $scope.users[i].idUser){
            tab1 = [$scope.users[i].position];
           tab.push(tab1);
            $scope.points = { coords:[tab1,tab]} 
           }
         } 
    };
  });
})

.controller('IdCtrl', function($scope, $location, Connexion) {  
  if ((localStorage.getItem('id') <= 0) || (localStorage.getItem('id') == null) || (localStorage.getItem('id') === "undefined")) {
    $scope.data = {};
    $scope.connect = function () {
      var jsonpost = {
      username: $scope.data.identifiant,
      password: $scope.data.password
      }
      Connexion.postAsync({json:jsonpost})
        .then(function(response) {
            var id = response.data.idUserApi;
            console.log(response.data.statePwdApi);
            if(response.data.statePwdApi==="ok"){
              localStorage.setItem("id", id);
              $location.path("/tab/dash");
            }
          });
    };
  } else {
      $location.path("/tab/dash");  
  }
})

.controller('ProfilCtrl', function($scope, Connexion, $state) {   
  //récupération des données par le service connexion (méthode getasync)
  Connexion.getAsync()           
  .then(function(response) {
    
    $scope.users = response.data.users;

  $scope.profil = function(id) {
    for(i=0 ; response.data.users.length > i ; i++) {
      if(response.data.users[i].idUser == id) {
        var user = response.data.users[i];
        $state.go("tab.profil-details",{profilId:id, 
          user:user });
      }
    }
  };
});        
})

.controller('ProfilDetailsCtrl', function($scope, $stateParams) {  
    var user = $stateParams.user;
    console.log(user.age);
    $scope.user = user;

    $scope.lastname = user.lastname;
    $scope.name =  user.name;
    $scope.age =  user.age;
    $scope.motto = user.motto;
    $scope.adress = user.adress;
    $scope.phone =  user.phone;
    $scope.latitude = user.position.lat;
    $scope.longitude = user.position.lng;
          
})

.controller('MonProfilCtrl', function($scope, $stateParams, $state, Connexion) {  
    Connexion.getOneAsync(localStorage.getItem('id'))
      .then(function(response) {

        var user = response;

        $scope.lastname = user.lastname;
        $scope.avatar = user.avatar;
        $scope.name =  user.name;
        $scope.age =  user.age;
        $scope.motto = user.motto;
        $scope.adress = user.adress;
        $scope.phone =  user.phone;
        $scope.latitude = user.position.lat;
        $scope.longitude = user.position.lng;
        
        $scope.modif = function () {
          $state.go("tab.profil-modif",{profilId:$stateParams.profilId, 
            user:user });
        }
    });    
})


.controller('ModifProfilCtrl', function($scope, $stateParams, $state) {  
    $scope.data = {};
    var user = $stateParams.user;

    $scope.data.adress = user.adress;
    $scope.data.age = user.age;
    $scope.data.phone = user.phone;

    $scope.confirmerModif = function () {
      var jsonpost = {
      idUser: $stateParams.profilId,
      adress: $scope.data.adress,
      age: $scope.data.age,
      phone: $scope.data.phone
      }
      Connexion.putAsync({json:jsonpost})
        .then(function(response) {
          user.age = $scope.data.age;
          user.adress = $scope.data.adress;
          user.phone = $scope.data.phone;

          $state.go("tab.monProfil",{profilId: $stateParams.profilId, user:user}); 
        });
    };
})


.controller('DeconnectCtrl', function($scope,$location) {  
  $scope.disconnect = function () {
    localStorage.removeItem('id');
    $location.path("/identification");
  };
});
