/**
 * Ext JS 4 RPC Sample
 * File:    direct.js
 * Auther:  sunvisor
 * Date:    2011-08-11
 * Copyright (C) Sunvisor 2011 All right reserved.
 */
Ext.ns('Ext.app', 'AM');

Ext.onReady(function() {

    Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

    AM.users.getHero(function(result){
        Ext.Msg.alert('主人公は' + result + 'です');
    });

});
