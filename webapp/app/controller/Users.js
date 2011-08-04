Ext.define('AM.controller.Users', {
    extend: 'Ext.app.Controller',

    stores: ['Users'],

    models: ['User'],

    views: ['user.Edit', 'user.List'],

    refs: [
        {
            ref: 'usersPanel',
            selector: 'panel'
        }
    ],

    init: function() {

        var me = this;

        me.control({
            'userlist dataview': {
                itemdblclick: me.onGridDblClick,
                itemclick: me.onGridClick
            },
            'userlist button[action=edit]': {
                click: me.onButtonEditClick
            },
            'userlist button[action=delete]': {
                click: me.onButtonDeleteClick
            },
            'userlist button[action=add]': {
                click: me.onButtonAddClick
            },
            'userlist button[action=save]': {
                click: me.onButtonSaveClick
            },
            'useredit button[action=save]': {
                click: me.updateUser
            }
        });
    },

    onLaunch: function () {
        var store = this.getUsersStore();

        // Proxyにサーバー関数をセット
        store.getProxy().api = {
            create: AM.users.addRec,
            read: AM.users.getAll,
            update: AM.users.updateRec,
            destroy: AM.users.removeRec
        };
        store.load();
    },

    onButtonSaveClick: function(button){
        var me = this,
            store = me.getUsersStore();

        store.sync();
    },

    onButtonDeleteClick: function(button){
        var me = this,
            sm = button.up('userlist').getView().getSelectionModel(),
            record = sm.getSelection()[0],
            store = me.getUsersStore();

        if(record) {
			store.remove(record);
        }

    },

    onGridClick: function(grid) {
		grid.ownerCt.down(('button[action=delete]')).enable();
		grid.ownerCt.down(('button[action=edit]')).enable();
    },

    onGridDblClick: function(grid, record){
        this.openUserDialog(record);
    },

    onButtonAddClick: function(button){
        this.openUserDialog(undefined, "add");
    },
    
    onButtonEditClick: function(button){
		var me = this,
            sm = button.up('userlist').getView().getSelectionModel(),
            record = sm.getSelection()[0];

        if(record) {
            me.openUserDialog(record, "edit");
        }
    },

    openUserDialog: function(record, mode) {
        var edit = Ext.create('AM.view.user.Edit', {editMode: mode}).show();

        if( record ){
            edit.down('form').loadRecord(record);
        }
    },

    updateUser: function(button) {
        var me = this,
            win = button.up('window'),
            store = me.getUsersStore(),
            form = win.down('form'),
            model = this.getModel('User'),
            values = form.getValues(),
            mode = win.editMode;

        if(mode == 'add') {
            record = new model(values);
            store.add(record);
        } else {
            record = form.getRecord();
            record.set(values);
        }
        win.close();
        // this.getUsersStore().sync();
    }

});
