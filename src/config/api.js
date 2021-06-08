import {base} from './env';

export default {
//Authentication
    LOGIN_USER: base + '/admin/login',

    //  Languages
    GET_ALL_LANGUAGES: base + '/language',
    STORE_LANGUAGE: base + '/language/create',
    EDIT_LANGUAGE: base + '/language/edit',
    UPDATE_LANGUAGE: base + '/language/update',
    DELETE_LANGUAGE: base + '/language/delete',


    //  Services
    GET_ALL_SERVICES: base + '/services',
    STORE_SERVICE: base + '/services/create',
    EDIT_SERVICE: base + '/services/edit',
    UPDATE_SERVICE: base + '/services/update',
    DELETE_SERVICE: base + '/services/delete',


    // ALL COUNTRIES
    ALL_COUNTRIES_OPEN : base + '/region/countries',
    ALL_PROVINCES : base + '/region/states',
    ALL_CITIES : base + '/region/cities',

    // Model Stored
    MODEL_STORE: base + '/users/create-girl-account',
    MODEL_UPDATE: base + '/users/update-girl-account',
    GET_ALL_MODELS:  base + '/users/model/all',
    EDIT_MODEL: base + '/users/edit',
    DELETE_MODEL: base + '/users',


}