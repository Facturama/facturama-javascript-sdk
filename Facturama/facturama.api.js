var valuesFacturama = {
    token: "cHJ1ZWJhczpwcnVlYmFzMjAxMQ==",
    url: "https://apisandbox.facturama.mx/"
};

$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader("Authorization", "Basic " + valuesFacturama.token);
    }
});

(function (window) {
    function facturama() {

        var settings = {
            url: valuesFacturama.url
        };

        function retrieve(path, id, callback) {
            return jQuery.get(settings.url + path + '/' + id, undefined, callback, "json");
        }

        function list(path, callback) {
            return jQuery.get(settings.url + path, undefined, callback, "json");
        }

        function listWithParam(path, param, callback) {
            return jQuery.get(settings.url + path + param, undefined, callback, "json");
        }

        function postSyncWithParam(path, param, callback) {
            $.ajax({
                url: settings.url + path + param,
                type: 'POST',
                async: false,
                success: callback
            });
        }

        function postSyncWithData(path, data, callback, callbackError) {
            $.ajax({
                url: settings.url + path,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(data),
                contentType: "application/json",
                success: callback,
                error: callbackError
            });
        }

        function putSyncWithData(path, data, callback, callbackError) {
            $.ajax({
                url: settings.url + path,
                type: 'PUT',
                data: JSON.stringify(data),
                contentType: "application/json",
                success: callback,
                error: callbackError
            });
        }

        function deleteSyncWithParam(path, param, callback, callbackError) {
            $.ajax({
                url: settings.url + path + '/' + param,
                type: 'DELETE',
                async: false,
                success: callback,
                error: callbackError
            });
        }

        var facturamaObject = {
            Clients: {
                Get: function (id, callback) {
                    return retrieve('client', id, callback);
                },
                List: function (callback) {
                    return list('client', callback);
                },
                Create: function (data, callback, callbackError) {
                    postSyncWithData('client', data, callback, callbackError);
                },
                Remove: function (id, callback, callbackError) {
                    deleteSyncWithParam('client/', id, callback, callbackError);
                },
                Update: function (id, data, callback, callbackError) {
                    putSyncWithData('client/' + id, data, callback, callbackError);
                }
            },
            Products: {
                Get: function (id, callback) {
                    return retrieve('product', id, callback);
                },
                List: function (callback) {
                    return list('product', callback);
                },
                Create: function (data, callback, callbackError) {
                    postSyncWithData('product', data, callback, callbackError);
                },
                Remove: function (id, callback, callbackError) {
                    deleteSyncWithParam('product/', id, callback, callbackError);
                },
                Update: function (id, data, callback, callbackError) {
                    putSyncWithData('product/' + id, data, callback, callbackError);
                }
            },
            BranchOffice: {
                Get: function (id, callback) {
                    return retrieve('branchOffice', id, callback);
                },
                List: function (callback) {
                    return list('branchOffice', callback);
                },
                Create: function (data, callback, callbackError) {
                    postSyncWithData('branchOffice', data, callback, callbackError);
                },
                Remove: function (id, callback, callbackError) {
                    deleteSyncWithParam('branchOffice', id, callback, callbackError);
                },
                Update: function (id, data, callback, callbackError) {
                    putSyncWithData('branchOffice/' + id, data, callback, callbackError);
                }
            },
            Series: {
                List: function (id, callback) {
                    return retrieve('serie', id, callback);
                },
                Create: function (idBranch, data, callback, callbackError) {
                    postSyncWithData('serie/' + idBranch, data, callback, callbackError);
                },
                Remove: function (idBranch, name, callback, callbackError) {
                    deleteSyncWithParam('serie/' + idBranch, name, callback, callbackError);
                },
                Update: function (idBranch, name, data, callback, callbackError) {
                    putSyncWithData('serie/' + idBranch + '/' + name, data, callback, callbackError);
                }
            },
            Cfdi: {
                Get: function (id, callback) {
                    return retrieve('cfdi', id, callback);
                },
                List: function (param, callback) {
                    return listWithParam('cfdi', param, callback);
                },
                Create: function (data, callback, callbackError) {
                    postSyncWithData('2/cfdis', data, callback, callbackError);
                },
                Send: function (param, callback) {
                    postSyncWithParam('cfdi', param, callback);
                },
                Cancel: function (params, callback, callbackError) {
                    deleteSyncWithParam('cfdi', params, callback, callbackError);
                },
                Download: function (format, type, id, callback) {
                    retrieve('cfdi/' + format + '/' + type, id, callback);
                },
                Acuse: function (format, type, id, callback) {
                    retrieve('acuse/' + format + '/' + type, id, callback);
                }
            },
            TaxEntity: {
                Get: function (callback) {
                    return list('taxEntity', callback);
                },
                Update: function (data, callback, callbackError) {
                    putSyncWithData('taxEntity', data, callback, callbackError);
                },
                UploadCsd: function (data, callback, callbackError) {
                    putSyncWithData('taxEntity/UploadCsd', data, callback, callbackError);
                },
                UploadImage: function (data, callback, callbackError) {
                    putSyncWithData('taxEntity/UploadLogo', data, callback, callbackError);
                }
            },
            Catalogs: {
                States: function (country, callback) {
                    return list('catalogs/municipalities?countryCode' + country, callback);
                },
                Municipalities: function (state, callback) {
                    return list('catalogs/municipalities?stateCode' + state, callback);
                },
                Localities: function (state, callback) {
                    return list('catalogs/localities?stateCode' + state, callback);
                },
                Neighborhoods: function (postalCode, callback) {
                    return list('catalogs/neighborhoods?postalCode' + postalCode, callback);
                },
                ProductsOrServices: function (keyword, callback) {
                    return list('catalogs/ProductsOrServices?keyword=' + keyword, callback);
                },
                PostalCodes: function (keyword, callback) {
                    return list('catalogs/PostalCodes?keyword=' + keyword, callback);
                },
                Units: function (callback) {
                    return list('catalogs/Units', callback);
                },
                Currencies: function (callback) {
                    return list('catalogs/Currencies', callback);
                },
                Countries: function (callback) {
                    return list('catalogs/Countries', callback);
                },
                PaymentForms: function (callback) {
                    return list('catalogs/PaymentForms', callback);
                },
                PaymentMethods: function (callback) {
                    return list('catalogs/PaymentMethods', callback);
                },
                FederalTaxes: function (callback) {
                    return list('catalogs/FederalTaxes', callback);
                },
                FiscalRegimens: function (callback) {
                    return list('catalogs/FiscalRegimens', callback);
                },
                CfdiTypes: function (callback) {
                    return list('catalogs/CfdiTypes', callback);
                },
                RelationTypes: function (callback) {
                    return list('catalogs/RelationTypes', callback);
                },
                CfdiUses: function (keyword, callback) {
                    return list('catalogs/CfdiUses?keyword=' + keyword, callback);
                }
            }
        };

        facturamaObject.getToken = function () {
            return "Basic " + valuesFacturama.token;
        };

        facturamaObject.getBaseUri = function () {
            return settings.url;
        };

        return facturamaObject;
    }
    if (window.Facturama === undefined) {
        window.Facturama = facturama();
    }
})(window);
