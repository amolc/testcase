angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http , $state) {
  console.log('i am in dashctrl');
	$scope.info=function(fa){
    console.log(fa);
    if(fa){
      $http.post('http://localhost:3000/api/addUser', fa).success(function(res, req){
      console.log(res);
        $state.go('edit');  
      }).error(function(err){
        console.log(err);
      });
    }else {
      $state.go('edit');  
    }
      
  }
})

.controller('EditCtrl', function($scope, $http , $state) {
  
        $http.get('http://localhost:3000/api/listUser').success(function(res, req){
        $scope.data=res;
         console.log($scope.data);
      }).error(function(err){
        console.log(err);
      });
      console.log('hellos');

     // Function For Update Records
        $scope.update = function(q){
        console.log('hellos');
        console.log(q);
        $http.post('http://localhost:3000/api/updateuser', q).success(function(res,req){
        console.log(res);
      }).error(function(err){
          console.log(err);
      });

      };

    //Function For Delete Records
       $scope.delete=function(q){
       console.log(" I Delete User");
       console.log(q);
       $http.post('http://localhost:3000/api/deluser' , q).success(function(res,req){
       console.log(res); 
      }).error(function(err){
        console.log(err);
      });
    } ;

})


  .controller('ChatsCtrl', function($scope, Chats) {
      $scope.chats = Chats.all();
      $scope.remove = function(chat) {
      Chats.remove(chat);
    }
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
     $scope.chat = Chats.get($stateParams.chatId);
})

  .controller('AccountCtrl', function($scope) {
     $scope.settings = {
     enableFriends: true
  };
})

.controller('loginCtrl' , function($scope, $http, $state) {
   $scope.loginfo = function(data) {
    if(data == undefined ){
       var alertPopup = $ionicPopup.alert(
       {
        title : 'Please enter a valid email and password .',
       });
     }
     else {
       $scope.creadential = data;
       console.log($scope.creadential);

      $http.post('http://localhost:3000/api/loginuser', $scope.creadential).success(function(res, req){
      console.log(res.username);
      if(res.status == true){
        window.localStorage.setItem('login',true);
        window.localStorage.setItem('username',res.record[0].username);
        window.localStorage.setItem('srno',res.record[0].srno);
         //$state.go('tab.dash');
        $state.go('tab.dash');
      //$state.go('edit');
      //$state.go('./home');
      } else {
       console.log('invalid username'); 
      //  $state.go('/login');
      }
      }).error(function(err){
        console.log(err);
      });
    }
    
    $scope.logout=function()
    {
      console.log("Logout Success");
      window.localStorage.setItem('login',true);
      window.localStorage.setItem('username',res.record[0].username);
      window.localStorage.setItem('srno',res.record[0].srno);
      $state.go('/login');
    }
   }
  
})

    /*//Function For Delete Records
       $scope.delete=function(q){
       console.log(" I Delete User");
       console.log(q);
       $http.post('http://localhost:3000/api/deluser' , q).success(function(res,req){
       console.log(res); 
      }).error(function(err){
        console.log(err);
      });
    //} 

})*/