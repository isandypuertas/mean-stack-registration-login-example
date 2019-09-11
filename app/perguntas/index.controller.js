(function () {
    'use strict';

    angular
        .module('app')
        .controller('Perguntas.IndexController', Controller);

    function Controller($window, UserService, PerguntasService, FlashService) {
        var vm = this;

        vm.perguntas = null;
        vm.user = null;
        vm.savePergunta = savePergunta;
        vm.deletePergunta = deletePergunta;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;                             
                PerguntasService.GetAllPerguntas(vm.user).then(function (perguntas) {     
                    debugger;    
                    perguntas.forEach(pergunta => {
                        debugger;
                    });           
                });
            });            
        }

        function savePergunta() {                  
            let perguntasToBeSaved = {    
                id_user: vm.user._id,            
                question: vm.perguntas
            }
            PerguntasService.Create(perguntasToBeSaved)
                .then(function () {                    
                    FlashService.Success('Pergunta criada com sucesso!');      
                    $(".alert-success").show();
                    setTimeout(function(){
                        $(".alert-success").hide();
                        $("#pergunta").val("");
                    },2000);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deletePergunta() {
            let perguntasToBeDeleted = {   
                id: vm.perguntas.id,                
                question: vm.perguntas
            }
            PerguntasService.DeletePergunta(perguntasToBeDeleted)
                .then(function () {
                    // log user out
                    $window.location = '/pergunta';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();