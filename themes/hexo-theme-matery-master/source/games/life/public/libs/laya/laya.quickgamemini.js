!function(i,e,t){t.un,t.uns;var n=t.static,o=t.class,a=t.getset,l=(t.__newvec,laya.utils.Browser),s=t.Config,r=(laya.events.Event,laya.events.EventDispatcher),u=laya.resource.HTMLImage,d=laya.utils.Handler,c=laya.display.Input,f=laya.net.Loader,h=(laya.net.LocalStorage,laya.maths.Matrix,laya.renders.Render,laya.utils.RunDriver),v=laya.media.SoundChannel,p=laya.media.SoundManager,m=laya.net.URL,g=laya.utils.Utils,y=function(){function i(){}return o(i,"laya.qg.mini.MiniFileMgr",null,"MiniFileMgr$3"),i.isLocalNativeFile=function(i){for(var e=0,t=F.nativefiles.length;e<t;e++)if(-1!=i.indexOf(F.nativefiles[e]))return!0;return!1},i.getFileInfo=function(e){var t=e,n=i.filesListObj[t];return null==n?null:n},i.read=function(e,t,n,o,a,l){var s;void 0===t&&(t="utf8"),void 0===o&&(o=""),void 0===a&&(a=!1),void 0===l&&(l=""),s=""==o||-1==o.indexOf("http://")&&-1==o.indexOf("https://")?e:i.getFileNativePath(e),i.fs.readFile({filePath:s,encoding:t,success:function(i){null!=n&&n.runWith([0,i])},fail:function(e){e&&""!=o?i.downFiles(o,t,n,o,a,l):null!=n&&n.runWith([1])}})},i.downFiles=function(e,t,n,o,a,l,s){void 0===t&&(t="utf8"),void 0===o&&(o=""),void 0===a&&(a=!1),void 0===l&&(l=""),void 0===s&&(s=!0),i.wxdown({url:e,success:function(r){200===r.statusCode?i.readFile(r.tempFilePath,t,n,o,a,l,s):403===r.statusCode?null!=n&&n.runWith([0,e]):null!=n&&n.runWith([1,r])},fail:function(i){null!=n&&n.runWith([1,i])}}).onProgressUpdate((function(i){null!=n&&n.runWith([2,i.progress])}))},i.readFile=function(e,t,n,o,a,l,s){void 0===t&&(t="utf8"),void 0===o&&(o=""),void 0===a&&(a=!1),void 0===l&&(l=""),void 0===s&&(s=!0),i.fs.readFile({filePath:e,encoding:t,success:function(l){-1!=e.indexOf("http://")||-1!=e.indexOf("https://")?(F.autoCacheFile||a)&&i.copyFile(e,o,n,t,s):null!=n&&n.runWith([0,l])},fail:function(i){i&&null!=n&&n.runWith([1,i])}})},i.downOtherFiles=function(e,t,n,o,a){void 0===n&&(n=""),void 0===o&&(o=!1),void 0===a&&(a=!0),i.wxdown({url:e,success:function(e){200===e.statusCode?(F.autoCacheFile||o)&&-1==n.indexOf("qlogo.cn")&&-1==n.indexOf(".php")?(null!=t&&t.runWith([0,e.tempFilePath]),i.copyFile(e.tempFilePath,n,null,"",a)):null!=t&&t.runWith([0,e.tempFilePath]):null!=t&&t.runWith([1,e])},fail:function(i){null!=t&&t.runWith([1,i])}})},i.downLoadFile=function(e,n,o,a){void 0===n&&(n=""),void 0===a&&(a="utf8"),F.window.navigator.userAgent.indexOf("MiniGame")<0&&F.window.navigator.userAgent.indexOf("OPPO")<0?t.loader.load(e,o):"image"==n||"sound"==n?i.downOtherFiles(e,o,e,!0,!1):i.downFiles(e,a,o,e,!0,n,!1)},i.copyFile=function(e,t,n,o,a){void 0===o&&(o=""),void 0===a&&(a=!0);var l=e.split("/"),s=l[l.length-1],r=i.getFileInfo(t),u=i.getFileNativePath(s),d=52428800,c=4194304,f=i.getCacheUseSize();r?r.readyUrl!=t?i.fs.getFileInfo({filePath:e,success:function(l){a&&f+c+l.size>=d&&(l.size>F.minClearSize&&(F.minClearSize=l.size),i.onClearCacheRes()),i.deleteFile(e,t,n,o,l.size)},fail:function(i){null!=n&&n.runWith([1,i])}}):null!=n&&n.runWith([0]):i.fs.getFileInfo({filePath:e,success:function(l){a&&f+c+l.size>=d&&(l.size>F.minClearSize&&(F.minClearSize=l.size),i.onClearCacheRes()),i.fs.copyFile({srcPath:e,destPath:u,success:function(e){i.onSaveFile(t,s,!0,o,n,l.size)},fail:function(i){null!=n&&n.runWith([1,i])}})},fail:function(i){null!=n&&n.runWith([1,i])}})},i.onClearCacheRes=function(){var e=F.minClearSize,t=[];for(var n in i.filesListObj)"fileUsedSize"!=n&&t.push(i.filesListObj[n]);i.sortOn(t,"times",16);for(var o=0,a=1,l=t.length;a<l;a++){var s=t[a];if(o>=e)break;o+=s.size,i.deleteFile("",s.readyUrl)}},i.sortOn=function(i,e,t){return void 0===t&&(t=0),16==t?i.sort((function(i,t){return i[e]-t[e]})):18==t?i.sort((function(i,t){return t[e]-i[e]})):i.sort((function(i,t){return i[e]-t[e]}))},i.getFileNativePath=function(i){return laya.qg.mini.MiniFileMgr.fileNativeDir+"/"+i},i.deleteFile=function(e,t,n,o,a){void 0===t&&(t=""),void 0===o&&(o=""),void 0===a&&(a=0);var l=i.getFileInfo(t),s=i.getFileNativePath(l.md5);i.fs.unlink({filePath:s,success:function(l){var s=""!=e;if(""!=e){var r=i.getFileNativePath(e);i.fs.copyFile({srcPath:e,destPath:r,success:function(a){i.onSaveFile(t,e,s,o,n,a.size)},fail:function(i){null!=n&&n.runWith([1,i])}})}else i.onSaveFile(t,e,s,o,n,a)},fail:function(i){}})},i.deleteAll=function(){var e=[];for(var t in i.filesListObj)"fileUsedSize"!=t&&e.push(i.filesListObj[t]);for(var n=1,o=e.length;n<o;n++){var a=e[n];i.deleteFile("",a.readyUrl)}laya.qg.mini.MiniFileMgr.filesListObj&&laya.qg.mini.MiniFileMgr.filesListObj.fileUsedSize&&(laya.qg.mini.MiniFileMgr.filesListObj.fileUsedSize=0),laya.qg.mini.MiniFileMgr.writeFilesList("",JSON.stringify({}),!1)},i.onSaveFile=function(e,t,n,o,a,s){void 0===n&&(n=!0),void 0===o&&(o=""),void 0===s&&(s=0);var r=e;if(null==i.filesListObj.fileUsedSize&&(i.filesListObj.fileUsedSize=0),n)i.getFileNativePath(t),i.filesListObj[r]={md5:t,readyUrl:e,size:s,times:l.now(),encoding:o},i.filesListObj.fileUsedSize=parseInt(i.filesListObj.fileUsedSize)+s,i.writeFilesList(r,JSON.stringify(i.filesListObj),!0),null!=a&&a.runWith([0]);else if(i.filesListObj[r]){var u=parseInt(i.filesListObj[r].size);i.filesListObj.fileUsedSize=parseInt(i.filesListObj.fileUsedSize)-u,delete i.filesListObj[r],i.writeFilesList(r,JSON.stringify(i.filesListObj),!1),null!=a&&a.runWith([0])}},i.writeFilesList=function(e,t,n){var o=i.fileNativeDir+"/"+i.fileListName;i.fs.writeFile({filePath:o,encoding:"utf8",data:t,success:function(i){},fail:function(i){}}),!F.isZiYu&&F.isPosMsgYu&&F.window.qg.postMessage&&F.window.qg.postMessage({url:e,data:i.filesListObj[e],isLoad:"filenative",isAdd:n})},i.getCacheUseSize=function(){return i.filesListObj&&i.filesListObj.fileUsedSize?i.filesListObj.fileUsedSize:0},i.existDir=function(e,t){i.fs.mkdir({dirPath:e,success:function(i){null!=t&&t.runWith([0,{data:JSON.stringify({})}])},fail:function(e){-1!=e.errMsg.indexOf("file already exists")?i.readSync(i.fileListName,"utf8",t):null!=t&&t.runWith([1,e])}})},i.readSync=function(e,t,n,o){void 0===t&&(t="utf8"),void 0===o&&(o="");var a,l=i.getFileNativePath(e);try{i.fs.readFile({filePath:l,encoding:t,success:function(i){a=i.data,null!=n&&n.runWith([0,{data:a}])},fail:function(){null!=n&&n.runWith([1])}})}catch(i){null!=n&&n.runWith([1])}},i.setNativeFileDir=function(e){i.fileNativeDir=qg.env.USER_DATA_PATH+e},i.filesListObj={},i.fileNativeDir=null,i.fileListName="layaairfiles.txt",i.ziyuFileData={},i.ziyuFileTextureData={},i.loadPath="",i.DESCENDING=2,i.NUMERIC=16,n(i,["fs",function(){return this.fs=F.window.qg.getFileSystemManager()},"wxdown",function(){return this.wxdown=F.window.qg.downloadFile}]),i}(),w=function(){function i(){}return o(i,"laya.qg.mini.MiniImage",null,"MiniImage$3"),i.prototype._loadImage=function(e){var t=this,n=F.window.qg.env.USER_DATA_PATH;if(-1==e.indexOf(n)&&-1==e.indexOf(n))if(F.isZiYu)i.onCreateImage(e,t,!0);else{var o=!1;if(y.isLocalNativeFile(e)){if(-1==e.indexOf("http://usr/")&&(-1!=e.indexOf("http://")||-1!=e.indexOf("https://")))if(""!=y.loadPath)e=e.split(y.loadPath)[1];else{var a=""!=m.rootPath?m.rootPath:m.basePath,l=e;""!=a&&(e=e.split(a)[1]),e||(e=l)}if(F.subNativeFiles&&0==F.subNativeheads.length)for(var s in F.subNativeFiles){var r=F.subNativeFiles[s];F.subNativeheads=F.subNativeheads.concat(r);for(var u=0;u<r.length;u++)F.subMaps[r[u]]=s+"/"+r[u]}if(F.subNativeFiles&&-1!=e.indexOf("/")){var c=e.split("/")[0]+"/";if(c&&-1!=F.subNativeheads.indexOf(c)){var f=F.subMaps[c];e=e.replace(c,f)}}}else o=!0,e=m.formatURL(e);y.getFileInfo(e)?i.onCreateImage(e,t,!o):-1!=e.indexOf("http://usr/")||-1==e.indexOf("http://")&&-1==e.indexOf("https://")||F.isZiYu?i.onCreateImage(e,t,!0):y.downOtherFiles(encodeURI(e),new d(i,i.onDownImgCallBack,[e,t]),e)}else i.onCreateImage(e,t,!0)},i.onDownImgCallBack=function(e,t,n,o){void 0===o&&(o=""),n?t.onError(null):i.onCreateImage(e,t,!1,o)},i.onCreateImage=function(i,e,t,n){var o,a;if(void 0===t&&(t=!1),void 0===n&&(n=""),F.autoCacheFile)if(t)if(F.isZiYu){var s=m.formatURL(i);o=y.ziyuFileTextureData[s]?y.ziyuFileTextureData[s]:i}else o=i;else if(""!=n)o=n;else{var r=y.getFileInfo(i).md5;o=y.getFileNativePath(r)}else o=t?i:n;function d(){a.onload=null,a.onerror=null,delete e.imgCache[i]}null==e.imgCache&&(e.imgCache={});var c=function(){d(),e.onLoaded(a)},f=function(){d(),e.event("error","Load image failed")};"nativeimage"==e._type?((a=new l.window.Image).crossOrigin="",a.onload=c,a.onerror=f,a.src=o,e.imgCache[i]=a):new u.create(o,{onload:c,onerror:f,onCreate:function(t){a=t,e.imgCache[i]=t}})},i}(),_=function(){function i(){}return o(i,"laya.qg.mini.MiniInput",null,"MiniInput$3"),i._createInputElement=function(){c._initInput(c.area=l.createElement("textarea")),c._initInput(c.input=l.createElement("input")),c.inputContainer=l.createElement("div"),c.inputContainer.style.position="absolute",c.inputContainer.style.zIndex=1e5,l.container.appendChild(c.inputContainer),c.inputContainer.setPos=function(i,e){c.inputContainer.style.left=i+"px",c.inputContainer.style.top=e+"px"},t.stage.on("resize",null,i._onStageResize),F.window.qg.onWindowResize&&F.window.qg.onWindowResize((function(i){F.window.dispatchEvent&&F.window.dispatchEvent("resize")})),p._soundClass=C,p._musicClass=C;var e=F.systemInfo.model,n=F.systemInfo.system;e&&-1!=e.indexOf("iPhone")&&(l.onIPhone=!0,l.onIOS=!0,l.onIPad=!0,l.onAndroid=!1),!n||-1==n.indexOf("Android")&&-1==n.indexOf("Adr")||(l.onAndroid=!0,l.onIPhone=!1,l.onIOS=!1,l.onIPad=!1)},i._onStageResize=function(){},i.wxinputFocus=function(i){var e=c.inputElement.target;e&&!e.editable||(F.window.qg.showKeyboard({defaultValue:e.text,maxLength:e.maxChars,multiple:e.multiline,confirmHold:!0,confirmType:"done",success:function(i){},fail:function(i){}}),F.window.qg.onKeyboardComplete((function(i){F.window.qg.offKeyboardComplete();var t=i?i.value:"";e._restrictPattern&&(t=t.replace(/\u2006|\x27/g,""),e._restrictPattern.test(t)&&(t=t.replace(e._restrictPattern,""))),e.text=t,e.event("input"),laya.qg.mini.MiniInput.inputEnter(!0)})),F.window.qg.onKeyboardConfirm((function(i){var t=i?i.value:"";e._restrictPattern&&(t=t.replace(/\u2006|\x27/g,""),e._restrictPattern.test(t)&&(t=t.replace(e._restrictPattern,""))),e.text=t,e.event("input"),laya.qg.mini.MiniInput.inputEnter(!0)})),F.window.qg.onKeyboardInput((function(i){var t=i?i.value:"";e.multiline||-1==t.indexOf("\n")?(e._restrictPattern&&(t=t.replace(/\u2006|\x27/g,""),e._restrictPattern.test(t)&&(t=t.replace(e._restrictPattern,""))),e.text=t,e.event("input"),laya.qg.mini.MiniInput.inputEnter(!1)):laya.qg.mini.MiniInput.inputEnter(!1)})))},i.inputEnter=function(e){e&&i.hideKeyboard(),c.inputElement.target&&(c.inputElement.target.focus=!1)},i.wxinputblur=function(){},i.hideKeyboard=function(){F.window.qg.offKeyboardConfirm(),F.window.qg.offKeyboardInput(),F.window.qg.hideKeyboard({success:function(i){console.log("隐藏键盘")},fail:function(i){console.log("隐藏键盘出错:"+(i?i.errMsg:""))}})},i}(),F=(function(){function i(){}o(i,"laya.qg.mini.MiniLocalStorage",null,"MiniLocalStorage$3"),i.__init__=function(){i.items=i},i.setItem=function(i,e){F.window.qg.setStorageSync(i,e)},i.getItem=function(i){return F.window.qg.getStorageSync(i)},i.setJSON=function(e,t){try{i.setItem(e,JSON.stringify(t))}catch(n){i.setItem(e,t)}},i.getJSON=function(e){var t=i.getItem(e);try{return JSON.parse(t)}catch(i){return t}},i.removeItem=function(i){F.window.qg.removeStorageSync(i)},i.clear=function(){F.window.qg.clearStorageSync()},i.getStorageInfoSync=function(){try{var i=F.window.qg.getStorageInfoSync();return console.log(i.keys),console.log(i.currentSize),console.log(i.limitSize),i}catch(i){}return null},i.support=!0,i.items=null}(),function(){function i(){}o(i,"laya.qg.mini.MiniLocation",null,"MiniLocation$3"),i.__init__=function(){F.window.navigator.geolocation.getCurrentPosition=i.getCurrentPosition,F.window.navigator.geolocation.watchPosition=i.watchPosition,F.window.navigator.geolocation.clearWatch=i.clearWatch},i.getCurrentPosition=function(i,e,t){var n;(n={}).success=function(e){null!=i&&i(e)},n.fail=e,F.window.qg.getLocation(n)},i.watchPosition=function(e,n,o){var a;return i._curID++,(a={}).success=e,a.error=n,i._watchDic[i._curID]=a,t.timer.loop(1e3,null,i._myLoop),i._curID},i.clearWatch=function(e){delete i._watchDic[e],i._hasWatch()||t.timer.clear(null,i._myLoop)},i._hasWatch=function(){var e;for(e in i._watchDic)if(i._watchDic[e])return!0;return!1},i._myLoop=function(){i.getCurrentPosition(i._mySuccess,i._myError)},i._mySuccess=function(e){var t,n={};for(t in n.coords=e,n.timestamp=l.now(),i._watchDic)i._watchDic[t].success&&i._watchDic[t].success(n)},i._myError=function(e){var t;for(t in i._watchDic)i._watchDic[t].error&&i._watchDic[t].error(e)},i._watchDic={},i._curID=0}(),function(){function i(i,e){this.videoend=!1,this.videourl="",this.videoElement=null,this.videoW=NaN,this.videoH=NaN,this.onPlayFunc=null,this.onEndedFunC=null,this._duration=NaN,this.position=NaN,void 0===i&&(i=320),void 0===e&&(e=240),this.videoW=i,this.videoH=e}o(i,"laya.qg.mini.MiniVideo",null,"MiniVideo$1");var e=i.prototype;e.on=function(i,e,t){"loadedmetadata"==i?this.onPlayFunc=t.bind(e):"ended"==i&&(this.onEndedFunC=t.bind(e)),this.videoElement.onTimeUpdate=this.onTimeUpdateFunc.bind(this)},e.onTimeUpdateFunc=function(i){this.position=i.position,this._duration=i.duration},e.onPlayFunction=function(){this.videoElement&&(this.videoElement.readyState=200),null!=this.onPlayFunc&&this.onPlayFunc()},e.onEndedFunction=function(){this.videoend=!0,null!=this.onEndedFunC&&this.onEndedFunC()},e.off=function(i,e,t){"loadedmetadata"==i?(this.onPlayFunc=t.bind(e),this.videoElement.offPlay=this.onPlayFunction.bind(this)):"ended"==i&&(this.onEndedFunC=t.bind(e),this.videoElement.offEnded=this.onEndedFunction.bind(this))},e.load=function(i){this.videoElement?this.videoElement.src=i:(this.videoElement=F.window.qg.createVideo({width:this.videoW,height:this.videoH,autoplay:!0,src:i}),this.videoElement.onPlay=this.onPlayFunction.bind(this),this.videoElement.onEnded=this.onEndedFunction.bind(this))},e.play=function(){this.videoElement&&(this.videoend=!1,this.videoElement.play())},e.pause=function(){this.videoElement&&(this.videoend=!0,this.videoElement.pause())},e.size=function(i,e){this.videoElement&&(this.videoElement.width=i,this.videoElement.height=e)},e.destroy=function(){this.videoElement&&this.videoElement.destroy(),this.videoElement=null,this.onEndedFunC=null,this.onPlayFunc=null,this.videoend=!1,this.videourl=null},e.reload=function(){this.videoElement&&(this.videoElement.src=this.videourl)},a(0,e,"duration",(function(){return this._duration})),a(0,e,"paused",(function(){return!!this.videoElement&&this.videoElement.paused})),a(0,e,"loop",(function(){return!!this.videoElement&&this.videoElement.loop}),(function(i){this.videoElement&&(this.videoElement.loop=i)})),a(0,e,"currentTime",(function(){return this.videoElement?this.videoElement.initialTime:0}),(function(i){this.videoElement&&(this.videoElement.initialTime=i)})),a(0,e,"ended",(function(){return this.videoend})),a(0,e,"muted",(function(){return!!this.videoElement&&this.videoElement.muted}),(function(i){this.videoElement&&(this.videoElement.muted=i)})),a(0,e,"videoWidth",(function(){return this.videoElement?this.videoElement.width:0})),a(0,e,"videoHeight",(function(){return this.videoElement?this.videoElement.height:0})),a(0,e,"playbackRate",(function(){return this.videoElement?this.videoElement.playbackRate:0}),(function(i){this.videoElement&&(this.videoElement.playbackRate=i)})),a(0,e,"x",(function(){return this.videoElement?this.videoElement.x:0}),(function(i){this.videoElement&&(this.videoElement.x=i)})),a(0,e,"y",(function(){return this.videoElement?this.videoElement.y:0}),(function(i){this.videoElement&&(this.videoElement.y=i)})),a(0,e,"currentSrc",(function(){return this.videoElement.src})),i.__init__=function(){laya.device.media.Video=i}}(),function(){function e(){}return o(e,"laya.qg.mini.QGMiniAdapter"),e.getJson=function(i){return JSON.parse(i)},e.init=function(n,o){if(void 0===n&&(n=!1),void 0===o&&(o=!1),!e._inited&&(e._inited=!0,e.window=i,e.window.hasOwnProperty("qg")&&!(e.window.navigator.userAgent.indexOf("OPPO")<0))){e.isZiYu=o,e.isPosMsgYu=n,e.EnvConfig={};try{laya.webgl.resource.WebGLCanvas.premulAlpha=!0}catch(i){}e.isZiYu||(qg||console.log("======qg null======================"),qg.env||console.log("======qg.env  null======================"),y.setNativeFileDir("/layaairGame"),y.existDir(y.fileNativeDir,d.create(e,e.onMkdirCallBack))),e.window.qg.getSystemInfo({success:function(i){e.systemInfo=i}}),e.window.focus=function(){},t._getUrlPath=function(){},t.getUrlPath=function(){},e.window.logtime=function(i){},e.window.alertTimeLog=function(i){},e.window.resetShareInfo=function(){},e.window.document.body.appendChild=function(){},e.EnvConfig.pixelRatioInt=0,h.getPixelRatio=e.pixelRatio,e._preCreateElement=l.createElement,l.createElement=e.createElement,h.createShaderCondition=e.createShaderCondition,g.parseXMLFromString=e.parseXMLFromString,c._createInputElement=_._createInputElement,e.EnvConfig.load=f.prototype.load,f.prototype.load=E.prototype.load,f.prototype._loadImage=w.prototype._loadImage,e.onReciveData(),s.useRetinalCanvas=!0}},e.onReciveData=function(){laya.qg.mini.QGMiniAdapter.isZiYu&&e.window.qg.onMessage&&e.window.qg.onMessage((function(i){"opendatacontext"==i.isLoad?i.url&&(y.ziyuFileData[i.url]=i.atlasdata,y.ziyuFileTextureData[i.imgReadyUrl]=i.imgNativeUrl):"openJsondatacontext"==i.isLoad?i.url&&(y.ziyuFileData[i.url]=i.atlasdata):"openJsondatacontextPic"==i.isLoad&&(y.ziyuFileTextureData[i.imgReadyUrl]=i.imgNativeUrl)}))},e.measureText=function(i){var t=e._measureText(i);return t||(t={width:16},console.warn("-------微信获取文字宽度失败----等待修复---------")),t},e.getUrlEncode=function(i,e){return"arraybuffer"==e?"":"utf8"},e.downLoadFile=function(i,e,t,n){void 0===e&&(e=""),void 0===n&&(n="utf8"),y.getFileInfo(i)?null!=t&&t.runWith([0]):y.downLoadFile(i,e,t,n)},e.remove=function(i,e){y.deleteFile("",i,e,"",0)},e.removeAll=function(){y.deleteAll()},e.hasNativeFile=function(i){return y.isLocalNativeFile(i)},e.getFileInfo=function(i){return y.getFileInfo(i)},e.getFileList=function(){return y.filesListObj},e.exitMiniProgram=function(){e.window.qg.exitMiniProgram()},e.onMkdirCallBack=function(i,e){i||(y.filesListObj=JSON.parse(e.data))},e.pixelRatio=function(){if(!e.EnvConfig.pixelRatioInt)try{return e.systemInfo.pixelRatio=e.window.devicePixelRatio,e.EnvConfig.pixelRatioInt=e.systemInfo.pixelRatio,e.systemInfo.pixelRatio}catch(i){}return e.EnvConfig.pixelRatioInt},e.createElement=function(i){var t;if("canvas"==i)return 1==e.idx?e.isZiYu?(t=e.window.document.createElement("canvas")).style={}:t=e.window.__canvas:t=e.window.document.createElement("canvas"),e.idx++,t;if("textarea"==i||"input"==i)return e.onCreateInput(i);if("div"==i){var n=e._preCreateElement(i);return n.contains=function(i){return null},n.removeChild=function(i){},n}return e._preCreateElement(i)},e.onCreateInput=function(i){var t=e._preCreateElement(i);return t.focus=_.wxinputFocus,t.blur=_.wxinputblur,t.style={},t.value=0,t.parentElement={},t.placeholder={},t.type={},t.setColor=function(i){},t.setType=function(i){},t.setFontFace=function(i){},t.addEventListener=function(i){},t.contains=function(i){return null},t.removeChild=function(i){},t},e.createShaderCondition=function(i){var e=this;return function(){return e[i.replace("this.","")]}},e.sendAtlasToOpenDataContext=function(i){if(!laya.qg.mini.QGMiniAdapter.isZiYu){var t=f.getRes(m.formatURL(i));if(!t)throw"传递的url没有获取到对应的图集数据信息，请确保图集已经过！";if(t.meta.image.split(","),t.meta&&t.meta.image)for(var n=t.meta.image.split(","),o=i.indexOf("/")>=0?"/":"\\",a=i.lastIndexOf(o),l=a>=0?i.substr(0,a+1):"",s=0,r=n.length;s<r;s++)n[s]=l+n[s];else n=[i.replace(".json",".png")];for(s=0;s<n.length;s++){var u=n[s];e.postInfoToContext(i,u,t)}}},e.postInfoToContext=function(i,t,n){var o={frames:n.frames,meta:n.meta},a=t,l=y.getFileInfo(m.formatURL(t));if(l)var s=l.md5,r=y.getFileNativePath(s);else r=a;if(!r)throw"获取图集的磁盘url路径不存在！";e.window.qg.postMessage&&e.window.qg.postMessage({url:i,atlasdata:o,imgNativeUrl:r,imgReadyUrl:a,isLoad:"opendatacontext"})},e.sendSinglePicToOpenDataContext=function(i){var t=m.formatURL(i),n=y.getFileInfo(t);if(n){var o=n.md5,a=y.getFileNativePath(o);i=t}else a=i;if(!a)throw"获取图集的磁盘url路径不存在！";e.window.qg.postMessage&&e.window.qg.postMessage({url:i,imgNativeUrl:a,imgReadyUrl:i,isLoad:"openJsondatacontextPic"})},e.sendJsonDataToDataContext=function(i){if(!laya.qg.mini.QGMiniAdapter.isZiYu){var t=f.getRes(i);if(!t)throw"传递的url没有获取到对应的图集数据信息，请确保图集已经过！";e.window.qg.postMessage&&e.window.qg.postMessage({url:i,atlasdata:t,isLoad:"openJsondatacontext"})}},e.EnvConfig=null,e.window=null,e._preCreateElement=null,e._inited=!1,e.systemInfo={},e.isZiYu=!1,e.isPosMsgYu=!1,e.autoCacheFile=!0,e.minClearSize=5242880,e.subNativeFiles=null,e.subNativeheads=[],e.subMaps=[],e.AutoCacheDownFile=!1,e._measureText=null,e.parseXMLFromString=function(e){var t;e=e.replace(/>\s+</g,"><");try{t=(new i.DOMParser).parseFromString(e,"text/xml")}catch(i){throw"需要引入xml解析库文件"}return t},e.idx=1,n(e,["nativefiles",function(){return this.nativefiles=["layaNativeDir","qgfile"]}]),e}()),E=(function(i){function e(){e.__super.call(this)}o(e,"laya.qg.mini.MiniAccelerator",i,"MiniAccelerator$3");var t=e.prototype;t.on=function(t,n,o,a){return i.prototype.on.call(this,t,n,o,a),e.startListen(this.onAccelerometerChange),this},t.off=function(t,n,o,a){return void 0===a&&(a=!1),this.hasListener(t)||e.stopListen(),i.prototype.off.call(this,t,n,o,a)},e.__init__=function(){try{var i;if(!(i=laya.device.motion.Accelerator))return;i.prototype.on=e.prototype.on,i.prototype.off=e.prototype.off}catch(i){}},e.startListen=function(i){if(e._callBack=i,!e._isListening){e._isListening=!0;try{F.window.qg.onAccelerometerChange(laya.qg.mini.MiniAccelerator.onAccelerometerChange)}catch(i){}}},e.stopListen=function(){e._isListening=!1;try{F.window.qg.stopAccelerometer({})}catch(i){}},e.onAccelerometerChange=function(i){var t;(t={}).acceleration=i,t.accelerationIncludingGravity=i,t.rotationRate={},null!=e._callBack&&e._callBack(t)},e._isListening=!1,e._callBack=null}(r),function(i){function e(){e.__super.call(this)}return o(e,"laya.qg.mini.MiniLoader",i,"MiniLoader$3"),e.prototype.load=function(i,t,n,o,a){void 0===n&&(n=!0),void 0===a&&(a=!1);var l=this;if(l._url=i,i){if(0===(i=m.customFormat(i)).indexOf("data:image")?l._type=t="image":l._type=t||(t=l.getTypeFromUrl(l._url)),l._cache=n,l._data=null,!a&&f.loadedMap[m.formatURL(i)])return l._data=f.loadedMap[m.formatURL(i)],this.event("progress",1),void this.event("complete",l._data);if(null!=f.parserMap[t])return l._customParse=!0,void(f.parserMap[t]instanceof laya.utils.Handler?f.parserMap[t].runWith(this):f.parserMap[t].call(null,this));var s=F.getUrlEncode(i,t),r=g.getFileExtension(i);if(-1!=e._fileTypeArr.indexOf(r)||"image"==t)F.EnvConfig.load.call(this,i,t,n,o,a);else{if(F.isZiYu&&!y.ziyuFileData[i]&&(i=m.formatURL(i)),F.isZiYu&&y.ziyuFileData[i]){var u=y.ziyuFileData[i];return void l.onLoaded(u)}if(y.getFileInfo(m.formatURL(i))){var c=y.getFileInfo(m.formatURL(i));c.encoding=null==c.encoding?"utf8":c.encoding;var h=y.getFileNativePath(c.md5);y.readFile(h,c.encoding,new d(e,e.onReadNativeCallBack,[s,i,t,n,o,a,l]),m.formatURL(i))}else{if(y.isLocalNativeFile(i)){if(F.subNativeFiles&&0==F.subNativeheads.length)for(var v in F.subNativeFiles){var p=F.subNativeFiles[v];F.subNativeheads=F.subNativeheads.concat(p);for(var w=0;w<p.length;w++)F.subMaps[p[w]]=v+"/"+p[w]}if(F.subNativeFiles&&-1!=i.indexOf("/")){var _=i.split("/")[0]+"/";if(_&&-1!=F.subNativeheads.indexOf(_)){var E=F.subMaps[_];i=i.replace(_,E)}}return void y.read(i,s,new d(e,e.onReadNativeCallBack,[s,i,t,n,o,a,l]))}var C=i;-1!=m.formatURL(i).indexOf(F.window.qg.env.USER_DATA_PATH)||-1==i.indexOf("http://")&&-1==i.indexOf("https://")||F.AutoCacheDownFile?(c=y.getFileInfo(i))?(c.encoding=null==c.encoding?"utf8":c.encoding,y.readFile(c.url,s,new d(e,e.onReadNativeCallBack,[s,i,t,n,o,a,l]),i)):"image"==l.type||"htmlimage"==l.type?F.EnvConfig.load.call(l,i,t,n,o,a):(i=m.formatURL(i),"image"!=t&&(-1==i.indexOf("http://")&&-1==i.indexOf("https://")||y.isLocalNativeFile(i))?y.readFile(i,s,new d(e,e.onReadNativeCallBack,[s,i,t,n,o,a,l]),i):y.downFiles(i,s,new d(e,e.onReadNativeCallBack,[s,i,t,n,o,a,l]),i,n)):F.EnvConfig.load.call(l,C,t,n,o,a)}}}else l.onLoaded(null)},e.onReadNativeCallBack=function(i,e,t,n,o,a,l,s,r){var u;void 0===n&&(n=!0),void 0===a&&(a=!1),void 0===s&&(s=0),s?1==s&&(console.log("-----------本地加载失败，尝试外网加载----"),F.EnvConfig.load.call(l,e,t,n,o,a)):(u="json"==t||"atlas"==t?F.getJson(r.data):"xml"==t?g.parseXMLFromString(r.data):r.data,!F.isZiYu&&F.isPosMsgYu&&"arraybuffer"!=t&&F.window.qg.postMessage&&F.window.qg.postMessage({url:e,data:u,isLoad:"filedata"}),l.onLoaded(u))},n(e,["_fileTypeArr",function(){return this._fileTypeArr=["png","jpg","bmp","jpeg","gif"]}]),e}(r)),C=function(i){function e(){this._sound=null,this.url=null,this.loaded=!1,this.readyUrl=null,e.__super.call(this),this._sound=e._createSound()}o(e,"laya.qg.mini.MiniSound",i,"MiniSound$3");var t=e.prototype;return t.load=function(i){if(y.isLocalNativeFile(i)){if(-1!=i.indexOf("http://")||-1!=i.indexOf("https://"))if(""!=y.loadPath)i=i.split(y.loadPath)[1];else{var e=""!=m.rootPath?m.rootPath:m.basePath;""!=e&&(i=i.split(e)[1])}}else i=m.formatURL(i);if(this.url=i,this.readyUrl=i,F.autoCacheFile&&y.getFileInfo(i))this.onDownLoadCallBack(i,0);else if(F.autoCacheFile)if(y.isLocalNativeFile(i)){var t=i;if(""!=(e=""!=m.rootPath?m.rootPath:m.basePath)&&(i=i.split(e)[1]),i||(i=t),F.subNativeFiles&&0==F.subNativeheads.length)for(var n in F.subNativeFiles){var o=F.subNativeFiles[n];F.subNativeheads=F.subNativeheads.concat(o);for(var a=0;a<o.length;a++)F.subMaps[o[a]]=n+"/"+o[a]}if(F.subNativeFiles&&-1!=i.indexOf("/")){var l=i.split("/")[0]+"/";if(l&&-1!=F.subNativeheads.indexOf(l)){var s=F.subMaps[l];i=i.replace(l,s)}}this.onDownLoadCallBack(i,0)}else-1==i.indexOf("http://")&&-1==i.indexOf("https://")||-1!=i.indexOf(F.window.my.env.USER_DATA_PATH)?this.onDownLoadCallBack(i,0):y.downOtherFiles(i,d.create(this,this.onDownLoadCallBack,[i]),i);else this.onDownLoadCallBack(i,0)},t.onDownLoadCallBack=function(i,e,t){var n;if(void 0===t&&(t=""),e)this.event("error");else if(F.autoCacheFile){if(y.isLocalNativeFile(i)){var o=""!=m.rootPath?m.rootPath:m.basePath,a=i;""==o||-1==i.indexOf("http://")&&-1==i.indexOf("https://")||(n=i.split(o)[1]),n||(n=a)}else{var l=y.getFileInfo(i);if(l&&l.md5){var s=l.md5;n=y.getFileNativePath(s)}else n=encodeURI(i)}this._sound.src=this.url=n}else this._sound.src=i},t.play=function(i,e){if(void 0===i&&(i=0),void 0===e&&(e=0),!this.url)return null;var t=new L(this);return t.url=this.url,t.loops=e,t.loop=0===e,t.startTime=i,t.play(),p.addChannel(t),t},t.dispose=function(){this._sound&&(this._sound.destroy(),this._sound=null,this.readyUrl=this.url=null)},a(0,t,"duration",(function(){return this._sound.duration})),e._createSound=function(){return e._audioCache.length?e._audioCache.pop():(e._id++,F.window.qg.createInnerAudioContext())},e._id=0,e._audioCache=[],e}(r),L=function(i){function e(i){this._audio=null,this._onEnd=null,this._onCanplay=null,this._onError=null,this._miniSound=null,e.__super.call(this),this._audio=i._sound,this._miniSound=i,this._onEnd=e.bindToThis(this.__onEnd,this),this._onCanplay=e.bindToThis(this.onCanPlay,this),this._onError=e.bindToThis(this.onError,this),this.addEventListener()}o(e,"laya.qg.mini.MiniSoundChannel",i,"MiniSoundChannel$3");var n=e.prototype;return n.addEventListener=function(){this._audio.onError(this._onError),this._audio.onCanplay(this._onCanplay)},n.offEventListener=function(){this._audio.offError(this._onError),this._audio.offCanplay(this._onCanplay),this._audio.offEnded(this._onEnd)},n.onError=function(i){console.log("-----1---------------minisound-----url:",this.url),this.event("error",[i]),this._audio&&(this._miniSound.dispose(),this.offEventListener(),this._audio=this._miniSound=null)},n.onCanPlay=function(){this._audio&&(this.event("complete"),this.offEventListener(),this._audio.onEnded(this._onEnd),this.isStopped?this.stop():this.play())},n.__onEnd=function(){if(1==this.loops)return this.completeHandler&&(t.timer.once(10,this,this.__runComplete,[this.completeHandler],!1),this.completeHandler=null),this.stop(),void this.event("complete");this.loops>0&&this.loops--,this.startTime=0,this.play()},n.play=function(){this.isStopped=!1,p.addChannel(this),this._audio&&this._audio.src&&this._audio.play()},n.stop=function(){i.prototype.stop.call(this),this.isStopped=!0,p.removeChannel(this),this.completeHandler=null,this._audio&&(this._audio.stop(),this.loop||(this.offEventListener(),this._miniSound.dispose(),this._miniSound=null,this._audio=null))},n.pause=function(){this.isStopped=!0,this._audio&&this._audio.pause()},n.resume=function(){this._audio&&(this.isStopped=!1,p.addChannel(this),this._audio.play())},a(0,n,"startTime",(function(){return this._audio?this._audio.startTime:0}),(function(i){this._audio&&(this._audio.startTime=i)})),a(0,n,"autoplay",(function(){return!!this._audio&&this._audio.autoplay}),(function(i){this._audio&&(this._audio.autoplay=i)})),a(0,n,"duration",(function(){return this._audio?this._audio.duration:0})),a(0,n,"position",(function(){return this._audio?this._audio.currentTime:0})),a(0,n,"loop",(function(){return!!this._audio&&this._audio.loop}),(function(i){this._audio&&(this._audio.loop=i)})),a(0,n,"volume",(function(){return this._audio?this._audio.volume:1}),(function(i){this._audio&&(this._audio.volume=i)})),e.bindToThis=function(i,e){return i.bind(e)},e}(v)}(window,document,Laya),"function"==typeof define&&define.amd&&define("laya.core",["require","exports"],(function(i,e){"use strict";for(var t in Object.defineProperty(e,"__esModule",{value:!0}),Laya){var n=Laya[t];n&&n.__isclass&&(e[t]=n)}}));