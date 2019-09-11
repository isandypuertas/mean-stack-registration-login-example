(function () {
    'use strict';

    angular
        .module('app')
        .factory('PerguntasService', Service);

    function Service($http, $q) {
        var service = {};
        
        service.GetAllPerguntas = GetAllPerguntas;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;        

        return service;

        function GetAllPerguntas(user) {                        
            return $http.get('/api/perguntas/getPerguntas', user._id).then(handleSuccess, handleError);
        }

        function Create(perguntas) {            
            return $http.post('/api/perguntas/createPerguntas', perguntas).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/api/perguntas/' + user._id, user).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/perguntas/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
