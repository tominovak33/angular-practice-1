angular.module("app",["ngRoute"]),angular.module("app").controller("ApplicationCtrl",["$scope","$rootScope","UserSvc",function(o,t,n){window.localStorage.token&&n.getUser().then(function(t){o.$emit("userLoggedIn",t.data)}),o.$on("userLoggedIn",function(t,n){o.currentUser=n})}]),angular.module("app").controller("LoginCtrl",["$scope","UserSvc",function(o,t){o.login=function(n,e){t.login(n,e).then(function(t){o.$emit("userLoggedIn",t.data)},function(t){o.loginValidation="Incorrect username & password combination"})}}]),angular.module("app").controller("PostsCtrl",["$scope","$http","PostsService",function(o,t,n){o.addPost=function(){var t=CKEDITOR.instances.editor1.getData();t&&n.send({body:t}).success(function(t){o.postBody=null})},o.$on("ws:new_post",function(t,n){o.$apply(function(){o.posts.unshift(n)})}),o.$on("$viewContentLoaded",function(){CKEDITOR.replace("editor1"),document.getElementById("post-simple-input").style.display="none"}),n.get().success(function(t){o.posts=t})}]).filter("output_html",["$sce",function(o){return function(t){return o.trustAsHtml(t)}}]),angular.module("app").service("PostsService",["$http",function(o){this.get=function(){return o.get("/api/posts")},this.send=function(t){return o.post("/api/posts",t)}}]),angular.module("app").controller("RegisterCtrl",["$scope","UserSvc",function(o,t){o.register=function(n,e,r){return e!=r?void(o.validationMessage="Your passwords did not match."):void t.register(n,e)}}]),angular.module("app").config(["$routeProvider",function(o){o.when("/",{controller:"PostsCtrl",templateUrl:"posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"})}]),angular.module("app").service("UserSvc",["$http",function(o){var t=this;t.getUser=function(){return o.defaults.headers.common["X-Auth"]=window.localStorage.token,o.get("/api/users").then(function(o){return o})},t.login=function(n,e){return o.post("/api/sessions",{username:n,password:e}).then(function(n){return window.localStorage.token=n.data,o.defaults.headers.common["X-Auth"]=n.data,t.getUser()})},t.register=function(n,e,r){return o.post("/api/users",{username:n,password:e}).then(function(o){return t.login(n,e).then(function(){window.location.href="/"})})},t.logout=function(){window.localStorage.removeItem("token")}}]),angular.module("app").run(["$rootScope","$timeout","$window",function(o,t,n){!function e(){var r="ws://"+n.location.host,s=new WebSocket(r);s.onopen=function(){console.log("Websocket connected")},s.onclose=function(o){console.log("Websocket closed. Trying to reconnect..."),t(e,1e4)},s.onmessage=function(t){console.log(t);var n=JSON.parse(t.data),e="ws:"+n.topic,r=n.data;console.log("broadcasting: "),o.$broadcast(e,r)}}()}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uQ3RybC5qcyIsImxvZ2luQ3J0bC5qcyIsInBvc3RzQ3RybC5qcyIsInBvc3RzU2VydmljZS5qcyIsInJlZ2lzdHJhdGlvbkN0cmwuanMiLCJyb3V0ZXMuanMiLCJ1c2VyU2VydmljZS5qcyIsIndlYnNvY2tldHMuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCIkcm9vdFNjb3BlIiwiVXNlclN2YyIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsInRva2VuIiwiZ2V0VXNlciIsInRoZW4iLCJyZXNwb25zZSIsIiRlbWl0IiwiZGF0YSIsIiRvbiIsImV2ZW50IiwidXNlciIsImN1cnJlbnRVc2VyIiwibG9naW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZXJyb3IiLCJsb2dpblZhbGlkYXRpb24iLCIkaHR0cCIsIlBvc3RzU2VydmljZSIsImFkZFBvc3QiLCJja2VkaXRvcl9jb250ZW50IiwiQ0tFRElUT1IiLCJpbnN0YW5jZXMiLCJlZGl0b3IxIiwiZ2V0RGF0YSIsInNlbmQiLCJib2R5Iiwic3VjY2VzcyIsInBvc3QiLCJwb3N0Qm9keSIsIl8iLCIkYXBwbHkiLCJwb3N0cyIsInVuc2hpZnQiLCJyZXBsYWNlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiZGlzcGxheSIsImdldCIsImZpbHRlciIsIiRzY2UiLCJ2YWwiLCJ0cnVzdEFzSHRtbCIsInNlcnZpY2UiLCJ0aGlzIiwicmVnaXN0ZXIiLCJwYXNzd29yZF9jb25maXJtIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJjb25maWciLCIkcm91dGVQcm92aWRlciIsIndoZW4iLCJ0ZW1wbGF0ZVVybCIsInN2YyIsImRlZmF1bHRzIiwiaGVhZGVycyIsImNvbW1vbiIsImxvY2F0aW9uIiwiaHJlZiIsImxvZ291dCIsInJlbW92ZUl0ZW0iLCJydW4iLCIkdGltZW91dCIsIiR3aW5kb3ciLCJjb25uZWN0IiwiaG9zdCIsImNvbm5lY3Rpb24iLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJjb25zb2xlIiwibG9nIiwib25jbG9zZSIsImUiLCJvbm1lc3NhZ2UiLCJtZXNzYWdlIiwiSlNPTiIsInBhcnNlIiwibmFtZSIsInRvcGljIiwiJGJyb2FkY2FzdCJdLCJtYXBwaW5ncyI6IkFBQ0FBLFFBQUFDLE9BQUEsT0FBQSxZQ0RBRCxRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsbUJBQUEsU0FBQSxhQUFBLFVBQUEsU0FBQUMsRUFBQUMsRUFBQUMsR0FPQUMsT0FBQUMsYUFBQUMsT0FDQUgsRUFBQUksVUFDQUMsS0FBQSxTQUFBQyxHQUNBUixFQUFBUyxNQUFBLGVBQUFELEVBQUFFLFFBSUFWLEVBQUFXLElBQUEsZUFBQSxTQUFBQyxFQUFBQyxHQUNBYixFQUFBYyxZQUFBRCxPQ2hCQWhCLFFBQUFDLE9BQUEsT0FDQUMsV0FBQSxhQUFBLFNBQUEsVUFBQSxTQUFBQyxFQUFBRSxHQUNBRixFQUFBZSxNQUFBLFNBQUFDLEVBQUFDLEdBQ0FmLEVBQUFhLE1BQUFDLEVBQUFDLEdBQ0FWLEtBQUEsU0FBQUMsR0FDQVIsRUFBQVMsTUFBQSxlQUFBRCxFQUFBRSxPQUVBLFNBQUFRLEdBQ0FsQixFQUFBbUIsZ0JBQUEsa0RDUkF0QixRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsYUFBQSxTQUFBLFFBQUEsZUFBQSxTQUFBQyxFQUFBb0IsRUFBQUMsR0FDQXJCLEVBQUFzQixRQUFBLFdBQ0EsR0FBQUMsR0FBQUMsU0FBQUMsVUFBQUMsUUFBQUMsU0FDQUosSUFDQUYsRUFBQU8sTUFDQUMsS0FBQU4sSUFFQU8sUUFBQSxTQUFBQyxHQU1BL0IsRUFBQWdDLFNBQUEsUUFLQWhDLEVBQUFXLElBQUEsY0FBQSxTQUFBc0IsRUFBQUYsR0FDQS9CLEVBQUFrQyxPQUFBLFdBQ0FsQyxFQUFBbUMsTUFBQUMsUUFBQUwsT0FJQS9CLEVBQUFXLElBQUEscUJBQUEsV0FFQWEsU0FBQWEsUUFBQSxXQUNBQyxTQUFBQyxlQUFBLHFCQUFBQyxNQUFBQyxRQUFBLFNBR0FwQixFQUFBcUIsTUFDQVosUUFBQSxTQUFBSyxHQUNBbkMsRUFBQW1DLE1BQUFBLE9BS0FRLE9BQUEsZUFBQSxPQUFBLFNBQUFDLEdBQ0EsTUFBQSxVQUFBQyxHQUNBLE1BQUFELEdBQUFFLFlBQUFELE9DeENBaEQsUUFBQUMsT0FBQSxPQUNBaUQsUUFBQSxnQkFBQSxRQUFBLFNBQUEzQixHQUNBNEIsS0FBQU4sSUFBQSxXQUNBLE1BQUF0QixHQUFBc0IsSUFBQSxlQUVBTSxLQUFBcEIsS0FBQSxTQUFBRyxHQUNBLE1BQUFYLEdBQUFXLEtBQUEsYUFBQUEsT0NOQWxDLFFBQUFDLE9BQUEsT0FDQUMsV0FBQSxnQkFBQSxTQUFBLFVBQUEsU0FBQUMsRUFBQUUsR0FDQUYsRUFBQWlELFNBQUEsU0FBQWpDLEVBQUFDLEVBQUFpQyxHQUNBLE1BQUFqQyxJQUFBaUMsT0FDQWxELEVBQUFtRCxrQkFBQSxxQ0FHQWpELEdBQUErQyxTQUFBakMsRUFBQUMsT0NQQXBCLFFBQUFDLE9BQUEsT0FDQXNELFFBQUEsaUJBQUEsU0FBQUMsR0FDQUEsRUFDQUMsS0FBQSxLQUFBdkQsV0FBQSxZQUFBd0QsWUFBQSxlQUNBRCxLQUFBLGFBQUF2RCxXQUFBLGVBQUF3RCxZQUFBLGtCQUNBRCxLQUFBLFVBQUF2RCxXQUFBLFlBQUF3RCxZQUFBLGtCQ0xBMUQsUUFBQUMsT0FBQSxPQUNBaUQsUUFBQSxXQUFBLFFBQUEsU0FBQTNCLEdBQ0EsR0FBQW9DLEdBQUFSLElBQ0FRLEdBQUFsRCxRQUFBLFdBRUEsTUFEQWMsR0FBQXFDLFNBQUFDLFFBQUFDLE9BQUEsVUFBQXhELE9BQUFDLGFBQUFDLE1BQ0FlLEVBQUFzQixJQUFBLGNBQ0FuQyxLQUFBLFNBQUFDLEdBQ0EsTUFBQUEsTUFHQWdELEVBQUF6QyxNQUFBLFNBQUFDLEVBQUFDLEdBQ0EsTUFBQUcsR0FBQVcsS0FBQSxpQkFDQWYsU0FBQUEsRUFBQUMsU0FBQUEsSUFFQVYsS0FBQSxTQUFBc0MsR0FHQSxNQUZBMUMsUUFBQUMsYUFBQUMsTUFBQXdDLEVBQUFuQyxLQUNBVSxFQUFBcUMsU0FBQUMsUUFBQUMsT0FBQSxVQUFBZCxFQUFBbkMsS0FDQThDLEVBQUFsRCxhQUdBa0QsRUFBQVAsU0FBQSxTQUFBakMsRUFBQUMsRUFBQWlDLEdBQ0EsTUFBQTlCLEdBQUFXLEtBQUEsY0FDQWYsU0FBQUEsRUFBQUMsU0FBQUEsSUFFQVYsS0FBQSxTQUFBc0MsR0FDQSxNQUFBVyxHQUFBekMsTUFBQUMsRUFBQUMsR0FDQVYsS0FBQSxXQUNBSixPQUFBeUQsU0FBQUMsS0FBQSxTQUlBTCxFQUFBTSxPQUFBLFdBQ0EzRCxPQUFBQyxhQUFBMkQsV0FBQSxhQ2hDQWxFLFFBQUFDLE9BQUEsT0FDQWtFLEtBQUEsYUFBQSxXQUFBLFVBQUEsU0FBQS9ELEVBQUFnRSxFQUFBQyxJQUVBLFFBQUFDLEtBRUEsR0FBQUMsR0FBQSxRQUFBRixFQUFBTixTQUFBUSxLQUVBQyxFQUFBLEdBQUFDLFdBQUFGLEVBRUFDLEdBQUFFLE9BQUEsV0FDQUMsUUFBQUMsSUFBQSx3QkFJQUosRUFBQUssUUFBQSxTQUFBQyxHQUNBSCxRQUFBQyxJQUFBLDRDQUNBUixFQUFBRSxFQUFBLE1BR0FFLEVBQUFPLFVBQUEsU0FBQUQsR0FDQUgsUUFBQUMsSUFBQUUsRUFDQSxJQUFBRSxHQUFBQyxLQUFBQyxNQUFBSixFQUFBakUsTUFFQXNFLEVBQUEsTUFBQUgsRUFBQUksTUFDQXZFLEVBQUFtRSxFQUFBbkUsSUFDQThELFNBQUFDLElBQUEsa0JBRUF4RSxFQUFBaUYsV0FBQUYsRUFBQXRFIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vVGhpcyBmaWxlIG11c3QgYmUgdGhlIGZpcnN0IGluIHRoZSBsaXN0IHRvIGJlIGNvbmNhdGVuYXRlZFxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnbmdSb3V0ZSddKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuY29udHJvbGxlcignQXBwbGljYXRpb25DdHJsJyAsIFtcIiRzY29wZVwiLCBcIiRyb290U2NvcGVcIiwgXCJVc2VyU3ZjXCIsIGZ1bmN0aW9uICgkc2NvcGUsICRyb290U2NvcGUsIFVzZXJTdmMpIHtcblx0XHQvKlxuXHRcdElmIHdlIGhhdmUgYSBzdG9yZWQgdG9rZW4sIGdldCB0aGUgdXNlciBpbmZvcm1hdGlvbiBmcm9tIGl0XG5cdFx0YW5kIGVtaXQgdGhlIHVzZXIgbG9nZ2VkaW4gbWVzc2FnZXMgaW4gb3JkZXIgdG8gYWxsb3cgdGhlIFVJIHRvIFxuXHRcdGluZGljYXRlIHRvIHRoZSB1c2VyIHRoYXQgdGhleSB3ZXJlIGxvZ2dlZCBpblxuXHRcdCovXG5cdFx0XG5cdFx0aWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UudG9rZW4pIHtcblx0XHRcdFVzZXJTdmMuZ2V0VXNlcigpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSl7XG5cdFx0XHRcdFx0JHNjb3BlLiRlbWl0KCd1c2VyTG9nZ2VkSW4nLCByZXNwb25zZS5kYXRhKTtcblx0XHRcdFx0fSlcblx0XHR9XG5cblx0XHQkc2NvcGUuJG9uKCd1c2VyTG9nZ2VkSW4nLCBmdW5jdGlvbihldmVudCwgdXNlcikge1xuXHRcdFx0JHNjb3BlLmN1cnJlbnRVc2VyID0gdXNlcjtcblx0XHR9KVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcgLCBbXCIkc2NvcGVcIiAsIFwiVXNlclN2Y1wiICwgZnVuY3Rpb24gKCRzY29wZSwgVXNlclN2Yykge1xuXHRcdCRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcblx0XHRcdFVzZXJTdmMubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAocmVzcG9uc2Upe1xuXHRcdFx0XHRcdCRzY29wZS4kZW1pdCgndXNlckxvZ2dlZEluJywgcmVzcG9uc2UuZGF0YSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmN0aW9uKGVycm9yKXtcblx0XHRcdFx0ICAkc2NvcGUubG9naW5WYWxpZGF0aW9uID0gJ0luY29ycmVjdCB1c2VybmFtZSAmIHBhc3N3b3JkIGNvbWJpbmF0aW9uJztcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuY29udHJvbGxlcignUG9zdHNDdHJsJywgW1wiJHNjb3BlXCIgLCBcIiRodHRwXCIsIFwiUG9zdHNTZXJ2aWNlXCIsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwLCBQb3N0c1NlcnZpY2UpIHtcblx0XHQkc2NvcGUuYWRkUG9zdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBja2VkaXRvcl9jb250ZW50ID0gQ0tFRElUT1IuaW5zdGFuY2VzLmVkaXRvcjEuZ2V0RGF0YSgpO1xuXHRcdFx0aWYgKGNrZWRpdG9yX2NvbnRlbnQpIHtcblx0XHRcdFx0UG9zdHNTZXJ2aWNlLnNlbmQoe1xuXHRcdFx0XHRcdGJvZHk6IGNrZWRpdG9yX2NvbnRlbnRcblx0XHRcdFx0fSlcblx0XHRcdFx0LnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3QpIHtcblx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdC8vUmVtb3ZlZCBhcyB3ZWJzb2NrZXQgYnJvYWRjYXN0IHdvdWxkIGNhdXNlIHRoZSBwb3N0IHRvIGFwcGVhciBkdXBsaWNhdGVkIG9uIHRoZSBicm93c2VyIHRoYXQgaXQgd2FzIHBvc3RlZCBmcm9tIFxuXHRcdFx0XHRcdC8vYXMgYm90aCBvZiB0aGUgZnVuY3Rpb25zIHdvdWxkIGdldCBleGVjdXRlZCBiZWNhdXNlIHRoZSBjbGllbnQgd2hvIHNlbmRzIHRoZSBwb3N0IHdvdWxkIHN0aWxsIHJlY2lldmUgdGhlIHdlYnNvY2tldHMgYnJvYWRjYXN0IGJhY2sgZnJvbSB0aGUgc2VydmVyICBcblx0XHRcdFx0XHQqL1xuXHRcdFx0XHRcdC8vJHNjb3BlLnBvc3RzLnVuc2hpZnQocG9zdCk7IFxuXHRcdFx0XHRcdCRzY29wZS5wb3N0Qm9keSA9IG51bGw7XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0JHNjb3BlLiRvbignd3M6bmV3X3Bvc3QnLCBmdW5jdGlvbihfLCBwb3N0KSB7XG5cdFx0XHQkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JHNjb3BlLnBvc3RzLnVuc2hpZnQocG9zdCk7XG5cdFx0XHR9KVxuXHRcdH0pXG5cblx0XHQkc2NvcGUuJG9uKCckdmlld0NvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpe1xuXHRcdFx0Ly90aGUgcGFnZSBpcyByZWFkeVxuICAgICAgICAgICAgQ0tFRElUT1IucmVwbGFjZSgnZWRpdG9yMScpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3Qtc2ltcGxlLWlucHV0Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHR9KTtcblxuXHRQb3N0c1NlcnZpY2UuZ2V0KClcblx0XHQuc3VjY2VzcyhmdW5jdGlvbiAocG9zdHMpIHtcblx0XHRcdCRzY29wZS5wb3N0cyA9IHBvc3RzO1xuXHRcdH0pXG5cblx0fV0pXG5cblx0LmZpbHRlcignb3V0cHV0X2h0bWwnLCBbXCIkc2NlXCIsIGZ1bmN0aW9uICgkc2NlKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHZhbCkge1xuXHQgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKHZhbCk7XG5cdCAgICB9O1xuXHR9XSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuc2VydmljZSgnUG9zdHNTZXJ2aWNlJywgW1wiJGh0dHBcIiAsIGZ1bmN0aW9uICgkaHR0cCkge1xuXHRcdHRoaXMuZ2V0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnL2FwaS9wb3N0cycpO1xuXHRcdH1cblx0XHR0aGlzLnNlbmQgPSBmdW5jdGlvbiAocG9zdCkge1xuXHRcdFx0cmV0dXJuICRodHRwLnBvc3QoJy9hcGkvcG9zdHMnLCBwb3N0KTtcblx0XHR9XG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuY29udHJvbGxlcignUmVnaXN0ZXJDdHJsJyAsIFtcIiRzY29wZVwiICwgXCJVc2VyU3ZjXCIgLCBmdW5jdGlvbiAoJHNjb3BlLCBVc2VyU3ZjKSB7XG5cdFx0JHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmRfY29uZmlybSkge1xuXHRcdFx0aWYgKHBhc3N3b3JkICE9IHBhc3N3b3JkX2NvbmZpcm0pIHtcblx0XHRcdFx0JHNjb3BlLnZhbGlkYXRpb25NZXNzYWdlID0gJ1lvdXIgcGFzc3dvcmRzIGRpZCBub3QgbWF0Y2guJztcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0VXNlclN2Yy5yZWdpc3Rlcih1c2VybmFtZSwgcGFzc3dvcmQpXG5cdFx0fVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmNvbmZpZyhbXCIkcm91dGVQcm92aWRlclwiICxmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcblx0XHQkcm91dGVQcm92aWRlclxuXHRcdFx0LndoZW4oJy8nICwge2NvbnRyb2xsZXI6ICdQb3N0c0N0cmwnLCB0ZW1wbGF0ZVVybDogJ3Bvc3RzLmh0bWwnfSlcblx0XHRcdC53aGVuKCcvcmVnaXN0ZXInICwge2NvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnLCB0ZW1wbGF0ZVVybDogJ3JlZ2lzdGVyLmh0bWwnfSlcblx0XHRcdC53aGVuKCcvbG9naW4nICwge2NvbnRyb2xsZXI6ICdMb2dpbkN0cmwnLCB0ZW1wbGF0ZVVybDogJ2xvZ2luLmh0bWwnfSlcblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5zZXJ2aWNlKCdVc2VyU3ZjJywgW1wiJGh0dHBcIiwgZnVuY3Rpb24oJGh0dHApIHtcblx0XHR2YXIgc3ZjID0gdGhpcztcblx0XHRzdmMuZ2V0VXNlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdCRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUF1dGgnXSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UudG9rZW5cblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvdXNlcnMnKVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBcdFx0XHRyZXR1cm4gcmVzcG9uc2VcbiAgICBcdFx0fSlcblx0XHR9XG5cdFx0c3ZjLmxvZ2luID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuXHRcdFx0cmV0dXJuICRodHRwLnBvc3QoJy9hcGkvc2Vzc2lvbnMnLCB7XG5cdFx0XHRcdHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKHZhbCkge1xuXHRcdFx0XHR3aW5kb3cubG9jYWxTdG9yYWdlLnRva2VuID0gdmFsLmRhdGE7XG5cdFx0XHRcdCRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUF1dGgnXSA9IHZhbC5kYXRhXG5cdFx0XHRcdHJldHVybiBzdmMuZ2V0VXNlcigpO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0c3ZjLnJlZ2lzdGVyID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmRfY29uZmlybSkge1xuXHRcdFx0cmV0dXJuICRodHRwLnBvc3QoJy9hcGkvdXNlcnMnLCB7XG5cdFx0XHRcdHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKHZhbCkge1xuXHRcdFx0XHRyZXR1cm4gc3ZjLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWY9ICcvJztcdFxuXHRcdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRzdmMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpO1xuXHRcdH1cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4ucnVuKFtcIiRyb290U2NvcGVcIiwgXCIkdGltZW91dFwiICwgXCIkd2luZG93XCIgLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHRpbWVvdXQsICR3aW5kb3cpIHtcblx0XG5cdChmdW5jdGlvbiBjb25uZWN0KCl7XG5cdFx0Ly9DcmVhdGUgYSB3ZWJzb2NrZXQgY29ubmVjdGlvbiB3aXRoIHRoZSBzZXJ2ZXJcblx0XHR2YXIgaG9zdCA9IFwid3M6Ly9cIiArICR3aW5kb3cubG9jYXRpb24uaG9zdFxuXHRcdCAgXG5cdFx0dmFyIGNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KGhvc3QpXG5cblx0XHRjb25uZWN0aW9uLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdXZWJzb2NrZXQgY29ubmVjdGVkJylcblx0XHR9XG5cblxuXHRcdGNvbm5lY3Rpb24ub25jbG9zZSA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnV2Vic29ja2V0IGNsb3NlZC4gVHJ5aW5nIHRvIHJlY29ubmVjdC4uLicpXG5cdFx0XHQkdGltZW91dChjb25uZWN0LCAxMCoxMDAwKTtcblx0XHR9IFxuXG5cdFx0Y29ubmVjdGlvbi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Y29uc29sZS5sb2coZSk7XG5cdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcblx0XHRcdFxuXHRcdFx0dmFyIG5hbWUgPSAnd3M6JyArIG1lc3NhZ2UudG9waWM7XG5cdFx0XHR2YXIgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcblx0XHRcdGNvbnNvbGUubG9nKFwiYnJvYWRjYXN0aW5nOiBcIik7XG5cblx0XHRcdCRyb290U2NvcGUuJGJyb2FkY2FzdChuYW1lLCBkYXRhKTtcblx0XHR9XG5cdH0pKClcbn1dKSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==