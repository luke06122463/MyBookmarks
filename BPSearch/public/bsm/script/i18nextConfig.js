'use strict';

angular.module('jm.i18next')
    .config(['$i18nextProvider', function ($i18nextProvider) {
        $i18nextProvider.options = {
            ns: {
                namespaces: ['bsm'],
                defaultNs: 'bsm'
            },
            useCookie: false,
            useLocalStorage: false,
            detectLngQS: 'lang',
            fallbackLng: 'en-US',
            resGetPath: 'bsm/locale/__ns__-__lng__.json',
            dynamicLoad: false
        };
    }])
    .run(['$window', '$i18next', function ($window, $i18next) {
        var curLang = $window.navigator.language;
        $i18next.options.lng = curLang.substring(0, 5);
       
        var option = {
            getAsync: false
        };

        //i18n.init(option, function (t) {
       //});
    }]);
