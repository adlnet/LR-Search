angular
		.module('lr.review', [])
		.directive(
				'review',
				function() {
					return {
						restrict : "E",
						transclude : true,
						scope : {},
						link : function($scope, $element, $attrs) {
						},
						controller : function($scope, $http, $attrs, $routeParams) {
							$scope.results = [];
							console.log($attrs.endpoint + "flagged/" + $routeParams.docId)
							$http.get($attrs.endpoint + "flagged/" + $routeParams.docId).then(
									function(data) {
										if (data.data.flaggedItems) {
											angular.copy(
													data.data.flaggedItems,
													$scope.results);
										}
									});

						},
						template : '<dl ng-repeat="result in results">'
								+ '<dt><a href="/review/{{result.id}}">{{result.id}}</a></dt>'
								+ '<dd>'
								+ '<p class="text-muted">{{result.description}}</p>'
								+ '<p>{{result.description}}</p>' + '</dd>'
								+ '</dl>'
					}
				})
		.directive(
				'display',
				function() {
					return {
						restrict : "E",
						transclude : true,
						scope : {},
						link : function($scope, $element, $attrs) {
						},
						controller : function($scope, $http, $attrs, $routeParams) {
							$scope.result = {};
							$http.get($attrs.endpoint + "data/" + $routeParams.docId).then(function(data) {
								$scope.result = data.data;
							});

						},
						template : '<h1><a href="{{result.url}}">{{result.title}}</a></h1>'
								+ '<div>'
								+ '<img src="/screenshot/{{result._id}}"/>'
								+ '<p class="text-muted">{{result.url}}</p>'
								+ '<p>{{result.description}}</p>' + '</div>'
					}
				});