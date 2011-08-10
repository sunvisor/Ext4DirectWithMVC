/**
 * Usersストア
 * File:    Users.js
 * Auther:  sunvisor
 * Date:    2011-08-10
 * Copyright (C) Sunvisor 2011 All right reserved.
 **/
Ext.define('AM.store.Users', {
    extend: 'Ext.data.Store',
    model: 'AM.model.User',
    autoLoad: false,
    
    proxy: {
        type: 'direct',
        directFn: Ext.emptyFn,  // リモートメソッドは空にしておく
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});
