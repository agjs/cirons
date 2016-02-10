(function() {
    'use strict';
    module.exports = VATDeclarationsCreateController;

    function VATDeclarationsCreateController($scope, $stateParams, VATDeclarationsFactory, $filter) {

        $scope.period = null;
        $scope.amounts = [];

        $scope.changePeriod = function(){
            if(!$scope.period){
                return;
            }

            VATDeclarationsFactory.getAmounts($scope.period.start, $scope.period.end).then(function(amounts){
                $scope.amounts = amounts;
            });
        };

        $scope.fields = [{
            "title": "A. Momspliktig försäljning eller uttag exklusive moms",
            "fields": [{
                "title": "Momspliktig försäljning som ej ingår i annan ruta",
                "number": "05"
            }, {
                "title": "Momspliktiga uttag",
                "number": "06"
            }, {
                "title": "Besk.underlag vid vinstmarginalbeskattning",
                "number": "07"
            }, {
                "title": "Hyresintäkter vid frivillig betalningskyldighet",
                "number": "08"
            }]
        }, {
            "title": "B. Utgående moms på försäljning eller uttag i ruta 05-08",
            "fields": [{
                "title": "Utgående moms 25%",
                "number": "10"
            }, {
                "title": "Utgående moms 12%",
                "number": "11"
            }, {
                "title": "Utgående moms 6%",
                "number": "12"
            }]
        }, {
            "title": "C. Momspliktiga inköp vid omvänd skattskyldighet",
            "fields": [{
                "title": "Inköp av varor från annat EU-land",
                "number": "20"
            }, {
                "title": "Inköp av tjänster från ett annat EU-land enligt huvudregeln",
                "number": "21"
            }, {
                "title": "Inköp av tjänster från land utanför EU",
                "number": "22"
            }, {
                "title": "Inköp av varor i Sverige",
                "number": "23"
            }, {
                "title": "Inköp av tjänster i Sverige",
                "number": "24"
            }]
        }, {
            "title": "D. Utgående moms på inköp i ruta 20-24",
            "fields": [{
                "title": "Utgående moms 25%",
                "number": "30"
            }, {
                "title": "Utgående moms 12%",
                "number": "31"
            }, {
                "title": "Utgående moms 6%",
                "number": "32"
            }]
        }, {
            "title": "H. Import",
            "fields": [{
                "title": "Beskattningsunderlag vid import",
                "number": "50"
            }]
        }, {
            "title": "I. Utgående moms på import i ruta 50",
            "fields": [{
                "title": "Utgående moms 25%",
                "number": "60"
            }, {
                "title": "Utgående moms 12%",
                "number": "61"
            }, {
                "title": "Utgående moms 6%",
                "number": "62"
            }]
        }, {
            "title": "E. Försäljning m.m. som är undantagen från moms",
            "fields": [{
                "title": "Försäljning av varor till annat EU-land",
                "number": "35"
            }, {
                "title": "Försäljning av varor utanför EU",
                "number": "36"
            }, {
                "title": "Mellanmans inköp av varor vid trepartshandel",
                "number": "37"
            }, {
                "title": "Mellanmans försäljning av varor vid trepartshandel",
                "number": "38"
            }, {
                "title": "Försäljning av tjänster till näringsidkare i ett annat EU-land enligt huvudregeln",
                "number": "39"
            }, {
                "title": "Övrig försäljning av tjänster omsatta utom landet",
                "number": "40"
            }, {
                "title": "Försäljning när köparen är skattskyldig i Sverige",
                "number": "41"
            }, {
                "title": "Övrig momsfri försäljning m m",
                "number": "42"
            }]
        }];

        $scope.sumFields = [{
            "title": "F. Ingående moms",
            "fields": [{
                "title": "Ingående moms att dra av",
                "number": "48"
            }]
        }, {
            "title": "G. Moms att betala eller få tillbaka",
            "fields": [{
                "title": "Moms att betala eller få tillbaka",
                "number": "49"
            }]
        }];
    }
    VATDeclarationsCreateController.$inject = ['$scope', '$stateParams', 'VATDeclarationsFactory', '$filter'];

})();
