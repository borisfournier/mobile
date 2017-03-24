// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngMaps'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  // .state('tab.chats', {
  //     url: '/chats',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/tab-chats.html',
  //         controller: 'ChatsCtrl'
  //       }
  //     }
  //   })
  //   .state('tab.chat-detail', {
  //     url: '/chats/:chatId',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/chat-detail.html',
  //         controller: 'ChatDetailCtrl'
  //       }
  //     }
  //   })

  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // })

  .state('identification', {
    url: '/identification',
    templateUrl: 'templates/tab-identification.html',
    controller: 'IdCtrl'
  })

  .state('tab.deconnexion', {
    url: '/deconnexion',
    views: {
      'tab-deconnexion': {
        templateUrl: 'templates/tab-deconnexion.html',
        controller: 'DeconnectCtrl'
      }
    }
  })

  .state('tab.monProfil', {
    url: '/monProfil',
    views: {
      'tab-monProfil': {
        templateUrl: 'templates/tab-monProfil.html',
        controller: 'MonProfilCtrl'
      }
    },
    params: { 
      user : { 
        lastname: "string",
        name: "string",
        age: "string",
        motto: "string",
        idUser: "string",
        adress: "string",
        phone: "string",
        position: "string"
      }
    }
  })

  .state('tab.profil-modif', {
    url: '/monProfil/profil-modif',
    views: {
      'tab-monProfil': {
        templateUrl: 'templates/tab-modification.html',
        controller: 'ModifProfilCtrl'
      }
    },
    params: { 
      user : { 
        lastname: "string",
        name: "string",
        age: "string",
        motto: "string",
        idUser: "string",
        adress: "string",
        phone: "string",
        position: "string"
      }
    }
  })

  .state('tab.profil', {
    url: '/profil',
    views: {
      'tab-profil': {
        templateUrl: 'templates/tab-profil.html',
        controller: 'ProfilCtrl'
      }
    }
  })

    .state('tab.profil-details', {
    url: '/profil/:profilId',
    views: {
      'tab-profil': {
        templateUrl: 'templates/profil-details.html',
        controller: 'ProfilDetailsCtrl'
      }
    },
    params: { 
      user : { 
        lastname: "string",
        name: "string",
        age: "string",
        motto: "string",
        idUser: "string",
        adress: "string",
        phone: "string",
        position: "string"
      }
    }
  })

  .state('tab.geoloc', {
    url: '/geoloc',
    views: {
      'tab-geoloc': {
        templateUrl: 'templates/tab-geoloc.html',
        controller: 'GeolocCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/identification');
  $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


});
