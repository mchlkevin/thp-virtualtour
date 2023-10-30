(function(){
    var script = {
 "scrollBarMargin": 2,
 "id": "rootPlayer",
 "children": [
  "this.MainViewer",
  "this.Container_22BB12F4_3075_D173_4184_EC3BC4955417",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9"
 ],
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "paddingLeft": 0,
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); this.playList_66826472_7F33_F8E7_41DA_16AFA253DBE4.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "minWidth": 20,
 "scrollBarWidth": 10,
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "scripts": {
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "registerKey": function(key, value){  window[key] = value; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "unregisterKey": function(key){  delete window[key]; },
  "getKey": function(key){  return window[key]; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "existsKey": function(key){  return key in window; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } }
 },
 "downloadEnabled": false,
 "contentOpaque": false,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "height": "100%",
 "borderRadius": 0,
 "shadow": false,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "minHeight": 20,
 "borderSize": 0,
 "definitions": [{
 "class": "PlayList",
 "items": [
  "this.PanoramaPlayListItem_66856473_7F33_F8E4_41D6_B710DA572064",
  "this.PanoramaPlayListItem_66842473_7F33_F8E4_41B7_53E4A158A9C1",
  "this.PanoramaPlayListItem_66849473_7F33_F8E4_417A_7594E75495E5",
  "this.PanoramaPlayListItem_66872474_7F33_F8EC_41C1_84EFC3D965B1",
  "this.PanoramaPlayListItem_6687E474_7F33_F8EC_41AC_4FE97B55C013",
  "this.PanoramaPlayListItem_6686A474_7F33_F8EC_41D9_88265E6B93DC",
  "this.PanoramaPlayListItem_66990476_7F33_F8EC_41CA_093C76B740F9",
  "this.PanoramaPlayListItem_6699F476_7F33_F8EC_41D3_AC37F924C57C",
  "this.PanoramaPlayListItem_66869476_7F33_F8EC_41D1_FF8367EC78B2",
  "this.PanoramaPlayListItem_66997477_7F33_F8EC_41CD_4393B3491D13",
  "this.PanoramaPlayListItem_6699E477_7F33_F8EC_41DC_CE527E9D7D7D",
  "this.PanoramaPlayListItem_66984477_7F33_F8EC_41D8_FC2A55093A62",
  "this.PanoramaPlayListItem_669B3477_7F33_F8EC_41CD_3BEE8FB44D0E",
  "this.PanoramaPlayListItem_669BA478_7F33_F8E4_41C7_54C5728495C2",
  "this.PanoramaPlayListItem_669A0478_7F33_F8E4_41DD_D035B4AA1FF7",
  "this.PanoramaPlayListItem_669AE478_7F33_F8E4_41BE_66A35F791004",
  "this.PanoramaPlayListItem_669D6479_7F33_F8E4_41D4_82DE4753ECBE",
  "this.PanoramaPlayListItem_669DD479_7F33_F8E4_41D6_81C5431BBDA9",
  "this.PanoramaPlayListItem_669CB47B_7F33_F8E5_41AE_ABE102C8E353",
  "this.PanoramaPlayListItem_669F047B_7F33_F8E5_41BB_8520871B1C84",
  "this.PanoramaPlayListItem_669FF47B_7F33_F8E5_41C7_BB32F1CF4D8A",
  "this.PanoramaPlayListItem_669E747B_7F33_F8E5_41D5_7F9478A9EDF9",
  "this.PanoramaPlayListItem_669ED47C_7F33_F8DC_41C9_0519003AC3B4",
  "this.PanoramaPlayListItem_6691547C_7F33_F8DC_41DD_9E19FCE77C7D",
  "this.PanoramaPlayListItem_6690247C_7F33_F8DC_41DA_E55D570678BD",
  "this.PanoramaPlayListItem_6690947D_7F33_F8DC_41CE_9E0A6CC2268D",
  "this.PanoramaPlayListItem_6693147D_7F33_F8DC_41D8_D747AE9A294A",
  "this.PanoramaPlayListItem_6693D47D_7F33_F8DC_41D4_B1DF288A55B1",
  "this.PanoramaPlayListItem_6692B47F_7F33_F8DD_41D0_0198765874CD",
  {
   "class": "PhotoAlbumPlayListItem",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 0)",
   "media": "this.album_E12E6C23_EEB7_E326_41DF_BA102526EF51",
   "player": "this.MainViewerPhotoAlbumPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307BE642_3B03_48D5_41CD_0BD101057A2C"
  }
 ],
 "label": "Rooftop",
 "id": "panorama_307A515A_3B03_C8F4_41C4_54E6993B1850",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_C7146C11_E4A7_5D4F_4191_C62BEC28103C",
  "this.overlay_C7E595BA_E4A7_4EB2_41C8_EBB40F521FCD"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 99.79,
   "y": 457.53,
   "x": 88.68
  }
 ],
 "pitch": 0
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -163.1,
  "pitch": -10.86
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3787367E_3B02_C8AC_41CB_776E387D818B_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30791B62_3B03_78D4_41C8_03252B699D1D"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86"
  }
 ],
 "label": "Canteen (2)",
 "id": "panorama_3078E86A_3B02_F8D4_41B1_B6E830250620",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_F88DB797_E4E7_4B73_41E9_9813AD1BB561",
  "this.overlay_FAC9C6B6_E4E1_4AB2_41D1_4C4340B37BA1"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 128.2,
   "y": 766,
   "x": 891.41
  }
 ],
 "pitch": 0
},
{
 "class": "PlayList",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "class": "MapPlayListItem",
   "media": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_6682B473_7F33_F8E4_41BE_432E7E9063AD"
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59"
  }
 ],
 "label": "Rear Outdoor (1)",
 "id": "panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_FAF89F76_E4E2_FBB2_41A9_96F13BFE951E",
  "this.overlay_C4A68506_E4E2_CF52_41D3_B4580181F237",
  "this.overlay_FA47C089_E4E7_C55E_41E4_DB229CF1C4C8"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 432.73,
   "y": 535.67,
   "x": 612.97
  }
 ],
 "pitch": 0
},
{
 "paddingBottom": 0,
 "id": "window_C176CE9F_CE66_6F1A_41DC_7F1264C5F939",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Chevrolet Bel Air (1955)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66BF9465_7F33_F8EC_419F_D5BAAB7D2EB1_0",
  "this.htmlText_C176FE9F_CE66_6F1A_41BB_EB776B84E49F"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window3439"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "thumbnailUrl": "media/album_E12E6C23_EEB7_E326_41DF_BA102526EF51_t.png",
 "label": "Photo Album Slide7",
 "id": "album_E12E6C23_EEB7_E326_41DF_BA102526EF51",
 "class": "PhotoAlbum",
 "playList": "this.album_E12E6C23_EEB7_E326_41DF_BA102526EF51_AlbumPlayList"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -27.11,
  "pitch": 1.99
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -68.95,
  "pitch": -12.52
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_camera",
 "automaticZoomSpeed": 10
},
{
 "paddingBottom": 0,
 "id": "window_DD5AA638_CFBD_A2C6_41C9_88EE563CA719",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "DKW Munga (1964)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66B6646A_7F33_F8E4_41A3_4000E7B3AFF8_0",
  "this.htmlText_DD5CB638_CFBD_A2C6_41CD_8FBE1B621BFF"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window14062"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30796AA1_3B03_5857_41C3_400381D47B0A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30792973_3B03_58B4_4199_8A731C61F367"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3092CC81_3B03_7854_41C3_E9207A33602F"
  }
 ],
 "label": "Outdoor Park",
 "id": "panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_A73897BE_B6AD_B658_41CA_90996138CB81",
  "this.overlay_F292FE7D_E4A1_FDB6_41E1_C72CC1620BE6",
  "this.overlay_F29FDDE9_E4AF_5EDE_41D2_599B47F63AC8",
  "this.overlay_F2281997_E4AE_C772_41E8_A63A72C67A54",
  "this.overlay_F21BC6B8_E4A1_4ABD_41E9_1B32BC9F838B"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 342.72,
   "y": 255.19,
   "x": 766.58
  }
 ],
 "pitch": 0
},
{
 "height": 768,
 "thumbnailUrl": "media/photo_DFBE8595_CE62_7DEE_41AF_F3AB3081B915_t.jpg",
 "label": "Dodge kingswe 1954",
 "id": "photo_DFBE8595_CE62_7DEE_41AF_F3AB3081B915",
 "width": 1024,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DFBE8595_CE62_7DEE_41AF_F3AB3081B915.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30791B62_3B03_78D4_41C8_03252B699D1D"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30792973_3B03_58B4_4199_8A731C61F367"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C"
  }
 ],
 "label": "Outdoor Connector",
 "id": "panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_A607A679_B65B_76D8_41C1_71BFA805B7C7",
  "this.overlay_FAD214E2_E4E3_CED2_41E4_1050CBA2CB1D",
  "this.overlay_F9E79DE9_E4E1_5EDF_41D2_CECCBBDC2C2A",
  "this.overlay_F909C6BB_E4E7_4AB2_41D7_F4D45CF3B6F7",
  "this.overlay_F954FA9F_E4E7_4572_41D8_A04B5D88BD6D"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 118.32,
   "y": 374.47,
   "x": 655.52
  }
 ],
 "pitch": 0
},
{
 "height": 960,
 "thumbnailUrl": "media/photo_DE81EB36_CE62_552A_41E7_FACDCCE14C6D_t.jpg",
 "label": "Anglia 1956",
 "id": "photo_DE81EB36_CE62_552A_41E7_FACDCCE14C6D",
 "width": 1280,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DE81EB36_CE62_552A_41E7_FACDCCE14C6D.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "height": 768,
 "thumbnailUrl": "media/album_E12E6C23_EEB7_E326_41DF_BA102526EF51_1_t.jpg",
 "label": "Slide6",
 "id": "album_E12E6C23_EEB7_E326_41DF_BA102526EF51_1",
 "width": 1024,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E12E6C23_EEB7_E326_41DF_BA102526EF51_1.JPG",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "paddingBottom": 0,
 "id": "window_DC7D65EF_CE62_5D3A_41D9_56543F36B2B6",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Ford Zephyr (1963)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66B17466_7F33_F8EC_41A1_79A34A436A3D_0",
  "this.htmlText_DC73B5EF_CE62_5D3A_41E0_81CBCAA6A533"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window9541"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 47.19,
  "pitch": -0.44
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_camera",
 "automaticZoomSpeed": 10
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "height": 1080,
 "label": "png map",
 "id": "map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
 "width": 1275,
 "fieldOfViewOverlayRadiusScale": 0.07,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9.png",
    "class": "ImageResourceLevel",
    "width": 1275,
    "height": 1080
   },
   {
    "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_lq.png",
    "class": "ImageResourceLevel",
    "width": 278,
    "tags": "preload",
    "height": 236
   }
  ]
 },
 "overlays": [
  "this.overlay_6EFFACA4_7ECE_1899_41D2_04E2F2CC88CE",
  "this.overlay_6AB2C17E_7EDA_0869_41B8_346B0869B556",
  "this.overlay_69D6F4BB_7EFE_08EF_41D1_3A4E9062DD5B",
  "this.overlay_67FEBABF_7EF6_38E7_4171_129CCBF1E6AA",
  "this.overlay_67D5CEFF_7ECE_1867_41D6_41C23C4C3888",
  "this.overlay_64FF705F_7EDA_07A6_41CD_D5A52BED6B57",
  "this.overlay_6428987F_7EDE_3867_41DB_E1642840C188",
  "this.overlay_65D5B5B7_7EDA_08E6_41DA_EAE655C2293C",
  "this.overlay_62370C48_7ECE_7FA9_41DD_31DEACC3E5C5",
  "this.overlay_63391934_7ECA_19F9_41B7_195E1F3BCBE4",
  "this.overlay_6202534E_7ECA_09A9_41C8_9A2018ACF73A",
  "this.overlay_63199777_7EB6_0866_41CF_1C6701A6FA7C",
  "this.overlay_60F0CC88_7F4A_F8AA_41B2_34A3215A8894",
  "this.overlay_609E7EFB_7F4A_186F_41AC_8572A4818E21",
  "this.overlay_5F430AB6_7F56_18F9_41AE_47F2F9A40230",
  "this.overlay_5F798E4F_7F5A_7BA6_41D8_5D732C6EE2A9",
  "this.overlay_5E5DBA3F_7F5E_1BE6_41B2_7EFE2AA5DA11",
  "this.overlay_5BFC8968_7F5A_1869_41D6_D02A129406B7",
  "this.overlay_5C79CC62_7F5A_3F9E_41D1_CFA82A957EA9",
  "this.overlay_71F17F36_7F12_686F_4194_9C11D547CDAC",
  "this.overlay_6FB6E858_7F12_A824_41DD_440231266F80",
  "this.overlay_6DC9BB71_7F1F_A8E5_41D8_215F363F9AD6",
  "this.overlay_6D3D8369_7F12_98E5_41A1_5D3B33AED154",
  "this.overlay_6D35F60C_7F11_F83C_41D5_F72C179123CA",
  "this.overlay_6C7326B8_7F11_9864_41D3_31E00CB7AB23",
  "this.overlay_6930A04F_7F12_983C_41D7_3B3BD7EFFE82",
  "this.overlay_6B51F47F_7F32_B8DC_41D7_FD52B7EC8513",
  "this.overlay_6BE44D66_7F31_A8EC_41B4_E2F3D6D7BB32",
  "this.overlay_6AAC1EC1_7F36_A824_41DB_3450B3D2E688"
 ],
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayInsideColor": "#000000",
 "thumbnailUrl": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_t.png",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "class": "Map",
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1.2,
 "initialZoomFactor": 1
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -152.48,
  "hfov": 130,
  "pitch": -2.21
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_30791B62_3B03_78D4_41C8_03252B699D1D_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -124.44,
  "hfov": 130,
  "pitch": 10.36
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "media": "this.panorama_309572FD_3B03_49AF_41C3_53D8589DC146",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_309572FD_3B03_49AF_41C3_53D8589DC146_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "media": "this.panorama_3092CC81_3B03_7854_41C3_E9207A33602F",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3092CC81_3B03_7854_41C3_E9207A33602F_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "media": "this.panorama_30796AA1_3B03_5857_41C3_400381D47B0A",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_30796AA1_3B03_5857_41C3_400381D47B0A_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "media": "this.panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "media": "this.panorama_30792973_3B03_58B4_4199_8A731C61F367",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_30792973_3B03_58B4_4199_8A731C61F367_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "media": "this.panorama_30791B62_3B03_78D4_41C8_03252B699D1D",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_30791B62_3B03_78D4_41C8_03252B699D1D_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "media": "this.panorama_3078E86A_3B02_F8D4_41B1_B6E830250620",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "media": "this.panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "media": "this.panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "media": "this.panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "media": "this.panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "media": "this.panorama_307A515A_3B03_C8F4_41C4_54E6993B1850",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "media": "this.panorama_307BE642_3B03_48D5_41CD_0BD101057A2C",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "media": "this.panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "media": "this.panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "media": "this.panorama_3093310B_3B02_C86B_41C3_C2951B951ED9",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "media": "this.panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "media": "this.panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "media": "this.panorama_307BF505_3B03_485C_41A7_6097D0B84928",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_307BF505_3B03_485C_41A7_6097D0B84928_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "media": "this.panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 21)",
   "media": "this.panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, 22)",
   "media": "this.panorama_3787367E_3B02_C8AC_41CB_776E387D818B",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3787367E_3B02_C8AC_41CB_776E387D818B_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, 23)",
   "media": "this.panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23, 24)",
   "media": "this.panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24, 25)",
   "media": "this.panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 25, 26)",
   "media": "this.panorama_307A510B_3B03_C86B_41B9_A9C23E177918",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_307A510B_3B03_C86B_41B9_A9C23E177918_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 26, 27)",
   "media": "this.panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 27, 28)",
   "media": "this.panorama_309B7277_3B02_C8BB_415F_FC432B308E1B",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 28, 29)",
   "media": "this.panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 29, 0)",
   "class": "PhotoAlbumPlayListItem",
   "media": "this.album_E12E6C23_EEB7_E326_41DF_BA102526EF51",
   "player": "this.MainViewerPhotoAlbumPlayer"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 173.77,
  "hfov": 130,
  "pitch": 1.51
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307BF505_3B03_485C_41A7_6097D0B84928"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98"
  }
 ],
 "label": "Parking Area (2)",
 "id": "panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_CDFE03C9_E4A1_4ADE_41EC_41B4E871FE29",
  "this.overlay_CC2D13A2_E4BE_CB4D_41E1_50BA0BBD69C5"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 256.83,
   "y": 972.77,
   "x": 267.06
  }
 ],
 "pitch": 0
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98"
  }
 ],
 "label": "Exit Area",
 "id": "panorama_3093310B_3B02_C86B_41C3_C2951B951ED9",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_CDF51AE6_E4A1_7AD2_41D9_C44283F2ECA1",
  "this.overlay_CEC91DD8_E4A1_5EFE_41D4_E7752ABD262C"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 226.53,
   "y": 881.49,
   "x": 153.69
  }
 ],
 "pitch": 0
},
{
 "paddingBottom": 0,
 "id": "window_DEC61032_CF55_BECA_41B6_4416609CB916",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Jeep Gaz-69 (1962)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66B7E469_7F33_F8E4_41CB_B1996949CF49_0",
  "this.htmlText_DEC1D037_CF55_BECA_41E7_B8DA4054E5A0"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window12069"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30792973_3B03_58B4_4199_8A731C61F367"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3092CC81_3B03_7854_41C3_E9207A33602F"
  }
 ],
 "label": "Outdoor Corner",
 "id": "panorama_30796AA1_3B03_5857_41C3_400381D47B0A",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_F1206A98_E4A6_C57E_41E8_5B325C83A966",
  "this.overlay_F1B2007A_E4A1_45B2_41C2_58ED85F64BC8",
  "this.overlay_F2CB99D8_E4A3_46FD_41E3_8D3473EE512C"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 13.6,
   "y": 134.25,
   "x": 1058.4
  }
 ],
 "pitch": 0
},
{
 "paddingBottom": 0,
 "id": "window_DFF0790A_CE62_32E5_41E1_B4EAF0407208",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Ford Anglia (1956)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66BE2465_7F33_F8EC_41B4_4FDB1E1B50C3_0",
  "this.htmlText_DFFE290A_CE62_32E5_41C7_DF3CF4BF2375"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window5873"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "height": 1200,
 "thumbnailUrl": "media/photo_DE256089_CF5C_DFC7_41E4_60C09D78D6BF_t.jpg",
 "label": "Dodge fargo 1954",
 "id": "photo_DE256089_CF5C_DFC7_41E4_60C09D78D6BF",
 "width": 1600,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DE256089_CF5C_DFC7_41E4_60C09D78D6BF.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "height": 1200,
 "thumbnailUrl": "media/photo_DC6A651A_CE67_FD1A_41E0_5EFB48B2107C_t.jpg",
 "label": "Willys 1954",
 "id": "photo_DC6A651A_CE67_FD1A_41E0_5EFB48B2107C",
 "width": 1600,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DC6A651A_CE67_FD1A_41E0_5EFB48B2107C.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "height": 768,
 "thumbnailUrl": "media/album_E12E6C23_EEB7_E326_41DF_BA102526EF51_3_t.jpg",
 "label": "Slide1",
 "id": "album_E12E6C23_EEB7_E326_41DF_BA102526EF51_3",
 "width": 1024,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E12E6C23_EEB7_E326_41DF_BA102526EF51_3.JPG",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "height": 960,
 "thumbnailUrl": "media/photo_DE20A97A_CF5C_A13A_41CD_680912EFFABA_t.jpg",
 "label": "Citroen 1965",
 "id": "photo_DE20A97A_CF5C_A13A_41CD_680912EFFABA",
 "width": 1280,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DE20A97A_CF5C_A13A_41CD_680912EFFABA.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3093310B_3B02_C86B_41C3_C2951B951ED9"
  }
 ],
 "label": "Souvernier's Shop (2)",
 "id": "panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_C7548582_E4A3_CF52_41D6_646C77ADE781",
  "this.overlay_C0786EC8_E4A2_DADD_41E0_4700206DBA2E",
  "this.overlay_CED5CE6D_E4A1_5DD6_41E4_3876C574FCC6"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 40.44,
   "y": 677.59,
   "x": 183.61
  }
 ],
 "pitch": 0
},
{
 "paddingBottom": 0,
 "id": "window_DC32903A_CE62_F31A_41E3_5833C46B0715",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "DKW Munga (1963)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66B3E467_7F33_F8EC_41AC_E4AE9C83554C_0",
  "this.htmlText_DC33503A_CE62_F31A_41E7_D8BD85C54649"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window15151"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "paddingBottom": 0,
 "id": "window_DFD087D9_CF5B_E147_41E9_CD05E983DAC1",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Citro\u00ebn Dyane (1965)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66B49469_7F33_F8E4_41D4_D29601CCC27B_0",
  "this.htmlText_DFD2D7D9_CF5B_E147_41A1_15A3620F0849"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window8141"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C"
  }
 ],
 "label": "Rear Outdoor (2)",
 "id": "panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_FB3AF49B_E4E1_CD73_41BC_5587061CF762",
  "this.overlay_C650D51A_E4EE_CF72_41E3_AD906016DD5F",
  "this.overlay_C65BBF55_E4EF_5BF6_41A2_342AD35AB8E6"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 83.63,
   "y": 535.67,
   "x": 484.39
  }
 ],
 "pitch": 0
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 157.99,
  "pitch": -5.35
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162"
  }
 ],
 "label": "3D Trick Art Museum Left Corner",
 "id": "panorama_309B7277_3B02_C8BB_415F_FC432B308E1B",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_D67CCA14_E562_C576_41E3_0BF42F91908C",
  "this.overlay_D162D923_E563_C753_41CD_488872F50F3D"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": -111.53,
   "y": 852.62,
   "x": 519.17
  }
 ],
 "pitch": 0
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE"
  }
 ],
 "label": "3D Trick Art Museum Exit Area",
 "id": "panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_D75CEFE8_E57F_5ADE_41EA_47FE49C4B765",
  "this.overlay_D0941D7F_E57F_5FB2_41EB_685ED08C2483"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 200.68,
   "y": 674.04,
   "x": 481.98
  }
 ],
 "pitch": 0
},
{
 "paddingBottom": 0,
 "id": "window_A5D79B57_B6B4_BE28_41D9_34358F3E40A3",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 400,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Owl Area",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66A3B460_7F33_F8E3_41C5_F380970E9BC5_0",
  "this.htmlText_A5D1AB57_B6B4_BE28_41DF_F6FFC4E694BA"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window11378"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "height": 768,
 "thumbnailUrl": "media/album_E12E6C23_EEB7_E326_41DF_BA102526EF51_2_t.jpg",
 "label": "Slide4",
 "id": "album_E12E6C23_EEB7_E326_41DF_BA102526EF51_2",
 "width": 1024,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E12E6C23_EEB7_E326_41DF_BA102526EF51_2.JPG",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "paddingBottom": 0,
 "id": "window_DEDA5F4E_CE62_2D7A_417A_F082C68ABEFC",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Dodge Kingsway (1954)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66B07467_7F33_F8EC_419D_C20435F5B5C7_0",
  "this.htmlText_DED80F4E_CE62_2D7A_41E0_9920114ED0CC"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window13280"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "buttonNext": "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "class": "PhotoAlbumPlayer",
 "id": "MainViewerPhotoAlbumPlayer",
 "viewerArea": "this.MainViewer",
 "buttonPrevious": "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482"
},
{
 "paddingBottom": 0,
 "id": "window_DC748602_CE66_5EEA_41DF_73DD8A01E1D2",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Chevrolet Fleetmaster (1948)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66B1F466_7F33_F8EC_41A3_BB1BBF7380F8_0",
  "this.htmlText_DC76C608_CE66_5EE6_41BD_1085B0490DDA"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window11398"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "height": 960,
 "thumbnailUrl": "media/photo_DF387E87_CE65_EFEA_41E2_637169781E07_t.jpg",
 "label": "Ford zipere 1963",
 "id": "photo_DF387E87_CE65_EFEA_41E2_637169781E07",
 "width": 1280,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DF387E87_CE65_EFEA_41E2_637169781E07.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -41.33,
  "hfov": 130,
  "pitch": -5.64
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30796AA1_3B03_5857_41C3_400381D47B0A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59"
  }
 ],
 "label": "Outdoor Corner (2)",
 "id": "panorama_30792973_3B03_58B4_4199_8A731C61F367",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_A42B534D_B6B4_AE38_41E1_B8728544347C",
  "this.overlay_F3419735_E4A7_CBB6_41E6_F91B57719C56",
  "this.overlay_F34406D5_E4A1_CAF6_41DF_86061646BC16",
  "this.overlay_FD3C0BC3_E4A1_DAD2_41CE_9DCC32D401CC"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 308.57,
   "y": 125.83,
   "x": 640.82
  }
 ],
 "pitch": 0
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.55,
  "hfov": 130,
  "pitch": -4.29
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "items": [
  {
   "begin": "this.loopAlbum(this.playList_66ABB45B_7F33_F825_41D9_8E2DF4406350, 0)",
   "class": "PhotoAlbumPlayListItem",
   "media": "this.album_E12E6C23_EEB7_E326_41DF_BA102526EF51",
   "player": "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9CPhotoAlbumPlayer"
  }
 ],
 "id": "playList_66ABB45B_7F33_F825_41D9_8E2DF4406350"
},
{
 "height": 892,
 "thumbnailUrl": "media/photo_DD115EDF_CFBD_637A_41D2_057546DD21FF_t.jpg",
 "label": "PANO_20230220_142558",
 "id": "photo_DD115EDF_CFBD_637A_41D2_057546DD21FF",
 "width": 1835,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DD115EDF_CFBD_637A_41D2_057546DD21FF.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 92.88,
  "pitch": 0.83
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_camera",
 "automaticZoomSpeed": 10
},
{
 "height": 768,
 "thumbnailUrl": "media/album_E12E6C23_EEB7_E326_41DF_BA102526EF51_0_t.jpg",
 "label": "Slide7",
 "id": "album_E12E6C23_EEB7_E326_41DF_BA102526EF51_0",
 "width": 1024,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E12E6C23_EEB7_E326_41DF_BA102526EF51_0.JPG",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -52.72,
  "hfov": 130,
  "pitch": -7.14
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_camera",
 "automaticZoomSpeed": 10
},
{
 "paddingBottom": 0,
 "id": "window_DEE4C081_CF5D_5FC6_41CF_7516769A745D",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Dodge Fargo (1954)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66B70469_7F33_F8E4_4191_93B8BF61648B_0",
  "this.htmlText_DEDA9088_CF5D_5FC6_41E7_F797DB2F123F"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window10071"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 17.55,
  "hfov": 130,
  "pitch": 4.86
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_camera",
 "automaticZoomSpeed": 10
},
{
 "height": 960,
 "thumbnailUrl": "media/photo_C18BBD73_CF6B_E14B_41D8_BFB8CBF58F28_t.jpg",
 "label": "Austin 1920",
 "id": "photo_C18BBD73_CF6B_E14B_41D8_BFB8CBF58F28",
 "width": 1280,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C18BBD73_CF6B_E14B_41D8_BFB8CBF58F28.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "height": 960,
 "thumbnailUrl": "media/photo_DEB0E447_CE66_336A_41D1_5AF8D0B79E59_t.jpg",
 "label": "Chevrolet bel air 1955",
 "id": "photo_DEB0E447_CE66_336A_41D1_5AF8D0B79E59",
 "width": 1280,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DEB0E447_CE66_336A_41D1_5AF8D0B79E59.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307A510B_3B03_C86B_41B9_A9C23E177918"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_309B7277_3B02_C8BB_415F_FC432B308E1B"
  }
 ],
 "label": "3D Trick Art Museum Right Corner",
 "id": "panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_D60C7BC7_E561_7AD2_41DA_343928311F9C",
  "this.overlay_D3FD7F4E_E566_BBD2_41D6_E21CD4F515FC"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": -49.73,
   "y": 852.62,
   "x": 360.75
  }
 ],
 "pitch": 0
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -12.74,
  "hfov": 130,
  "pitch": 3.86
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_307A510B_3B03_C86B_41B9_A9C23E177918_camera",
 "automaticZoomSpeed": 10
},
{
 "height": 661,
 "thumbnailUrl": "media/photo_D40A19F3_D8FA_5279_41CB_016B98983888_t.jpg",
 "label": "Untitled-2",
 "id": "photo_D40A19F3_D8FA_5279_41CB_016B98983888",
 "width": 1024,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_D40A19F3_D8FA_5279_41CB_016B98983888.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "paddingBottom": 0,
 "id": "window_C1C67203_CF6B_A2CA_41C8_DCB2A8DC4955",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Austin Twenty (1920)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66B2C468_7F33_F8E4_41DC_530EEF5B0C9F_0",
  "this.htmlText_C1C66203_CF6B_A2CA_41B1_886684D5EDF3"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window3624"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 157.87,
  "hfov": 130,
  "pitch": -0.65
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3092CC81_3B03_7854_41C3_E9207A33602F_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 56.43,
  "hfov": 130,
  "pitch": -1.17
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86"
  }
 ],
 "label": "Transportation Museum (2)",
 "id": "panorama_3787367E_3B02_C8AC_41CB_776E387D818B",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_5852E39C_485D_6417_41B5_E09B13852909",
  "this.overlay_DFDB46DB_CE62_5F1A_41E8_3D2EFDE9906B",
  "this.overlay_DC706E31_CE66_6F26_41D6_86689ABFB58A",
  "this.overlay_C1DB5CD1_CF6C_A746_41D9_3FF6BE9B99F0",
  "this.overlay_C0A75E0F_CF57_62DA_41C8_5BD3944F9EA5",
  "this.overlay_C8163AE2_E562_DAD2_41C8_651A7AAC5210",
  "this.overlay_C990EC74_E561_7DB6_417E_3911EC35D448"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 174.96,
   "y": 849.5,
   "x": 582.32
  }
 ],
 "pitch": 0
},
{
 "height": 768,
 "thumbnailUrl": "media/photo_DFE57A5B_CE65_D71A_41E2_8DAD3A4BD704_t.jpg",
 "label": "Chevrolet flatmaster 1948",
 "id": "photo_DFE57A5B_CE65_D71A_41E2_8DAD3A4BD704",
 "width": 1024,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DFE57A5B_CE65_D71A_41E2_8DAD3A4BD704.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 63.28,
  "pitch": 5.2
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 22.75,
  "hfov": 130,
  "pitch": -0.95
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_camera",
 "automaticZoomSpeed": 10
},
{
 "paddingBottom": 0,
 "id": "window_DF1BDE3B_CE6E_2F1A_41B5_4E58D8F4AEE8",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Ford Zephyr (1962)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66BEA466_7F33_F8EC_41AF_5A3C891A0295_0",
  "this.htmlText_DF1DCE3B_CE6E_2F1A_41D0_B0FB72C6F71D"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window7699"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -152.68,
  "hfov": 130,
  "pitch": 1.9
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_30792973_3B03_58B4_4199_8A731C61F367_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 69.51,
  "hfov": 130,
  "pitch": 4.89
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_camera",
 "automaticZoomSpeed": 10
},
{
 "height": 1200,
 "thumbnailUrl": "media/photo_DE57711A_CF55_FEFA_41DE_9EEC5461853E_t.jpg",
 "label": "Gazz russia 1962",
 "id": "photo_DE57711A_CF55_FEFA_41DE_9EEC5461853E",
 "width": 1600,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DE57711A_CF55_FEFA_41DE_9EEC5461853E.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_309572FD_3B03_49AF_41C3_53D8589DC146"
  }
 ],
 "label": "Parking Area (3)",
 "id": "panorama_307BF505_3B03_485C_41A7_6097D0B84928",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_CE6EB5A0_E4BE_CF4D_41C2_470780D10483",
  "this.overlay_D4CC4000_E4A1_C54E_41B8_042C21B64000",
  "this.overlay_CEEC9CAB_E4A1_BD53_41D2_13101BC03298"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 904.02,
   "x": 1012.34
  }
 ],
 "pitch": 0
},
{
 "class": "MapPlayer",
 "id": "MapViewerMapPlayer",
 "viewerArea": "this.MapViewer",
 "movementMode": "constrained"
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_309572FD_3B03_49AF_41C3_53D8589DC146"
  }
 ],
 "label": "Parking Area Entrance",
 "id": "panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_E46C7CA5_EB69_A9FF_41E3_5030900954F5",
  "this.overlay_FA0CC0FF_EB69_594C_41EB_4FB52D115C7A"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 76.06,
   "y": 992.34,
   "x": 923.29
  }
 ],
 "pitch": 0
},
{
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "buttonCardboardView": "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "mouseControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "gyroscopeVerticalDraggingEnabled": true
},
{
 "paddingBottom": 0,
 "id": "window_DFED5F53_CF57_A14B_41AB_0D13D68D4841",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Morris Minor (1963)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66B55468_7F33_F8E4_41DE_01078AC8D98F_0",
  "this.htmlText_DFEB7F54_CF57_A14D_410D_4DFF7B8D53C0"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window5492"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653"
  }
 ],
 "label": "3D Trick Art Museum (2)",
 "id": "panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_D2763B56_E563_BBF2_41D4_4C5E312BAD97",
  "this.overlay_D6CC0642_E562_CDCD_41EB_DCF78D468093"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 301.23,
   "y": 762.56,
   "x": 478.8
  }
 ],
 "pitch": 0
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 140.06,
  "hfov": 130,
  "pitch": -4.8
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_309572FD_3B03_49AF_41C3_53D8589DC146_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307A515A_3B03_C8F4_41C4_54E6993B1850"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0"
  }
 ],
 "label": "Rear Outdoor (3)",
 "id": "panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_C5CCAD59_E49F_5FFE_41EB_2670F835032B",
  "this.overlay_C69CB0A6_E49E_C552_41E8_C1EE1D3F0799",
  "this.overlay_C04FAD94_E4A1_FF76_4199_4F354066AB83"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 194.24,
   "y": 533.38,
   "x": 220.42
  }
 ],
 "pitch": 0
},
{
 "height": 1200,
 "thumbnailUrl": "media/photo_DFA7449C_CE62_331D_41E6_E089DEAB466F_t.jpg",
 "label": "Dkw munga 1963",
 "id": "photo_DFA7449C_CE62_331D_41E6_E089DEAB466F",
 "width": 1600,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DFA7449C_CE62_331D_41E6_E089DEAB466F.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -161.69,
  "hfov": 130,
  "pitch": 2.12
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_camera",
 "automaticZoomSpeed": 10
},
{
 "buttonNext": "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "class": "PhotoAlbumPlayer",
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9CPhotoAlbumPlayer",
 "viewerArea": "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "buttonPrevious": "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -139.15,
  "hfov": 130,
  "pitch": 0.9
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_30796AA1_3B03_5857_41C3_400381D47B0A_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C"
  }
 ],
 "label": "Souvernier's Shop ",
 "id": "panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_CD4ACF14_E4AF_DB76_41E4_0886701487B8",
  "this.overlay_CC0435E9_E4A3_4EDE_41E1_DF0E6349A643"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 200.73,
   "y": 680.51,
   "x": 576.28
  }
 ],
 "pitch": 0
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653"
  }
 ],
 "label": "3D Trick Art Museum (End Point)",
 "id": "panorama_307A510B_3B03_C86B_41B9_A9C23E177918",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_D4A2B8EC_E561_46D6_41E0_2C984A797805"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 72.79,
   "y": 799.02,
   "x": 328.02
  }
 ],
 "pitch": 0
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3787367E_3B02_C8AC_41CB_776E387D818B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653"
  }
 ],
 "label": "Transportation Museum (3)",
 "id": "panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_DF48B047_CF5B_DF4A_41E7_0435237144CA",
  "this.overlay_DFD62013_CF5D_BECA_41B9_2EFF963337B6",
  "this.overlay_DE7A10B3_CF55_7FCB_41E9_AC04D7DD0128",
  "this.overlay_DE611047_CFBD_FF4A_41D5_9476B020D9F7",
  "this.overlay_C8F2B6EA_E561_CAD2_41E8_9ACB91CE35B7",
  "this.overlay_CB04A62C_E562_CD55_41CD_A3171783288B"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 157.39,
   "y": 728.76,
   "x": 564.59
  }
 ],
 "pitch": 0
},
{
 "height": 960,
 "thumbnailUrl": "media/photo_DF39C624_CF57_E2CE_41D9_6477D4D9D1B1_t.jpg",
 "label": "Moris minor 1963",
 "id": "photo_DF39C624_CF57_E2CE_41D9_6477D4D9D1B1",
 "width": 1280,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DF39C624_CF57_E2CE_41D9_6477D4D9D1B1.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30791B62_3B03_78D4_41C8_03252B699D1D"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307BF505_3B03_485C_41A7_6097D0B84928"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3092CC81_3B03_7854_41C3_E9207A33602F"
  }
 ],
 "label": "Entrance",
 "id": "panorama_309572FD_3B03_49AF_41C3_53D8589DC146",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_F600A643_E4A1_4DD3_41BA_41E97A7BFDEF",
  "this.overlay_F04A8B16_E4A1_5B72_41E7_881E43E0791A",
  "this.overlay_F70F8D23_E4A3_7F53_41EC_61B6F2E1409D"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": -175.9,
   "y": 545.65,
   "x": 1058.4
  }
 ],
 "pitch": 0
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 166.05,
  "hfov": 130,
  "pitch": -1.19
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_camera",
 "automaticZoomSpeed": 10
},
{
 "paddingBottom": 0,
 "id": "window_DCC50BEA_CE66_3525_41CF_8D17656AD92A",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 600,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Ford Crew Cab (1940)",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66B25468_7F33_F8E4_41DB_47FB612648E1_0",
  "this.htmlText_DCC75BEA_CE66_3525_41D4_FBC830B01DA3"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window17040"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "paddingBottom": 0,
 "id": "window_A4139450_B65B_AA28_41DB_646A8EED5307",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 400,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Owl Area",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66A47461_7F33_F8E5_41C1_509713A43A01_0",
  "this.htmlText_A40C5450_B65B_AA28_41E2_1FB769F6B2A1"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window4682"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "paddingBottom": 0,
 "id": "window_A285E061_B6AF_6AEB_41C1_CDF3B7C3609C",
 "width": 400,
 "paddingLeft": 0,
 "bodyBackgroundColorDirection": "vertical",
 "hideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonBackgroundColorRatios": [],
 "closeButtonBorderRadius": 11,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "minWidth": 20,
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "modal": true,
 "horizontalAlign": "center",
 "titleFontSize": "1.5vmin",
 "headerPaddingRight": 10,
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "bodyPaddingTop": 5,
 "height": 400,
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "backgroundColor": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "title": "Owl Area",
 "shadow": true,
 "footerHeight": 5,
 "titleFontWeight": "bold",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "class": "FadeOutEffect",
  "easing": "cubic_in_out"
 },
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "paddingRight": 0,
 "shadowHorizontalLength": 3,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.image_uid66A1A45C_7F33_F823_41C8_B9F09C084F12_0",
  "this.htmlText_A28BD066_B6AF_6AE9_41E4_82D740B00E3E"
 ],
 "veilShowEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "minHeight": 20,
 "headerPaddingTop": 10,
 "borderRadius": 5,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "showEffect": {
  "duration": 500,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window7207"
 },
 "scrollBarVisible": "rollOver",
 "headerPaddingLeft": 10,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "layout": "vertical",
 "class": "Window"
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3787367E_3B02_C8AC_41CB_776E387D818B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30791B62_3B03_78D4_41C8_03252B699D1D"
  }
 ],
 "label": "Tranportation Museum Entrance",
 "id": "panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_C0B39F47_CE66_2D6A_4183_E6CB92164A17",
  "this.overlay_DE306102_CE62_32EA_41E3_E04DBABA249A",
  "this.overlay_DEFF2AFF_CE6E_F71A_41E5_9D57849A54BC",
  "this.overlay_DE987B3B_CE62_D51B_41D3_553003EAF941",
  "this.overlay_DE91B00E_CE66_52FA_41E7_617CEFC08C0A",
  "this.overlay_DF3B7E2A_CE62_2F3A_417C_2E07D7464033",
  "this.overlay_C8D971D8_E4A3_46FE_41D7_F4F00BF36755",
  "this.overlay_CF770BE2_E4A1_7AD2_41BA_63AE8DE93BFB"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": -10.33,
   "y": 746.63,
   "x": 650.77
  }
 ],
 "pitch": 0
},
{
 "height": 960,
 "thumbnailUrl": "media/photo_DF7F6CB1_CE6E_5327_41C2_1FE00963F046_t.jpg",
 "label": "Ford zepire 1962",
 "id": "photo_DF7F6CB1_CE6E_5327_41C2_1FE00963F046",
 "width": 1280,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_DF7F6CB1_CE6E_5327_41C2_1FE00963F046.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 59.31,
  "hfov": 130,
  "pitch": -2.1
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 77.38,
  "hfov": 130,
  "pitch": -1.91
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3093310B_3B02_C86B_41C3_C2951B951ED9"
  }
 ],
 "label": "Souvernier's Shop (3)",
 "id": "panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_CC6B386A_E4A7_45D2_41A1_7F8C6C1B550A",
  "this.overlay_C3C960ED_E4A1_C6D6_41E7_877D175D53F1"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 317.76,
   "y": 932.07,
   "x": 115.86
  }
 ],
 "pitch": 0
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_309572FD_3B03_49AF_41C3_53D8589DC146"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3078E86A_3B02_F8D4_41B1_B6E830250620"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86"
  }
 ],
 "label": "Canteen",
 "id": "panorama_30791B62_3B03_78D4_41C8_03252B699D1D",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_FDCCC60F_E4E1_CD52_41E5_8FB6EE39F972",
  "this.overlay_FDE56499_E4E3_4D7F_41A3_B45042AFBD65",
  "this.overlay_FEA977A8_E4E3_4B5E_41DA_8D5E04EBE90D",
  "this.overlay_F9D44879_E4E1_45BE_41D8_1020294B6FEF"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 116.07,
   "y": 521.65,
   "x": 757.86
  }
 ],
 "pitch": 0
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307A515A_3B03_C8F4_41C4_54E6993B1850"
  }
 ],
 "label": "Rooftop (2)",
 "id": "panorama_307BE642_3B03_48D5_41CD_0BD101057A2C",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_C0A91BF9_E4A1_5ABE_41E1_CF181EA835BD"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 152.43,
   "y": 661.18,
   "x": 90.09
  }
 ],
 "pitch": 0
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307A510B_3B03_C86B_41B9_A9C23E177918"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_309B7277_3B02_C8BB_415F_FC432B308E1B"
  }
 ],
 "label": "3D Trick Art Museum Entrance",
 "id": "panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653",
 "hfovMin": "135%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_C8EEFE8D_E561_5D56_41DE_B4FB2CA9F60A",
  "this.overlay_D67000BF_E561_46B2_41EC_898875C76493",
  "this.overlay_D76452CC_E567_4AD6_41E7_DD210992AC87",
  "this.overlay_D4B4FD76_E566_DFB2_41C3_C108D82AD96F"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": 161.89,
   "y": 792.2,
   "x": 518.15
  }
 ],
 "pitch": 0
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 7.92,
  "hfov": 130,
  "pitch": -1.7
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "class": "MapPlayListItem",
   "media": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_66826472_7F33_F8E7_41DA_16AFA253DBE4"
},
{
 "height": 768,
 "thumbnailUrl": "media/album_E12E6C23_EEB7_E326_41DF_BA102526EF51_4_t.jpg",
 "label": "Slide3",
 "id": "album_E12E6C23_EEB7_E326_41DF_BA102526EF51_4",
 "width": 1024,
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E12E6C23_EEB7_E326_41DF_BA102526EF51_4.JPG",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "duration": 5000
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_30796AA1_3B03_5857_41C3_400381D47B0A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_309572FD_3B03_49AF_41C3_53D8589DC146"
  }
 ],
 "label": "Outdoor Entrance",
 "id": "panorama_3092CC81_3B03_7854_41C3_E9207A33602F",
 "hfovMin": "130%",
 "hfov": 360,
 "vfov": 180,
 "overlays": [
  "this.overlay_F193DDD9_E4A2_FEFE_41D8_EFAC55C4DB56",
  "this.overlay_F1EA925B_E4A2_C5F3_41CE_3BA37BFDEFCB",
  "this.overlay_F35140D1_E4A1_46CE_41D4_D31CCA822719"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9",
   "class": "PanoramaMapLocation",
   "angle": -199.3,
   "y": 316.34,
   "x": 1058.4
  }
 ],
 "pitch": 0
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 12.36,
  "hfov": 130,
  "pitch": -4.13
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 20.52,
  "pitch": 1.96
 },
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_307BF505_3B03_485C_41A7_6097D0B84928_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "ViewerArea",
 "toolTipFontSize": "12px",
 "toolTipOpacity": 0.5,
 "id": "MainViewer",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "minWidth": 100,
 "toolTipTextShadowColor": "#000000",
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "shadow": false,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "paddingRight": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderSize": 1,
 "top": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 2,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "minHeight": 50,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBorderColor": "#FFFFFF",
 "playbackBarBottom": 5,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "toolTipBorderColor": "#000000",
 "data": {
  "name": "Main Viewer"
 },
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ]
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_22BB12F4_3075_D173_4184_EC3BC4955417",
 "left": 53.15,
 "width": 521.2,
 "paddingLeft": 0,
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "children": [
  "this.Container_22BBC2F4_3075_D173_41B4_71F7A3560C34",
  "this.Container_22BBD2F4_3075_D173_41B4_8504C593E6BF",
  "this.Label_22BB22F4_3075_D173_41BB_3ACDC6CCCC83",
  "this.Label_22BB32F4_3075_D173_4191_C8B45B85DEB8",
  "this.MapViewer"
 ],
 "horizontalAlign": "left",
 "top": 34,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "height": 346.4,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--STICKER"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "width": 115.05,
 "paddingLeft": 0,
 "right": "0%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "top",
 "height": 641,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-- SETTINGS"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
 "left": "0%",
 "width": 330,
 "paddingLeft": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "children": [
  "this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
  "this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD"
 ],
 "contentOpaque": false,
 "top": "0%",
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "height": "100%",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--- LEFT PANEL 4 (Community)"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "bottom": "0%",
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--INFO photo"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "bottom": "0%",
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "bottom": "0%",
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--LOCATION"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "bottom": "0%",
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--FLOORPLAN"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "bottom": "0%",
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9",
 "left": "0%",
 "children": [
  "this.Container_1E19923C_57F1_802D_41C4_18DBE75E48C1",
  "this.Container_1E18A23C_57F1_802D_41B9_D08FA26C7F4C"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "bottom": "0%",
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--REALTOR"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "width": 58,
 "paddingLeft": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "verticalAlign": "middle",
 "height": 58,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 58,
 "transparencyActive": true,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "maxWidth": 58,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "width": 58,
 "paddingLeft": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "verticalAlign": "middle",
 "height": 58,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 58,
 "transparencyActive": true,
 "data": {
  "name": "IconButton MUTE"
 },
 "maxWidth": 58,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_66856473_7F33_F8E4_41D6_B710DA572064, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "media": "this.panorama_309572FD_3B03_49AF_41C3_53D8589DC146",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_66856473_7F33_F8E4_41D6_B710DA572064",
 "camera": "this.panorama_309572FD_3B03_49AF_41C3_53D8589DC146_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_66842473_7F33_F8E4_41B7_53E4A158A9C1, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "media": "this.panorama_3092CC81_3B03_7854_41C3_E9207A33602F",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_66842473_7F33_F8E4_41B7_53E4A158A9C1",
 "camera": "this.panorama_3092CC81_3B03_7854_41C3_E9207A33602F_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_66849473_7F33_F8E4_417A_7594E75495E5, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "media": "this.panorama_30796AA1_3B03_5857_41C3_400381D47B0A",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_66849473_7F33_F8E4_417A_7594E75495E5",
 "camera": "this.panorama_30796AA1_3B03_5857_41C3_400381D47B0A_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_66872474_7F33_F8EC_41C1_84EFC3D965B1, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "media": "this.panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_66872474_7F33_F8EC_41C1_84EFC3D965B1",
 "camera": "this.panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_6687E474_7F33_F8EC_41AC_4FE97B55C013, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "media": "this.panorama_30792973_3B03_58B4_4199_8A731C61F367",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_6687E474_7F33_F8EC_41AC_4FE97B55C013",
 "camera": "this.panorama_30792973_3B03_58B4_4199_8A731C61F367_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_6686A474_7F33_F8EC_41D9_88265E6B93DC, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "media": "this.panorama_30791B62_3B03_78D4_41C8_03252B699D1D",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_6686A474_7F33_F8EC_41D9_88265E6B93DC",
 "camera": "this.panorama_30791B62_3B03_78D4_41C8_03252B699D1D_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_66990476_7F33_F8EC_41CA_093C76B740F9, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "media": "this.panorama_3078E86A_3B02_F8D4_41B1_B6E830250620",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_66990476_7F33_F8EC_41CA_093C76B740F9",
 "camera": "this.panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_6699F476_7F33_F8EC_41D3_AC37F924C57C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "media": "this.panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_6699F476_7F33_F8EC_41D3_AC37F924C57C",
 "camera": "this.panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_66869476_7F33_F8EC_41D1_FF8367EC78B2, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
 "media": "this.panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_66869476_7F33_F8EC_41D1_FF8367EC78B2",
 "camera": "this.panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_66997477_7F33_F8EC_41CD_4393B3491D13, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
 "media": "this.panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_66997477_7F33_F8EC_41CD_4393B3491D13",
 "camera": "this.panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_6699E477_7F33_F8EC_41DC_CE527E9D7D7D, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
 "media": "this.panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_6699E477_7F33_F8EC_41DC_CE527E9D7D7D",
 "camera": "this.panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_66984477_7F33_F8EC_41D8_FC2A55093A62, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
 "media": "this.panorama_307A515A_3B03_C8F4_41C4_54E6993B1850",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_66984477_7F33_F8EC_41D8_FC2A55093A62",
 "camera": "this.panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_669B3477_7F33_F8EC_41CD_3BEE8FB44D0E, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 12, 13)",
 "media": "this.panorama_307BE642_3B03_48D5_41CD_0BD101057A2C",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_669B3477_7F33_F8EC_41CD_3BEE8FB44D0E",
 "camera": "this.panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_669BA478_7F33_F8E4_41C7_54C5728495C2, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 13, 14)",
 "media": "this.panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_669BA478_7F33_F8E4_41C7_54C5728495C2",
 "camera": "this.panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_669A0478_7F33_F8E4_41DD_D035B4AA1FF7, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 14, 15)",
 "media": "this.panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_669A0478_7F33_F8E4_41DD_D035B4AA1FF7",
 "camera": "this.panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_669AE478_7F33_F8E4_41BE_66A35F791004, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 15, 16)",
 "media": "this.panorama_3093310B_3B02_C86B_41C3_C2951B951ED9",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_669AE478_7F33_F8E4_41BE_66A35F791004",
 "camera": "this.panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_669D6479_7F33_F8E4_41D4_82DE4753ECBE, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 16, 17)",
 "media": "this.panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_669D6479_7F33_F8E4_41D4_82DE4753ECBE",
 "camera": "this.panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_669DD479_7F33_F8E4_41D6_81C5431BBDA9, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 17, 18)",
 "media": "this.panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_669DD479_7F33_F8E4_41D6_81C5431BBDA9",
 "camera": "this.panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_669CB47B_7F33_F8E5_41AE_ABE102C8E353, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 18, 19)",
 "media": "this.panorama_307BF505_3B03_485C_41A7_6097D0B84928",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_669CB47B_7F33_F8E5_41AE_ABE102C8E353",
 "camera": "this.panorama_307BF505_3B03_485C_41A7_6097D0B84928_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_669F047B_7F33_F8E5_41BB_8520871B1C84, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 19, 20)",
 "media": "this.panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_669F047B_7F33_F8E5_41BB_8520871B1C84",
 "camera": "this.panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_669FF47B_7F33_F8E5_41C7_BB32F1CF4D8A, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 20, 21)",
 "media": "this.panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_669FF47B_7F33_F8E5_41C7_BB32F1CF4D8A",
 "camera": "this.panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_669E747B_7F33_F8E5_41D5_7F9478A9EDF9, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 21, 22)",
 "media": "this.panorama_3787367E_3B02_C8AC_41CB_776E387D818B",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_669E747B_7F33_F8E5_41D5_7F9478A9EDF9",
 "camera": "this.panorama_3787367E_3B02_C8AC_41CB_776E387D818B_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_669ED47C_7F33_F8DC_41C9_0519003AC3B4, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 22, 23)",
 "media": "this.panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_669ED47C_7F33_F8DC_41C9_0519003AC3B4",
 "camera": "this.panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_6691547C_7F33_F8DC_41DD_9E19FCE77C7D, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 23, 24)",
 "media": "this.panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_6691547C_7F33_F8DC_41DD_9E19FCE77C7D",
 "camera": "this.panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_6690247C_7F33_F8DC_41DA_E55D570678BD, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 24, 25)",
 "media": "this.panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_6690247C_7F33_F8DC_41DA_E55D570678BD",
 "camera": "this.panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_6690947D_7F33_F8DC_41CE_9E0A6CC2268D, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 25, 26)",
 "media": "this.panorama_307A510B_3B03_C86B_41B9_A9C23E177918",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_6690947D_7F33_F8DC_41CE_9E0A6CC2268D",
 "camera": "this.panorama_307A510B_3B03_C86B_41B9_A9C23E177918_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_6693147D_7F33_F8DC_41D8_D747AE9A294A, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 26, 27)",
 "media": "this.panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_6693147D_7F33_F8DC_41D8_D747AE9A294A",
 "camera": "this.panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_6693D47D_7F33_F8DC_41D4_B1DF288A55B1, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 27, 28)",
 "media": "this.panorama_309B7277_3B02_C8BB_415F_FC432B308E1B",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_6693D47D_7F33_F8DC_41D4_B1DF288A55B1",
 "camera": "this.panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_6692B47F_7F33_F8DD_41D0_0198765874CD, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 28, 29)",
 "media": "this.panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_6692B47F_7F33_F8DD_41D0_0198765874CD",
 "camera": "this.panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_camera"
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -45.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -36.72,
   "hfov": 20.93
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C7485281_E4A1_454E_41CB_58363F8F988F",
   "pitch": -36.72,
   "yaw": -45.07,
   "hfov": 20.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C7146C11_E4A7_5D4F_4191_C62BEC28103C",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 64.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -14.11,
   "hfov": 16.69
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C7486281_E4A1_454E_41D5_644BBF2DA889",
   "pitch": -14.11,
   "yaw": 64.65,
   "hfov": 16.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C7E595BA_E4A7_4EB2_41C8_EBB40F521FCD",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -162.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -9.7,
   "hfov": 14.69
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F8A911FF_E4E1_46B2_41E4_363BD7BA6DEB",
   "pitch": -9.7,
   "yaw": -162.88,
   "hfov": 14.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F88DB797_E4E7_4B73_41E9_9813AD1BB561",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 177.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -7.42,
   "hfov": 12.45
  }
 ],
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F8AAA1FF_E4E1_46B2_41E8_F1A990BD2AAA",
   "pitch": -7.42,
   "yaw": 177.91,
   "hfov": 12.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_FAC9C6B6_E4E1_4AB2_41D1_4C4340B37BA1",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -29.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -22.27,
   "hfov": 19.41
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C509CC79_E4E6_BDBE_41EB_0F53ECD3FF0A",
   "pitch": -22.27,
   "yaw": -29.12,
   "hfov": 19.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FAF89F76_E4E2_FBB2_41A9_96F13BFE951E",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 142.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -16.32,
   "hfov": 15.12
  }
 ],
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C5097C79_E4E6_BDBE_41EA_738FCF889BEA",
   "pitch": -16.32,
   "yaw": 142.32,
   "hfov": 15.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C4A68506_E4E2_CF52_41D3_B4580181F237",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 34,
      "height": 16
     }
    ]
   },
   "pitch": -13.31,
   "hfov": 16.07
  }
 ],
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C5088C79_E4E6_BDBE_41D9_88C38D940DC8",
   "pitch": -13.31,
   "yaw": 158.37,
   "hfov": 16.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_FA47C089_E4E7_C55E_41E4_DB229CF1C4C8",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "Image",
 "id": "image_uid66BF9465_7F33_F8EC_419F_D5BAAB7D2EB1_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DEB0E447_CE66_336A_41D1_5AF8D0B79E59.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13597"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_C176FE9F_CE66_6F1A_41BB_EB776B84E49F",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The Chevrolet Bel Air 1955 is an iconic American automobile known for its classic styling and timeless appeal. Introduced as part of Chevy's Tri-Five lineup, the '55 Bel Air is celebrated for its distinctive chrome accents, two-tone paint options, and sleek, sweeping lines. It's often considered a symbol of the 1950s automotive design and culture, featuring a powerful V8 engine for its time. The '55 Bel Air remains a cherished classic among car enthusiasts and collectors, emblematic of mid-20th century American car design and innovation.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText3440"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "PhotoPlayList",
 "items": [
  {
   "class": "PhotoPlayListItem",
   "media": "this.album_E12E6C23_EEB7_E326_41DF_BA102526EF51_0",
   "camera": {
    "initialPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.50",
     "y": "0.50",
     "zoomFactor": 1
    },
    "class": "MovementPhotoCamera",
    "duration": 5000,
    "targetPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.36",
     "y": "0.54",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside",
    "easing": "linear"
   }
  },
  {
   "class": "PhotoPlayListItem",
   "media": "this.album_E12E6C23_EEB7_E326_41DF_BA102526EF51_1",
   "camera": {
    "initialPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.50",
     "y": "0.50",
     "zoomFactor": 1
    },
    "class": "MovementPhotoCamera",
    "duration": 5000,
    "targetPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.45",
     "y": "0.43",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside",
    "easing": "linear"
   }
  },
  {
   "class": "PhotoPlayListItem",
   "media": "this.album_E12E6C23_EEB7_E326_41DF_BA102526EF51_2",
   "camera": {
    "initialPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.50",
     "y": "0.50",
     "zoomFactor": 1
    },
    "class": "MovementPhotoCamera",
    "duration": 5000,
    "targetPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.30",
     "y": "0.45",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside",
    "easing": "linear"
   }
  },
  {
   "class": "PhotoPlayListItem",
   "media": "this.album_E12E6C23_EEB7_E326_41DF_BA102526EF51_3",
   "camera": {
    "initialPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.50",
     "y": "0.50",
     "zoomFactor": 1
    },
    "class": "MovementPhotoCamera",
    "duration": 5000,
    "targetPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.39",
     "y": "0.26",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside",
    "easing": "linear"
   }
  },
  {
   "class": "PhotoPlayListItem",
   "media": "this.album_E12E6C23_EEB7_E326_41DF_BA102526EF51_4",
   "camera": {
    "initialPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.50",
     "y": "0.50",
     "zoomFactor": 1
    },
    "class": "MovementPhotoCamera",
    "duration": 5000,
    "targetPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.53",
     "y": "0.72",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside",
    "easing": "linear"
   }
  }
 ],
 "id": "album_E12E6C23_EEB7_E326_41DF_BA102526EF51_AlbumPlayList"
},
{
 "class": "Image",
 "id": "image_uid66B6646A_7F33_F8E4_41A3_4000E7B3AFF8_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DD115EDF_CFBD_637A_41D2_057546DD21FF.jpg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13610"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_DD5CB638_CFBD_A2C6_41CD_8FBE1B621BFF",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The DKW Munga 1964 was a German military off-road vehicle manufactured by Auto Union, which later became part of Audi. \"Munga\" stands for \"Mehrzweck Universal Gel\u00e4ndewagen mit Allradantrieb,\" which translates to \"Multi-Purpose Universal Off-Road Vehicle with All-Wheel Drive.\" Introduced in the late 1950s, the DKW Munga was designed for military applications and was known for its exceptional off-road capabilities. It was powered by a two-stroke, three-cylinder engine and featured four-wheel drive, making it suitable for rough terrain. The Munga could be configured in various ways, including as a personnel carrier, reconnaissance vehicle, or ambulance, and it served in the armed forces of several countries. Its reliability and agility made it a popular choice among military users during the 1960s and beyond.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText14063"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -94.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 7.57,
   "hfov": 7.47
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_A285E061_B6AF_6AEB_41C1_CDF3B7C3609C, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0_HS_6_0.png",
      "class": "ImageResourceLevel",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 7.57,
   "yaw": -94.05,
   "hfov": 7.47
  }
 ],
 "id": "overlay_A73897BE_B6AD_B658_41CA_90996138CB81",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -42.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -7.67,
   "hfov": 14.3
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FFEAA4D7_E4A3_4EF2_41E2_116193F1BBC0",
   "pitch": -7.67,
   "yaw": -42.66,
   "hfov": 14.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F292FE7D_E4A1_FDB6_41E1_C72CC1620BE6",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -122.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0_HS_8_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -13.58,
   "hfov": 17.68
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FFEAD4D7_E4A3_4EF2_41E8_2943D2FBAA8E",
   "pitch": -13.58,
   "yaw": -122.24,
   "hfov": 17.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F29FDDE9_E4AF_5EDE_41D2_599B47F63AC8",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 58.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0_HS_9_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -4.64,
   "hfov": 12.51
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FFED04D7_E4A3_4EF2_41DF_DD14D1063B8A",
   "pitch": -4.64,
   "yaw": 58.6,
   "hfov": 12.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F2281997_E4AE_C772_41E8_A63A72C67A54",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 96.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0_HS_10_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -7.64,
   "hfov": 14.91
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FCD8F0B2_E4A1_46B2_41E2_B7B59AFB4715",
   "pitch": -7.64,
   "yaw": 96.3,
   "hfov": 14.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_F21BC6B8_E4A1_4ABD_41E9_1B32BC9F838B",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -131.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 9.23,
   "hfov": 7.44
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_A4139450_B65B_AA28_41DB_646A8EED5307, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 9.23,
   "yaw": -131.62,
   "hfov": 7.44
  }
 ],
 "id": "overlay_A607A679_B65B_76D8_41C1_71BFA805B7C7",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -115.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -2.03,
   "hfov": 12.55
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FB6FB981_E4E1_474E_41CA_2A871554027A",
   "pitch": -2.03,
   "yaw": -115.91,
   "hfov": 12.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_FAD214E2_E4E3_CED2_41E4_1050CBA2CB1D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -93.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0_HS_8_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -16.45,
   "hfov": 19.28
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FB680981_E4E1_474E_41DD_0B33E594C13E",
   "pitch": -16.45,
   "yaw": -93.47,
   "hfov": 19.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F9E79DE9_E4E1_5EDF_41D2_CECCBBDC2C2A",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 62.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0_HS_9_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 51,
      "height": 16
     }
    ]
   },
   "pitch": -3.61,
   "hfov": 17.67
  }
 ],
 "data": {
  "label": "Arrow 06b Right"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FB686981_E4E1_474E_4166_16D4818FC88A",
   "pitch": -3.61,
   "yaw": 62.02,
   "hfov": 17.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_F909C6BB_E4E7_4AB2_41D7_F4D45CF3B6F7",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 32.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0_HS_10_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -14.94,
   "hfov": 21.04
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FB68B981_E4E1_474E_416F_5FBD15E28AEE",
   "pitch": -14.94,
   "yaw": 32.62,
   "hfov": 21.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_F954FA9F_E4E7_4572_41D8_A04B5D88BD6D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "Image",
 "id": "image_uid66B17466_7F33_F8EC_41A1_79A34A436A3D_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DF387E87_CE65_EFEA_41E2_637169781E07.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13600"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_DC73B5EF_CE62_5D3A_41E0_81CBCAA6A533",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The Ford Zephyr models of 1963 featured modern styling, including squared-off lines and a more contemporary design compared to the previous Zephyr models. They were available with various engine options, including four-cylinder and six-cylinder engines, offering improved performance and comfort. These models continued to be popular in the UK and played a significant role in the Ford lineup during the early 1960s.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText9542"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_0_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 522.95,
  "x": 1049.58,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 1038.22,
  "y": 511.83,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_0.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "id": "overlay_6EFFACA4_7ECE_1899_41D2_04E2F2CC88CE",
 "data": {
  "label": "Entrance"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_1_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 293.53,
  "x": 1049.24,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 1038.22,
  "y": 282.52,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_1.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "id": "overlay_6AB2C17E_7EDA_0869_41B8_346B0869B556",
 "data": {
  "label": "Outdoor Entrance"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_2_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 110.4,
  "x": 1048.11,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 1038.22,
  "y": 100.44,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_2.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "id": "overlay_69D6F4BB_7EFE_08EF_41D1_3A4E9062DD5B",
 "data": {
  "label": "Outdoor Corner"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_3_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 102.06,
  "x": 630.6,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 620.64,
  "y": 92.02,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_3.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "id": "overlay_67FEBABF_7EF6_38E7_4171_129CCBF1E6AA",
 "data": {
  "label": "Outdoor Corner (2)"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_4_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 230.86,
  "x": 756.33,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 746.4,
  "y": 221.37,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_4.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "id": "overlay_67D5CEFF_7ECE_1867_41D6_41C23C4C3888",
 "data": {
  "label": "Outdoor Park"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_5_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 340.77,
  "x": 635.48,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 635.35,
  "y": 340.65,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_5.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "id": "overlay_64FF705F_7EDA_07A6_41CD_D5A52BED6B57",
 "data": {
  "label": "Outdoor Connector"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_6_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 495.91,
  "x": 745.97,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 737.68,
  "y": 487.83,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_6.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "id": "overlay_6428987F_7EDE_3867_41DB_E1642840C188",
 "data": {
  "label": "Canteen"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_7_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 740.56,
  "x": 879.43,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 871.23,
  "y": 732.18,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_7.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "id": "overlay_65D5B5B7_7EDA_08E6_41DA_EAE655C2293C",
 "data": {
  "label": "Canteen (2)"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_8_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 509.29,
  "x": 600.5,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 592.8,
  "y": 501.85,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_8.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "id": "overlay_62370C48_7ECE_7FA9_41DD_31DEACC3E5C5",
 "data": {
  "label": "Rear Outdoor"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_9_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 509.29,
  "x": 471.71,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 464.22,
  "y": 501.85,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_9.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "id": "overlay_63391934_7ECA_19F9_41B7_195E1F3BCBE4",
 "data": {
  "label": "Rear Outdoor (2)"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_10_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 500.59,
  "x": 201.14,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 200.24,
  "y": 499.56,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_10.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "id": "overlay_6202534E_7ECA_09A9_41C8_9A2018ACF73A",
 "data": {
  "label": "Rear Outdoor (3)"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_11_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 424.71,
  "x": 69.62,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 68.5,
  "y": 423.71,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_11.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "id": "overlay_63199777_7EB6_0866_41CF_1C6701A6FA7C",
 "data": {
  "label": "Rooftop"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_12_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 628.18,
  "x": 70.87,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 69.91,
  "y": 627.36,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_12.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "id": "overlay_60F0CC88_7F4A_F8AA_41B2_34A3215A8894",
 "data": {
  "label": "Rooftop (2)"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_13_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 644.77,
  "x": 164.48,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 163.44,
  "y": 643.77,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_13.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "id": "overlay_609E7EFB_7F4A_186F_41AC_8572A4818E21",
 "data": {
  "label": "Souvenir Shop (2)"
 }
},
{
 "map": {
  "width": 31.52,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_14_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 28
    }
   ]
  },
  "y": 854.56,
  "x": 138.83,
  "offsetY": 0,
  "height": 55.86,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 137.93,
  "y": 853.56,
  "width": 31.52,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_14.png",
     "class": "ImageResourceLevel",
     "width": 31,
     "height": 55
    }
   ]
  },
  "height": 55.86
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "id": "overlay_5F430AB6_7F56_18F9_41AE_47F2F9A40230",
 "data": {
  "label": "Exit Area"
 }
},
{
 "map": {
  "width": 31.52,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_15_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 28
    }
   ]
  },
  "y": 905.32,
  "x": 101.04,
  "offsetY": 0,
  "height": 55.86,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 100.1,
  "y": 904.14,
  "width": 31.52,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_15.png",
     "class": "ImageResourceLevel",
     "width": 31,
     "height": 55
    }
   ]
  },
  "height": 55.86
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "id": "overlay_5F798E4F_7F5A_7BA6_41D8_5D732C6EE2A9",
 "data": {
  "label": "Souvenir Shop (3)"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_16_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 940.02,
  "x": 247.88,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 246.88,
  "y": 938.95,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_16.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "id": "overlay_5E5DBA3F_7F5E_1BE6_41B2_7EFE2AA5DA11",
 "data": {
  "label": "Parking Area (2)"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_17_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 871.37,
  "x": 993.22,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 992.16,
  "y": 870.21,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_17.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "id": "overlay_5BFC8968_7F5A_1869_41D6_D02A129406B7",
 "data": {
  "label": "Parking Area (3)"
 }
},
{
 "map": {
  "width": 40.35,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_18_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 959.65,
  "x": 904.27,
  "offsetY": 0,
  "height": 67.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 903.12,
  "y": 958.52,
  "width": 40.35,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_18.png",
     "class": "ImageResourceLevel",
     "width": 40,
     "height": 67
    }
   ]
  },
  "height": 67.63
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "id": "overlay_5C79CC62_7F5A_3F9E_41D1_CFA82A957EA9",
 "data": {
  "label": "Parking Area Entrance"
 }
},
{
 "map": {
  "width": 31.52,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_19_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 28
    }
   ]
  },
  "y": 653.77,
  "x": 561.47,
  "offsetY": 0,
  "height": 55.86,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 560.52,
  "y": 652.58,
  "width": 31.52,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_19.png",
     "class": "ImageResourceLevel",
     "width": 31,
     "height": 55
    }
   ]
  },
  "height": 55.86
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "id": "overlay_71F17F36_7F12_686F_4194_9C11D547CDAC",
 "data": {
  "label": "Sourvenir Shop"
 }
},
{
 "map": {
  "width": 31.52,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_20_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 28
    }
   ]
  },
  "y": 719.81,
  "x": 635.95,
  "offsetY": 0,
  "height": 55.86,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 635.01,
  "y": 718.7,
  "width": 31.52,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_20.png",
     "class": "ImageResourceLevel",
     "width": 31,
     "height": 55
    }
   ]
  },
  "height": 55.86
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "id": "overlay_6FB6E858_7F12_A824_41DD_440231266F80",
 "data": {
  "label": "Transportation Museum Entrance"
 }
},
{
 "map": {
  "width": 31.52,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_21_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 28
    }
   ]
  },
  "y": 822.56,
  "x": 567.58,
  "offsetY": 0,
  "height": 55.86,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 566.55,
  "y": 821.57,
  "width": 31.52,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_21.png",
     "class": "ImageResourceLevel",
     "width": 31,
     "height": 55
    }
   ]
  },
  "height": 55.86
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "id": "overlay_6DC9BB71_7F1F_A8E5_41D8_215F363F9AD6",
 "data": {
  "label": "Transportation Museum (2)"
 }
},
{
 "map": {
  "width": 31.52,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_22_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 28
    }
   ]
  },
  "y": 701.79,
  "x": 550.06,
  "offsetY": 0,
  "height": 55.86,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 548.83,
  "y": 700.83,
  "width": 31.52,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_22.png",
     "class": "ImageResourceLevel",
     "width": 31,
     "height": 55
    }
   ]
  },
  "height": 55.86
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "id": "overlay_6D3D8369_7F12_98E5_41A1_5D3B33AED154",
 "data": {
  "label": "Transportation Museum (3)"
 }
},
{
 "map": {
  "width": 31.52,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_23_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 28
    }
   ]
  },
  "y": 765.41,
  "x": 503.56,
  "offsetY": 0,
  "height": 55.86,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 502.39,
  "y": 764.27,
  "width": 31.52,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_23.png",
     "class": "ImageResourceLevel",
     "width": 31,
     "height": 55
    }
   ]
  },
  "height": 55.86
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "id": "overlay_6D35F60C_7F11_F83C_41D5_F72C179123CA",
 "data": {
  "label": "3D Trick Art Museum Entrance"
 }
},
{
 "map": {
  "width": 12.9,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_24_map.gif",
     "class": "ImageResourceLevel",
     "width": 12,
     "height": 33
    }
   ]
  },
  "y": 782.6,
  "x": 321.7,
  "offsetY": 0,
  "height": 33.19,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 321.57,
  "y": 782.43,
  "width": 12.9,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_24.png",
     "class": "ImageResourceLevel",
     "width": 12,
     "height": 33
    }
   ]
  },
  "height": 33.19
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "id": "overlay_6C7326B8_7F11_9864_41D3_31E00CB7AB23",
 "data": {
  "label": "3D Trick Art Museum EP"
 }
},
{
 "map": {
  "width": 12.9,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_25_map.gif",
     "class": "ImageResourceLevel",
     "width": 12,
     "height": 33
    }
   ]
  },
  "y": 747.06,
  "x": 473.51,
  "offsetY": 0,
  "height": 33.19,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 472.35,
  "y": 745.96,
  "width": 12.9,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_25.png",
     "class": "ImageResourceLevel",
     "width": 12,
     "height": 33
    }
   ]
  },
  "height": 33.19
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "id": "overlay_6930A04F_7F12_983C_41D7_3B3BD7EFFE82",
 "data": {
  "label": "3D Trick Art Museum (2)"
 }
},
{
 "map": {
  "width": 31.52,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_26_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 28
    }
   ]
  },
  "y": 646.27,
  "x": 466.37,
  "offsetY": 0,
  "height": 55.86,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 466.21,
  "y": 646.11,
  "width": 31.52,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_26.png",
     "class": "ImageResourceLevel",
     "width": 31,
     "height": 55
    }
   ]
  },
  "height": 55.86
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "id": "overlay_6B51F47F_7F32_B8DC_41D7_FD52B7EC8513",
 "data": {
  "label": "3D Trick Art Museum Exit Area"
 }
},
{
 "map": {
  "width": 31.52,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_27_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 28
    }
   ]
  },
  "y": 824.88,
  "x": 503.54,
  "offsetY": 0,
  "height": 55.86,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 503.41,
  "y": 824.69,
  "width": 31.52,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_27.png",
     "class": "ImageResourceLevel",
     "width": 31,
     "height": 55
    }
   ]
  },
  "height": 55.86
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "id": "overlay_6BE44D66_7F31_A8EC_41B4_E2F3D6D7BB32",
 "data": {
  "label": "3D Trick Art Museum Corner"
 }
},
{
 "map": {
  "width": 31.52,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_28_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 28
    }
   ]
  },
  "y": 824.88,
  "x": 345.09,
  "offsetY": 0,
  "height": 55.86,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "image": {
  "x": 344.99,
  "y": 824.69,
  "width": 31.52,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_71A45DC9_7EBA_78AB_41CB_883E16E07AE9_HS_28.png",
     "class": "ImageResourceLevel",
     "width": 31,
     "height": 55
    }
   ]
  },
  "height": 55.86
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "id": "overlay_6AAC1EC1_7F36_A824_41DB_3450B3D2E688",
 "data": {
  "label": "3D Trick Art Museum Corner"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -4.67,
   "hfov": 13.09
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_CDB25C2D_E4BF_FD56_41DD_B62FA91B45F9",
   "pitch": -4.67,
   "yaw": -1.51,
   "hfov": 13.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CDFE03C9_E4A1_4ADE_41EC_41B4E871FE29",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 155.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -9.24,
   "hfov": 19.04
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_CDB2DC2D_E4BF_FD56_41D4_638807039612",
   "pitch": -9.24,
   "yaw": 155.15,
   "hfov": 19.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CC2D13A2_E4BE_CB4D_41E1_50BA0BBD69C5",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -25.87,
   "hfov": 21.83
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C20ABF1A_E4A6_BB7D_41E8_785DE7F49F9C",
   "pitch": -25.87,
   "yaw": 6.08,
   "hfov": 21.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_CDF51AE6_E4A1_7AD2_41D9_C44283F2ECA1",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 146.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -31.03,
   "hfov": 20.45
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C20A8F1A_E4A6_BB7D_41E7_5B210F79B19C",
   "pitch": -31.03,
   "yaw": 146.61,
   "hfov": 20.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_CEC91DD8_E4A1_5EFE_41D4_E7752ABD262C",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "Image",
 "id": "image_uid66B7E469_7F33_F8E4_41CB_B1996949CF49_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DE57711A_CF55_FEFA_41DE_9EEC5461853E.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13609"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_DEC1D037_CF55_BECA_41E7_B8DA4054E5A0",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The Jeep GAZ-69, often referred to simply as the GAZ-69, was a rugged, four-wheel-drive utility vehicle produced by the Soviet Union's Gorky Automobile Plant (GAZ). Introduced in the early 1950s, it was heavily influenced by the American Willys Jeep and served a variety of military and civilian roles. The GAZ-69 featured a robust construction, making it well-suited for off-road use, and it was powered by a reliable inline-four engine. It came in various body styles, including a standard four-seat configuration and a larger canvas-top version for transporting goods or troops. The GAZ-69 was widely used in the Soviet military and various civilian applications and remained in production for several decades, making it an enduring symbol of utilitarian transportation in the Soviet era.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText12070"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -10.87,
   "hfov": 13.56
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FC763842_E4A2_C5D2_41DE_4937733AEB04",
   "pitch": -10.87,
   "yaw": 166.37,
   "hfov": 13.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F1206A98_E4A6_C57E_41E8_5B325C83A966",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -13.27,
   "hfov": 15.4
  }
 ],
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FC718842_E4A2_C5D2_41CA_03A7563DE846",
   "pitch": -13.27,
   "yaw": -85.15,
   "hfov": 15.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_F1B2007A_E4A1_45B2_41C2_58ED85F64BC8",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -87.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -39.76,
   "hfov": 25.62
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FC715842_E4A2_C5D2_41E2_EC784E9C859F",
   "pitch": -39.76,
   "yaw": -87.53,
   "hfov": 25.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_F2CB99D8_E4A3_46FD_41E3_8D3473EE512C",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "Image",
 "id": "image_uid66BE2465_7F33_F8EC_41B4_4FDB1E1B50C3_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DE81EB36_CE62_552A_41E7_FACDCCE14C6D.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13598"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_DFFE290A_CE62_32E5_41C7_DF3CF4BF2375",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The Ford Anglia 1956 is a compact British car known for its charming and distinctive appearance. Featuring a classic, almost bubble-like design, the '56 Anglia is characterized by its rounded shape, prominent front grille, and a single-piece windshield. It was available as both a two-door sedan and a stylish two-door estate (station wagon) variant. Under the hood, it typically housed a modest four-cylinder engine, making it a practical and economical choice for its era. The Ford Anglia 1956 is remembered for its unique styling and remains a beloved classic among vintage car enthusiasts.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText5874"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -152.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -31.12,
   "hfov": 24.3
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C23D542F_E4A1_4D52_41E2_AA1B9554B9B3",
   "pitch": -31.12,
   "yaw": -152.3,
   "hfov": 24.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C7548582_E4A3_CF52_41D6_646C77ADE781",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -114.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 34,
      "height": 16
     }
    ]
   },
   "pitch": -32.49,
   "hfov": 23.46
  }
 ],
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C23EE42F_E4A1_4D52_41D2_12E763D5307D",
   "pitch": -32.49,
   "yaw": -114.32,
   "hfov": 23.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C0786EC8_E4A2_DADD_41E0_4700206DBA2E",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 36.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -11.19,
   "hfov": 12.98
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C23E042F_E4A1_4D52_41C9_D7AE90E6968E",
   "pitch": -11.19,
   "yaw": 36.82,
   "hfov": 12.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CED5CE6D_E4A1_5DD6_41E4_3876C574FCC6",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "Image",
 "id": "image_uid66B3E467_7F33_F8EC_41AC_E4AE9C83554C_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DFA7449C_CE62_331D_41E6_E089DEAB466F.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13603"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_DC33503A_CE62_F31A_41E7_D8BD85C54649",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The DKW Munga 1963 is a versatile and rugged four-wheel-drive vehicle produced by the German manufacturer DKW, later part of Auto Union and Audi. Its name, \"Munga,\" stands for \"Mehrzweck UNiversal Gel\u00e4ndewagen mit Allradantrieb,\" or \"Multipurpose Universal Cross-Country Car with All-Wheel Drive.\" Designed primarily for military and off-road use, the 1963 Munga features a compact yet robust design, capable suspension, and a dependable two-stroke engine. Its compact size and all-wheel-drive capability make it exceptionally maneuverable, suitable for various terrains. Widely adopted by military forces and with civilian applications, the DKW Munga 1963 is celebrated for its utilitarian yet functional design, remaining a cherished classic among military and vintage vehicle enthusiasts.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText15152"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "Image",
 "id": "image_uid66B49469_7F33_F8E4_41D4_D29601CCC27B_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DE20A97A_CF5C_A13A_41CD_680912EFFABA.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13607"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_DFD2D7D9_CF5B_E147_41A1_15A3620F0849",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The Citro\u00ebn Dyane 1965 was a French compact car introduced in 1967, succeeding the iconic 2CV (Deux Chevaux). It retained the 2CV's simple and utilitarian ethos while offering some upgrades, including a hatchback design for added practicality. Powered by a small, air-cooled 2-cylinder engine, it came in various body styles, like a two-door sedan and a wagon, and featured a refined suspension for a smoother ride. The Dyane 1965 was cherished for its durability, quirky charm, and affordability, making it a beloved choice among families and enthusiasts alike. It remained in production until 1983, leaving a lasting mark on the world of compact cars.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText8142"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -16,
   "hfov": 14.65
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C6672920_E4E1_474E_41E6_1E84DDBCA6CF",
   "pitch": -16,
   "yaw": 27,
   "hfov": 14.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FB3AF49B_E4E1_CD73_41BC_5587061CF762",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 58.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 34,
      "height": 16
     }
    ]
   },
   "pitch": -10.66,
   "hfov": 15.38
  }
 ],
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C667B920_E4E1_474E_41C0_BD0A9451C6FE",
   "pitch": -10.66,
   "yaw": 58.47,
   "hfov": 15.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C650D51A_E4EE_CF72_41E3_AD906016DD5F",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -17.1,
   "hfov": 16.06
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C6181920_E4E1_474E_41DA_EDDC6AB7EB05",
   "pitch": -17.1,
   "yaw": -160.57,
   "hfov": 16.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C65BBF55_E4EF_5BF6_41A2_342AD35AB8E6",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 24.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -21.06,
   "hfov": 15.83
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D6904E00_E567_FD4D_41E6_795AB9AC2904",
   "pitch": -21.06,
   "yaw": 24.62,
   "hfov": 15.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D67CCA14_E562_C576_41E3_0BF42F91908C",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 116.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -19.54,
   "hfov": 21.27
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D6901E00_E567_FD4D_41D3_855621A42298",
   "pitch": -19.54,
   "yaw": 116.09,
   "hfov": 21.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D162D923_E563_C753_41CD_488872F50F3D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -33.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -15,
   "hfov": 19.07
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D24693C3_E561_4AD2_41E5_B29683DF191E",
   "pitch": -15,
   "yaw": -33.19,
   "hfov": 19.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D75CEFE8_E57F_5ADE_41EA_47FE49C4B765",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -28.19,
   "hfov": 18.83
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D24713C3_E561_4AD2_41C6_2B3EDEC2FE7A",
   "pitch": -28.19,
   "yaw": 76.24,
   "hfov": 18.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D0941D7F_E57F_5FB2_41EB_685ED08C2483",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "Image",
 "id": "image_uid66A3B460_7F33_F8E3_41C5_F380970E9BC5_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_D40A19F3_D8FA_5279_41CB_016B98983888.jpg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13595"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_A5D1AB57_B6B4_BE28_41DF_F6FFC4E694BA",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">Visitors can take photos with various types of owls provided here just by paying voluntarily. That means you can pay whatever price you like, as long as you give it with a good intention and prayer, it will be acceptable.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText11379"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "Image",
 "id": "image_uid66B07467_7F33_F8EC_419D_C20435F5B5C7_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DFBE8595_CE62_7DEE_41AF_F3AB3081B915.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13602"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_DED80F4E_CE62_2D7A_41E0_9920114ED0CC",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The Dodge Kingsway 1954 is a vintage automobile produced by Dodge for export markets, primarily in countries like Canada, Australia, and South Africa. It shares a design lineage with the Dodge Meadowbrook and Dodge Coronet models of its time. The '54 Kingsway was characterized by its classic American sedan styling, featuring a prominent grille, sleek lines, and spacious interiors. It was typically equipped with a reliable inline-six engine, making it a practical and durable choice. The Dodge Kingsway 1954 is remembered as a vehicle designed to cater to the needs of international markets, offering a blend of American engineering and style in various parts of the world during the mid-20th century.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText13281"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "visible": false,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "width": "14.22%",
 "paddingLeft": 0,
 "right": 10,
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "horizontalAlign": "center",
 "top": "20%",
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "verticalAlign": "middle",
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "bottom": "20%",
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "maxHeight": 60,
 "transparencyActive": false,
 "data": {
  "name": "IconButton >"
 },
 "maxWidth": 60,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "visible": false,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "width": "14.22%",
 "paddingLeft": 0,
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "horizontalAlign": "center",
 "top": "20%",
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "verticalAlign": "middle",
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "bottom": "20%",
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": true,
 "maxHeight": 60,
 "transparencyActive": false,
 "data": {
  "name": "IconButton <"
 },
 "maxWidth": 60,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "class": "Image",
 "id": "image_uid66B1F466_7F33_F8EC_41A3_BB1BBF7380F8_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DFE57A5B_CE65_D71A_41E2_8DAD3A4BD704.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13601"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_DC76C608_CE66_5EE6_41BD_1085B0490DDA",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The Chevrolet Fleetmaster 1948 is a classic American car celebrated for its post-World War II design and craftsmanship. It featured smooth, flowing lines with integrated fenders and a distinctive chrome grille. This model was available as both a sedan and a coupe, catering to various customer preferences. Under the hood, it typically housed a robust inline-six engine, providing reliable performance for its time. The '48 Fleetmaster is remembered as a symbol of post-war optimism and automotive innovation, offering style and comfort to the American car market of the late 1940s. It remains a cherished classic among vintage car enthusiasts.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText11399"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -114.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 9.98,
   "hfov": 7.42
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_A5D79B57_B6B4_BE28_41D9_34358F3E40A3, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 150,
      "height": 150
     }
    ]
   },
   "pitch": 9.98,
   "yaw": -114.31,
   "hfov": 7.42
  }
 ],
 "id": "overlay_A42B534D_B6B4_AE38_41E1_B8728544347C",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -127.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -3.58,
   "hfov": 15.5
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FFA197D3_E4A3_4AF1_41D8_E229177EB5BE",
   "pitch": -3.58,
   "yaw": -127.2,
   "hfov": 15.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F3419735_E4A7_CBB6_41E6_F91B57719C56",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -172.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -13.7,
   "hfov": 18.82
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FFA127D5_E4A3_4AF7_41EC_3435331A6029",
   "pitch": -13.7,
   "yaw": -172.99,
   "hfov": 18.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F34406D5_E4A1_CAF6_41DF_86061646BC16",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 156.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -3.13,
   "hfov": 11.57
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FF01C694_E4A1_4D76_41EB_E9F87141EAE2",
   "pitch": -3.13,
   "yaw": 156.77,
   "hfov": 11.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_FD3C0BC3_E4A1_DAD2_41CE_9DCC32D401CC",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "Image",
 "id": "image_uid66B70469_7F33_F8E4_4191_93B8BF61648B_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DE256089_CF5C_DFC7_41E4_60C09D78D6BF.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13608"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_DEDA9088_CF5D_5FC6_41E7_F797DB2F123F",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The 1954 Dodge Fargo represents a classic pickup truck from the mid-20th century, known for its rugged and utilitarian design. Produced by the Fargo division of Dodge, this truck was often used for work and transportation purposes. In 1954, it featured various engine options, including inline-six and V8 engines, providing varying levels of power to suit different needs. The truck's design typically featured a distinctive front grille and sturdy construction, making it well-suited for heavy-duty tasks. The 1954 Dodge Fargo is remembered as a reliable and durable workhorse, reflecting the automotive style of its era.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText10072"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 144.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -23.74,
   "hfov": 18.62
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D6903E00_E567_FD4D_41D8_CA8EE57BC153",
   "pitch": -23.74,
   "yaw": 144.74,
   "hfov": 18.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D60C7BC7_E561_7AD2_41DA_343928311F9C",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 59.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -9.16,
   "hfov": 12.79
  }
 ],
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D690DE00_E567_FD4D_41D9_DB194C54C801",
   "pitch": -9.16,
   "yaw": 59.49,
   "hfov": 12.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_D3FD7F4E_E566_BBD2_41D6_E21CD4F515FC",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "Image",
 "id": "image_uid66B2C468_7F33_F8E4_41DC_530EEF5B0C9F_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_C18BBD73_CF6B_E14B_41D8_BFB8CBF58F28.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13605"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_C1C66203_CF6B_A2CA_41B1_886684D5EDF3",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The \"Austin Twenty\" from 1920 refers to a popular British automobile model produced by the Austin Motor Company. The Austin Twenty was a well-regarded car of its time, known for its stylish design, reliability, and affordability. It featured a 3.6-liter four-cylinder engine, which was relatively powerful for the era, and it was available in various body styles, including saloons and tourers. This model played a role in establishing Austin as a prominent automaker, and it contributed to the growing popularity of automobiles in the 1920s.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText3625"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 01b Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -163.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -23.72,
   "hfov": 21.28
  }
 ],
 "enabled": false,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_5CED0103_4845_65F1_41C1_4D2ACDC41E54",
   "pitch": -23.72,
   "yaw": -163.19,
   "hfov": 21.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_5852E39C_485D_6417_41B5_E09B13852909",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -79.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": 6.59,
   "hfov": 7.87
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_DC32903A_CE62_F31A_41E3_5833C46B0715, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 157,
      "height": 169
     }
    ]
   },
   "pitch": 6.59,
   "yaw": -79.2,
   "hfov": 7.87
  }
 ],
 "id": "overlay_DFDB46DB_CE62_5F1A_41E8_3D2EFDE9906B",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -133.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 8.78,
   "hfov": 5.96
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_DCC50BEA_CE66_3525_41CF_8D17656AD92A, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 119,
      "height": 100
     }
    ]
   },
   "pitch": 8.78,
   "yaw": -133.66,
   "hfov": 5.96
  }
 ],
 "id": "overlay_DC706E31_CE66_6F26_41D6_86689ABFB58A",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 56.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 6.63,
   "hfov": 5.99
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_C1C67203_CF6B_A2CA_41C8_DCB2A8DC4955, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 119,
      "height": 100
     }
    ]
   },
   "pitch": 6.63,
   "yaw": 56.07,
   "hfov": 5.99
  }
 ],
 "id": "overlay_C1DB5CD1_CF6C_A746_41D9_3FF6BE9B99F0",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 5.46,
   "hfov": 6
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_DFED5F53_CF57_A14B_41AB_0D13D68D4841, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 119,
      "height": 100
     }
    ]
   },
   "pitch": 5.46,
   "yaw": 2.56,
   "hfov": 6
  }
 ],
 "id": "overlay_C0A75E0F_CF57_62DA_41C8_5BD3944F9EA5",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -36.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ]
   },
   "pitch": -14.31,
   "hfov": 27.73
  }
 ],
 "data": {
  "label": "Arrow 06c Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C8854B28_E56F_7B5E_41D3_A1550DB39B60",
   "pitch": -14.31,
   "yaw": -36.26,
   "hfov": 27.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C8163AE2_E562_DAD2_41C8_651A7AAC5210",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 167.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_8_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -17.65,
   "hfov": 16.35
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C884BB29_E56F_7B5E_41E5_6FF0DFFB4C06",
   "pitch": -17.65,
   "yaw": 167.83,
   "hfov": 16.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C990EC74_E561_7DB6_417E_3911EC35D448",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "Image",
 "id": "image_uid66BEA466_7F33_F8EC_41AF_5A3C891A0295_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DF7F6CB1_CE6E_5327_41C2_1FE00963F046.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13599"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_DF1DCE3B_CE6E_2F1A_41D0_B0FB72C6F71D",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The Ford Zephyr 1962 is a classic British car known for its elegant and refined design. This model marked the final year of production for the original Zephyr line before it was succeeded by the Ford Zephyr 4, 6, and Zodiac models. The '62 Zephyr featured sleek, mid-sized sedan styling with distinct tailfins, chrome accents, and a spacious interior. It was available with various engine options, including a straight-six, providing adequate performance for its time. The Ford Zephyr 1962 is appreciated for its blend of style and comfort, representing a transitional phase in British automotive design as it evolved toward the more modern Ford offerings of the 1960s.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText7700"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 71.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 51,
      "height": 16
     }
    ]
   },
   "pitch": -13.05,
   "hfov": 18.36
  }
 ],
 "data": {
  "label": "Arrow 06b Left"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C9EFC579_E4A2_CFBE_41EA_8249F6A98FC3",
   "pitch": -13.05,
   "yaw": 71.48,
   "hfov": 18.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_CE6EB5A0_E4BE_CF4D_41C2_470780D10483",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -21.2,
   "hfov": 17.74
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C9EF957A_E4A2_CFB2_41E9_0E101B11B11B",
   "pitch": -21.2,
   "yaw": 154.12,
   "hfov": 17.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_D4CC4000_E4A1_C54E_41B8_042C21B64000",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -141.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 34,
      "height": 16
     }
    ]
   },
   "pitch": -7.31,
   "hfov": 12.45
  }
 ],
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_CE9D6343_E4A7_CBD2_41D4_5168D535403D",
   "pitch": -7.31,
   "yaw": -141.68,
   "hfov": 12.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_CEEC9CAB_E4A1_BD53_41D2_13101BC03298",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "ViewerArea",
 "toolTipFontSize": "12px",
 "toolTipOpacity": 0.5,
 "id": "MapViewer",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "minWidth": 1,
 "toolTipTextShadowColor": "#000000",
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "shadow": false,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "paddingRight": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 2,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderSize": 1,
 "top": -0.01,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 2,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "minHeight": 1,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBorderColor": "#FFFFFF",
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "toolTipBorderColor": "#000000",
 "data": {
  "name": "Floor Plan"
 },
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -30.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -3.2,
   "hfov": 14.72
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FA2AA748_EB6F_D8B4_41B6_95F8018BA927",
   "pitch": -3.2,
   "yaw": -30.89,
   "hfov": 14.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E46C7CA5_EB69_A9FF_41E3_5030900954F5",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -91.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -7.93,
   "hfov": 19.8
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FA2B1748_EB6F_D8B4_41E3_6FE697BD1F00",
   "pitch": -7.93,
   "yaw": -91.76,
   "hfov": 19.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_FA0CC0FF_EB69_594C_41EB_4FB52D115C7A",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "width": 58,
 "paddingLeft": 0,
 "minWidth": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "verticalAlign": "middle",
 "height": 58,
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 58,
 "transparencyActive": true,
 "data": {
  "name": "IconButton VR"
 },
 "maxWidth": 58,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "width": 58,
 "paddingLeft": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "verticalAlign": "middle",
 "height": 58,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 58,
 "transparencyActive": true,
 "data": {
  "name": "IconButton GYRO"
 },
 "maxWidth": 58,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "width": 58,
 "paddingLeft": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "verticalAlign": "middle",
 "height": 58,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 58,
 "transparencyActive": true,
 "data": {
  "name": "IconButton HS "
 },
 "maxWidth": 58,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "class": "Image",
 "id": "image_uid66B55468_7F33_F8E4_41DE_01078AC8D98F_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DF39C624_CF57_E2CE_41D9_6477D4D9D1B1.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13606"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_DFEB7F54_CF57_A14D_410D_4DFF7B8D53C0",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The 1963 Morris Minor represents a classic British car from the mid-20th century. Produced by the Morris Motor Company, the Morris Minor was known for its timeless design and practicality. By 1963, the Morris Minor had been in production for over a decade, and it had undergone several updates. The 1963 model typically featured a 1.1-liter four-cylinder engine and came in various body styles, including the popular four-door saloon and the charming convertible. It was appreciated for its reliable performance, comfortable ride, and enduring appeal. The Morris Minor is often remembered as an iconic and beloved part of British motoring history.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText5493"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -41.63,
   "hfov": 27.47
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D24553BF_E561_4AB2_41E2_A9D53F4D2292",
   "pitch": -41.63,
   "yaw": -160.66,
   "hfov": 27.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D2763B56_E563_BBF2_41D4_4C5E312BAD97",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 74.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -13.18,
   "hfov": 21.02
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D245E3BF_E561_4AB2_41EA_0A6EF011528A",
   "pitch": -13.18,
   "yaw": 74.02,
   "hfov": 21.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_D6CC0642_E562_CDCD_41EB_DCF78D468093",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -21.42,
   "hfov": 22.77
  }
 ],
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C748C280_E4A1_454E_41E2_2C374374EFE5",
   "pitch": -21.42,
   "yaw": -62.12,
   "hfov": 22.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C5CCAD59_E49F_5FFE_41EB_2670F835032B",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 74.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -35.09,
   "hfov": 23.95
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C7481280_E4A1_454E_41D4_74D8B7779D2A",
   "pitch": -35.09,
   "yaw": 74.15,
   "hfov": 23.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C69CB0A6_E49E_C552_41E8_C1EE1D3F0799",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 38.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ]
   },
   "pitch": -11.35,
   "hfov": 20.8
  }
 ],
 "data": {
  "label": "Arrow 06c Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C7483281_E4A1_454E_41EA_DBA51129E727",
   "pitch": -11.35,
   "yaw": 38.64,
   "hfov": 20.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C04FAD94_E4A1_FF76_4199_4F354066AB83",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "ViewerArea",
 "toolTipFontSize": "12px",
 "toolTipOpacity": 0.5,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "minWidth": 1,
 "toolTipTextShadowColor": "#000000",
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "shadow": false,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "paddingRight": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 2,
 "show": "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_66ABB45B_7F33_F825_41D9_8E2DF4406350.set('selectedIndex', -1); }, this); this.playList_66ABB45B_7F33_F825_41D9_8E2DF4406350.set('selectedIndex', 0)",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderSize": 1,
 "top": "0%",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 2,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "minHeight": 1,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBorderColor": "#FFFFFF",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "toolTipBorderColor": "#000000",
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -13.08,
   "hfov": 14.4
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C23FB42F_E4A1_4D52_41D5_C493BFB21B32",
   "pitch": -13.08,
   "yaw": 70.14,
   "hfov": 14.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_CD4ACF14_E4AF_DB76_41E4_0886701487B8",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -109.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -5.75,
   "hfov": 9.61
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C20ADF1A_E4A6_BB7D_41D0_570F7F30D044",
   "pitch": -5.75,
   "yaw": -109.01,
   "hfov": 9.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_CC0435E9_E4A3_4EDE_41E1_DF0E6349A643",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -22.23,
   "hfov": 31.08
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D24673C3_E561_4AD2_41E6_D6D1BD8184D1",
   "pitch": -22.23,
   "yaw": 0.22,
   "hfov": 31.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D4A2B8EC_E561_46D6_41E0_2C984A797805",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 16
     }
    ]
   },
   "pitch": 8.14,
   "hfov": 5.97
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_DFD087D9_CF5B_E147_41E9_CD05E983DAC1, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 119,
      "height": 101
     }
    ]
   },
   "pitch": 8.14,
   "yaw": -4.3,
   "hfov": 5.97
  }
 ],
 "id": "overlay_DF48B047_CF5B_DF4A_41E7_0435237144CA",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 65.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 12.32,
   "hfov": 5.89
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_DEE4C081_CF5D_5FC6_41CF_7516769A745D, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 119,
      "height": 100
     }
    ]
   },
   "pitch": 12.32,
   "yaw": 65.15,
   "hfov": 5.89
  }
 ],
 "id": "overlay_DFD62013_CF5D_BECA_41B9_2EFF963337B6",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -53.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 10.98,
   "hfov": 5.92
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_DEC61032_CF55_BECA_41B6_4416609CB916, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 119,
      "height": 100
     }
    ]
   },
   "pitch": 10.98,
   "yaw": -53.99,
   "hfov": 5.92
  }
 ],
 "id": "overlay_DE7A10B3_CF55_7FCB_41E9_AC04D7DD0128",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 16
     }
    ]
   },
   "pitch": 6.02,
   "hfov": 5.99
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_DD5AA638_CFBD_A2C6_41C9_88EE563CA719, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 119,
      "height": 101
     }
    ]
   },
   "pitch": 6.02,
   "yaw": 176.07,
   "hfov": 5.99
  }
 ],
 "id": "overlay_DE611047_CFBD_FF4A_41D5_9476B020D9F7",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 97.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -11.77,
   "hfov": 13.87
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D41E55D9_E563_CEFE_41E3_951C05A0F10D",
   "pitch": -11.77,
   "yaw": 97.71,
   "hfov": 13.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C8F2B6EA_E561_CAD2_41E8_9ACB91CE35B7",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 41.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -7.53,
   "hfov": 12.52
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D41EF5D9_E563_CEFE_41EA_A83FFA0A4C3D",
   "pitch": -7.53,
   "yaw": 41.54,
   "hfov": 12.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CB04A62C_E562_CD55_41CD_A3171783288B",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0_HS_10_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -7.22,
   "hfov": 12.46
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F66A7A53_E4A6_C5F7_41E0_254A2FC4483B",
   "pitch": -7.22,
   "yaw": 176.93,
   "hfov": 12.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F600A643_E4A1_4DD3_41BA_41E97A7BFDEF",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 116.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0_HS_11_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -16.06,
   "hfov": 16.16
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F115579E_E4A7_4B72_41E4_09E363DABF11",
   "pitch": -16.06,
   "yaw": 116.56,
   "hfov": 16.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_F04A8B16_E4A1_5B72_41E7_881E43E0791A",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0_HS_12_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -7.04,
   "hfov": 12.46
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F0E59C17_E4BE_DD72_41E0_139208B22763",
   "pitch": -7.04,
   "yaw": 5.91,
   "hfov": 12.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F70F8D23_E4A3_7F53_41EC_61B6F2E1409D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "Image",
 "id": "image_uid66B25468_7F33_F8E4_41DB_47FB612648E1_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_DC6A651A_CE67_FD1A_41E0_5EFB48B2107C.jpeg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13604"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_DCC75BEA_CE66_3525_41D4_FBC830B01DA3",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The Ford Crew Cab from 1940 was a classic American pickup truck model produced by Ford Motor Company during the early 1940s. It was notable for its extended cabin space, which allowed for the accommodation of additional passengers in the rear seat area, making it suitable for both cargo and passenger transportation. The 1940 Ford Crew Cab featured a robust design with a sturdy chassis and was available with various engine options, including inline-six and V8 engines, providing customers with choices for different power and performance levels. This versatile and practical truck played a role in the transportation needs of the time and contributed to Ford's legacy of producing durable and dependable vehicles.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText17041"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "Image",
 "id": "image_uid66A47461_7F33_F8E5_41C1_509713A43A01_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_D40A19F3_D8FA_5279_41CB_016B98983888.jpg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13596"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_A40C5450_B65B_AA28_41E2_1FB769F6B2A1",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">Visitors can take photos with various types of owls provided here just by paying voluntarily. That means you can pay whatever price you like, as long as you give it with a good intention and prayer, it will be acceptable.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText4683"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "Image",
 "id": "image_uid66A1A45C_7F33_F823_41C8_B9F09C084F12_0",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 0,
 "url": "media/photo_D40A19F3_D8FA_5279_41CB_016B98983888.jpg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image13594"
 },
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "htmlText_A28BD066_B6AF_6AE9_41E4_82D740B00E3E",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 0,
 "scrollBarWidth": 10,
 "height": "50%",
 "backgroundOpacity": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 10,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">Visitors can take photos with various types of owls provided here just by paying voluntarily. That means you can pay whatever price you like, as long as you give it with a good intention and prayer, it will be acceptable.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText7208"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 8.09,
   "hfov": 5.97
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_C176CE9F_CE66_6F1A_41DC_7F1264C5F939, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 120,
      "height": 100
     }
    ]
   },
   "pitch": 8.09,
   "yaw": 0.82,
   "hfov": 5.97
  }
 ],
 "id": "overlay_C0B39F47_CE66_2D6A_4183_E6CB92164A17",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 46.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 7.61,
   "hfov": 5.97
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_DFF0790A_CE62_32E5_41E1_B4EAF0407208, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 120,
      "height": 101
     }
    ]
   },
   "pitch": 7.61,
   "yaw": 46.6,
   "hfov": 5.97
  }
 ],
 "id": "overlay_DE306102_CE62_32EA_41E3_E04DBABA249A",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 71.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 8.24,
   "hfov": 5.96
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_DF1BDE3B_CE6E_2F1A_41B5_4E58D8F4AEE8, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 120,
      "height": 101
     }
    ]
   },
   "pitch": 8.24,
   "yaw": 71.06,
   "hfov": 5.96
  }
 ],
 "id": "overlay_DEFF2AFF_CE6E_F71A_41E5_9D57849A54BC",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 147.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 7.19,
   "hfov": 5.98
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_DC7D65EF_CE62_5D3A_41D9_56543F36B2B6, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 120,
      "height": 101
     }
    ]
   },
   "pitch": 7.19,
   "yaw": 147.69,
   "hfov": 5.98
  }
 ],
 "id": "overlay_DE987B3B_CE62_D51B_41D3_553003EAF941",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -128.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 10.45,
   "hfov": 5.93
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_DC748602_CE66_5EEA_41DF_73DD8A01E1D2, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_6_0.png",
      "class": "ImageResourceLevel",
      "width": 120,
      "height": 101
     }
    ]
   },
   "pitch": 10.45,
   "yaw": -128.2,
   "hfov": 5.93
  }
 ],
 "id": "overlay_DE91B00E_CE66_52FA_41E7_617CEFC08C0A",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -175,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 8.84,
   "hfov": 5.96
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_DEDA5F4E_CE62_2D7A_417A_F082C68ABEFC, null, false)"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_7_0.png",
      "class": "ImageResourceLevel",
      "width": 120,
      "height": 101
     }
    ]
   },
   "pitch": 8.84,
   "yaw": -175,
   "hfov": 5.96
  }
 ],
 "id": "overlay_DF3B7E2A_CE62_2F3A_417C_2E07D7464033",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -158,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_9_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ]
   },
   "pitch": -7.9,
   "hfov": 21.21
  }
 ],
 "data": {
  "label": "Arrow 06c Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_CF9641C1_E4A3_46CE_41D7_CB11BF190FC1",
   "pitch": -7.9,
   "yaw": -158,
   "hfov": 21.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C8D971D8_E4A3_46FE_41D7_F4F00BF36755",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 23.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_10_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ]
   },
   "pitch": -4.52,
   "hfov": 14.89
  }
 ],
 "data": {
  "label": "Arrow 06c Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_CF233A8E_E4A1_4555_41C1_045ECA6BFDCA",
   "pitch": -4.52,
   "yaw": 23.98,
   "hfov": 14.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_CF770BE2_E4A1_7AD2_41BA_63AE8DE93BFB",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 39.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -6.42,
   "hfov": 12.48
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C31A0AEE_E4A2_BAD2_41DB_24D8563162D6",
   "pitch": -6.42,
   "yaw": 39.24,
   "hfov": 12.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_CC6B386A_E4A7_45D2_41A1_7F8C6C1B550A",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -162.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -14.56,
   "hfov": 13.78
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C31BEAEE_E4A2_BAD2_4193_741D039C6A92",
   "pitch": -14.56,
   "yaw": -162.12,
   "hfov": 13.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C3C960ED_E4A1_C6D6_41E7_877D175D53F1",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -13.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -12.17,
   "hfov": 17.34
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FEFC6ABC_E4E6_FAB6_41EA_070FF802D7F4",
   "pitch": -12.17,
   "yaw": -13.94,
   "hfov": 17.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FDCCC60F_E4E1_CD52_41E5_8FB6EE39F972",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 74.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0_HS_8_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 51,
      "height": 16
     }
    ]
   },
   "pitch": -7.34,
   "hfov": 18.52
  }
 ],
 "data": {
  "label": "Arrow 06b Right"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FEFC0ABC_E4E6_FAB6_41E0_3A067FC178A5",
   "pitch": -7.34,
   "yaw": 74.14,
   "hfov": 18.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_FDE56499_E4E3_4D7F_41A3_B45042AFBD65",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 46.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0_HS_9_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -10.31,
   "hfov": 13.41
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FEFDDABC_E4E6_FAB6_41C3_E104B445F420",
   "pitch": -10.31,
   "yaw": 46.24,
   "hfov": 13.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FEA977A8_E4E3_4B5E_41DA_8D5E04EBE90D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -135.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0_HS_10_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -19.07,
   "hfov": 23.4
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FEFDFABC_E4E6_FAB6_41D2_128AF80D3B7C",
   "pitch": -19.07,
   "yaw": -135.82,
   "hfov": 23.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_F9D44879_E4E1_45BE_41D8_1020294B6FEF",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -159.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -14.51,
   "hfov": 22.32
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C7498281_E4A1_454E_41C6_B8E1B18077F2",
   "pitch": -14.51,
   "yaw": -159.89,
   "hfov": 22.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C0A91BF9_E4A1_5ABE_41E1_CF181EA835BD",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -139.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -13.93,
   "hfov": 21.83
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D77F6175_E561_C7B6_41D5_5937DB0ADCFC",
   "pitch": -13.93,
   "yaw": -139.52,
   "hfov": 21.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C8EEFE8D_E561_5D56_41DE_B4FB2CA9F60A",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -13.73,
   "hfov": 17.46
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D77F1175_E561_C7B6_41E3_2A56719D5398",
   "pitch": -13.73,
   "yaw": 11.15,
   "hfov": 17.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D67000BF_E561_46B2_41EC_898875C76493",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 100.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 51,
      "height": 16
     }
    ]
   },
   "pitch": -25.17,
   "hfov": 25.66
  }
 ],
 "data": {
  "label": "Arrow 06b Right"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D77F8175_E561_C7B6_41DF_88E4FBD041F9",
   "pitch": -25.17,
   "yaw": 100.24,
   "hfov": 25.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_D76452CC_E567_4AD6_41E7_DD210992AC87",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 98.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -9.39,
   "hfov": 15.94
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_D7783175_E561_C7B6_41E7_8E3B046D50BE",
   "pitch": -9.39,
   "yaw": 98.26,
   "hfov": 15.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D4B4FD76_E566_DFB2_41C3_C108D82AD96F",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0_HS_9_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -11.05,
   "hfov": 23.3
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F115C79E_E4A7_4B72_41EA_BFE680DF6A7B",
   "pitch": -11.05,
   "yaw": 11.46,
   "hfov": 23.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F193DDD9_E4A2_FEFE_41D8_EFAC55C4DB56",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 116.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0_HS_10_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -9.53,
   "hfov": 15.99
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F114079E_E4A7_4B72_41C6_B4A90737F5C8",
   "pitch": -9.53,
   "yaw": 116.15,
   "hfov": 15.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F1EA925B_E4A2_C5F3_41CE_3BA37BFDEFCB",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -142.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0_HS_11_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -17.69,
   "hfov": 21.97
  }
 ],
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F114979E_E4A7_4B72_41E8_278E16FF9895",
   "pitch": -17.69,
   "yaw": -142.2,
   "hfov": 21.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_F35140D1_E4A1_46CE_41D4_D31CCA822719",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_22BBC2F4_3075_D173_41B4_71F7A3560C34",
 "left": "0%",
 "width": 366,
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "minWidth": 1,
 "shadowVerticalLength": 0,
 "shadowBlurRadius": 7,
 "shadowSpread": 1,
 "contentOpaque": false,
 "top": 2,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.8,
 "verticalAlign": "top",
 "height": 78,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "white block"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_22BBD2F4_3075_D173_41B4_8504C593E6BF",
 "left": 0,
 "width": 366,
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "minWidth": 1,
 "shadowVerticalLength": 0,
 "shadowBlurRadius": 7,
 "shadowSpread": 1,
 "contentOpaque": false,
 "top": 86,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 0.5,
 "verticalAlign": "top",
 "height": 46,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0.01
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "blue block"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical"
},
{
 "visible": false,
 "fontFamily": "Oswald",
 "data": {
  "name": "text 1"
 },
 "id": "Label_22BB22F4_3075_D173_41BB_3ACDC6CCCC83",
 "left": 10,
 "width": 391,
 "paddingLeft": 0,
 "fontColor": "#000000",
 "minWidth": 1,
 "text": "THE HERITAGE PALACE",
 "horizontalAlign": "left",
 "top": 0,
 "verticalAlign": "middle",
 "height": 75,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": "37px",
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "class": "Label",
 "paddingRight": 0,
 "paddingBottom": 0,
 "fontWeight": "bold"
},
{
 "visible": false,
 "fontFamily": "Oswald",
 "data": {
  "name": "text 2"
 },
 "id": "Label_22BB32F4_3075_D173_4191_C8B45B85DEB8",
 "left": 12,
 "width": 385,
 "paddingLeft": 0,
 "textShadowColor": "#000000",
 "textShadowVerticalLength": 0,
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "text": "SUKOHARJO, CENTRAL JAVA, INDONESIA",
 "textShadowHorizontalLength": 0,
 "horizontalAlign": "left",
 "top": 90,
 "verticalAlign": "top",
 "height": 44,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": "23px",
 "textShadowBlurRadius": 10,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "fontStyle": "italic",
 "textShadowOpacity": 1,
 "textDecoration": "none",
 "class": "Label",
 "paddingRight": 0,
 "paddingBottom": 0,
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 2,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "width": 110,
 "paddingLeft": 0,
 "right": "0%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "horizontalAlign": "center",
 "top": "0%",
 "verticalAlign": "middle",
 "height": 110,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "button menu sup"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "right": "0%",
 "width": "91.304%",
 "paddingLeft": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "horizontalAlign": "center",
 "height": "85.959%",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 },
 "gap": 3,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
 "left": "0%",
 "width": 66,
 "paddingLeft": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "children": [
  "this.Container_21F34780_3014_BF93_41A2_9BF700588BEC",
  "this.IconButton_223F0171_3014_B375_41C1_61063C3D73B3"
 ],
 "contentOpaque": false,
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "horizontalAlign": "left",
 "height": "100%",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- COLLAPSE"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD",
 "width": 330,
 "right": 0,
 "paddingLeft": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "children": [
  "this.Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
  "this.IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882"
 ],
 "contentOpaque": false,
 "top": "0%",
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "height": "100%",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- EXPANDED"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "data": {
  "name": "Global"
 },
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "15%",
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "minWidth": 1,
 "shadowVerticalLength": 0,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "contentOpaque": false,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "shadow": true,
 "minHeight": 1,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "layout": "horizontal",
 "overflow": "scroll",
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "15%",
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "paddingLeft": 0,
 "right": "15%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "top": "10%",
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "bottom": "80%",
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 20,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "data": {
  "name": "Global"
 },
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "minWidth": 1,
 "shadowVerticalLength": 0,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "contentOpaque": false,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "horizontalAlign": "center",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "shadow": true,
 "minHeight": 1,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "visible",
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "data": {
  "name": "Global"
 },
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "minWidth": 1,
 "shadowVerticalLength": 0,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "contentOpaque": false,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "shadow": true,
 "minHeight": 1,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "overflow": "scroll",
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "paddingLeft": 0,
 "right": "15%",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "top": "10%",
 "verticalAlign": "top",
 "horizontalAlign": "right",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "bottom": "80%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 20,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 20,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "data": {
  "name": "Global"
 },
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "children": [
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "minWidth": 1,
 "shadowVerticalLength": 0,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "contentOpaque": false,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "horizontalAlign": "center",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "shadow": true,
 "minHeight": 1,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "layout": "absolute",
 "overflow": "visible",
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "data": {
  "name": "Global"
 },
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "minWidth": 1,
 "shadowVerticalLength": 0,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "contentOpaque": false,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "horizontalAlign": "center",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "shadow": true,
 "minHeight": 1,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "visible",
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "data": {
  "name": "Global"
 },
 "id": "Container_1E19923C_57F1_802D_41C4_18DBE75E48C1",
 "left": "15%",
 "children": [
  "this.Container_1E19E23C_57F1_802D_41D1_9B8B4D1D2BBD",
  "this.Container_1E19D23C_57F1_802D_41B0_92437DF80B82"
 ],
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "minWidth": 1,
 "shadowVerticalLength": 0,
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "contentOpaque": false,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "shadow": true,
 "minHeight": 1,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "overflow": "scroll",
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_1E18A23C_57F1_802D_41B9_D08FA26C7F4C",
 "left": "15%",
 "children": [
  "this.IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF"
 ],
 "paddingLeft": 0,
 "right": "15%",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "top": "10%",
 "verticalAlign": "top",
 "horizontalAlign": "right",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "bottom": "80%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 20,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C7485281_E4A1_454E_41CB_58363F8F988F",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307A515A_3B03_C8F4_41C4_54E6993B1850_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C7486281_E4A1_454E_41D5_644BBF2DA889",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_F8A911FF_E4E1_46B2_41E4_363BD7BA6DEB",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3078E86A_3B02_F8D4_41B1_B6E830250620_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_F8AAA1FF_E4E1_46B2_41E8_F1A990BD2AAA",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C509CC79_E4E6_BDBE_41EB_0F53ECD3FF0A",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C5097C79_E4E6_BDBE_41EA_738FCF889BEA",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_309FD2D2_3B03_49F5_4146_5E15829C7F3C_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C5088C79_E4E6_BDBE_41D9_88C38D940DC8",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FFEAA4D7_E4A3_4EF2_41E2_116193F1BBC0",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0_HS_8_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FFEAD4D7_E4A3_4EF2_41E8_2943D2FBAA8E",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0_HS_9_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FFED04D7_E4A3_4EF2_41DF_DD14D1063B8A",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307BD3F5_3B03_4FBC_41C7_644CF74C11BE_0_HS_10_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FCD8F0B2_E4A1_46B2_41E2_B7B59AFB4715",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FB6FB981_E4E1_474E_41CA_2A871554027A",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0_HS_8_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FB680981_E4E1_474E_41DD_0B33E594C13E",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0_HS_9_0.png",
   "class": "ImageResourceLevel",
   "width": 640,
   "height": 300
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FB686981_E4E1_474E_4166_16D4818FC88A",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3085FECD_3B02_B9EF_41C9_7D50EF406B59_0_HS_10_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FB68B981_E4E1_474E_416F_5FBD15E28AEE",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_CDB25C2D_E4BF_FD56_41DD_B62FA91B45F9",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3088473C_3B03_C8AC_41B4_BD208C3DDF9B_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_CDB2DC2D_E4BF_FD56_41D4_638807039612",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C20ABF1A_E4A6_BB7D_41E8_785DE7F49F9C",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3093310B_3B02_C86B_41C3_C2951B951ED9_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C20A8F1A_E4A6_BB7D_41E7_5B210F79B19C",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FC763842_E4A2_C5D2_41DE_4937733AEB04",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FC718842_E4A2_C5D2_41CA_03A7563DE846",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30796AA1_3B03_5857_41C3_400381D47B0A_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FC715842_E4A2_C5D2_41E2_EC784E9C859F",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C23D542F_E4A1_4D52_41E2_AA1B9554B9B3",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C23EE42F_E4A1_4D52_41D2_12E763D5307D",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3078B71E_3B02_C86D_41B7_70A00F950FF0_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C23E042F_E4A1_4D52_41C9_D7AE90E6968E",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C6672920_E4E1_474E_41E6_1E84DDBCA6CF",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C667B920_E4E1_474E_41C0_BD0A9451C6FE",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3097F933_3B03_D8B4_41C5_01A06E7961C0_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C6181920_E4E1_474E_41DA_EDDC6AB7EB05",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D6904E00_E567_FD4D_41E6_795AB9AC2904",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_309B7277_3B02_C8BB_415F_FC432B308E1B_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D6901E00_E567_FD4D_41D3_855621A42298",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D24693C3_E561_4AD2_41E5_B29683DF191E",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3096786D_3B03_D8AF_4172_8E6C661ABF5B_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D24713C3_E561_4AD2_41C6_2B3EDEC2FE7A",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FFA197D3_E4A3_4AF1_41D8_E229177EB5BE",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FFA127D5_E4A3_4AF7_41EC_3435331A6029",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30792973_3B03_58B4_4199_8A731C61F367_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FF01C694_E4A1_4D76_41EB_E9F87141EAE2",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D6903E00_E567_FD4D_41D8_CA8EE57BC153",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3078C9C6_3B02_DBDD_4193_AEE4B3F8B162_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D690DE00_E567_FD4D_41D9_DB194C54C801",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 780
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_5CED0103_4845_65F1_41C1_4D2ACDC41E54",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 300
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C8854B28_E56F_7B5E_41D3_A1550DB39B60",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3787367E_3B02_C8AC_41CB_776E387D818B_0_HS_8_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C884BB29_E56F_7B5E_41E5_6FF0DFFB4C06",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 640,
   "height": 300
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C9EFC579_E4A2_CFBE_41EA_8249F6A98FC3",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C9EF957A_E4A2_CFB2_41E9_0E101B11B11B",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307BF505_3B03_485C_41A7_6097D0B84928_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_CE9D6343_E4A7_CBD2_41D4_5168D535403D",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FA2AA748_EB6F_D8B4_41B6_95F8018BA927",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30790F3E_3B03_B8AC_41A5_E2DFF4789AB7_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FA2B1748_EB6F_D8B4_41E3_6FE697BD1F00",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D24553BF_E561_4AB2_41E2_A9D53F4D2292",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3093F939_3B03_F8B4_41A3_D11ED150C5EE_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D245E3BF_E561_4AB2_41EA_0A6EF011528A",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C748C280_E4A1_454E_41E2_2C374374EFE5",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C7481280_E4A1_454E_41D4_74D8B7779D2A",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3092BB52_3B03_58F4_419B_7FC04DB4BD7A_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 300
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C7483281_E4A1_454E_41EA_DBA51129E727",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C23FB42F_E4A1_4D52_41D5_C493BFB21B32",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_309DF23B_3B03_48AB_41C5_2FF83AB16BD2_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C20ADF1A_E4A6_BB7D_41D0_570F7F30D044",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307A510B_3B03_C86B_41B9_A9C23E177918_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D24673C3_E561_4AD2_41E6_D6D1BD8184D1",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D41E55D9_E563_CEFE_41E3_951C05A0F10D",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3078AA42_3B02_B8D5_41CC_21946806B3DC_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D41EF5D9_E563_CEFE_41EA_A83FFA0A4C3D",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0_HS_10_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_F66A7A53_E4A6_C5F7_41E0_254A2FC4483B",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0_HS_11_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_F115579E_E4A7_4B72_41E4_09E363DABF11",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_309572FD_3B03_49AF_41C3_53D8589DC146_0_HS_12_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_F0E59C17_E4BE_DD72_41E0_139208B22763",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_9_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 300
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_CF9641C1_E4A3_46CE_41D7_CB11BF190FC1",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30923FA1_3B02_F857_41BA_FD481F5C0F86_0_HS_10_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 300
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_CF233A8E_E4A1_4555_41C1_045ECA6BFDCA",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C31A0AEE_E4A2_BAD2_41DB_24D8563162D6",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30795FD8_3B03_D7F4_41A1_C9184964EF98_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C31BEAEE_E4A2_BAD2_4193_741D039C6A92",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FEFC6ABC_E4E6_FAB6_41EA_070FF802D7F4",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0_HS_8_0.png",
   "class": "ImageResourceLevel",
   "width": 640,
   "height": 300
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FEFC0ABC_E4E6_FAB6_41E0_3A067FC178A5",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0_HS_9_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FEFDDABC_E4E6_FAB6_41C3_E104B445F420",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_30791B62_3B03_78D4_41C8_03252B699D1D_0_HS_10_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_FEFDFABC_E4E6_FAB6_41D2_128AF80D3B7C",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307BE642_3B03_48D5_41CD_0BD101057A2C_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C7498281_E4A1_454E_41C6_B8E1B18077F2",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D77F6175_E561_C7B6_41D5_5937DB0ADCFC",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D77F1175_E561_C7B6_41E3_2A56719D5398",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 640,
   "height": 300
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D77F8175_E561_C7B6_41DF_88E4FBD041F9",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_307A614B_3B03_C8D4_41BF_536BCB4B0653_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7783175_E561_C7B6_41E7_8E3B046D50BE",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0_HS_9_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_F115C79E_E4A7_4B72_41EA_BFE680DF6A7B",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0_HS_10_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_F114079E_E4A7_4B72_41C6_B4A90737F5C8",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_3092CC81_3B03_7854_41C3_E9207A33602F_0_HS_11_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24,
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_F114979E_E4A7_4B72_41E8_278E16FF9895",
 "colCount": 4
},
{
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "width": 60,
 "paddingLeft": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "verticalAlign": "middle",
 "height": 60,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 60,
 "transparencyActive": true,
 "data": {
  "name": "image button menu"
 },
 "maxWidth": 60,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "visible": false,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "width": 58,
 "paddingLeft": 0,
 "minWidth": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "verticalAlign": "middle",
 "height": 58,
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "borderSize": 0,
 "click": "this.shareTwitter(window.location.href)",
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 58,
 "transparencyActive": true,
 "data": {
  "name": "IconButton TWITTER"
 },
 "maxWidth": 58,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "visible": false,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "width": 58,
 "paddingLeft": 0,
 "minWidth": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "verticalAlign": "middle",
 "height": 58,
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "borderSize": 0,
 "click": "this.shareFacebook(window.location.href)",
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 58,
 "transparencyActive": true,
 "data": {
  "name": "IconButton FB"
 },
 "maxWidth": 58,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "id": "Container_21F34780_3014_BF93_41A2_9BF700588BEC",
 "left": "0%",
 "width": 36,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "top": "0%",
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 0.4,
 "height": "100%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container black"
 },
 "paddingBottom": 0,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "id": "IconButton_223F0171_3014_B375_41C1_61063C3D73B3",
 "left": 10,
 "width": 50,
 "paddingLeft": 0,
 "minWidth": 1,
 "horizontalAlign": "center",
 "top": "40%",
 "iconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3.png",
 "verticalAlign": "middle",
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "bottom": "40%",
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3_rollover.png",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, false, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, false, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, true, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 80,
 "transparencyActive": true,
 "data": {
  "name": "IconButton arrow"
 },
 "maxWidth": 80,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "id": "Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
 "left": "0%",
 "children": [
  "this.Container_0B85764A_2D07_4D95_41A5_3AC872515A8C"
 ],
 "scrollBarVisible": "rollOver",
 "width": "90%",
 "paddingLeft": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "top": "0%",
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "height": "100%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container"
 },
 "paddingBottom": 0,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "id": "IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882",
 "width": 50,
 "paddingLeft": 0,
 "right": 9,
 "minWidth": 1,
 "horizontalAlign": "center",
 "top": "40%",
 "iconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882.png",
 "verticalAlign": "middle",
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "bottom": "40%",
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882_rollover.png",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": true,
 "maxHeight": 50,
 "transparencyActive": true,
 "data": {
  "name": "IconButton collapse"
 },
 "maxWidth": 50,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "width": "85%",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "height": "100%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "paddingBottom": 0,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "paddingLeft": 50,
 "scrollBarVisible": "rollOver",
 "width": "50%",
 "minWidth": 460,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "height": "100%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#0069A3",
 "propagateClick": false,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "paddingBottom": 20,
 "gap": 0,
 "class": "Container",
 "paddingRight": 50,
 "layout": "vertical",
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "width": "25%",
 "paddingLeft": 0,
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "verticalAlign": "middle",
 "height": "75%",
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 60,
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "maxWidth": 60,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 140,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "ThumbnailGrid",
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "left": 0,
 "itemLabelFontFamily": "Oswald",
 "width": "100%",
 "paddingLeft": 70,
 "minWidth": 1,
 "itemBorderRadius": 0,
 "itemMaxHeight": 1000,
 "itemHorizontalAlign": "center",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "selectedItemLabelFontColor": "#04A3E1",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "horizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "selectedItemLabelFontWeight": "bold",
 "verticalAlign": "middle",
 "height": "92%",
 "backgroundOpacity": 0,
 "itemPaddingLeft": 3,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "shadow": false,
 "itemThumbnailBorderRadius": 0,
 "borderSize": 0,
 "itemWidth": 220,
 "itemBackgroundColor": [],
 "propagateClick": true,
 "itemMinHeight": 50,
 "itemBackgroundColorRatios": [],
 "itemPaddingTop": 3,
 "paddingRight": 70,
 "itemVerticalAlign": "top",
 "itemThumbnailShadow": false,
 "scrollBarMargin": 2,
 "itemLabelTextDecoration": "none",
 "itemLabelFontWeight": "normal",
 "itemMinWidth": 50,
 "itemThumbnailHeight": 125,
 "rollOverItemThumbnailShadow": true,
 "itemOpacity": 1,
 "scrollBarWidth": 10,
 "itemHeight": 160,
 "itemThumbnailOpacity": 1,
 "itemLabelFontSize": 16,
 "selectedItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "itemThumbnailWidth": 220,
 "minHeight": 1,
 "borderRadius": 5,
 "bottom": -0.2,
 "itemBackgroundColorDirection": "vertical",
 "itemLabelGap": 7,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemLabelFontColor": "#666666",
 "scrollBarColor": "#04A3E1",
 "paddingTop": 10,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemPaddingBottom": 3,
 "itemPaddingRight": 3,
 "data": {
  "name": "ThumbnailList"
 },
 "gap": 26,
 "scrollBarOpacity": 0.5,
 "rollOverItemLabelFontColor": "#04A3E1",
 "paddingBottom": 70,
 "itemLabelHorizontalAlign": "center",
 "itemLabelFontStyle": "italic",
 "itemMaxWidth": 1000,
 "itemBackgroundOpacity": 0,
 "itemMode": "normal",
 "scrollBarVisible": "rollOver"
},
{
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "insetBorder": false,
 "width": "100%",
 "paddingLeft": 0,
 "scrollEnabled": true,
 "minWidth": 1,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.1853889967074!2d110.75224537522254!3d-7.55475437459738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1598381d4625%3A0xe517f6b0abbdd457!2sThe%20Heritage%20Palace!5e0!3m2!1sen!2sid!4v1695772413623!5m2!1sen!2sid\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "height": "100%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "WebFrame"
 },
 "paddingBottom": 0,
 "class": "WebFrame",
 "paddingRight": 0,
 "backgroundColorDirection": "vertical"
},
{
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "width": "25%",
 "paddingLeft": 0,
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "verticalAlign": "middle",
 "height": "75%",
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 60,
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "maxWidth": 60,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "class": "Container",
 "scrollBarMargin": 2,
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "paddingLeft": 0,
 "width": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 140,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "gap": 10,
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "height": "100%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container photo"
 },
 "paddingBottom": 0,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "layout": "absolute",
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_1E19E23C_57F1_802D_41D1_9B8B4D1D2BBD",
 "children": [
  "this.Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "width": "55%",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "height": "100%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "paddingBottom": 0,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_1E19D23C_57F1_802D_41B0_92437DF80B82",
 "children": [
  "this.Container_1E18223C_57F1_802D_41D5_C1ECF1EB519F",
  "this.Container_1E18323C_57F1_802D_41AC_3EB4DE555BBC",
  "this.Container_1E18523C_57F1_802D_41B1_88C86CD9A273"
 ],
 "paddingLeft": 60,
 "scrollBarVisible": "rollOver",
 "width": "45%",
 "minWidth": 460,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "height": "100%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#0069A3",
 "propagateClick": false,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "paddingBottom": 20,
 "gap": 0,
 "class": "Container",
 "paddingRight": 60,
 "layout": "vertical",
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "id": "IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF",
 "width": "25%",
 "paddingLeft": 0,
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_pressed.jpg",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF.jpg",
 "verticalAlign": "middle",
 "height": "75%",
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_rollover.jpg",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, false, 0, null, null, false)",
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 60,
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "maxWidth": 60,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "id": "Container_0B85764A_2D07_4D95_41A5_3AC872515A8C",
 "left": "0%",
 "children": [
  "this.Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19",
  "this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
  "this.Container_19256A12_2D07_45B5_41AB_E9DE96B2DFF3",
  "this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
  "this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
  "this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
  "this.Container_1758A215_31FA_0014_41B6_9A4A5384548B",
  "this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
  "this.Container_168D8311_3106_01EC_41B0_F2D40886AB88"
 ],
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "paddingLeft": 40,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "top": "0%",
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 0.7,
 "height": "100%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 40,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- Buttons set"
 },
 "paddingBottom": 40,
 "gap": 10,
 "class": "Container",
 "paddingRight": 40,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 1,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "horizontalAlign": "center",
 "top": "0%",
 "verticalAlign": "middle",
 "height": "100%",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 1000,
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 },
 "maxWidth": 2000,
 "class": "Image",
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "height": 60,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "gap": 0,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "minWidth": 100,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "height": "100%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 520,
 "borderSize": 0,
 "scrollBarColor": "#E73B2C",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "paddingBottom": 30,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "layout": "vertical",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "width": 370,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 40,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "width": "100%",
 "right": 20,
 "paddingLeft": 0,
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "horizontalAlign": "right",
 "top": 20,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "verticalAlign": "top",
 "height": "36.14%",
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 60,
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "maxWidth": 60,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "width": "100%",
 "right": 20,
 "paddingLeft": 0,
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "horizontalAlign": "right",
 "top": 20,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "verticalAlign": "top",
 "height": "36.14%",
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 60,
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "maxWidth": 60,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "width": "10%",
 "right": 20,
 "paddingLeft": 0,
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "horizontalAlign": "right",
 "top": 20,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "verticalAlign": "top",
 "height": "10%",
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 60,
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "maxWidth": 60,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1",
 "left": "0%",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 1,
 "url": "skin/Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1.jpg",
 "horizontalAlign": "center",
 "top": "0%",
 "verticalAlign": "bottom",
 "height": "100%",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 1000,
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image40635"
 },
 "maxWidth": 2000,
 "class": "Image",
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_1E18223C_57F1_802D_41D5_C1ECF1EB519F",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "horizontalAlign": "right",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "height": "5%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "gap": 0,
 "class": "Container",
 "paddingRight": 0,
 "layout": "horizontal",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_1E18323C_57F1_802D_41AC_3EB4DE555BBC",
 "children": [
  "this.HTMLText_1E18123C_57F1_802D_41D2_B0CD0D6533F4",
  "this.Container_1E18623C_57F1_802D_41D5_C4D10C61A206"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "minWidth": 100,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "height": "100%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 520,
 "borderSize": 0,
 "scrollBarColor": "#E73B2C",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "paddingBottom": 30,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "layout": "vertical",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_1E18523C_57F1_802D_41B1_88C86CD9A273",
 "width": 370,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 40,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "id": "Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19",
 "left": "0%",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 40,
 "url": "skin/Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19.png",
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "top",
 "height": "25%",
 "backgroundOpacity": 0,
 "minHeight": 30,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "maxHeight": 1095,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image Company"
 },
 "maxWidth": 1095,
 "class": "Image",
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
 "children": [
  "this.Container_208C289A_3033_51B4_41BC_C3F8D8B8F86D",
  "this.Button_0AEB5577_2D08_CE7B_41B6_192923248F4E",
  "this.Container_106C4A62_2D09_C594_41C0_0D00619DF541",
  "this.Button_0A054365_2D09_CB9F_4145_8C365B373D19",
  "this.Container_152401E8_2D0B_4694_41C5_9141C985F9C3",
  "this.Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
  "this.Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89",
  "this.Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF",
  "this.Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03",
  "this.Button_0399826A_2D79_4594_41BA_934A50D0E6B4",
  "this.Container_146FF082_2D09_C695_41C4_13DE74CDAF5E",
  "this.Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB",
  "this.Container_207ECEAD_3035_51EC_41A3_EE49910C654D"
 ],
 "paddingLeft": 0,
 "right": "0%",
 "width": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "26%",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "bottom": "26%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 1"
 },
 "gap": 0,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_19256A12_2D07_45B5_41AB_E9DE96B2DFF3",
 "left": "0%",
 "children": [
  "this.Container_193B8A52_2D1B_C5B5_41C3_F44FF520A3F0",
  "this.HTMLText_29DD1615_3597_79DF_41C4_7593739E5260",
  "this.Container_2B9EE463_3593_BA7B_4195_8E8F4568BB13",
  "this.Container_283049D5_35F3_AA5F_419D_20B6A59ABCA6"
 ],
 "paddingLeft": 0,
 "width": "100%",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "bottom",
 "horizontalAlign": "left",
 "height": 130,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Container footer"
 },
 "gap": 5,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
 "left": "0%",
 "children": [
  "this.Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
  "this.Container_2A2DB53B_310E_001C_41BA_0206228E495C",
  "this.Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
  "this.Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
  "this.Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
  "this.Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
  "this.Button_2A2C053B_310E_001C_41A2_583DE489828C",
  "this.Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
  "this.Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
  "this.Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
  "this.Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
  "this.Button_F14F6000_D05B_EB72_41BE_A1FDBFCA8000",
  "this.Button_F1C3AAD5_D05B_FC92_41C0_7520FE577912",
  "this.Button_DCEFC896_D3FD_B8A3_41E9_A9F979F38498",
  "this.Button_DC1DF1AD_D3FD_88E0_41D2_12DAC672F982",
  "this.Button_C261C2E3_D3E5_8860_41E1_E6FB86B9761B"
 ],
 "paddingLeft": 0,
 "width": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "25%",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "bottom": "25%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 2-1"
 },
 "gap": 0,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
 "left": "0%",
 "children": [
  "this.Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
  "this.Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
  "this.Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
  "this.Button_15A10DDC_31FA_0014_4185_021C898E177D",
  "this.Button_15A13DDC_31FA_0014_41C5_41AE80876834",
  "this.Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
  "this.Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
  "this.Button_159ECDDC_31FA_0014_41B9_2D5AB1021813",
  "this.Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0",
  "this.Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB",
  "this.Button_159E9DDC_31FA_0015_41B6_CB1D433C7673",
  "this.Button_159E8DDD_31FA_0014_41C5_F18F441AF371",
  "this.Button_159EBDDD_31FA_0014_41C8_935504B30727"
 ],
 "paddingLeft": 0,
 "width": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "25%",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "bottom": "25%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 2-2"
 },
 "gap": 0,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
 "left": "0%",
 "children": [
  "this.Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
  "this.Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
  "this.Container_17578D7D_31FA_0015_41BE_353D3005648A",
  "this.Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
  "this.Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
  "this.Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
  "this.Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
  "this.Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
  "this.Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
  "this.Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2",
  "this.Button_17562D7D_31FA_0015_41A3_96B282B30DBA",
  "this.Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7",
  "this.Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC"
 ],
 "paddingLeft": 0,
 "width": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "25%",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "bottom": "25%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 2-3"
 },
 "gap": 0,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_1758A215_31FA_0014_41B6_9A4A5384548B",
 "left": "0%",
 "children": [
  "this.Button_175A5214_31FA_0014_4198_930DF49BADD9",
  "this.Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
  "this.Container_1759B215_31FA_0014_41C0_84C99CBD5517",
  "this.Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
  "this.Button_17598215_31FA_0014_41AC_1166AB319171",
  "this.Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
  "this.Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
  "this.Button_17593215_31FA_0014_41C0_42BAFB0080F0",
  "this.Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
  "this.Button_17590215_31FA_0014_41C1_2B2D012DCC76",
  "this.Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
  "this.Button_17596215_31FA_0014_41C6_A42670770708",
  "this.Button_1758B215_31FA_0014_41BC_C4EAC2A9544B"
 ],
 "paddingLeft": 0,
 "width": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "25%",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "bottom": "25%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 2-4"
 },
 "gap": 0,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
 "left": "0%",
 "children": [
  "this.Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
  "this.Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
  "this.Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
  "this.Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
  "this.Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
  "this.Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
  "this.Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
  "this.Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
  "this.Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
  "this.Button_17EB52B7_3106_0014_419C_439E593AEC43",
  "this.Button_17EB62B7_3106_0014_41C5_43B38271B353",
  "this.Button_17EB72B7_3106_0014_41B9_61857077BF4A",
  "this.Button_17EB92B7_3106_0014_41B2_34A3E3F63779"
 ],
 "paddingLeft": 0,
 "width": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "25%",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "bottom": "25%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 2-5"
 },
 "gap": 0,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_168D8311_3106_01EC_41B0_F2D40886AB88",
 "left": "0%",
 "children": [
  "this.Button_168CA310_3106_01EC_41C7_72CE0522951A",
  "this.Container_168C8310_3106_01EC_4187_B16F315A4A23",
  "this.Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
  "this.Button_168D6310_3106_01EC_41B8_A0B6BE627547",
  "this.Button_168D5310_3106_01EC_41B5_96D9387401B8",
  "this.Button_168D3310_3106_01EC_41AC_5D524E4677A5",
  "this.Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA",
  "this.Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3",
  "this.Button_168DE310_3106_01EC_4192_6A9F468A0ADE",
  "this.Button_168DD310_3106_01EC_4190_7815FA70349E",
  "this.Button_168DB310_3106_01EC_41B2_3511AA5E40E1",
  "this.Button_168DA310_3106_01EC_41BE_DF88732C2A28",
  "this.Button_168D9311_3106_01EC_41A8_3BD8769525D6"
 ],
 "paddingLeft": 0,
 "width": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "25%",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "bottom": "25%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Level 2-6"
 },
 "gap": 0,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "vertical",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "width": "100%",
 "paddingLeft": 10,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "height": "100%",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.85vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.19vh;font-family:'Oswald';\"><B><I>THE HERITAGE PALACE</I></B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.03vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.14vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.03vh;font-family:'Oswald';\"><B>LARGE INDOOR-OUTDOOR PALACE WITH A GARDEN &amp; SEVERAL ART MUSEUMS PLUS A PLAYGROUND &amp; CONVENTION HALL.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.03vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.14vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.17vh;font-family:'Oswald';\"><B><I>OPERATIONAL DAYS</I></B></SPAN><SPAN STYLE=\"font-size:2.03vh;font-family:'Oswald';\"><B><I> :</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.95vh;\"> </SPAN><SPAN STYLE=\"font-size:0.95vh;\">\u2022 </SPAN><SPAN STYLE=\"font-size:1.49vh;\">Monday - Sunday : 9 A.M - 4 P.M</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.49vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.14vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.14vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.14vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.17vh;font-family:'Oswald';\"><B><I>TICKET PRICE</I></B></SPAN><SPAN STYLE=\"font-size:2.03vh;font-family:'Oswald';\"><B><I> :</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.49vh;\"> \u2022 </SPAN><SPAN STYLE=\"font-size:1.49vh;\"><B><I>Weekday</I></B></SPAN><SPAN STYLE=\"font-size:1.49vh;\"> :</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.49vh;\">Bundling (Indoor</SPAN><SPAN STYLE=\"font-size:1.49vh;\"><I>, </I></SPAN><SPAN STYLE=\"font-size:1.49vh;\">Outdoor</SPAN><SPAN STYLE=\"font-size:1.49vh;\"><I> </I></SPAN><SPAN STYLE=\"font-size:1.49vh;\">&amp; Museum) = IDR 55.000, Outdoor Only = IDR 30.000 </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.49vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.14vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.49vh;\">\u2022 </SPAN><SPAN STYLE=\"font-size:1.49vh;\"><B><I>Weekend</I></B></SPAN><SPAN STYLE=\"font-size:1.49vh;\"> :</SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.49vh;\">Bundling (Indoor, Outdoor &amp; Museum) = IDR 65.000, Outdoor Only = IDR 35.000 </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.49vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.14vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText"
 },
 "paddingRight": 10,
 "paddingBottom": 20,
 "scrollBarVisible": "rollOver"
},
{
 "visible": false,
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 1,
 "data": {
  "name": "Button"
 },
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "width": 180,
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "pressedBackgroundColorRatios": [
  0
 ],
 "fontFamily": "Oswald",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": 50,
 "backgroundOpacity": 0.7,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#04A3E1"
 ],
 "borderRadius": 50,
 "shadow": false,
 "fontSize": "2.39vh",
 "minHeight": 1,
 "shadowSpread": 1,
 "borderSize": 0,
 "label": "LOREM IPSUM",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "gap": 5,
 "textDecoration": "none",
 "class": "Button",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "bold",
 "backgroundColorDirection": "vertical"
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "HTMLText_1E18123C_57F1_802D_41D2_B0CD0D6533F4",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "height": "46%",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarOpacity": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.85vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.19vh;font-family:'Oswald';\"><B><I>LOREM IPSUM</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.19vh;font-family:'Oswald';\"><B><I>DOLOR SIT AMET</I></B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18899"
 },
 "paddingRight": 0,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_1E18623C_57F1_802D_41D5_C4D10C61A206",
 "children": [
  "this.Image_1E18723C_57F1_802D_41C5_8325536874A5",
  "this.HTMLText_1E18423C_57F1_802D_41C4_458DB7F892AC"
 ],
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "height": "75%",
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- content"
 },
 "paddingBottom": 0,
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "layout": "horizontal",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_208C289A_3033_51B4_41BC_C3F8D8B8F86D",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button Tour Info"
 },
 "id": "Button_0AEB5577_2D08_CE7B_41B6_192923248F4E",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "OUTDOOR AREA >",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B, true, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_106C4A62_2D09_C594_41C0_0D00619DF541",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 23,
 "data": {
  "name": "Button Panorama List"
 },
 "id": "Button_0A054365_2D09_CB9F_4145_8C365B373D19",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "INDOOR AREA >",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B, true, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_152401E8_2D0B_4694_41C5_9141C985F9C3",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button Location"
 },
 "id": "Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "TRANSPORTATION MUSEUM >",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D, true, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "pressedLabel": "Inserdt Text",
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button Floorplan"
 },
 "id": "Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "3D TRICK ART MUSEUM >",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_1758A215_31FA_0014_41B6_9A4A5384548B, true, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button Photoalbum"
 },
 "id": "Button_0399826A_2D79_4594_41BA_934A50D0E6B4",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "SWIMMING POOL >",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE, true, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_146FF082_2D09_C695_41C4_13DE74CDAF5E",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button Contact"
 },
 "id": "Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "RESTAURANTS >",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, true, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_207ECEAD_3035_51EC_41A3_EE49910C654D",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "visible": false,
 "scrollBarMargin": 2,
 "id": "Container_193B8A52_2D1B_C5B5_41C3_F44FF520A3F0",
 "width": 40,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 2,
 "backgroundOpacity": 1,
 "backgroundColor": [
  "#5CA1DE"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "blue line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "HTMLText_29DD1615_3597_79DF_41C4_7593739E5260",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "height": 78,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Company Name</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>info@loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText47602"
 },
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver"
},
{
 "class": "Container",
 "scrollBarMargin": 2,
 "id": "Container_2B9EE463_3593_BA7B_4195_8E8F4568BB13",
 "children": [
  "this.IconButton_2B90E40F_3593_B9CB_41B4_408768336038",
  "this.IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83",
  "this.IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5",
  "this.IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F"
 ],
 "paddingLeft": 0,
 "width": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "bottom",
 "height": 56,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Container Icons 1"
 },
 "gap": 7,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "class": "Container",
 "scrollBarMargin": 2,
 "id": "Container_283049D5_35F3_AA5F_419D_20B6A59ABCA6",
 "children": [
  "this.IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15",
  "this.IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF",
  "this.IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7",
  "this.IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F"
 ],
 "paddingLeft": 0,
 "width": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 44,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Container Icons 2"
 },
 "gap": 7,
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "class": "Button",
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button <BACK"
 },
 "id": "Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
 "width": "100%",
 "paddingLeft": 5,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 30,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "iconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B.png",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "BACK",
 "shadowSpread": 1,
 "borderSize": 0,
 "rollOverIconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B_rollover.png",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverFontFamily": "Oswald",
 "rollOverFontSize": 18,
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_2A2DB53B_310E_001C_41BA_0206228E495C",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.5,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Container",
 "scrollBarMargin": 2,
 "id": "Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 8,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "gap": 10,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 1"
 },
 "rollOverShadow": false,
 "id": "Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 15,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Outdoor Entrance",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 1)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverShadowBlurRadius": 18,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 23,
 "data": {
  "name": "Button text 2"
 },
 "id": "Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Outdoor Park",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 3)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 3"
 },
 "id": "Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Outdoor Corner",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 2)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "pressedLabel": "Reception",
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 4"
 },
 "id": "Button_2A2C053B_310E_001C_41A2_583DE489828C",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Outdoor Corner (2)",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 4)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 5"
 },
 "id": "Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Outdoor Connector",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 7)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 6"
 },
 "id": "Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Rear Outdoor",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 8)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 7"
 },
 "id": "Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Rear Outdoor (2)",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 9)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 8"
 },
 "id": "Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Rear Outdoor (3)",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 10)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 8"
 },
 "id": "Button_F14F6000_D05B_EB72_41BE_A1FDBFCA8000",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Rooftop",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 11)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 8"
 },
 "id": "Button_F1C3AAD5_D05B_FC92_41C0_7520FE577912",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Rooftop (2)",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 12)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 8"
 },
 "id": "Button_DCEFC896_D3FD_B8A3_41E9_A9F979F38498",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Parking Area Entrance",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 19)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 8"
 },
 "id": "Button_DC1DF1AD_D3FD_88E0_41D2_12DAC672F982",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Parking Area",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 18)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 8"
 },
 "id": "Button_C261C2E3_D3E5_8860_41E1_E6FB86B9761B",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Parking Area (2)",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 17)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button <BACK"
 },
 "id": "Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
 "width": "100%",
 "paddingLeft": 5,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 30,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "iconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1.png",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "BACK",
 "shadowSpread": 1,
 "borderSize": 0,
 "rollOverIconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1_rollover.png",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverFontFamily": "Oswald",
 "rollOverFontSize": 18,
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.5,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Container",
 "scrollBarMargin": 2,
 "id": "Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 8,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "gap": 10,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 1"
 },
 "rollOverShadow": false,
 "id": "Button_15A10DDC_31FA_0014_4185_021C898E177D",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 15,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Main Entrance",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 0)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverShadowBlurRadius": 18,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 23,
 "data": {
  "name": "Button text 2"
 },
 "id": "Button_15A13DDC_31FA_0014_41C5_41AE80876834",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Canteen",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 5)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 3"
 },
 "id": "Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Canteen (2)",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 6)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "pressedLabel": "Lorem Ipsum",
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 4"
 },
 "id": "Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Souvenir Shop",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 14)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 5"
 },
 "id": "Button_159ECDDC_31FA_0014_41B9_2D5AB1021813",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Souvenir Shop (2)",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 13)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 6"
 },
 "id": "Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Souvenir Shop (3)",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 16)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 7"
 },
 "id": "Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Exit Area",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 15)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 8"
 },
 "id": "Button_159E9DDC_31FA_0015_41B6_CB1D433C7673",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 9"
 },
 "id": "Button_159E8DDD_31FA_0014_41C5_F18F441AF371",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 10"
 },
 "id": "Button_159EBDDD_31FA_0014_41C8_935504B30727",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "height": 36,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button <BACK"
 },
 "id": "Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
 "width": "100%",
 "paddingLeft": 5,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 30,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "iconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B.png",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "BACK",
 "shadowSpread": 1,
 "borderSize": 0,
 "rollOverIconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B_rollover.png",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverFontFamily": "Oswald",
 "rollOverFontSize": 18,
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.5,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Container",
 "scrollBarMargin": 2,
 "id": "Container_17578D7D_31FA_0015_41BE_353D3005648A",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 8,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "gap": 10,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 1"
 },
 "rollOverShadow": false,
 "id": "Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 15,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Museum Entrance",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 20)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverShadowBlurRadius": 18,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 23,
 "data": {
  "name": "Button text 2"
 },
 "id": "Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Inside Museum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 21)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 3"
 },
 "id": "Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Inside Museum (2)",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 22)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "pressedLabel": "Lorem Ipsum",
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 4"
 },
 "id": "Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 5"
 },
 "id": "Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 6"
 },
 "id": "Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 7"
 },
 "id": "Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 8"
 },
 "id": "Button_17562D7D_31FA_0015_41A3_96B282B30DBA",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 9"
 },
 "id": "Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 10"
 },
 "id": "Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "height": 36,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button <BACK"
 },
 "id": "Button_175A5214_31FA_0014_4198_930DF49BADD9",
 "width": "100%",
 "paddingLeft": 5,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 30,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "iconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9.png",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "BACK",
 "shadowSpread": 1,
 "borderSize": 0,
 "rollOverIconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9_rollover.png",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverFontFamily": "Oswald",
 "rollOverFontSize": 18,
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_1758A215_31FA_0014_41B6_9A4A5384548B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.5,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Container",
 "scrollBarMargin": 2,
 "id": "Container_1759B215_31FA_0014_41C0_84C99CBD5517",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 8,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "gap": 10,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 1"
 },
 "rollOverShadow": false,
 "id": "Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 15,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Museum Entrance ",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 23)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverShadowBlurRadius": 18,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 23,
 "data": {
  "name": "Button text 2"
 },
 "id": "Button_17598215_31FA_0014_41AC_1166AB319171",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Inside Museum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 24)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 3"
 },
 "id": "Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Left Corner",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 27)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "pressedLabel": "Lorem Ipsum",
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 4"
 },
 "id": "Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Right Corner",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 28)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 5"
 },
 "id": "Button_17593215_31FA_0014_41C0_42BAFB0080F0",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "End Point",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 25)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 6"
 },
 "id": "Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Exit Area",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 26)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 7"
 },
 "id": "Button_17590215_31FA_0014_41C1_2B2D012DCC76",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 8"
 },
 "id": "Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 9"
 },
 "id": "Button_17596215_31FA_0014_41C6_A42670770708",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 10"
 },
 "id": "Button_1758B215_31FA_0014_41BC_C4EAC2A9544B",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "height": 36,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "visible": false,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button <BACK"
 },
 "id": "Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
 "width": "100%",
 "paddingLeft": 5,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 30,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "iconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C.png",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "BACK",
 "shadowSpread": 1,
 "borderSize": 0,
 "rollOverIconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C_rollover.png",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverFontFamily": "Oswald",
 "rollOverFontSize": 18,
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.5,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Container",
 "scrollBarMargin": 2,
 "id": "Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 8,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "gap": 10,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 1"
 },
 "rollOverShadow": false,
 "id": "Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 15,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverShadowBlurRadius": 18,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 23,
 "data": {
  "name": "Button text 2"
 },
 "id": "Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 3"
 },
 "id": "Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "pressedLabel": "Lorem Ipsum",
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 4"
 },
 "id": "Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 5"
 },
 "id": "Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 6"
 },
 "id": "Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 7"
 },
 "id": "Button_17EB52B7_3106_0014_419C_439E593AEC43",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 8"
 },
 "id": "Button_17EB62B7_3106_0014_41C5_43B38271B353",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 9"
 },
 "id": "Button_17EB72B7_3106_0014_41B9_61857077BF4A",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 10"
 },
 "id": "Button_17EB92B7_3106_0014_41B2_34A3E3F63779",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "height": 36,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button <BACK"
 },
 "id": "Button_168CA310_3106_01EC_41C7_72CE0522951A",
 "width": "100%",
 "paddingLeft": 5,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 30,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "iconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A.png",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "BACK",
 "shadowSpread": 1,
 "borderSize": 0,
 "rollOverIconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A_rollover.png",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverFontFamily": "Oswald",
 "rollOverFontSize": 18,
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_168C8310_3106_01EC_4187_B16F315A4A23",
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 1,
 "backgroundOpacity": 0.5,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line"
 },
 "gap": 10,
 "class": "Container",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Container",
 "scrollBarMargin": 2,
 "id": "Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
 "width": "100%",
 "paddingLeft": 0,
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": 8,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "gap": 10,
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 1"
 },
 "rollOverShadow": false,
 "id": "Button_168D6310_3106_01EC_41B8_A0B6BE627547",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 15,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "rollOverShadowBlurRadius": 18,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 23,
 "data": {
  "name": "Button text 2"
 },
 "id": "Button_168D5310_3106_01EC_41B5_96D9387401B8",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 3"
 },
 "id": "Button_168D3310_3106_01EC_41AC_5D524E4677A5",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "pressedLabel": "Lorem Ipsum",
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 4"
 },
 "id": "Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 5"
 },
 "id": "Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 6"
 },
 "id": "Button_168DE310_3106_01EC_4192_6A9F468A0ADE",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 7"
 },
 "id": "Button_168DD310_3106_01EC_4190_7815FA70349E",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 8"
 },
 "id": "Button_168DB310_3106_01EC_41B2_3511AA5E40E1",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 9"
 },
 "id": "Button_168DA310_3106_01EC_41BE_DF88732C2A28",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 36,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "Button",
 "iconWidth": 32,
 "rollOverBackgroundOpacity": 0.8,
 "gap": 5,
 "data": {
  "name": "Button text 10"
 },
 "id": "Button_168D9311_3106_01EC_41A8_3BD8769525D6",
 "width": "100%",
 "paddingLeft": 10,
 "shadowColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "verticalAlign": "middle",
 "height": 36,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingRight": 0,
 "paddingBottom": 0,
 "layout": "horizontal",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "id": "Image_1E18723C_57F1_802D_41C5_8325536874A5",
 "width": "25%",
 "paddingLeft": 0,
 "minWidth": 1,
 "url": "skin/Image_1E18723C_57F1_802D_41C5_8325536874A5.jpg",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "height": "100%",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 200,
 "scaleMode": "fit_inside",
 "data": {
  "name": "agent photo"
 },
 "maxWidth": 200,
 "class": "Image",
 "paddingRight": 0,
 "paddingBottom": 0
},
{
 "class": "HTMLText",
 "scrollBarMargin": 2,
 "id": "HTMLText_1E18423C_57F1_802D_41C4_458DB7F892AC",
 "width": "75%",
 "paddingLeft": 10,
 "minWidth": 1,
 "scrollBarWidth": 10,
 "height": "100%",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "propagateClick": false,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.03vh;font-family:'Oswald';\"><B><I>JOHN DOE</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.03vh;font-family:'Oswald';\"><I>Licensed Real Estate Salesperson</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.14vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:0.95vh;font-family:'Oswald';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:0.95vh;font-family:'Oswald';\"><I>jhondoe@realestate.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:0.95vh;font-family:'Oswald';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.14vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.14vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.14vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.14vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.14vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText19460"
 },
 "paddingRight": 10,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver"
},
{
 "id": "IconButton_2B90E40F_3593_B9CB_41B4_408768336038",
 "width": 44,
 "paddingLeft": 0,
 "minWidth": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B90E40F_3593_B9CB_41B4_408768336038.png",
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2B90E40F_3593_B9CB_41B4_408768336038_rollover.png",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 101,
 "transparencyActive": true,
 "data": {
  "name": "IconButton Info"
 },
 "maxWidth": 101,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83",
 "width": 44,
 "paddingLeft": 0,
 "minWidth": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83.png",
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83_rollover.png",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 101,
 "transparencyActive": false,
 "data": {
  "name": "IconButton Thumblist"
 },
 "maxWidth": 101,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5",
 "width": 44,
 "paddingLeft": 0,
 "minWidth": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5.png",
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5_rollover.png",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 101,
 "transparencyActive": false,
 "data": {
  "name": "IconButton Photoalbum"
 },
 "maxWidth": 101,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F",
 "width": 44,
 "paddingLeft": 0,
 "minWidth": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F.png",
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F_rollover.png",
 "borderSize": 0,
 "click": "this.openLink('https://maps.app.goo.gl/cAE341yw2Fpjrt186', '_blank')",
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 101,
 "transparencyActive": false,
 "data": {
  "name": "IconButton Location"
 },
 "maxWidth": 101,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15",
 "width": 44,
 "paddingLeft": 0,
 "minWidth": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15.png",
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15_rollover.png",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 101,
 "transparencyActive": true,
 "data": {
  "name": "IconButton Floorplan"
 },
 "maxWidth": 101,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF",
 "width": 44,
 "paddingLeft": 0,
 "minWidth": 1,
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF.png",
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF_rollover.png",
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 101,
 "transparencyActive": false,
 "data": {
  "name": "IconButton Video"
 },
 "maxWidth": 101,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7",
 "width": 44,
 "paddingLeft": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7_pressed.png",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7.png",
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7_rollover.png",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, true, 0, null, null, false)",
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 101,
 "transparencyActive": false,
 "data": {
  "name": "IconButton Realtor"
 },
 "maxWidth": 101,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "id": "IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F",
 "width": 50,
 "paddingLeft": 0,
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F_pressed.png",
 "horizontalAlign": "center",
 "iconURL": "skin/IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F.png",
 "verticalAlign": "middle",
 "height": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "shadow": false,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "maxHeight": 101,
 "transparencyActive": false,
 "data": {
  "name": "IconButton --"
 },
 "maxWidth": 101,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingBottom": 0,
 "cursor": "hand"
}],
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "propagateClick": true,
 "paddingTop": 0,
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "mobileMipmappingEnabled": false,
 "data": {
  "name": "Player468"
 },
 "paddingBottom": 0,
 "gap": 10,
 "class": "Player",
 "paddingRight": 0,
 "layout": "absolute",
 "overflow": "visible",
 "vrPolyfillScale": 0.5
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
