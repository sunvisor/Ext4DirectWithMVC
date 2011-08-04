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
