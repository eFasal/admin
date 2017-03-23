'use strict';


    // create the module and name it app    
    var app = angular.module('efasal', ['ui.router','ngRoute','ngMaterial','ngAnimate']);  
app.run(function ($state) {
    $state.go('main');
});
    app.config(
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("main", {
        url:'/main',
        templateUrl: '../public/views/mainvw.html',
        controller: 'mainController'
      })

    .state("projectmgmt", {
        url:'/projectmgmt',
        templateUrl: '../public/views/projectmgmt.html',
        controller: 'projectController'
      })
    .state("projectmgmt.mandi", {
        url:'/mandi',
        templateUrl: '../public/views/projectmgmt-mandi.html',
        controller: 'projectMandiController'
      })
    .state("projectmgmt.crop", {
        url:'/crop',
        templateUrl: '../public/views/projectmgmt-crop.html',
        controller: 'projectController'
      })
    .state("projectmgmt.contact", {
        url:'/contact',
        templateUrl: '../public/views/projectmgmt-contact.html',
        controller: 'projectContactController'
      })
    .state("cropdetails", {
        url:'/cropdetails',
        templateUrl: '../public/views/projectmgmt-cropdetails.html',
        controller: 'cropDetailsController'
      })
    .state("addcrop", {
        url:'/addcrop',
        templateUrl: '../public/views/projectmgmt-addcrop.html',
        controller: 'addCropController'
      })
    .state("editcrop", {
        url:'/editcrop',
        templateUrl: '../public/views/projectmgmt-editcrop.html',
        controller: 'editCropController'
      })
    .state("mandi", {
        url:'/mandi',
        templateUrl: '../public/views/mandi.html',
        controller: 'mandiController'
      })
    .state("about", {
        url:'/about',
        templateUrl: '../public/views/2.html',
        controller: 'salesController'
      });

  }
);
      
      
    // create the controller and inject Angular's $scope    
    app.controller('mainController', function($scope,$mdSidenav,$location) { 
         $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
     $scope.mandiView = function(text) {
        alert(text);
        $location.path('/mandi');
       
    }

    $scope.contactView = function(text) {
        alert(text);
        $location.path('/contact');
       
    }
     function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };

    } 
        // create a message to display in our view    
        $scope.HomeMessage = 'Home Controller Called !!!';  
    }

    );  
      
    app.controller('salesController', function($scope,$location) {  
        $scope.AboutMessage = 'Sales Controller Called !!!';  
        $scope.Aback = function(text) {
        alert(text);
        $location.path('/main'); 
    }
    });  
    /*app.controller('projectMandiController',function($state,$scope,$location,$rootScope,sharedService){
            $scope.mandiMessage = 'mandi Controller Called !!!';
         $state.go('projectmgmt.mandi');
    });*/
    app.controller('projectController', function($state,$scope,$location,$rootScope,sharedService) {  
        $scope.ContactMessage = 'project Controller Called !!!'; 
        $scope.searchCrop   = '';
        $state.go('projectmgmt.crop');
          $scope.croplist = [
    {
        name: 'Orange',
        variety: 'Viriety-X',
        color: '#3F51B5',
        notes: 'California Orange',
        parameters : 
                {
                'a0' : 'mm1',
                'a1' : 'mm2',
                'a3' : 'mm3',
                'a4' : 'mm4'
            }
        
    },
     {
        name: 'Grapes',
        variety: 'Viriety-G',
        color: '#69F0AE',
        notes: 'Goa grapes',
        parameters : 
                {'a0' : 'mm1',
                'a1' : 'mm2'
            }
        
    },
     {
        name: 'Banana',
        variety: 'Viriety-B',
        color: '#4A148C',
        notes: 'Wild Banana',
        parameters : 
                {'a0' : 'mm1',
                'a1' : 'mm2'
            }
        
    },
     {
        name: 'Tomatoes',
        variety: 'Viriety-T',
        color: '#7E57C2',
        notes: 'Green tomatoes',
        parameters: {
                'a0' : 'mm1',
                'a1' : 'mm2'
            },
    },
     {
        name: 'Wheat',
        variety: 'Viriety-W',
        color: '#0097A7',
        notes: 'none'
    },
     {
        name: 'Stroberry',
        variety: 'Viriety-S',
        color: '#1DE9B6',
        notes: 'none'
    }, {
        name: 'Orange',
        variety: 'Viriety-XZ',
        color: '#E65100',
        notes: 'none'
    }
    ]; 
  
   /* $scope.Cropdetails = function(text) {
        alert(text);
        $location.path('/cropdetails'); 
    }*/
     $scope.Addcrop = function(text) {
        alert(text);
        $location.path('/addcrop'); 
    }
   $rootScope.showDetails = function(obj) {
        sharedService.getDetails(obj);
        $rootScope.$on("handleBroadcast", function(){
            $scope.item = sharedService.obj;
            //$state.go('index.projectDetail'); 
            $location.path('/cropdetails');
        });
    }
   
    });

    app.controller('cropDetailsController',function($scope,$location,$rootScope,sharedService){
        $scope.Backtocrop = function(text) {
        alert(text);
        $location.path('/projectmgmt/crop'); 
    }  

    $scope.gotoEdit = function(text) {
        alert(text);
        $location.path('/editcrop'); 
    }

      $rootScope.editDetails = function(obj) {
        sharedService.getDetails(obj);
        $location.path('/editcrop');
        $rootScope.$on("handleBroadcast", function(){
            $scope.item = sharedService.obj;
        });
    } 

      $scope.item = {};
        $rootScope.$on("handleBroadcast", function(){
            $scope.item = sharedService.obj;        
        });
        
        $scope.loadDetails = function() {
            $scope.item = sharedService.obj;
        };
    });

    app.controller('addCropController', function($scope,$location) {  
        $scope.msg = 'add crop msg ...';  
         $scope.Backtocrop = function(text) {
        alert(text);
        $location.path('/projectmgmt/crop'); 
    } 

    $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];
  
  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
  };
    
  $scope.removeChoice = function(item) {
   // var lastItem = $scope.choices.length-1;
    //$scope.choices.splice(lastItem);

    //var index = $scope.choices.indexOf(item);
    var index = $scope.choices.indexOf(item);
    $scope.choices.splice(index,1);
    
  };
 
    });

    app.controller('editCropController', function($scope,$location,$rootScope,sharedService) {  
        $scope.editCropmsg = 'edit fields ...';  

       
      $scope.item = {};
        $rootScope.$on("handleBroadcast", function(){
            $scope.item = sharedService.obj;        
        });
        
        $scope.loadDetails = function() {
            $scope.item = sharedService.obj;
        };

    }); 

    app.controller('footerController', function($scope) {  
        $scope.FooterMessage = 'i m footer !!!';  
    });   

    app.controller('sidenavController', function($scope,$location) {  
        $scope.menuItems = [
        {
        label: 'Project Management',
        link: 'projectmgmt.crop'
    },

    {
        label: 'Sales Management',
        link: 'about'
    },
    
    {
        label: 'Main View',
        link: 'main'
    }
    ];

    $scope.navaClass = function (page) {
        var currentRoute = $location.path().substring(0);
        return page === currentRoute ? 'active' : '';
    };
 
    });   


