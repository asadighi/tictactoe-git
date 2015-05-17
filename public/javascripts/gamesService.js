/////////////////////////////////////////////////
/// Games Resource/Service
////////////////////////////////////////////////
// In here Games resource is defined as a client side service to make it easy to call API's related to Game route
//

app.factory('Games', ['$resource', function($resource){
  return $resource('/games/:id', null, {
    'update': { method:'PUT' },
    'playerMoves': { url: '/games/playerMoves/:id', method: 'POST'},
    'replay': { url: '/games/replay/:id', method: 'POST'}
  });
}]);