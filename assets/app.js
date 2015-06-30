angular.module("app",["ngRoute","ngAnimate"]),angular.module("app").controller("ApplicationCtrl",["$scope","$rootScope","UserSvc",function(t,e,n){window.localStorage.token&&n.getUser().then(function(e){t.$emit("userLoggedIn",e.data)}),t.$on("userLoggedIn",function(e,n){t.currentUser=n})}]),angular.module("app").controller("LoginCtrl",["$scope","UserSvc",function(t,e){t.login=function(n,o){e.login(n,o).then(function(e){t.$emit("userLoggedIn",e.data),window.location.href="#/"},function(e){t.loginValidation="Incorrect username & password combination"})},t.logout=function(){e.logout()}}]),angular.module("app").controller("PostsCtrl",["$scope","$http","PostsService",function(t,e,n){t.posts=[],t.addPost=function(){var e=CKEDITOR.instances.editor1.getData();e&&n.send({body:e,title:t.postTitle}).success(function(e){t.postBody=null,CKEDITOR.instances.editor1.setData(""),t.postTitle=null})},t.init_ckedit=function(){CKEDITOR.replace("editor1")},t.$on("ws:new_post",function(e,n){n=n[0],t.$apply(function(){t.posts.unshift(n),t.paginate()})}),t.$on("$viewContentLoaded",function(){}),t.currentPage=1,t.postsPerPage=5,t.prevPage=function(){t.currentPage>1&&(t.currentPage--,t.paginate())},t.nextPage=function(){t.currentPage<t.posts.length/t.postsPerPage&&(t.currentPage++,t.paginate())},t.setPage=function(e){t.currentPage=e,t.paginate()},t.range=function(t){return new Array(t)},t.paginate=function(){t.pagedPosts=[],t.pages=Math.ceil(t.posts.length/t.postsPerPage),t.numberOfPages=function(){return Math.ceil(t.posts.length/t.postsPerPage)};var e=(t.currentPage-1)*t.postsPerPage,n=e+t.postsPerPage;t.pagedPosts=t.posts.slice(e,n)},t.$watchGroup(["search.$","search._author.username","search.title","search.date",,"search.title"],function(){t.paginate()}),n.get().success(function(e){t.posts=e,t.paginate()})}]).filter("output_html",["$sce",function(t){return function(e){return t.trustAsHtml(e)}}]),angular.module("app").service("PostsService",["$http",function(t){this.get=function(){return t.get("/api/posts")},this.send=function(e){return t.post("/api/posts",e)}}]),angular.module("app").controller("RegisterCtrl",["$scope","UserSvc",function(t,e){t.register=function(n,o,r){return o!=r?void(t.validationMessage="Your passwords did not match."):void e.register(n,o)}}]),angular.module("app").config(["$routeProvider",function(t){t.when("/",{controller:"PostsCtrl",templateUrl:"posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"}).when("/logout",{controller:"LoginCtrl",templateUrl:"logout.html"})}]),angular.module("app").service("UserSvc",["$http",function(t){var e=this;e.getUser=function(){return t.defaults.headers.common["X-Auth"]=window.localStorage.token,t.get("/api/users").then(function(t){return t})},e.login=function(n,o){return t.post("/api/sessions",{username:n,password:o}).then(function(n){return window.localStorage.token=n.data,t.defaults.headers.common["X-Auth"]=n.data,e.getUser()})},e.register=function(n,o,r){return t.post("/api/users",{username:n,password:o}).then(function(t){return e.login(n,o).then(function(){window.location.href="/"})})},e.logout=function(){window.localStorage.removeItem("token"),window.location.href="/"}}]),angular.module("app").run(["$rootScope","$timeout","$window",function(t,e,n){!function o(){var r="ws://"+n.location.host,a=new WebSocket(r);a.onopen=function(){},a.onclose=function(t){e(o,1e4)},a.onmessage=function(e){var n=JSON.parse(e.data),o="ws:"+n.topic,r=n.data;t.$broadcast(o,r)}}()}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uQ3RybC5qcyIsImxvZ2luQ3J0bC5qcyIsInBvc3RzQ3RybC5qcyIsInBvc3RzU2VydmljZS5qcyIsInJlZ2lzdHJhdGlvbkN0cmwuanMiLCJyb3V0ZXMuanMiLCJ1c2VyU2VydmljZS5qcyIsIndlYnNvY2tldHMuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCIkcm9vdFNjb3BlIiwiVXNlclN2YyIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsInRva2VuIiwiZ2V0VXNlciIsInRoZW4iLCJyZXNwb25zZSIsIiRlbWl0IiwiZGF0YSIsIiRvbiIsImV2ZW50IiwidXNlciIsImN1cnJlbnRVc2VyIiwibG9naW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwibG9jYXRpb24iLCJocmVmIiwiZXJyb3IiLCJsb2dpblZhbGlkYXRpb24iLCJsb2dvdXQiLCIkaHR0cCIsIlBvc3RzU2VydmljZSIsInBvc3RzIiwiYWRkUG9zdCIsImNrZWRpdG9yX2NvbnRlbnQiLCJDS0VESVRPUiIsImluc3RhbmNlcyIsImVkaXRvcjEiLCJnZXREYXRhIiwic2VuZCIsImJvZHkiLCJ0aXRsZSIsInBvc3RUaXRsZSIsInN1Y2Nlc3MiLCJwb3N0IiwicG9zdEJvZHkiLCJzZXREYXRhIiwiaW5pdF9ja2VkaXQiLCJyZXBsYWNlIiwiXyIsIiRhcHBseSIsInVuc2hpZnQiLCJwYWdpbmF0ZSIsImN1cnJlbnRQYWdlIiwicG9zdHNQZXJQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImxlbmd0aCIsInNldFBhZ2UiLCJwYWdlX251bWJlciIsInJhbmdlIiwibiIsIkFycmF5IiwicGFnZWRQb3N0cyIsInBhZ2VzIiwiTWF0aCIsImNlaWwiLCJudW1iZXJPZlBhZ2VzIiwiYmVnaW4iLCJlbmQiLCJzbGljZSIsIiR3YXRjaEdyb3VwIiwiZ2V0IiwiZmlsdGVyIiwiJHNjZSIsInZhbCIsInRydXN0QXNIdG1sIiwic2VydmljZSIsInRoaXMiLCJyZWdpc3RlciIsInBhc3N3b3JkX2NvbmZpcm0iLCJ2YWxpZGF0aW9uTWVzc2FnZSIsImNvbmZpZyIsIiRyb3V0ZVByb3ZpZGVyIiwid2hlbiIsInRlbXBsYXRlVXJsIiwic3ZjIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwicmVtb3ZlSXRlbSIsInJ1biIsIiR0aW1lb3V0IiwiJHdpbmRvdyIsImNvbm5lY3QiLCJob3N0IiwiY29ubmVjdGlvbiIsIldlYlNvY2tldCIsIm9ub3BlbiIsIm9uY2xvc2UiLCJlIiwib25tZXNzYWdlIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSIsIm5hbWUiLCJ0b3BpYyIsIiRicm9hZGNhc3QiXSwibWFwcGluZ3MiOiJBQUNBQSxRQUFBQyxPQUFBLE9BQUEsVUFBQSxjQ0RBRCxRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsbUJBQUEsU0FBQSxhQUFBLFVBQUEsU0FBQUMsRUFBQUMsRUFBQUMsR0FPQUMsT0FBQUMsYUFBQUMsT0FDQUgsRUFBQUksVUFDQUMsS0FBQSxTQUFBQyxHQUNBUixFQUFBUyxNQUFBLGVBQUFELEVBQUFFLFFBSUFWLEVBQUFXLElBQUEsZUFBQSxTQUFBQyxFQUFBQyxHQUNBYixFQUFBYyxZQUFBRCxPQ2hCQWhCLFFBQUFDLE9BQUEsT0FDQUMsV0FBQSxhQUFBLFNBQUEsVUFBQSxTQUFBQyxFQUFBRSxHQUNBRixFQUFBZSxNQUFBLFNBQUFDLEVBQUFDLEdBQ0FmLEVBQUFhLE1BQUFDLEVBQUFDLEdBQ0FWLEtBQUEsU0FBQUMsR0FDQVIsRUFBQVMsTUFBQSxlQUFBRCxFQUFBRSxNQUNBUCxPQUFBZSxTQUFBQyxLQUFBLE1BRUEsU0FBQUMsR0FDQXBCLEVBQUFxQixnQkFBQSwrQ0FLQXJCLEVBQUFzQixPQUFBLFdBQ0FwQixFQUFBb0IsYUNmQXpCLFFBQUFDLE9BQUEsT0FDQUMsV0FBQSxhQUFBLFNBQUEsUUFBQSxlQUFBLFNBQUFDLEVBQUF1QixFQUFBQyxHQUNBeEIsRUFBQXlCLFNBQ0F6QixFQUFBMEIsUUFBQSxXQUNBLEdBQUFDLEdBQUFDLFNBQUFDLFVBQUFDLFFBQUFDLFNBQ0FKLElBQ0FILEVBQUFRLE1BQ0FDLEtBQUFOLEVBQ0FPLE1BQUFsQyxFQUFBbUMsWUFFQUMsUUFBQSxTQUFBQyxHQU1BckMsRUFBQXNDLFNBQUEsS0FDQVYsU0FBQUMsVUFBQUMsUUFBQVMsUUFBQSxJQUNBdkMsRUFBQW1DLFVBQUEsUUFLQW5DLEVBQUF3QyxZQUFBLFdBQ0FaLFNBQUFhLFFBQUEsWUFHQXpDLEVBQUFXLElBQUEsY0FBQSxTQUFBK0IsRUFBQUwsR0FDQUEsRUFBQUEsRUFBQSxHQUNBckMsRUFBQTJDLE9BQUEsV0FDQTNDLEVBQUF5QixNQUFBbUIsUUFBQVAsR0FDQXJDLEVBQUE2QyxlQUlBN0MsRUFBQVcsSUFBQSxxQkFBQSxjQUtBWCxFQUFBOEMsWUFBQSxFQUNBOUMsRUFBQStDLGFBQUEsRUFFQS9DLEVBQUFnRCxTQUFBLFdBQ0FoRCxFQUFBOEMsWUFBQSxJQUNBOUMsRUFBQThDLGNBQ0E5QyxFQUFBNkMsYUFJQTdDLEVBQUFpRCxTQUFBLFdBQ0FqRCxFQUFBOEMsWUFBQTlDLEVBQUF5QixNQUFBeUIsT0FBQWxELEVBQUErQyxlQUNBL0MsRUFBQThDLGNBQ0E5QyxFQUFBNkMsYUFJQTdDLEVBQUFtRCxRQUFBLFNBQUFDLEdBQ0FwRCxFQUFBOEMsWUFBQU0sRUFDQXBELEVBQUE2QyxZQUlBN0MsRUFBQXFELE1BQUEsU0FBQUMsR0FDQSxNQUFBLElBQUFDLE9BQUFELElBR0F0RCxFQUFBNkMsU0FBQSxXQUVBN0MsRUFBQXdELGNBQ0F4RCxFQUFBeUQsTUFBQUMsS0FBQUMsS0FBQTNELEVBQUF5QixNQUFBeUIsT0FBQWxELEVBQUErQyxjQUVBL0MsRUFBQTRELGNBQUEsV0FDQSxNQUFBRixNQUFBQyxLQUFBM0QsRUFBQXlCLE1BQUF5QixPQUFBbEQsRUFBQStDLGNBR0EsSUFBQWMsSUFBQTdELEVBQUE4QyxZQUFBLEdBQUE5QyxFQUFBK0MsYUFDQWUsRUFBQUQsRUFBQTdELEVBQUErQyxZQUVBL0MsR0FBQXdELFdBQUF4RCxFQUFBeUIsTUFBQXNDLE1BQUFGLEVBQUFDLElBR0E5RCxFQUFBZ0UsYUFBQSxXQUFBLDBCQUFBLGVBQUEsY0FBQSxDQUFBLGdCQUFBLFdBRUFoRSxFQUFBNkMsYUFHQXJCLEVBQUF5QyxNQUNBN0IsUUFBQSxTQUFBWCxHQUNBekIsRUFBQXlCLE1BQUFBLEVBQ0F6QixFQUFBNkMsZ0JBS0FxQixPQUFBLGVBQUEsT0FBQSxTQUFBQyxHQUNBLE1BQUEsVUFBQUMsR0FDQSxNQUFBRCxHQUFBRSxZQUFBRCxPQ2pHQXZFLFFBQUFDLE9BQUEsT0FDQXdFLFFBQUEsZ0JBQUEsUUFBQSxTQUFBL0MsR0FDQWdELEtBQUFOLElBQUEsV0FDQSxNQUFBMUMsR0FBQTBDLElBQUEsZUFFQU0sS0FBQXZDLEtBQUEsU0FBQUssR0FDQSxNQUFBZCxHQUFBYyxLQUFBLGFBQUFBLE9DTkF4QyxRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsZ0JBQUEsU0FBQSxVQUFBLFNBQUFDLEVBQUFFLEdBQ0FGLEVBQUF3RSxTQUFBLFNBQUF4RCxFQUFBQyxFQUFBd0QsR0FDQSxNQUFBeEQsSUFBQXdELE9BQ0F6RSxFQUFBMEUsa0JBQUEscUNBR0F4RSxHQUFBc0UsU0FBQXhELEVBQUFDLE9DUEFwQixRQUFBQyxPQUFBLE9BQ0E2RSxRQUFBLGlCQUFBLFNBQUFDLEdBQ0FBLEVBQ0FDLEtBQUEsS0FBQTlFLFdBQUEsWUFBQStFLFlBQUEsZUFDQUQsS0FBQSxhQUFBOUUsV0FBQSxlQUFBK0UsWUFBQSxrQkFDQUQsS0FBQSxVQUFBOUUsV0FBQSxZQUFBK0UsWUFBQSxlQUNBRCxLQUFBLFdBQUE5RSxXQUFBLFlBQUErRSxZQUFBLG1CQ05BakYsUUFBQUMsT0FBQSxPQUNBd0UsUUFBQSxXQUFBLFFBQUEsU0FBQS9DLEdBQ0EsR0FBQXdELEdBQUFSLElBQ0FRLEdBQUF6RSxRQUFBLFdBRUEsTUFEQWlCLEdBQUF5RCxTQUFBQyxRQUFBQyxPQUFBLFVBQUEvRSxPQUFBQyxhQUFBQyxNQUNBa0IsRUFBQTBDLElBQUEsY0FDQTFELEtBQUEsU0FBQUMsR0FDQSxNQUFBQSxNQUdBdUUsRUFBQWhFLE1BQUEsU0FBQUMsRUFBQUMsR0FDQSxNQUFBTSxHQUFBYyxLQUFBLGlCQUNBckIsU0FBQUEsRUFBQUMsU0FBQUEsSUFFQVYsS0FBQSxTQUFBNkQsR0FHQSxNQUZBakUsUUFBQUMsYUFBQUMsTUFBQStELEVBQUExRCxLQUNBYSxFQUFBeUQsU0FBQUMsUUFBQUMsT0FBQSxVQUFBZCxFQUFBMUQsS0FDQXFFLEVBQUF6RSxhQUdBeUUsRUFBQVAsU0FBQSxTQUFBeEQsRUFBQUMsRUFBQXdELEdBQ0EsTUFBQWxELEdBQUFjLEtBQUEsY0FDQXJCLFNBQUFBLEVBQUFDLFNBQUFBLElBRUFWLEtBQUEsU0FBQTZELEdBQ0EsTUFBQVcsR0FBQWhFLE1BQUFDLEVBQUFDLEdBQ0FWLEtBQUEsV0FDQUosT0FBQWUsU0FBQUMsS0FBQSxTQUlBNEQsRUFBQXpELE9BQUEsV0FDQW5CLE9BQUFDLGFBQUErRSxXQUFBLFNBQ0FoRixPQUFBZSxTQUFBQyxLQUFBLFFDakNBdEIsUUFBQUMsT0FBQSxPQUNBc0YsS0FBQSxhQUFBLFdBQUEsVUFBQSxTQUFBbkYsRUFBQW9GLEVBQUFDLElBRUEsUUFBQUMsS0FFQSxHQUFBQyxHQUFBLFFBQUFGLEVBQUFwRSxTQUFBc0UsS0FFQUMsRUFBQSxHQUFBQyxXQUFBRixFQUVBQyxHQUFBRSxPQUFBLGFBS0FGLEVBQUFHLFFBQUEsU0FBQUMsR0FFQVIsRUFBQUUsRUFBQSxNQUdBRSxFQUFBSyxVQUFBLFNBQUFELEdBRUEsR0FBQUUsR0FBQUMsS0FBQUMsTUFBQUosRUFBQW5GLE1BRUF3RixFQUFBLE1BQUFILEVBQUFJLE1BQ0F6RixFQUFBcUYsRUFBQXJGLElBR0FULEdBQUFtRyxXQUFBRixFQUFBeEYiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9UaGlzIGZpbGUgbXVzdCBiZSB0aGUgZmlyc3QgaW4gdGhlIGxpc3QgdG8gYmUgY29uY2F0ZW5hdGVkXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgWyduZ1JvdXRlJywgJ25nQW5pbWF0ZSddKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuY29udHJvbGxlcignQXBwbGljYXRpb25DdHJsJyAsIFtcIiRzY29wZVwiLCBcIiRyb290U2NvcGVcIiwgXCJVc2VyU3ZjXCIsIGZ1bmN0aW9uICgkc2NvcGUsICRyb290U2NvcGUsIFVzZXJTdmMpIHtcblx0XHQvKlxuXHRcdElmIHdlIGhhdmUgYSBzdG9yZWQgdG9rZW4sIGdldCB0aGUgdXNlciBpbmZvcm1hdGlvbiBmcm9tIGl0XG5cdFx0YW5kIGVtaXQgdGhlIHVzZXIgbG9nZ2VkaW4gbWVzc2FnZXMgaW4gb3JkZXIgdG8gYWxsb3cgdGhlIFVJIHRvIFxuXHRcdGluZGljYXRlIHRvIHRoZSB1c2VyIHRoYXQgdGhleSB3ZXJlIGxvZ2dlZCBpblxuXHRcdCovXG5cdFx0XG5cdFx0aWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UudG9rZW4pIHtcblx0XHRcdFVzZXJTdmMuZ2V0VXNlcigpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSl7XG5cdFx0XHRcdFx0JHNjb3BlLiRlbWl0KCd1c2VyTG9nZ2VkSW4nLCByZXNwb25zZS5kYXRhKTtcblx0XHRcdFx0fSlcblx0XHR9XG5cblx0XHQkc2NvcGUuJG9uKCd1c2VyTG9nZ2VkSW4nLCBmdW5jdGlvbihldmVudCwgdXNlcikge1xuXHRcdFx0JHNjb3BlLmN1cnJlbnRVc2VyID0gdXNlcjtcblx0XHR9KVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcgLCBbXCIkc2NvcGVcIiAsIFwiVXNlclN2Y1wiICwgZnVuY3Rpb24gKCRzY29wZSwgVXNlclN2Yykge1xuXHRcdCRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcblx0XHRcdFVzZXJTdmMubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAocmVzcG9uc2Upe1xuXHRcdFx0XHRcdCRzY29wZS4kZW1pdCgndXNlckxvZ2dlZEluJywgcmVzcG9uc2UuZGF0YSk7XG5cdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSAnIy8nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmN0aW9uKGVycm9yKXtcblx0XHRcdFx0ICAkc2NvcGUubG9naW5WYWxpZGF0aW9uID0gJ0luY29ycmVjdCB1c2VybmFtZSAmIHBhc3N3b3JkIGNvbWJpbmF0aW9uJztcblx0XHRcdFx0fSlcblxuXHRcdH1cblxuXHRcdCRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRVc2VyU3ZjLmxvZ291dCgpXG5cdFx0fVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmNvbnRyb2xsZXIoJ1Bvc3RzQ3RybCcsIFtcIiRzY29wZVwiICwgXCIkaHR0cFwiLCBcIlBvc3RzU2VydmljZVwiLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgUG9zdHNTZXJ2aWNlKSB7XG5cdFx0JHNjb3BlLnBvc3RzID0gW107XG5cdFx0JHNjb3BlLmFkZFBvc3QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY2tlZGl0b3JfY29udGVudCA9IENLRURJVE9SLmluc3RhbmNlcy5lZGl0b3IxLmdldERhdGEoKTtcblx0XHRcdGlmIChja2VkaXRvcl9jb250ZW50KSB7XG5cdFx0XHRcdFBvc3RzU2VydmljZS5zZW5kKHtcblx0XHRcdFx0XHRib2R5OiBja2VkaXRvcl9jb250ZW50LFxuXHRcdFx0XHRcdHRpdGxlOiAkc2NvcGUucG9zdFRpdGxlXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5zdWNjZXNzKGZ1bmN0aW9uIChwb3N0KSB7XG5cdFx0XHRcdFx0Lypcblx0XHRcdFx0XHQvL1JlbW92ZWQgYXMgd2Vic29ja2V0IGJyb2FkY2FzdCB3b3VsZCBjYXVzZSB0aGUgcG9zdCB0byBhcHBlYXIgZHVwbGljYXRlZCBvbiB0aGUgYnJvd3NlciB0aGF0IGl0IHdhcyBwb3N0ZWQgZnJvbSBcblx0XHRcdFx0XHQvL2FzIGJvdGggb2YgdGhlIGZ1bmN0aW9ucyB3b3VsZCBnZXQgZXhlY3V0ZWQgYmVjYXVzZSB0aGUgY2xpZW50IHdobyBzZW5kcyB0aGUgcG9zdCB3b3VsZCBzdGlsbCByZWNpZXZlIHRoZSB3ZWJzb2NrZXRzIGJyb2FkY2FzdCBiYWNrIGZyb20gdGhlIHNlcnZlciAgXG5cdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHQvLyRzY29wZS5wb3N0cy51bnNoaWZ0KHBvc3QpOyBcblx0XHRcdFx0XHQkc2NvcGUucG9zdEJvZHkgPSBudWxsO1xuXHRcdFx0XHRcdENLRURJVE9SLmluc3RhbmNlcy5lZGl0b3IxLnNldERhdGEoJycpO1xuXHRcdFx0XHRcdCRzY29wZS5wb3N0VGl0bGUgPSBudWxsO1xuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdCRzY29wZS5pbml0X2NrZWRpdCA9IGZ1bmN0aW9uICgpIHtcblx0XHQgICAgQ0tFRElUT1IucmVwbGFjZSgnZWRpdG9yMScpO1xuXHRcdH1cblxuXHRcdCRzY29wZS4kb24oJ3dzOm5ld19wb3N0JywgZnVuY3Rpb24oXywgcG9zdCkge1xuXHRcdFx0cG9zdCA9IHBvc3RbMF07XG5cdFx0XHQkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JHNjb3BlLnBvc3RzLnVuc2hpZnQocG9zdCk7XG5cdFx0XHRcdCRzY29wZS5wYWdpbmF0ZSgpO1xuXHRcdFx0fSlcblx0XHR9KVxuXG5cdFx0JHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24oKXtcblx0XHRcdC8vdGhlIHBhZ2UgaXMgcmVhZHlcblx0XHRcdC8vYWxlcnQoXCJmb29cIik7XG5cdFx0fSk7XG5cblx0XHQkc2NvcGUuY3VycmVudFBhZ2UgPSAxO1xuXHRcdCRzY29wZS5wb3N0c1BlclBhZ2UgPSA1O1xuXG5cdFx0JHNjb3BlLnByZXZQYWdlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICgkc2NvcGUuY3VycmVudFBhZ2UgPiAxKSB7XG5cdCAgICAgICAgICAgICRzY29wZS5jdXJyZW50UGFnZS0tO1xuXHQgICAgICAgICAgICAkc2NvcGUucGFnaW5hdGUoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuICAgIFxuXHQgICAgJHNjb3BlLm5leHRQYWdlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICgkc2NvcGUuY3VycmVudFBhZ2UgPCAkc2NvcGUucG9zdHMubGVuZ3RoLyRzY29wZS5wb3N0c1BlclBhZ2UpIHtcblx0ICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRQYWdlKys7XG5cdCAgICAgICAgICAgICRzY29wZS5wYWdpbmF0ZSgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICBcblx0ICAgICRzY29wZS5zZXRQYWdlID0gZnVuY3Rpb24gKHBhZ2VfbnVtYmVyKSB7XG5cdCAgICAgICAgJHNjb3BlLmN1cnJlbnRQYWdlID0gcGFnZV9udW1iZXI7XG5cdCAgICAgICAgJHNjb3BlLnBhZ2luYXRlKCk7XG5cdCAgICB9O1xuXG5cdCAgICAvL1RoaXMgd2F5IEkgY2FuIGRvOiAgXCI8bGkgbmctcmVwZWF0PVwibiBpbiByYW5nZShwYWdlcykgdHJhY2sgYnkgJGluZGV4XCI+XCIgYW5kIHNvIEkgY2FuIGRpc3BsYXkgYXMgbWFueSBpdGVtcyBhcyB0aGUgdmFsdWUgb2YgYSBudW1iZXIgYXMgdGhpcyByZXR1cm5zIGFuIGFycmF5IG9mIHRoYXQgbGVuZ2h0XG5cdCAgICAkc2NvcGUucmFuZ2UgPSBmdW5jdGlvbihuKSB7XG4gICAgICAgIFx0cmV0dXJuIG5ldyBBcnJheShuKTtcbiAgICBcdH07XG5cblx0XHQkc2NvcGUucGFnaW5hdGUgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0JHNjb3BlLnBhZ2VkUG9zdHMgPSBbXTtcblx0XHRcdCRzY29wZS5wYWdlcyA9IE1hdGguY2VpbCgkc2NvcGUucG9zdHMubGVuZ3RoLyRzY29wZS5wb3N0c1BlclBhZ2UpO1xuXG5cdFx0XHQkc2NvcGUubnVtYmVyT2ZQYWdlcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIE1hdGguY2VpbCgkc2NvcGUucG9zdHMubGVuZ3RoIC8gJHNjb3BlLnBvc3RzUGVyUGFnZSk7XG5cdFx0XHR9O1xuXG5cdFx0XHR2YXIgYmVnaW4gPSAoKCRzY29wZS5jdXJyZW50UGFnZSAtMSApICogJHNjb3BlLnBvc3RzUGVyUGFnZSk7XG5cdFx0XHR2YXIgZW5kID0gYmVnaW4gKyAkc2NvcGUucG9zdHNQZXJQYWdlO1xuXG5cdFx0XHQkc2NvcGUucGFnZWRQb3N0cyA9ICRzY29wZS5wb3N0cy5zbGljZShiZWdpbiwgZW5kKTtcblx0XHR9XG5cblx0XHQkc2NvcGUuJHdhdGNoR3JvdXAoW1wic2VhcmNoLiRcIiwgXCJzZWFyY2guX2F1dGhvci51c2VybmFtZVwiICwgXCJzZWFyY2gudGl0bGVcIiAsIFwic2VhcmNoLmRhdGVcIiwsIFwic2VhcmNoLnRpdGxlXCJdLCBmdW5jdGlvbigpIHtcblx0XHRcdC8vYWxlcnQoJ3BhZ2luYXRpbmcnKTtcblx0XHRcdCRzY29wZS5wYWdpbmF0ZSgpO1xuXHRcdH0pO1xuXG5cdFBvc3RzU2VydmljZS5nZXQoKVxuXHRcdC5zdWNjZXNzKGZ1bmN0aW9uIChwb3N0cykge1xuXHRcdFx0JHNjb3BlLnBvc3RzID0gcG9zdHM7XG5cdFx0XHQkc2NvcGUucGFnaW5hdGUoKTtcblx0XHR9KVxuXG5cdH1dKVxuXG5cdC5maWx0ZXIoJ291dHB1dF9odG1sJywgW1wiJHNjZVwiLCBmdW5jdGlvbiAoJHNjZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbih2YWwpIHtcblx0ICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbCh2YWwpO1xuXHQgICAgfTtcblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5zZXJ2aWNlKCdQb3N0c1NlcnZpY2UnLCBbXCIkaHR0cFwiICwgZnVuY3Rpb24gKCRodHRwKSB7XG5cdFx0dGhpcy5nZXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3Bvc3RzJyk7XG5cdFx0fVxuXHRcdHRoaXMuc2VuZCA9IGZ1bmN0aW9uIChwb3N0KSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9wb3N0cycsIHBvc3QpO1xuXHRcdH1cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnICwgW1wiJHNjb3BlXCIgLCBcIlVzZXJTdmNcIiAsIGZ1bmN0aW9uICgkc2NvcGUsIFVzZXJTdmMpIHtcblx0XHQkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkLCBwYXNzd29yZF9jb25maXJtKSB7XG5cdFx0XHRpZiAocGFzc3dvcmQgIT0gcGFzc3dvcmRfY29uZmlybSkge1xuXHRcdFx0XHQkc2NvcGUudmFsaWRhdGlvbk1lc3NhZ2UgPSAnWW91ciBwYXNzd29yZHMgZGlkIG5vdCBtYXRjaC4nO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRVc2VyU3ZjLnJlZ2lzdGVyKHVzZXJuYW1lLCBwYXNzd29yZClcblx0XHR9XG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuY29uZmlnKFtcIiRyb3V0ZVByb3ZpZGVyXCIgLGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xuXHRcdCRyb3V0ZVByb3ZpZGVyXG5cdFx0XHQud2hlbignLycgLCB7Y29udHJvbGxlcjogJ1Bvc3RzQ3RybCcsIHRlbXBsYXRlVXJsOiAncG9zdHMuaHRtbCd9KVxuXHRcdFx0LndoZW4oJy9yZWdpc3RlcicgLCB7Y29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCcsIHRlbXBsYXRlVXJsOiAncmVnaXN0ZXIuaHRtbCd9KVxuXHRcdFx0LndoZW4oJy9sb2dpbicgLCB7Y29udHJvbGxlcjogJ0xvZ2luQ3RybCcsIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCd9KVxuXHRcdFx0LndoZW4oJy9sb2dvdXQnICwge2NvbnRyb2xsZXI6ICdMb2dpbkN0cmwnLCB0ZW1wbGF0ZVVybDogJ2xvZ291dC5odG1sJ30pXG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuc2VydmljZSgnVXNlclN2YycsIFtcIiRodHRwXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cdFx0dmFyIHN2YyA9IHRoaXM7XG5cdFx0c3ZjLmdldFVzZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1BdXRoJ10gPSB3aW5kb3cubG9jYWxTdG9yYWdlLnRva2VuXG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3VzZXJzJylcblx0XHRcdC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgXHRcdFx0cmV0dXJuIHJlc3BvbnNlXG4gICAgXHRcdH0pXG5cdFx0fVxuXHRcdHN2Yy5sb2dpbiA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3Nlc3Npb25zJywge1xuXHRcdFx0XHR1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZFxuXHRcdFx0fSlcblx0XHRcdC50aGVuKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZS50b2tlbiA9IHZhbC5kYXRhO1xuXHRcdFx0XHQkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1BdXRoJ10gPSB2YWwuZGF0YVxuXHRcdFx0XHRyZXR1cm4gc3ZjLmdldFVzZXIoKTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHN2Yy5yZWdpc3RlciA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQsIHBhc3N3b3JkX2NvbmZpcm0pIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3VzZXJzJywge1xuXHRcdFx0XHR1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZFxuXHRcdFx0fSlcblx0XHRcdC50aGVuKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdFx0cmV0dXJuIHN2Yy5sb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpXG5cdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmPSAnLyc7XHRcblx0XHRcdFx0XHR9KVxuXHRcdFx0fSlcblx0XHR9XG5cdFx0c3ZjLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKTtcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmPSAnLyc7XG5cdFx0fVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5ydW4oW1wiJHJvb3RTY29wZVwiLCBcIiR0aW1lb3V0XCIgLCBcIiR3aW5kb3dcIiAsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkdGltZW91dCwgJHdpbmRvdykge1xuXHRcblx0KGZ1bmN0aW9uIGNvbm5lY3QoKXtcblx0XHQvL0NyZWF0ZSBhIHdlYnNvY2tldCBjb25uZWN0aW9uIHdpdGggdGhlIHNlcnZlclxuXHRcdHZhciBob3N0ID0gXCJ3czovL1wiICsgJHdpbmRvdy5sb2NhdGlvbi5ob3N0XG5cdFx0ICBcblx0XHR2YXIgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQoaG9zdClcblxuXHRcdGNvbm5lY3Rpb24ub25vcGVuID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnV2Vic29ja2V0IGNvbm5lY3RlZCcpXG5cdFx0fVxuXG5cblx0XHRjb25uZWN0aW9uLm9uY2xvc2UgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnV2Vic29ja2V0IGNsb3NlZC4gVHJ5aW5nIHRvIHJlY29ubmVjdC4uLicpXG5cdFx0XHQkdGltZW91dChjb25uZWN0LCAxMCoxMDAwKTtcblx0XHR9IFxuXG5cdFx0Y29ubmVjdGlvbi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhlKTtcblx0XHRcdHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuXHRcdFx0XG5cdFx0XHR2YXIgbmFtZSA9ICd3czonICsgbWVzc2FnZS50b3BpYztcblx0XHRcdHZhciBkYXRhID0gbWVzc2FnZS5kYXRhO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImJyb2FkY2FzdGluZzogXCIpO1xuXG5cdFx0XHQkcm9vdFNjb3BlLiRicm9hZGNhc3QobmFtZSwgZGF0YSk7XG5cdFx0fVxuXHR9KSgpXG59XSkiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=