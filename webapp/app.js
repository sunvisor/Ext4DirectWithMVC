/*
APIの読み込み順番は、app.jsを読んだ後でもOK

APIでnamespace指定する場合は、app.jsにでも書いておく

app.js の launchメソッドでaddProviderをする。

ストアのdirectFnはコンフィグの中では設定しない。（エラーが起きる）
ストアを使うコントローラーのonLaunchメソッドで、directFnやapiコンフィグに値をセットして
ストアをロードする。

### initとonLaunchについて

initはApplicationクラスのコンストラクタの最後にExt.onReady() が作成されるが、
そのonReadyの最初に各コントローラーのinitがコールされる。
onReadyはその次にApplicationのonBeforeLaunchを呼び出すが、
そこでQuickTipのinitや、CreateViewportをして、Applicationのlaunchメソッドを実行して、
launchイベントが発火した後に、各コントローラーのonLaunchがコールされる。
*/

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

