var app = angular.module('flapperNews', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts',{
      url:'/posts/{id}',
      templateUrl:'/posts.html',
      controller:'PostsCtrl'
    });

  $urlRouterProvider.otherwise('home');}
]);

app.factory('posts', [function(){
  var o={
    posts: []
  };
  return o;
}]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts){
    $scope.post=posts.posts[$stateParams.id];
    $scope.addComment=function(){
      if($scope.body===''){
        return;
      }
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body='';
    };
  }
]);

app.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts){
    $scope.posts = [
      {title: 'post 1', upvotes: 5},
      {title: 'post 2', upvotes: 2},
      {title: 'post 3', upvotes: 15},
      {title: 'post 4', upvotes: 9},
      {title: 'post 5', upvotes: 4}
    ];
    //Une fois la factory remplie, on l'ajoute au scope afin de pouvoir s'en servir convenablement. Le lien est effectué de manière référentiel. (pointeur)
    $scope.posts=posts.posts;
    $scope.test="Hello world!";
    $scope.addPost = function(){
      if(!$scope.title || $scope.title===''){
        return;
      }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments:[
          {author:'Joe', body:'Cool post !', upvotes: 0},
          {author:'Bob', body:'It sucks !',upvotes: 0}
        ]
      });
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function(post){
      post.upvotes += 1;
    };
  }
]);
