/**
 * アプリケーション
 * File:    app.js
 * Auther:  sunvisor
 * Date:    2011-08-10
 * Copyright (C) Sunvisor 2011 All right reserved.
 **/
Ext.ns('Ext.app', 'AM');

Ext.application({
    name: 'AM',
    autoCreateViewport: true,

    controllers: [
        'Users'
    ],

    launch: function() {
        
        // Ext.Direct プロバイダーの追加
        Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

    }
});

