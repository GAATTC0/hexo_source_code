!function(e,i,t){t.un,t.uns;var n=t.static,o=t.class,a=t.getset,l=(t.__newvec,laya.utils.Browser),s=t.Config,r=(laya.events.Event,laya.events.EventDispatcher),u=laya.resource.HTMLImage,d=laya.utils.Handler,c=laya.display.Input,f=laya.net.Loader,h=laya.net.LocalStorage,v=(laya.maths.Matrix,laya.renders.Render),m=laya.utils.RunDriver,p=(laya.media.Sound,laya.media.SoundChannel),g=laya.media.SoundManager,y=laya.net.URL,w=laya.utils.Utils,_=function(){function e(){}return o(e,"laya.tt.mini.MiniFileMgr",null,"MiniFileMgr$8"),e.isLocalNativeFile=function(e){for(var i=0,t=E.nativefiles.length;i<t;i++)if(-1!=e.indexOf(E.nativefiles[i]))return!0;return!1},e.getFileInfo=function(i){var t=i,n=e.fakeObj[t];return null==n?null:n},e.read=function(i,t,n,o,a,l){var s;void 0===t&&(t="utf8"),void 0===o&&(o=""),void 0===a&&(a=!1),void 0===l&&(l=""),s=""==o||-1==o.indexOf("http://")&&-1==o.indexOf("https://")?i:e.getFileNativePath(i),e.fs.readFile({filePath:s,encoding:t,success:function(e){null!=n&&n.runWith([0,e])},fail:function(i){i&&""!=o?e.downFiles(encodeURI(o),t,n,o,a,l):null!=n&&n.runWith([1])}})},e.downFiles=function(i,t,n,o,a,l,s){void 0===t&&(t="ascii"),void 0===o&&(o=""),void 0===a&&(a=!1),void 0===l&&(l=""),void 0===s&&(s=!0),e.wxdown({url:i,success:function(r){200===r.statusCode?e.readFile(r.tempFilePath,t,n,o,a,l,s):403===r.statusCode?null!=n&&n.runWith([0,i]):null!=n&&n.runWith([1,r])},fail:function(e){null!=n&&n.runWith([1,e])}}).onProgressUpdate((function(e){null!=n&&n.runWith([2,e.progress])}))},e.readFile=function(i,t,n,o,a,l,s){void 0===t&&(t="utf8"),void 0===o&&(o=""),void 0===a&&(a=!1),void 0===l&&(l=""),void 0===s&&(s=!0),e.fs.readFile({filePath:i,encoding:t,success:function(l){-1==i.indexOf("http://")&&-1==i.indexOf("https://")||!E.autoCacheFile&&!a?null!=n&&n.runWith([0,l]):(null!=n&&n.runWith([0,l]),e.copyFile(i,o,null,t,s))},fail:function(i){i?null!=n&&n.runWith([1,i]):e.filesListObj[o]&&(e.filesListObj[o]==e.fakeObj[o]&&delete e.fakeObj[o],delete e.filesListObj[o])}})},e.downOtherFiles=function(i,t,n,o,a){void 0===n&&(n=""),void 0===o&&(o=!1),void 0===a&&(a=!0),e.wxdown({url:i,success:function(i){200===i.statusCode?(E.autoCacheFile||o)&&-1==n.indexOf("wx.qlogo.cn")&&-1==n.indexOf(".php")?(null!=t&&t.runWith([0,i.tempFilePath]),e.copyFile(i.tempFilePath,n,null,"",a)):null!=t&&t.runWith([0,i.tempFilePath]):null!=t&&t.runWith([1,i])},fail:function(e){null!=t&&t.runWith([1,e])}})},e.downLoadFile=function(i,n,o,a){void 0===n&&(n=""),void 0===a&&(a="ascii"),E.window.navigator.userAgent.indexOf("MiniGame")<0?t.loader.load(i,o):"image"==n||"sound"==n?e.downOtherFiles(i,o,i,!0,!1):e.downFiles(i,a,o,i,!0,n,!1)},e.copyFile=function(i,t,n,o,a){void 0===o&&(o=""),void 0===a&&(a=!0);var s=i.split("/"),r=s[s.length-1],u=e.getFileInfo(t),d=e.getFileNativePath(r);e.fakeObj[t]={md5:r,readyUrl:t,size:0,times:l.now(),encoding:o};var c=52428800,f=4194304,h=e.getCacheUseSize();u?u.readyUrl!=t?e.fs.getFileInfo({filePath:i,success:function(l){a&&h+f+l.size>=c&&(l.size>E.minClearSize&&(E.minClearSize=l.size),e.onClearCacheRes()),e.deleteFile(i,t,n,o,l.size)},fail:function(e){null!=n&&n.runWith([1,e])}}):null!=n&&n.runWith([0]):e.fs.getFileInfo({filePath:i,success:function(l){a&&h+f+l.size>=c&&(l.size>E.minClearSize&&(E.minClearSize=l.size),e.onClearCacheRes()),e.fs.copyFile({srcPath:i,destPath:d,success:function(i){e.onSaveFile(t,r,!0,o,n,l.size)},fail:function(e){null!=n&&n.runWith([1,e])}})},fail:function(e){null!=n&&n.runWith([1,e])}})},e.onClearCacheRes=function(){var i=E.minClearSize,t=[];for(var n in e.filesListObj)"fileUsedSize"!=n&&t.push(e.filesListObj[n]);e.sortOn(t,"times",16);for(var o=0,a=1,l=t.length;a<l;a++){var s=t[a];if(o>=i)break;o+=s.size,e.deleteFile("",s.readyUrl)}},e.sortOn=function(e,i,t){return void 0===t&&(t=0),16==t?e.sort((function(e,t){return e[i]-t[i]})):18==t?e.sort((function(e,t){return t[i]-e[i]})):e.sort((function(e,t){return e[i]-t[i]}))},e.getFileNativePath=function(e){return laya.tt.mini.MiniFileMgr.fileNativeDir+"/"+e},e.deleteFile=function(i,t,n,o,a){void 0===t&&(t=""),void 0===o&&(o=""),void 0===a&&(a=0);var l=e.getFileInfo(t),s=e.getFileNativePath(l.md5);e.fs.unlink({filePath:s,success:function(l){var s=""!=i;if(""!=i){var r=e.getFileNativePath(i);e.fs.copyFile({srcPath:i,destPath:r,success:function(a){e.onSaveFile(t,i,s,o,n,a.size)},fail:function(e){null!=n&&n.runWith([1,e])}})}else e.onSaveFile(t,i,s,o,n,a)},fail:function(e){}})},e.deleteAll=function(){var i=[];for(var t in e.filesListObj)i.push(e.filesListObj[t]);for(var n=1,o=i.length;n<o;n++){var a=i[n];e.deleteFile("",a.readyUrl)}laya.tt.mini.MiniFileMgr.filesListObj&&laya.tt.mini.MiniFileMgr.filesListObj.fileUsedSize&&(laya.tt.mini.MiniFileMgr.filesListObj.fileUsedSize=0),laya.tt.mini.MiniFileMgr.writeFilesList("",JSON.stringify({}),!1)},e.onSaveFile=function(i,t,n,o,a,s){void 0===n&&(n=!0),void 0===o&&(o=""),void 0===s&&(s=0);var r=i;if(null==e.filesListObj.fileUsedSize&&(e.filesListObj.fileUsedSize=0),n)e.getFileNativePath(t),e.filesListObj[r]={md5:t,readyUrl:i,size:s,times:l.now(),encoding:o},e.filesListObj.fileUsedSize=parseInt(e.filesListObj.fileUsedSize)+s,e.writeFilesList(r,JSON.stringify(e.filesListObj),!0),null!=a&&a.runWith([0]);else if(e.filesListObj[r]){var u=parseInt(e.filesListObj[r].size);e.filesListObj.fileUsedSize=parseInt(e.filesListObj.fileUsedSize)-u,e.fakeObj[r].md5==e.filesListObj[r].md5&&delete e.fakeObj[r],delete e.filesListObj[r],e.writeFilesList(r,JSON.stringify(e.filesListObj),!1),null!=a&&a.runWith([0])}},e.writeFilesList=function(i,t,n){var o=e.fileNativeDir+"/"+e.fileListName;e.fs.writeFile({filePath:o,encoding:"utf8",data:t,success:function(e){},fail:function(e){}}),!E.isZiYu&&E.isPosMsgYu&&E.window.tt.postMessage&&E.window.tt.postMessage({url:i,data:e.filesListObj[i],isLoad:"filenative",isAdd:n})},e.getCacheUseSize=function(){return e.filesListObj&&e.filesListObj.fileUsedSize?e.filesListObj.fileUsedSize:0},e.existDir=function(i,t){e.fs.mkdir({dirPath:i,success:function(e){null!=t&&t.runWith([0,{data:JSON.stringify({})}])},fail:function(i){-1!=i.errMsg.indexOf("file already exists")?e.readSync(e.fileListName,"utf8",t):null!=t&&t.runWith([1,i])}})},e.readSync=function(i,t,n,o){void 0===t&&(t="utf8"),void 0===o&&(o="");var a,l=e.getFileNativePath(i);try{a=e.fs.readFileSync(l,t),null!=n&&n.runWith([0,{data:a}])}catch(e){null!=n&&n.runWith([1])}},e.setNativeFileDir=function(i){e.fileNativeDir=E.window.tt.env.USER_DATA_PATH+i},e.filesListObj={},e.fakeObj={},e.fileNativeDir=null,e.fileListName="layaairfiles.txt",e.ziyuFileData={},e.ziyuFileTextureData={},e.loadPath="",e.DESCENDING=2,e.NUMERIC=16,n(e,["fs",function(){return this.fs=E.window.tt.getFileSystemManager()},"wxdown",function(){return this.wxdown=E.window.tt.downloadFile}]),e}(),F=function(){function e(){}return o(e,"laya.tt.mini.MiniImage",null,"MiniImage$8"),e.prototype._loadImage=function(i){var t=this;if(E.isZiYu)e.onCreateImage(i,t,!0);else{var n=!1;if(_.isLocalNativeFile(i)){if(-1!=i.indexOf("http://")||-1!=i.indexOf("https://"))if(""!=_.loadPath)i=i.split(_.loadPath)[1];else{var o=""!=y.rootPath?y.rootPath:y.basePath,a=i;""!=o&&(i=i.split(o)[1]),i||(i=a)}if(E.subNativeFiles&&0==E.subNativeheads.length)for(var l in E.subNativeFiles){var s=E.subNativeFiles[l];E.subNativeheads=E.subNativeheads.concat(s);for(var r=0;r<s.length;r++)E.subMaps[s[r]]=l+"/"+s[r]}if(E.subNativeFiles&&-1!=i.indexOf("/")){var u=i.split("/")[0]+"/";if(u&&-1!=E.subNativeheads.indexOf(u)){var c=E.subMaps[u];i=i.replace(u,c)}}}else n=!0,i=y.formatURL(i);_.getFileInfo(i)?e.onCreateImage(i,t,!n):-1!=i.indexOf("http://")||-1!=i.indexOf("https://")?E.isZiYu?e.onCreateImage(i,t,!0):_.downOtherFiles(encodeURI(i),new d(e,e.onDownImgCallBack,[i,t]),i):e.onCreateImage(i,t,!0)}},e.onDownImgCallBack=function(i,t,n,o){void 0===o&&(o=""),n?t.onError(null):e.onCreateImage(i,t,!1,o)},e.onCreateImage=function(e,i,t,n){var o,a;if(void 0===t&&(t=!1),void 0===n&&(n=""),E.autoCacheFile)if(t)if(E.isZiYu){var s=y.formatURL(e);o=_.ziyuFileTextureData[s]?_.ziyuFileTextureData[s]:e}else o=e;else if(""!=n)o=n;else{var r=_.getFileInfo(e).md5;o=_.getFileNativePath(r)}else o=t?e:n;function d(){a.onload=null,a.onerror=null,delete i.imgCache[e]}null==i.imgCache&&(i.imgCache={});var c=function(){d(),i.onLoaded(a)},f=function(){d(),delete _.filesListObj[e],delete _.fakeObj[e],i.event("error","Load image failed")};"nativeimage"==i._type?((a=new l.window.Image).crossOrigin="",a.onload=c,a.onerror=f,a.src=o,i.imgCache[e]=a):new u.create(o,{onload:c,onerror:f,onCreate:function(t){a=t,i.imgCache[e]=t}})},e}(),C=function(){function e(){}return o(e,"laya.tt.mini.MiniInput",null,"MiniInput$8"),e._createInputElement=function(){c._initInput(c.area=l.createElement("textarea")),c._initInput(c.input=l.createElement("input")),c.inputContainer=l.createElement("div"),c.inputContainer.style.position="absolute",c.inputContainer.style.zIndex=1e5,l.container.appendChild(c.inputContainer),c.inputContainer.setPos=function(e,i){c.inputContainer.style.left=e+"px",c.inputContainer.style.top=i+"px"},t.stage.on("resize",null,e._onStageResize),E.window.tt.onWindowResize&&E.window.tt.onWindowResize((function(e){E.window.dispatchEvent&&E.window.dispatchEvent("resize")})),g._soundClass=x,g._musicClass=x;var i=E.systemInfo.model,n=E.systemInfo.system;-1!=i.indexOf("iPhone")&&(l.onIPhone=!0,l.onIOS=!0,l.onIPad=!0,l.onAndroid=!1),-1==n.indexOf("Android")&&-1==n.indexOf("Adr")||(l.onAndroid=!0,l.onIPhone=!1,l.onIOS=!1,l.onIPad=!1)},e._onStageResize=function(){t.stage._canvasTransform.identity().scale(l.width/v.canvas.width/m.getPixelRatio(),l.height/v.canvas.height/m.getPixelRatio())},e.inputFocus=function(e){var i=c.inputElement.target;i&&!i.editable||(E.window.tt.offKeyboardConfirm(),E.window.tt.offKeyboardInput(),E.window.tt.showKeyboard({defaultValue:i.text,maxLength:i.maxChars,multiple:i.multiline,confirmHold:!0,confirmType:"done",success:function(e){},fail:function(e){}}),E.window.tt.onKeyboardConfirm((function(e){var t=e?e.value:"";i.text=t,i.event("input"),laya.tt.mini.MiniInput.inputEnter()})),E.window.tt.onKeyboardInput((function(e){var t=e?e.value:"";i.multiline||-1==t.indexOf("\n")?(i.text=t,i.event("input")):laya.tt.mini.MiniInput.inputEnter()})))},e.inputEnter=function(){c.inputElement.target.focus=!1},e.inputblur=function(){e.hideKeyboard()},e.hideKeyboard=function(){E.window.tt.offKeyboardConfirm(),E.window.tt.offKeyboardInput(),E.window.tt.hideKeyboard({success:function(e){console.log("隐藏键盘")},fail:function(e){console.log("隐藏键盘出错:"+(e?e.errMsg:""))}})},e}(),L=function(){function e(){}return o(e,"laya.tt.mini.MiniLocalStorage",null,"MiniLocalStorage$8"),e.__init__=function(){e.items=e},e.setItem=function(e,i){try{E.window.tt.setStorageSync(e,i)}catch(t){E.window.tt.setStorage({key:e,data:i})}},e.getItem=function(e){return E.window.tt.getStorageSync(e)},e.setJSON=function(i,t){e.setItem(i,t)},e.getJSON=function(i){return e.getItem(i)},e.removeItem=function(e){E.window.tt.removeStorageSync(e)},e.clear=function(){E.window.tt.clearStorageSync()},e.getStorageInfoSync=function(){try{var e=E.window.tt.getStorageInfoSync();return console.log(e.keys),console.log(e.currentSize),console.log(e.limitSize),e}catch(e){}return null},e.support=!0,e.items=null,e}(),E=(function(){function e(){}o(e,"laya.tt.mini.MiniLocation",null,"MiniLocation$8"),e.__init__=function(){E.window.navigator.geolocation.getCurrentPosition=e.getCurrentPosition,E.window.navigator.geolocation.watchPosition=e.watchPosition,E.window.navigator.geolocation.clearWatch=e.clearWatch},e.getCurrentPosition=function(e,i,t){var n;(n={}).success=function(i){null!=e&&e(i)},n.fail=i,E.window.tt.getLocation(n)},e.watchPosition=function(i,n,o){var a;return e._curID++,(a={}).success=i,a.error=n,e._watchDic[e._curID]=a,t.timer.loop(1e3,null,e._myLoop),e._curID},e.clearWatch=function(i){delete e._watchDic[i],e._hasWatch()||t.timer.clear(null,e._myLoop)},e._hasWatch=function(){var i;for(i in e._watchDic)if(e._watchDic[i])return!0;return!1},e._myLoop=function(){e.getCurrentPosition(e._mySuccess,e._myError)},e._mySuccess=function(i){var t,n={};for(t in n.coords=i,n.timestamp=l.now(),e._watchDic)e._watchDic[t].success&&e._watchDic[t].success(n)},e._myError=function(i){var t;for(t in e._watchDic)e._watchDic[t].error&&e._watchDic[t].error(i)},e._watchDic={},e._curID=0}(),function(){function i(){}return o(i,"laya.tt.mini.TTMiniAdapter"),i.getJson=function(e){return JSON.parse(e)},i.init=function(n,o){if(void 0===n&&(n=!1),void 0===o&&(o=!1),!i._inited&&(i._inited=!0,i.window=e,i.window.hasOwnProperty("tt")&&!(i.window.navigator.userAgent.indexOf("MiniGame")<0))){i.isZiYu=o,i.isPosMsgYu=n,i.EnvConfig={};try{laya.webgl.resource.WebGLCanvas.premulAlpha=!0}catch(e){}if(i.isZiYu||(_.setNativeFileDir("/layaairGame"),_.existDir(_.fileNativeDir,d.create(i,i.onMkdirCallBack))),i.systemInfo=i.window.tt.getSystemInfoSync(),"ios 10.1.1"===i.systemInfo.system.toLowerCase())try{laya.webgl.resource.WebGLCharImage.canUseCanvas=!1}catch(e){}i.window.focus=function(){},t._getUrlPath=function(){},t.getUrlPath=function(){},i.window.logtime=function(e){},i.window.alertTimeLog=function(e){},i.window.resetShareInfo=function(){},i.window.CanvasRenderingContext2D=function(){},i.window.CanvasRenderingContext2D.prototype=i.window.tt.createCanvas().getContext("2d").__proto__,i.window.document.body.appendChild=function(){},i.EnvConfig.pixelRatioInt=0,m.getPixelRatio=i.pixelRatio,i._preCreateElement=l.createElement,l.createElement=i.createElement,m.createShaderCondition=i.createShaderCondition,w.parseXMLFromString=i.parseXMLFromString,c._createInputElement=C._createInputElement,i.EnvConfig.load=f.prototype.load,f.prototype.load=b.prototype.load,f.prototype._loadImage=F.prototype._loadImage,h._baseClass=L,L.__init__(),i.openCtx=i.window.tt.getOpenDataContext(),i.onReciveData(),s.useRetinalCanvas=!0}},i.onReciveData=function(){laya.tt.mini.TTMiniAdapter.isZiYu&&i.window.tt.onMessage((function(e){"opendatacontext"==e.isLoad?e.url&&(_.ziyuFileData[e.url]=e.atlasdata,_.ziyuFileTextureData[e.imgReadyUrl]=e.imgNativeUrl):"openJsondatacontext"==e.isLoad?e.url&&(_.ziyuFileData[e.url]=e.atlasdata):"openJsondatacontextPic"==e.isLoad&&(_.ziyuFileTextureData[e.imgReadyUrl]=e.imgNativeUrl)}))},i.measureText=function(e){var t=i._measureText(e);return t||(t={width:16},console.warn("-------微信获取文字宽度失败----等待修复---------")),t},i.getUrlEncode=function(e,i){return"arraybuffer"==i?"":"utf8"},i.downLoadFile=function(e,i,t,n){void 0===i&&(i=""),void 0===n&&(n="utf8"),_.getFileInfo(e)?null!=t&&t.runWith([0]):_.downLoadFile(e,i,t,n)},i.remove=function(e,i){_.deleteFile("",e,i,"",0)},i.removeAll=function(){_.deleteAll()},i.hasNativeFile=function(e){return _.isLocalNativeFile(e)},i.getFileInfo=function(e){return _.getFileInfo(e)},i.getFileList=function(){return _.filesListObj},i.exitMiniProgram=function(){i.window.tt.exitMiniProgram()},i.onMkdirCallBack=function(e,i){e||(_.filesListObj=JSON.parse(i.data),_.fakeObj=JSON.parse(i.data))},i.pixelRatio=function(){if(!i.EnvConfig.pixelRatioInt)try{return i.EnvConfig.pixelRatioInt=i.systemInfo.pixelRatio,i.systemInfo.pixelRatio}catch(e){}return i.EnvConfig.pixelRatioInt},i.createElement=function(e){var t;if("canvas"==e)return 1==i.idx?i.isZiYu?(t=i.window.sharedCanvas).style={}:t=i.window.canvas:t=i.window.tt.createCanvas(),i.idx++,t;if("textarea"==e||"input"==e)return i.onCreateInput(e);if("div"==e){var n=i._preCreateElement(e);return n.contains=function(e){return null},n.removeChild=function(e){},n}return i._preCreateElement(e)},i.onCreateInput=function(e){var t=i._preCreateElement(e);return t.focus=C.inputFocus,t.blur=C.inputblur,t.style={},t.value=0,t.parentElement={},t.placeholder={},t.type={},t.setColor=function(e){},t.setType=function(e){},t.setFontFace=function(e){},t.addEventListener=function(e){},t.contains=function(e){return null},t.removeChild=function(e){},t},i.createShaderCondition=function(e){var i=this;return function(){return i[e.replace("this.","")]}},i.sendAtlasToOpenDataContext=function(e){if(!laya.tt.mini.TTMiniAdapter.isZiYu){var t=f.getRes(y.formatURL(e));if(!t)throw"传递的url没有获取到对应的图集数据信息，请确保图集已经过！";if(t.meta.image.split(","),t.meta&&t.meta.image)for(var n=t.meta.image.split(","),o=e.indexOf("/")>=0?"/":"\\",a=e.lastIndexOf(o),l=a>=0?e.substr(0,a+1):"",s=0,r=n.length;s<r;s++)n[s]=l+n[s];else n=[e.replace(".json",".png")];for(s=0;s<n.length;s++){var u=n[s];i.postInfoToContext(e,u,t)}}},i.postInfoToContext=function(e,t,n){var o={frames:n.frames,meta:n.meta},a=t,l=_.getFileInfo(y.formatURL(t));if(l)var s=l.md5,r=_.getFileNativePath(s);else r=a;if(!r)throw"获取图集的磁盘url路径不存在！";i.openCtx.postMessage({url:e,atlasdata:o,imgNativeUrl:r,imgReadyUrl:a,isLoad:"opendatacontext"})},i.sendSinglePicToOpenDataContext=function(e){var t=y.formatURL(e),n=_.getFileInfo(t);if(n){var o=n.md5,a=_.getFileNativePath(o);e=t}else a=e;if(!a)throw"获取图集的磁盘url路径不存在！";i.openCtx.postMessage({url:e,imgNativeUrl:a,imgReadyUrl:e,isLoad:"openJsondatacontextPic"})},i.sendJsonDataToDataContext=function(e){if(!laya.tt.mini.TTMiniAdapter.isZiYu){var t=f.getRes(e);if(!t)throw"传递的url没有获取到对应的图集数据信息，请确保图集已经过！";i.openCtx.postMessage({url:e,atlasdata:t,isLoad:"openJsondatacontext"})}},i.EnvConfig=null,i.window=null,i._preCreateElement=null,i._inited=!1,i.systemInfo=null,i.isZiYu=!1,i.isPosMsgYu=!1,i.autoCacheFile=!0,i.minClearSize=5242880,i.subNativeFiles=null,i.subNativeheads=[],i.subMaps=[],i.AutoCacheDownFile=!1,i.openCtx=null,i._measureText=null,i.parseXMLFromString=function(i){var t;i=i.replace(/>\s+</g,"><");try{t=(new e.Parser.DOMParser).parseFromString(i,"text/xml")}catch(e){throw"需要引入xml解析库文件"}return t},i.idx=1,n(i,["nativefiles",function(){return this.nativefiles=["layaNativeDir","wxlocal"]}]),i}()),b=(function(e){function i(){i.__super.call(this)}o(i,"laya.tt.mini.MiniAccelerator",e,"MiniAccelerator$8");var t=i.prototype;t.on=function(t,n,o,a){return e.prototype.on.call(this,t,n,o,a),i.startListen(this.onDeviceOrientationChange),this},t.off=function(t,n,o,a){return void 0===a&&(a=!1),this.hasListener(t)||i.stopListen(),e.prototype.off.call(this,t,n,o,a)},i.__init__=function(){try{var e;if(!(e=laya.device.motion.Accelerator))return;e.prototype.on=i.prototype.on,e.prototype.off=i.prototype.off}catch(e){}},i.startListen=function(e){if(i._callBack=e,!i._isListening){i._isListening=!0;try{E.window.wx.onAccelerometerChange(laya.tt.mini.MiniAccelerator.onAccelerometerChange)}catch(e){}}},i.stopListen=function(){i._isListening=!1;try{E.window.wx.stopAccelerometer({})}catch(e){}},i.onAccelerometerChange=function(e){var t;(t={}).acceleration=e,t.accelerationIncludingGravity=e,t.rotationRate={},null!=i._callBack&&i._callBack(t)},i._isListening=!1,i._callBack=null}(r),function(e){function i(){i.__super.call(this)}o(i,"laya.tt.mini.MiniLoader",e,"MiniLoader$8");var t=i.prototype;return t.load=function(e,t,n,o,a){void 0===n&&(n=!0),void 0===a&&(a=!1);var l=this;if(l._url=e,0===e.indexOf("data:image")?l._type=t="image":l._type=t||(t=l.getTypeFromUrl(e)),l._cache=n,l._data=null,!a&&f.loadedMap[y.formatURL(e)])return l._data=f.loadedMap[y.formatURL(e)],this.event("progress",1),void this.event("complete",l._data);if(null!=f.parserMap[t])return l._customParse=!0,void(f.parserMap[t]instanceof laya.utils.Handler?f.parserMap[t].runWith(this):f.parserMap[t].call(null,this));var s=E.getUrlEncode(e,t),r=w.getFileExtension(e);if(-1!=i._fileTypeArr.indexOf(r)||"image"==t)E.EnvConfig.load.call(this,e,t,n,o,a);else{if(E.isZiYu&&!_.ziyuFileData[e]&&(e=y.formatURL(e)),E.isZiYu&&_.ziyuFileData[e]){var u=_.ziyuFileData[e];return void l.onLoaded(u)}if(_.getFileInfo(y.formatURL(e))){var c=_.getFileInfo(y.formatURL(e));c.encoding=null==c.encoding?"utf8":c.encoding;var h=_.getFileNativePath(c.md5);_.readFile(h,c.encoding,new d(i,i.onReadNativeCallBack,[s,e,t,n,o,a,l]),y.formatURL(e))}else{if(_.isLocalNativeFile(e)){if(E.subNativeFiles&&0==E.subNativeheads.length)for(var v in E.subNativeFiles){var m=E.subNativeFiles[v];E.subNativeheads=E.subNativeheads.concat(m);for(var p=0;p<m.length;p++)E.subMaps[m[p]]=v+"/"+m[p]}if(E.subNativeFiles&&-1!=e.indexOf("/")){var g=e.split("/")[0]+"/";if(g&&-1!=E.subNativeheads.indexOf(g)){var F=E.subMaps[g];e=e.replace(g,F)}}return void("sound"==t?l._loadSound(e):_.read(e,s,new d(i,i.onReadNativeCallBack,[s,e,t,n,o,a,l])))}var C=e;-1!=y.formatURL(e).indexOf(E.window.tt.env.USER_DATA_PATH)||-1==e.indexOf("http://")&&-1==e.indexOf("https://")||E.AutoCacheDownFile?(c=_.getFileInfo(e))?(c.encoding=null==c.encoding?"utf8":c.encoding,_.readFile(c.url,s,new d(i,i.onReadNativeCallBack,[s,e,t,n,o,a,l]),e)):"image"==l.type||"htmlimage"==l.type?E.EnvConfig.load.call(l,e,t,n,o,a):(e=y.formatURL(e),"image"!=t&&(-1==e.indexOf("http://")&&-1==e.indexOf("https://")||_.isLocalNativeFile(e))?_.readFile(e,s,new d(i,i.onReadNativeCallBack,[s,e,t,n,o,a,l]),e):_.downFiles(encodeURI(e),s,new d(i,i.onReadNativeCallBack,[s,e,t,n,o,a,l]),e,!0)):"sound"==t?l._loadSound(e):E.EnvConfig.load.call(l,C,t,n,o,a)}}},t._loadSound=function(e){var t,n=this;if(_.isLocalNativeFile(e)){var o=""!=y.rootPath?y.rootPath:y.basePath,a=e;""==o||-1==e.indexOf("http://")&&-1==e.indexOf("https://")||(t=e.split(o)[1]),t||(t=a),laya.tt.mini.MiniLoader.onDownLoadCallBack(e,n,0)}else{var l=y.formatURL(e);!_.isLocalNativeFile(e)&&-1==l.indexOf("http://")&&-1==l.indexOf("https://")||-1!=l.indexOf(E.window.tt.env.USER_DATA_PATH)?laya.tt.mini.MiniLoader.onDownLoadCallBack(e,n,0):_.downOtherFiles(encodeURI(l),d.create(i,laya.tt.mini.MiniLoader.onDownLoadCallBack,[l,n]),l)}},i.onDownLoadCallBack=function(e,i,t,n){if(t)i.event("error","Load sound failed");else{var o;if(E.autoCacheFile)if(n)o=n;else if(_.isLocalNativeFile(e)){var a=""!=y.rootPath?y.rootPath:y.basePath,l=e;""==a||-1==e.indexOf("http://")&&-1==e.indexOf("https://")||(o=e.split(a)[1]),o||(o=l)}else{var s=_.getFileInfo(e);if(s&&s.md5){var r=s.md5;o=_.getFileNativePath(r)}else o=e}e=o;var u=new g._soundClass;u.load(encodeURI(e)),i.onLoaded(u)}},i.onReadNativeCallBack=function(e,i,t,n,o,a,l,s,r){var u;void 0===n&&(n=!0),void 0===a&&(a=!1),void 0===s&&(s=0),s?1==s&&(console.log("-----------本地加载失败，尝试外网加载----url:"+i),E.EnvConfig.load.call(l,i,t,n,o,a)):(u="json"==t||"atlas"==t?E.getJson(r.data):"xml"==t?w.parseXMLFromString(r.data):r.data,!E.isZiYu&&E.isPosMsgYu&&"arraybuffer"!=t&&E.window.tt&&E.window.tt.postMessage({url:i,data:u,isLoad:"filedata"}),l.onLoaded(u))},n(i,["_fileTypeArr",function(){return this._fileTypeArr=["png","jpg","bmp","jpeg","gif"]}]),i}(r)),x=function(e){function i(){this._sound=null,this.url=null,this.loaded=!1,this.readyUrl=null,i.__super.call(this)}o(i,"laya.tt.mini.MiniSound",e,"MiniSound$8");var t=i.prototype;return t.load=function(e){if(_.isLocalNativeFile(e)){if(-1!=e.indexOf("http://")||-1!=e.indexOf("https://"))if(""!=_.loadPath)e=e.split(_.loadPath)[1];else{var t=""!=y.rootPath?y.rootPath:y.basePath;""!=t&&(e=e.split(t)[1])}}else e=y.formatURL(e);if(this.url=e,this.readyUrl=e,i._audioCache[this.readyUrl])this.event("complete");else if(E.autoCacheFile&&_.getFileInfo(e))this.onDownLoadCallBack(e,0);else if(E.autoCacheFile)if(_.isLocalNativeFile(e)){var n=e;if(""!=(t=""!=y.rootPath?y.rootPath:y.basePath)&&(e=e.split(t)[1]),e||(e=n),E.subNativeFiles&&0==E.subNativeheads.length)for(var o in E.subNativeFiles){var a=E.subNativeFiles[o];E.subNativeheads=E.subNativeheads.concat(a);for(var l=0;l<a.length;l++)E.subMaps[a[l]]=o+"/"+a[l]}if(E.subNativeFiles&&-1!=e.indexOf("/")){var s=e.split("/")[0]+"/";if(s&&-1!=E.subNativeheads.indexOf(s)){var r=E.subMaps[s];e=e.replace(s,r)}}this.onDownLoadCallBack(e,0)}else _.downOtherFiles(encodeURI(e),d.create(this,this.onDownLoadCallBack,[e]),e);else this.onDownLoadCallBack(e,0)},t.onDownLoadCallBack=function(e,t){if(t)this.event("error");else{var n;if(E.autoCacheFile){if(_.isLocalNativeFile(e)){var o=""!=y.rootPath?y.rootPath:y.basePath,a=e;""==o||-1==e.indexOf("http://")&&-1==e.indexOf("https://")||(n=e.split(o)[1]),n||(n=a)}else{var l=_.getFileInfo(e);if(l&&l.md5){var s=l.md5;n=_.getFileNativePath(s)}else n=encodeURI(e)}this._sound=i._createSound(),this._sound.src=this.url=n}else this._sound=i._createSound(),this._sound.src=encodeURI(e);this._sound.onCanplay(i.bindToThis(this.onCanPlay,this)),this._sound.onError(i.bindToThis(this.onError,this))}},t.onError=function(e){this.event("error"),this._sound.offError(null)},t.onCanPlay=function(){this.loaded=!0,this.event("complete"),this._sound.offCanplay(null)},t.play=function(e,t){var n;if(void 0===e&&(e=0),void 0===t&&(t=0),this.url==g._tMusic?(i._musicAudio||(i._musicAudio=i._createSound()),n=i._musicAudio):n=i._audioCache[this.readyUrl]?i._audioCache[this.readyUrl]._sound:i._createSound(),E.autoCacheFile&&_.getFileInfo(this.url)){var o=_.getFileInfo(this.url).md5;n.src=this.url=_.getFileNativePath(o)}else n.src=encodeURI(this.url);var a=new O(n,this);return a.url=this.url,a.loops=t,a.loop=0===t,a.startTime=e,a.play(),g.addChannel(a),a},t.dispose=function(){var e=i._audioCache[this.readyUrl];e&&(e.src="",e._sound&&(e._sound.destroy(),e._sound=null,e=null),delete i._audioCache[this.readyUrl]),this._sound&&(this._sound.destroy(),this._sound=null),this.url=this.readyUrl=null},a(0,t,"duration",(function(){return this._sound.duration})),i._createSound=function(){return i._id++,E.window.tt.createInnerAudioContext()},i.bindToThis=function(e,i){return e.bind(i)},i._musicAudio=null,i._id=0,i._audioCache={},i}(r),O=function(e){function i(e,t){this._audio=null,this._onEnd=null,this._miniSound=null,i.__super.call(this),this._audio=e,this._miniSound=t,this._onEnd=i.bindToThis(this.__onEnd,this),e.onEnded(this._onEnd)}o(i,"laya.tt.mini.MiniSoundChannel",e,"MiniSoundChannel$8");var n=i.prototype;return n.__onEnd=function(){if(1==this.loops)return this.completeHandler&&(t.timer.once(10,this,this.__runComplete,[this.completeHandler],!1),this.completeHandler=null),this.stop(),void this.event("complete");this.loops>0&&this.loops--,this.startTime=0,this.play()},n.play=function(){this.isStopped=!1,g.addChannel(this),this._audio.play()},n.stop=function(){this.isStopped=!0,g.removeChannel(this),this.completeHandler=null,this._audio&&(this._audio.stop(),this._audio.offEnded(null),this._audio.destroy(),this._audio=null,this._miniSound=null,this._onEnd=null)},n.pause=function(){this.isStopped=!0,this._audio.pause()},n.resume=function(){this._audio&&(this.isStopped=!1,g.addChannel(this),this._audio.play())},a(0,n,"startTime",null,(function(e){this._audio&&(this._audio.startTime=e)})),a(0,n,"autoplay",(function(){return this._audio.autoplay}),(function(e){this._audio.autoplay=e})),a(0,n,"position",(function(){return this._audio?this._audio.currentTime:0})),a(0,n,"duration",(function(){return this._audio?this._audio.duration:0})),a(0,n,"loop",(function(){return this._audio.loop}),(function(e){this._audio.loop=e})),a(0,n,"volume",(function(){return this._audio?this._audio.volume:1}),(function(e){this._audio&&(this._audio.volume=e)})),i.bindToThis=function(e,i){return e.bind(i)},i}(p);!function(){function e(e,i){this.videoend=!1,this.videourl="",this.videoElement=null,this.onPlayFunc=null,this.onEndedFunC=null,this._duration=NaN,this.position=NaN,void 0===e&&(e=320),void 0===i&&(i=240),this.videoElement=E.window.tt.createVideo({width:e,height:i,autoplay:!0})}o(e,"laya.tt.mini.MiniVideo",null,"MiniVideo$6");var i=e.prototype;i.on=function(e,i,t){"loadedmetadata"==e?(this.onPlayFunc=t.bind(i),this.videoElement.onPlay=this.onPlayFunction.bind(this)):"ended"==e&&(this.onEndedFunC=t.bind(i),this.videoElement.onEnded=this.onEndedFunction.bind(this)),this.videoElement.onTimeUpdate=this.onTimeUpdateFunc.bind(this)},i.onTimeUpdateFunc=function(e){this.position=e.position,this._duration=e.duration},i.onPlayFunction=function(){this.videoElement&&(this.videoElement.readyState=200),console.log("=====视频加载完成========"),null!=this.onPlayFunc&&this.onPlayFunc()},i.onEndedFunction=function(){this.videoElement&&(this.videoend=!0,console.log("=====视频播放完毕========"),null!=this.onEndedFunC&&this.onEndedFunC())},i.off=function(e,i,t){"loadedmetadata"==e?(this.onPlayFunc=t.bind(i),this.videoElement.offPlay=this.onPlayFunction.bind(this)):"ended"==e&&(this.onEndedFunC=t.bind(i),this.videoElement.offEnded=this.onEndedFunction.bind(this))},i.load=function(e){this.videoElement&&(this.videoElement.src=e)},i.play=function(){this.videoElement&&(this.videoend=!1,this.videoElement.play())},i.pause=function(){this.videoElement&&(this.videoend=!0,this.videoElement.pause())},i.size=function(e,i){this.videoElement&&(this.videoElement.width=e,this.videoElement.height=i)},i.destroy=function(){this.videoElement&&this.videoElement.destroy(),this.videoElement=null,this.onEndedFunC=null,this.onPlayFunc=null,this.videoend=!1,this.videourl=null},i.reload=function(){this.videoElement&&(this.videoElement.src=this.videourl)},a(0,i,"duration",(function(){return this._duration})),a(0,i,"paused",(function(){return!!this.videoElement&&this.videoElement.paused})),a(0,i,"loop",(function(){return!!this.videoElement&&this.videoElement.loop}),(function(e){this.videoElement&&(this.videoElement.loop=e)})),a(0,i,"currentTime",(function(){return this.videoElement?this.videoElement.initialTime:0}),(function(e){this.videoElement&&(this.videoElement.initialTime=e)})),a(0,i,"ended",(function(){return this.videoend})),a(0,i,"muted",(function(){return!!this.videoElement&&this.videoElement.muted}),(function(e){this.videoElement&&(this.videoElement.muted=e)})),a(0,i,"videoWidth",(function(){return this.videoElement?this.videoElement.width:0})),a(0,i,"videoHeight",(function(){return this.videoElement?this.videoElement.height:0})),a(0,i,"playbackRate",(function(){return this.videoElement?this.videoElement.playbackRate:0}),(function(e){this.videoElement&&(this.videoElement.playbackRate=e)})),a(0,i,"x",(function(){return this.videoElement?this.videoElement.x:0}),(function(e){this.videoElement&&(this.videoElement.x=e)})),a(0,i,"y",(function(){return this.videoElement?this.videoElement.y:0}),(function(e){this.videoElement&&(this.videoElement.y=e)})),a(0,i,"currentSrc",(function(){return this.videoElement.src})),e.__init__=function(){laya.device.media.Video=e}}()}(window,document,Laya),"function"==typeof define&&define.amd&&define("laya.core",["require","exports"],(function(e,i){"use strict";for(var t in Object.defineProperty(i,"__esModule",{value:!0}),Laya){var n=Laya[t];n&&n.__isclass&&(i[t]=n)}}));