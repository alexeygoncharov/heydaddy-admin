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
}