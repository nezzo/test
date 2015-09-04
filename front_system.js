if(typeof(DEBUG_BY_IP) == 'undefined'){
    DEBUG_BY_IP = false;
}

function show_picture(script, src, alt, width, height) {
    if(src.indexOf('__gen=1|') > 0){
        if((src.substring(0,7).toLowerCase()) == "http://"  &&  (src.substring(0,8).toLowerCase() == "https://")){
            script = src;
        }else if((script.substring(0,7).toLowerCase()) != "http://"  &&  (script.substring(0,8).toLowerCase() != "https://")){
            script = frontBaseHref + script;
            script = script + '?' + src;
        }else{
            script = script + '?' + src;
        }
    }else{
        script = src;
    }

    if(aMatches = script.match(/\.swf$/i)){
        AMI.UI.MediaBox.open(decodeURIComponent(script), width, height);
    }else{
        AMI.UI.MediaBox.open(decodeURIComponent(script));
    }
    return;
}

function show_details(script) {
  if (  (script.substring(0,7).toLowerCase()) != "http://"  &&  (script.substring(0,8).toLowerCase() != "https://" ) ){
    script = frontBaseHref + script;
  }

  var w_width = 200;
  var w_height = 250;

  if (w_height > window.screen.availHeight)
    w_height = window.screen.availHeight;
  if (w_width > window.screen.availWidth)
    w_width = window.screen.availWidth;

  window.open(script, "pic", "resizable=yes, status=yes, scrollbars=yes, width=" + w_width + ", height=" + w_height);
  //return false;
}


function none(){
  return false;
}

function isEmail(string) {
//    if (string.search(/^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+(;|,|$))+$/) != -1)
    if (string.search(/^(\w+[\w.-]*\@[A-Za-z0-9а-яёА-ЯЁ]+((\.|-+)[A-Za-z0-9а-яёА-ЯЁ]+)*\.[\-A-Za-z0-9а-яёА-ЯЁ]+(;|,|$))+$/) != -1)
        return true;
    else
        return false;
}

//
// following functions will be deleted later
//

function collect_link(cform){
  var vlink = '';
  var first = 1;

  for(var i=0; i<cform.length; i++){
    el = cform.elements[i];
    if(el.type == 'hidden'){
      delim = (first)?'':'&';
      vlink = vlink + delim + el.name + '=' + encodeURIComponent(el.value);
      first = 0;
    }
  }
 return vlink;
}

function view_item(id){
  var sform = document.forms[_cms_document_form];
  var link = _cms_script_link;

  sform.elements['sort'].value = '';
  sform.elements['sdim'].value = '';

  return user_click('view', id);
}

function user_click(action, id){
  var sform = document.forms[_cms_document_form];
  var link = _cms_script_link;
  var anchor = '#anchor';

  if(action!='edit') anchor='';
  sform.elements['action'].value = action;
  sform.elements['id'].value = id;
  document.location = link + collect_link(sform) + anchor;

  return false;
}

function _go_page(sform, start, varname) {
  if(typeof(sform.elements[varname]) == 'object') {
    sform.elements[varname].value = start;
  } else {
    sform.elements['offset'].value = start;
  }
}

function go_page(start, varname){
  var sform = document.forms[_cms_document_form];
  var link = _cms_script_link;
  _go_page(sform, start, varname);
  sform.elements['action'].value = 'rsrtme';
  document.location = link + collect_link(sform);
  return false;
}

function go_pageSubmit(start, varname, action){
  var sform = document.forms[_cms_document_form];
  var link = _cms_script_link;

  _go_page(sform, start, varname);
  sform.elements['action'].value = action;
  return CheckFilterForms(sform, true, 0, true);
/*sform.submit();
  return false;*/
}

function go_pagesize(size){
  var sform = document.forms[_cms_document_form];
  var link = _cms_script_link;

  sform.elements['action'].value = 'rsrtme';
  sform.elements['limit'].value = size;
  if(typeof(sform.elements['enc_limit']) == 'object') {
    sform.elements['enc_limit'].value = size;
  }
  document.location = link + collect_link(sform);

  return false;
}

function resort(ccol,cdim){
  var sform = document.forms[_cms_document_form];
  var link = _cms_script_link;

  sform.elements['action'].value = 'rsrtme';
  sform.elements['sort'].value = ccol;
  sform.elements['sdim'].value = cdim;

  if(typeof(CheckFilterForm) == "function")
    CheckFilterForm(sform, 0, 0);
  else
    document.location = link + collect_link(sform);

  return false;
}

function resortSubmit(ccol,cdim){
  return advResortSubmit(ccol,cdim,"sort","sdim");
}

function advResortSubmit(ccol,cdim,ccolname,cdimname){
  var sform = document.forms[_cms_document_form];
  //var link = _cms_script_link;
  //sform.elements['action'].value = 'rsrtme';
  sform.elements[ccolname].value = ccol;
  sform.elements[cdimname].value = cdim;
  sform.submit();
  return false;
}

function publish(id, act){
  var sform = document.forms[_cms_document_form];
  var link = _cms_script_link;

  sform.action.value = 'publish';
  sform.publish.value = act;
  sform.id.value = id;
  document.location = link + collect_link(sform);

  return false;
}

function _setCookie(sName, sValue, path, oDate, useEncodeURIComponent){
  var pathStr = "";

  if( typeof(path) !="undefined" && path != "") {
      pathStr = "; path="+path;
  }
  delCookie(sName);
  document.cookie = sName + "=" + (useEncodeURIComponent ? encodeURIComponent(sValue) : encodeURIComponent(sValue)) + pathStr + "; expires="+oDate.toGMTString();
}

function setCookie(sName, sValue, path, days, hours, useEncodeURIComponent, minutes){

  var oDate = new Date();
  if (typeof(days) == "undefined" && typeof(hours) == "undefined" && typeof(minutes) == "undefined"){
    days = 30;
  }

  if (typeof(days) != "undefined") oDate.setDate(oDate.getDate() + days);
  if (typeof(hours) != "undefined") oDate.setHours(oDate.getHours() + hours);
  if (typeof(minutes) != "undefined") oDate.setMinutes(oDate.getMinutes() + minutes);

  _setCookie(sName, sValue, path, oDate, useEncodeURIComponent);
}

function delCookie(name, path, domain) {
    if(amiGetCookie(name) != null){
        document.cookie = name + "=" + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }
}

amiCart = {
    prefix: '',
    useAJAX: typeof(use_background_cart) != 'undefined' && use_background_cart == '1',
    resultURL: '',
    isCheckout: false,

    add: function(url, itemId, numPrice, wrongPriceMsg){
        var qty = '1', price = '';

        if(itemId != 0 && document.forms[this.prefix + 'qty_' + itemId + '_' + numPrice]){
            var form = document.forms[this.prefix + 'qty_' + itemId + '_' + numPrice];

            if(form.qty){
                qty = form.qty.value;
            }
            if(form.price){
                price = form.price.value;
                if(isNaN(price) || price <= 0){
                    if(wrongPriceMsg != 'none' && wrongPriceMsg != undefined){
                        alert(wrongPriceMsg);
                    }
                    return;
                }
            }
        }
        if(AMI.Message.hasListeners('ON_BEFORE_ADD_TO_CART') && AMI.Message.send('ON_BEFORE_ADD_TO_CART', actionStatus, {})){
            // Message handled by listener
        }else{
            if(typeof(onBeforeAddToCartMessage) == 'function'){
                onBeforeAddToCartMessage();
            }
        }
        this.prefix = '';
        this.sendRequest(frontBaseHref, url, '&qty=' + encodeURIComponent(qty) + (price != '' ? '&price=' + encodeURIComponent(price) : ''))
    },

    addProp: function(url, itemId, propId, numPrice){
        if(AMI.Message.hasListeners('ON_BEFORE_ADD_TO_CART') && AMI.Message.send('ON_BEFORE_ADD_TO_CART', actionStatus, {})){
            // Message handled by listener
        }else{
            if(typeof(onBeforeAddToCartMessage) == 'function'){
                onBeforeAddToCartMessage();
            }
        }
        var resultUrl = '&qty=';

        if(itemId != 0 && document.forms[this.prefix + 'qty_' + itemId + '_' + propId + '_' + numPrice] && document.forms[this.prefix + 'qty_' + itemId + '_' + propId + '_' + numPrice].qty){
             resultUrl += document.forms[this.prefix + 'qty_' + itemId + '_' + propId + '_' + numPrice].qty.value;
        }else{
            resultUrl += '1';
        }
        this.prefix = '';
        this.sendRequest(frontBaseHref, url, resultUrl);
    },

    addItems: function(aData){
        if(typeof(aData) == 'undefined'){
            return false;
        }

        var resultUrl = '&action=add';
        var url = document.location.pathname;
        var j = 0;
        for(var i=0; i<aData.length; i++){

            var aItem = aData[i];

            var id = (typeof(aItem['id']) != 'undefined') ? aItem['id'] : false;
            if(!id){
                continue;
            }
            var price = (typeof(aItem['price']) != 'undefined') ? aItem['price'] : '';
            var qty      = (typeof(aItem['qty']) != 'undefined') ? aItem['qty'] : 1;
            var propId   = (typeof(aItem['propId']) != 'undefined') ? aItem['propId'] : 0;

            resultUrl += ('&itemId[' + j + ']=' + id);
            resultUrl += ('&qty[' + j + ']=' + qty);
            resultUrl += ('&num[' + j + ']=' + price);

            if(propId){
                resultUrl += ('&propId[' + j + ']=' + propId);
            }

            j++;
        }
        resultUrl += ('&url=' + url);

        if(AMI.Message.hasListeners('ON_BEFORE_ADD_TO_CART') && AMI.Message.send('ON_BEFORE_ADD_TO_CART', actionStatus, {})){
            // Message handled by listener
        }else{
            if(typeof(onBeforeAddToCartMessage) == 'function'){
                onBeforeAddToCartMessage();
            }
        }

        this.prefix = '';
        this.sendRequest(frontBaseHref, url, resultUrl);

    },

    /**
     * @access private
     */
    sendRequest: function(url, path, args){
    	if(typeof(path) != 'undefined' && typeof(args) != 'undefined'){
    		args += '&eshop_cart_simple=1';
            	this.resultURL = url + path + args;
            	AMI.HTTPRequest.getContent('POST', url, 'modlink=' + path.replace(/\?/,'&') + args, this.ajaxCallback);

    	}else{
            	this.resultURL = url + '&eshop_cart_simple=1';
            	var
                	pattern = "^(([^:/\\?#]+):)?(//(([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$";
                	rx = new RegExp(pattern),
                	parts = rx.exec(this.resultURL),
                	protocol = parts[1] || '',
                	hostname = parts[5] || '',
                	path = parts[7] || '/';
                	args = parts[9] || '';

            	AMI.HTTPRequest.getContent(
                		'POST',
                		protocol + '//' + hostname,
                		'modlink=' + path.substr(1) + (args != '' ? '&' + args : ''),
                		this.ajaxCallback
            	);
    	}
       	this.isCheckout = !(this.resultURL.indexOf('&eshop_special=') == -1 || this.resultURL.indexOf('&url=') >= 0);
    },

    /**
     * @static
     */
    ajaxCallback: function(status, content){
        if(status == 1 && (cartStatusPos = content.indexOf('cart updated')) >= 0){
            content = content.substr(cartStatusPos);
            amiSession.loadVariables();
            var aVarNames = content.split('|');
            amiCart.updateBlock(aVarNames[1], aVarNames[2]);

            var actionStatus = '';
            for(i = 3; i < aVarNames.length; i++){
                actionStatus += (i > 3 ? '|' : '') + aVarNames[i];
            }
            if(AMI.Message.hasListeners('ON_ADDED_TO_CART') && AMI.Message.send('ON_ADDED_TO_CART', actionStatus, {})){
                // Message handled by listener
            }else{
                if(typeof(onAddedToCartMessage) == 'function'){
                    onAddedToCartMessage(actionStatus);
                }else{
                    alert(actionStatus);
                }
            }
            if(amiCart.isCheckout){
                document.location = amiCart.resultURL.replace(/\?.*/, '');
            }else if(!amiCart.useAJAX){
                document.location.reload();
            }
        }
    },

    updateBlock: function(itemCountCookieName, totalCookieName){
        var cartItemCount = amiSession.get(itemCountCookieName);

        if(document.getElementById('idEshopCartIsNotEmpty')){
            document.getElementById('idEshopCartIsNotEmpty').style.display = (cartItemCount == '' || cartItemCount == 0 ? 'none' : 'block');
        }
        if(document.getElementById('idEshopCartIsEmpty')){
            document.getElementById('idEshopCartIsEmpty').style.display = (cartItemCount == '' || cartItemCount == 0 ? 'block' : 'none');
        }
        if(cartItemCount != ''){
            if(document.getElementById(itemCountCookieName)){
                document.getElementById(itemCountCookieName).innerHTML = cartItemCount;
            }
            if(document.getElementById(totalCookieName)){
                document.getElementById(totalCookieName).innerHTML = amiSession.get(totalCookieName);
            }
            if(document.getElementById('eshopCartEmpty')){
                document.getElementById('eshopCartEmpty').style.display = (cartItemCount > 0 ? 'inline' : 'none');
            }
        }
        if(typeof(onUpdateCartBlock) == 'function'){
            // backward compatibility
            onUpdateCartBlock(cartItemCount, amiSession.get(totalCookieName));
        }else if(typeof(this.onUpdateBlock) == 'function'){
            this.onUpdateBlock(cartItemCount, amiSession.get(totalCookieName));
        }
    },

    clear: function(callback){
        AMI.$.post(
            frontBaseHref + 'pages.php',
            {
                mod_link: 'members/cart',
                action: 'empty'
            },
            function(_cb){
                return function(){
                    if(document.getElementById('idEshopCartIsNotEmpty')){
                        document.getElementById('idEshopCartIsNotEmpty').style.display = 'none';
                    }
                    if(document.getElementById('idEshopCartIsEmpty')){
                        document.getElementById('idEshopCartIsEmpty').style.display = 'block';
                    }
                    if(typeof(_cb) == 'function'){
                        _cb();
                    }
                }
            }(callback)
        );
    }
}

amiCartShowItems  = {
    tooltipHtml: '',
    cancelBubble: function() {
        AMI.$('.eshop-item-tooltip').hover(
            function() {
                AMI.$(this).parents('.eshop-item-small__cart-text, .eshop-item-detailed__price-wrapper, .eshop-item-small__additional-price').attr('data-onclick', AMI.$(this).parents('.eshop-item-small__cart-text, .eshop-item-detailed__price-wrapper, .eshop-item-small__additional-price').attr('onclick'));
                AMI.$(this).parents('.eshop-item-small__cart-text, .eshop-item-detailed__price-wrapper, .eshop-item-small__additional-price').removeAttr('onclick');
                AMI.$(this).parents('form').attr('data-onclick', AMI.$(this).parents('form').attr('onclick'));
                AMI.$(this).parents('form').removeAttr('onclick');
            },
            function() {
                AMI.$(this).parents('.eshop-item-small__cart-text, .eshop-item-detailed__price-wrapper, .eshop-item-small__additional-price').attr('onclick', AMI.$(this).parents('.eshop-item-small__cart-text, .eshop-item-detailed__price-wrapper, .eshop-item-small__additional-price').attr('data-onclick'));
                AMI.$(this).parents('form').attr('onclick', AMI.$(this).parents('form').attr('data-onclick'));
            }
        );
    },
    deleteItemsCart: function(url, id, num, prop) {
        deletelink = url+'?action=del&id=eshop_'+id+'_0&num='+num;
        AMI.$.ajax({
            url: deletelink,
            type: 'GET',
            success: function(data) {
                AMI.$('.tooltip-item__'+id+'_'+num).fadeOut(600);
                setTimeout(function() {AMI.$('#tooltip-item__'+id+'_'+num).remove()}, 700);
                if(AMI.$(this).parent('.eshop-item-small__cart-text').attr('data-onclick')) {
                    AMI.$(this).parent('.eshop-item-small__cart-text').attr('onclick', AMI.$(this).parent('.eshop-item-small__cart-text').attr('data-onclick'));
                }
                AMI.$(this).parents('form').attr('onclick', AMI.$(this).parents('form').attr('data-onclick'));
            }
        });
    },
    stockItems: function(cartdata, carturl, added, typeinfo, carttitle, cartdelete) {
        AMI.$.each(cartdata, function(i) {
            if(cartdata[i].id == 'total') {
                // ... if is total (get_items_info)
            } else {
                for(b=0;b<cartdata[i].length;b++) {
                    var priceItems = AMI.$('[name *= qty_'+cartdata[i][b].itemId+'_'+cartdata[i][b].priceNum+']');
                    if(AMI.$('[name *= qty_'+cartdata[i][b].itemId+']')) {
                        if(priceItems.find('.eshop-item-tooltip').length == 0) {
                            priceItems.children('.eshop-item-small__cart-text, .eshop-item-detailed__cart-text').append('<div class="eshop-item-tooltip tooltip-item__'+cartdata[i][b].itemId+'_'+cartdata[i][b].priceNum+'"><div class="eshop-item-tooltip-area"><span class="eshop-item-tooltip-title">'+added+' '+cartdata[i][b].qty+'</span><div class="eshop-item-tooltip__btn"><span class="eshop-item-tooltip__btn-delete">'+cartdelete+'</span><span class="eshop-item-tooltip__btn-cart">'+carttitle+'</span></div></div></div>');
                            priceItems.find('.eshop-item-tooltip__btn-cart').attr('onclick', 'location.href="'+carturl+'?itemid='+cartdata[i][b].itemId+'"; return false;');
                            priceItems.find('.eshop-item-tooltip__btn-delete').attr('onclick', 'amiCartShowItems.deleteItemsCart("'+carturl+'", "'+cartdata[i][b].itemId+'", "'+cartdata[i][b].priceNum+'"); return false;');
                            priceItems.find('.eshop-item-tooltip').fadeIn(600);
                        } else { // base price, if page is loaded
                            priceItems.find('.eshop-item-tooltip-title').text(added+' '+cartdata[i][b].qty);
                            priceItems.find('.eshop-item-tooltip').fadeIn(600);
                        }
                        if(typeinfo == 'get_items_info') {
                            // ... add custom for get_items_info type
                        }
                    }
                    if(AMI.$('.eshop-item-detailed__price-wrapper').length != 0) {
                        AMI.$('.eshop-item-detailed__price-wrapper').each(function() {
                            if(AMI.$(this).attr('onclick').search('qty_'+cartdata[i][b].itemId+'_'+cartdata[i][b].priceNum) >= 0) {
                                if(AMI.$(this).find('.eshop-item-tooltip').length == 0) {
                                    AMI.$(this).children('.eshop-item-small__cart-text, .eshop-item-detailed__cart-text').append('<div class="eshop-item-tooltip tooltip-item__'+cartdata[i][b].itemId+'_'+cartdata[i][b].priceNum+'"><div class="eshop-item-tooltip-area"><span class="eshop-item-tooltip-title">'+added+' '+cartdata[i][b].qty+'</span><div class="eshop-item-tooltip__btn"><span class="eshop-item-tooltip__btn-delete">'+cartdelete+'</span><span class="eshop-item-tooltip__btn-cart">'+carttitle+'</span></div></div></div>');
                                }
                                AMI.$(this).find('.eshop-item-tooltip-title').text(added+' '+cartdata[i][b].qty);
                                AMI.$(this).find('.eshop-item-tooltip__btn-cart').attr('onclick', 'location.href="'+carturl+'?itemid='+cartdata[i][b].itemId+'"; return false;');
                                AMI.$(this).find('.eshop-item-tooltip__btn-delete').attr('onclick', 'amiCartShowItems.deleteItemsCart("'+carturl+'", "'+cartdata[i][b].itemId+'", "'+cartdata[i][b].priceNum+'"); return false;');
                                AMI.$(this).find('.eshop-item-tooltip').fadeIn(600);
                            }
                        });
                    }
                }
                amiCartShowItems.cancelBubble();
            }
        });
    },
    propertiesItems: function(cartdata, carturl, added, typeinfo, countItems, carttitle, cartdelete) {
        var el = AMI.$('[name *= qty_]');
        if(AMI.$('#properties-items-popup').length == 0) {
            el.children('.eshop-item-small__cart-text, .eshop-item-detailed__cart-text').append('<div class="eshop-item-tooltip eshop-item-tooltip-prop"><div class="eshop-item-tooltip-area"><span class="eshop-item-tooltip-title"></span><span id="properties-items-popup"></span></div>');
            el.find('#properties-items-popup').after('<span class="eshop-item-tooltip__btn-cart">'+carttitle+'</span>');
        }
        AMI.$('#properties-items-popup').html('');
        AMI.$.each(cartdata, function(i) {
            if(cartdata[i].id == 'total') {
                // ... if is total (get_items_info)
            } else {
                countPropItems = 0;
                for(k=0;k<cartdata[i].length;k++) {
                    if(cartdata[i][k].propId != 0) {
                        if(AMI.$('[name *= qty_]').eq(0).attr('name').split('qty_')[1].split('_')[0] == cartdata[i][0].itemId) {
                            countPropItems += cartdata[i][k].qty;
                            for(m=0;m<cartdata[i][k].aPropInfo.length;m++) {
                                AMI.$('#properties-items-popup').append(cartdata[i][k].aPropInfo[m].name+': '+cartdata[i][k].aPropInfo[m].value+' ');
                                if(m == cartdata[i][k].aPropInfo.length-1) {
                                     AMI.$('#properties-items-popup').append('- '+cartdata[i][k].qty+' '+countItems+'<br>');
                                }
                            }
                        }
                    }
                }
                if(countPropItems != 0) {
                    el.find('.eshop-item-tooltip-title').html(added+' <span class="count-prop-items">'+countPropItems+'</span>');
                    el.find('.eshop-item-tooltip__btn-cart').attr('onclick', 'location.href="'+carturl+'?itemid='+cartdata[i][0].itemId+'"; return false;');
                    el.find('.eshop-item-tooltip').fadeIn();
                }
            }
        });
        amiCartShowItems.cancelBubble();
        this.tooltipHtml = el.find('.eshop-item-tooltip-prop').clone();
    },
    itemsData: function(typeinfo, carturl, paramUrl, added, countItems, carttitle, cartdelete) {
        AMI.$.ajax({
            url: '/ami_service.php',
            type: 'GET',
            dataType: 'JSON',
            data: paramUrl,
            success: function(cartdata) {
                if(cartdata.length == 0) {
                    return false;
                } else {
                    if(AMI.$('[name *= qty_]').length != 0) {
                        if (AMI.$('[name *= qty_]').attr('onclick') == undefined) {
                            amiCartShowItems.stockItems(cartdata, carturl, added, typeinfo, carttitle, cartdelete);
                        } else if(AMI.$('[name *= qty_]').eq(0).attr('onclick').search('propId') > 0) {
                            amiCartShowItems.propertiesItems(cartdata, carturl, added, typeinfo, countItems, carttitle, cartdelete);
                        } else {
                            amiCartShowItems.stockItems(cartdata, carturl, added, typeinfo, carttitle, cartdelete);
                        }
                    } else if (AMI.$('[data-prop-id]').length != 0) {
                        amiCartShowItems.propertiesItemsRow(cartdata, carturl, added, typeinfo, countItems, carttitle, cartdelete);
                    }
                }
            }
        });
    },
    init: function(typeinfo, carturl, added, countItems, carttitle, cartdelete) {
        if(amiSession.get('eshop_cart_count') != 0) {
            if(typeinfo == 'get_items') {
                paramUrl = 'service=eshop_cart&action=get_items&scname=' + window.sessionCookieName;
                amiCartShowItems.itemsData(typeinfo, carturl, paramUrl, added, countItems, carttitle, cartdelete);
            } else if (typeinfo == 'get_items_info') {
                paramUrl = 'service=eshop_cart&action=get_items_info&scname=' + window.sessionCookieName;
                amiCartShowItems.itemsData(typeinfo, carturl, paramUrl, added, countItems, carttitle, cartdelete);
            } else {
                return false;
            }
            if(AMI.$('#ami-eshop-properties__wrapper')) {
                setInterval(function() {
                    if(amiCartShowItems.tooltipHtml && AMI.$('#properties-items-popup').length == 0) {
                        AMI.$('.eshop-item-detailed__cart-text').append(amiCartShowItems.tooltipHtml);
                        AMI.$('.eshop-item-detailed__cart-text').find('.eshop-item-tooltip').animate({opacity: 1});
                    }
                }, 1000);
            }
        }
        if(AMI.$('#cart_items').length != 0 && location.href.indexOf('itemid') >= 0) {
            AMI.$('.txt[name*=eshop_'+location.search.split('=')[1].split('&')[0]+']').focus();
            AMI.$('.txt[name*=eshop_'+location.search.split('=')[1].split('&')[0]+']').parent().parent().addClass('cart_items__tr-select');
            setTimeout(function() {AMI.$('.txt[name*=eshop_'+location.search.split('=')[1].split('&')[0]+']').parent().parent().addClass('cart_items__tr')}, 1000);
        }
    }
}

/* backward compatibility { */
// @todo replace AddToCart by amiCart.add and delete this function
function AddToCart(url, itemId, numPrice, wrongPriceMsg){
    return amiCart.add(url, itemId, numPrice, wrongPriceMsg);
}

// @todo replace AddToCartProp by amiCart.addProp and delete this function
function AddToCartProp(url, itemId, propId, numPrice){
    return amiCart.addProp(url, itemId, propId, numPrice);
}
/* } backward compatibility */

/* ADVERTISING BLOCK */

var advCurTmStamp = new Date();
document.usedAdvData = "";
var isInnerHtmlSupported = -1;
var shownAdvPlaces = '';
var shownAdvPlacesCnt = 0;
var advReferrer = ''
var advPlaceCnts = [];
if(document.referrer)
    advReferrer = document.referrer;
function processShownAdvPlaces(shownAdvPlaces){
    counter = 0;
    pos = -1;
    res = "";
    while((pos = shownAdvPlaces.indexOf(';', pos+1)) >= 0){
        if((pos1 = shownAdvPlaces.indexOf(';', pos+1)) < 0)
            pos1 = shownAdvPlaces.length;
        if(pos1-pos-1 > 0){
            curAdvPlace = shownAdvPlaces.substr(pos+1, pos1-pos-1);

            if((cpos = curAdvPlace.indexOf('_')) >= 0){
                counter = curAdvPlace.substr(cpos+1)-1;
                curAdvPlace = curAdvPlace.substr(0, cpos);
            }

            advPlaceCnts[curAdvPlace] = ++counter;
            res += ';'+curAdvPlace+"_"+counter;
        }
    }
    if(res.length > 0)
        res += ';';
    return res;
}
function showAdvPlace(idPlace, viewURL){
    if(isInnerHtmlSupported == -1){
        if(document.body.innerHTML)
            isInnerHtmlSupported = 1;
        else
            isInnerHtmlSupported = 0;
    }
    // After the document is loaded (new scheme)
    if(isInnerHtmlSupported == 1){
        shownAdvPlacesCnt ++;
        document.write('<span id="advp_'+idPlace+'_'+(advPlaceCnts[idPlace] ? advPlaceCnts[idPlace] : shownAdvPlacesCnt)+'"></span>');
        shownAdvPlaces += (shownAdvPlaces == '' ? ';' : '')+idPlace+';';
    // Old scheme - inline method
    }else{
        if (!document.usedAdvData)
            document.usedAdvData = '';
        rndseed = new String(Math.random()); rndseed = rndseed.substring(2,11);
        document.write ("<" + "script language='JavaScript' type='text/javascript' src='"+viewURL+"aproc.php?action=view&rs="+advCurTmStamp.getTime()+rndseed+"&place="+idPlace+"&used="+document.usedAdvData+"&curl="+encodeURIComponent(viewURL)+"&referer="+encodeURIComponent(advReferrer)+"'><"+"/script>");
    }
}

function showAdvBanner(id, content){
    if(document.usedAdvData)
        document.usedAdvData += ','+id+',';
    else
        document.usedAdvData  = ','+id+',';
    document.writeln(content);
}

function aLnkClick(lnkID){
    var aLink = frontBaseHref+"aproc.php?action=lclick&id="+lnkID+"&page_url="+encodeURIComponent(document.location.href);
    advClick(aLink);
}

function advClick(clickURL){
    rndseed = new String(Math.random()); rndseed = rndseed.substring(2,11);
    clickURL+="&rs="+advCurTmStamp.getTime()+rndseed;
    img = new Image();
    img.src = clickURL;
}

var advPlacesContent = [];
var fillAdvPlaceWatcher = [];
function fillAdvPlace(idPlace, idCnt, placeContent){
    if(advPlacesContent[idPlace+'_'+idCnt] == undefined)
        advPlacesContent[idPlace+'_'+idCnt] = placeContent;
    if(fillAdvPlaceWatcher[idPlace+'_'+idCnt] == undefined)
        fillAdvPlaceWatcher[idPlace+'_'+idCnt] = 0;
    if(document.getElementById && document.getElementById('advp_'+idPlace+'_'+idCnt) && document.getElementById('advp_'+idPlace+'_'+idCnt).innerHTML != undefined){
        document.getElementById('advp_'+idPlace+'_'+idCnt).innerHTML = advPlacesContent[idPlace+'_'+idCnt];
    }else{
        fillAdvPlaceWatcher ++;
        if(fillAdvPlaceWatcher < 1000)
            setTimeout("fillAdvPlace('"+idPlace+"', '"+idCnt+"');", 100);
    }
}

/* MODULE ADVERTISEMENT PART [not in use] */
/*
// String that contains module show data
var modAdvIdsArr = [];

// Set item view
function setView(modName, bodyType, id, idPlace){
    if(isNaN(idPlace))
        idPlace = 0;
    var isFound = 0;
    for(var i = 0; i < modAdvIdsArr.length; i++){
        if(modAdvIdsArr[i][0] == modName){
            modAdvIdsArr[i][1] += '|'+bodyType+id+','+idPlace;
            isFound = 1;
            break;
        }
    }
    if(!isFound)
        modAdvIdsArr[modAdvIdsArr.length] = [modName, bodyType+id+','+idPlace];
}
// Process gathered adv IDs
function processViewAdvIds(){
    var retStr = '';
    for(var i = 0; i < modAdvIdsArr.length; i++)
        retStr += (retStr != '' ? ';' : '')+modAdvIdsArr[i][0]+'='+modAdvIdsArr[i][1];
    alert(retStr);
    return retStr;
}
*/

// Returns cookie value
function getPlainCookie(name){
    // cookies are separated by semicolons
    var aCookie = document.cookie.split("; ");
    var value = "";
    for (var i=0; i < aCookie.length; i++){
        // a name/value pair (a crumb) is separated by an equal sign
        var aCrumb = aCookie[i].split("=");
        if (name == aCrumb[0]){
            if(aCrumb[1] === undefined) {
                value = null;
            }else{
                value = aCrumb[1];
            }
            return value;
        }
    }

    // a cookie with the requested name does not exist
    return null;
}

function amiGetCookie(name, replaceEncodedSpaces){
    var val = getPlainCookie(name);

    if(val != null){
        if(replaceEncodedSpaces){
            val = decodeURIComponent(val);
            val = val.replace(/\+/g, ' ');
        }else{
            val = decodeURIComponent(val);
        }
    }

    return val;
}

var getCookie = amiGetCookie;
/*
function updateCookieExpireTime(name, minutes){
  var oDate = new Date();
  if (typeof(minutes) != "undefined") oDate.setMinutes(oDate.getMinutes() + minutes);

  var val = amiGetCookie(name);
  if(val != null){
      _setCookie(name, val, "/", oDate);
  }
}
*/
// {{{ window.onLoad events queue implementation

var onLoadEvents = [];
var previousOnLoadEvent = null;
var onLoadHandlerSaved = false;

function addOnLoadEvent(event) {
    onLoadEvents[onLoadEvents.length] = event;
}

function runOnLoadEventsQueue() {
    if (previousOnLoadEvent) {
        previousOnLoadEvent();
    }
    for (var i = 0 ; i < onLoadEvents.length; i++) {
        onLoadEvents[i]();
    }
}

function savePreviousOnLoadEvent() {
    if(!onLoadHandlerSaved){
        previousOnLoadEvent = window.onload;
        window.onload = runOnLoadEventsQueue;
        onLoadHandlerSaved = true;
    }
}

// }}}

function setCaptchaMD5Hash(sid)
{
    var cookie = amiGetCookie('captcha_' + sid);
    if (cookie != null && cookie.length) {
        clearInterval(eval("intervalId_" + sid));
        eval("captcha_" + sid + " = cookie;");
        var path    = null;
        var domain  = null;
        if (location) {
            domain = location.host;
            path = frontBaseHref.replace(/^\w+\:\/\/[^\/]+/, '');
        }
        delCookie('captcha_' + sid, path, domain);
    }
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(val, fromIndex) {
        if (typeof(fromIndex) != 'number') {
            fromIndex = 0;
        }
        for (var index = fromIndex,len = this.length; index < len; index++) {
            if (this[index] == val) {
                return index;
            }
        }
        return -1;
    }
}

if (!Array.prototype.splice) {
    Array.prototype._splice = function(start) {
        if (start >= this.length) {
            return;
        }
        return this.slice(start);
    }
    Array.prototype._splice = function(start, deleteCount) {
        if (start >= this.length) {
            return;
        }
        return this.slice(0, start-1).concat(this.slice(start + deleteCount));
    }
}

function cloneArray(source)
{
    var destination = [];
    for (var i = 0 ; i < source.length ; i++) {
        if (!(typeof(source[i]) == 'undefined')) {
            destination[i] = source[i];
        }
    }
    return destination;
}

/* products comparison */

var
    mComparisonList = [],
    mComparisonURL = '';

function compare(key)
{
    if (compareProducts.indexOf(key) >= 0) {
        alert(compareInComparisonAlready);
        return false;
    }
    if (mComparisonList.length && !confirm(compareAddSelected)) {
        return false;
    }
    if (compareProducts.length == compareMaxQuantity) {
        alert(compareMaxMessage);
        return false;
    }
    if (mComparisonList.indexOf(key) < 0) {
        mComparisonList.push(key);
    }

    // check for different datasets
    if (compareDisallowDifferentDatasets && compareProducts.length > 0) {
        var datasetId = compareDatasetId;
        var _mComparisonList = cloneArray(mComparisonList);
        for (var i = 0, qty = _mComparisonList.length ; i < qty ; i++) {
            var p = _mComparisonList[i].split('-'); // p[2] is containing datasetId now
            if (!compareDatasetId) {
                compareDatasetId = p[2];
            }
            if (compareDatasetId != p[2]) {
                if (!confirm(compareConfirmOtherDataset)) {
                    return false;
                }
                break;
            }
        }
    }
    return mSubmitAddToCompare();
}

function compareClear()
{
    if (confirm(compareConfirmListClearing)) {
        document.location = location.pathname + '?action=compareClear';
    }
    return false;
}

function mCompare(oCheckbox)
{
    var key = oCheckbox.value;
    if (oCheckbox.checked) {
        // exclude duplicates
        if (compareProducts.indexOf(key) >= 0) {
            alert(compareInComparisonAlready);
            oCheckbox.checked = false;
            return false;
        }
        // check for max quantity of products to compare
        if (compareProducts.length == compareMaxQuantity) {
            alert(compareMaxMessage);
            oCheckbox.checked = false;
            return false;
        }
        // check for different datasets
        if (compareDisallowDifferentDatasets) {
            var p = key.split('-');
            if ((compareProducts.length + mComparisonList.length) > 0 && p[2] != copmpareLastDatasetId && !confirm(compareConfirmOtherDataset)) {
                oCheckbox.checked = false;
                return false;
            }
            copmpareLastDatasetId = p[2];
            // uncheck checked products having other dataset
            var _mComparisonList = cloneArray(mComparisonList);
            for (var i = 0, qty = _mComparisonList.length ; i < qty ; i++) {
                var p = _mComparisonList[i].split('-');
                if (p[2] != copmpareLastDatasetId) {
                    var o = document.getElementById('cmp_' + _mComparisonList[i]);
                    o.checked = false;
                    mCompare(o);
                }
            }
            // count real number of products to comapere after adding
            var _compareProducts = cloneArray(compareProducts);
            for (var i = 0, qty = compareProducts.length ; i < qty ; i++) {
                var p = compareProducts[i].split('-');
                if (p[2] != copmpareLastDatasetId) {
                    var index = _compareProducts.indexOf(compareProducts[i]);
                    if (Array.prototype.splice) {
                        _compareProducts.splice(index, 1);
                    } else {
                        _compareProducts = mComparisonList._splice(index, 1);
                    }
                }
            }
            // check for max quantity of products to compare after manipulations
            if (_compareProducts.length + mComparisonList.length >= compareMaxQuantity) {
                alert(compareMaxMessage);
                oCheckbox.checked = false;
                return false;
            }
        }
        mComparisonList.push(key);
    } else {
        var index = mComparisonList.indexOf(key);
        if (index > -1) {
            if (Array.prototype.splice) {
                mComparisonList.splice(index, 1);
            } else {
                mComparisonList = mComparisonList._splice(index, 1);
            }
            copmpareLastDatasetId = compareDatasetId;
        }
    }
}

function mSubmitAddToCompare()
{
    var qty = mComparisonList.length;

    if (!qty) {
        alert(compareListIsEmpty);
        return false;
    }

    var _mComparisonList = cloneArray(mComparisonList);

    // check for added already products and exclude its from mComparisonList
    for (var i = 0 ; i < qty ; i++) {
        var index = compareProducts.indexOf(_mComparisonList[i]);
        if (index >= 0) {
            // exclude duplicate product
            if (Array.prototype.splice) {
                mComparisonList.splice(_mComparisonList.indexOf(mComparisonList[i]), 1);
            } else {
                mComparisonList = mComparisonList._splice(_mComparisonList.indexOf(mComparisonList[i]), 1);
            }
        }
    }

    document.location = location.pathname + '?action=compare&products=' + _mComparisonList.join(';');
    return false;
}

function mCompareSelected(url)
{
    if (mComparisonList.length < 2) {
        if (mComparisonList.length < 1 && compareProducts.length > 1) {
            window.open(frontBaseHref + url + '?p=' + compareProducts.join(';') + '&h=&v=all&lay_id=100');
            return false;
        }
        alert(compareListInsufficient);
        return false;
    }
    if (compareProducts.length && !confirm(compareConfirmPreviousClearing)) {
        return false;
    }
    window.open(frontBaseHref + url + '?p=' + mComparisonList.join(';') + '&h=&v=all&lay_id=100');
    return false;
}

/* /products comparison */

function getXPos(elem){
 x = 0;
 do { x += elem.offsetLeft; }
 while((elem = elem.offsetParent) != null);
 return x;
}

function getYPos(elem){
 y = 0;
 do { y += elem.offsetTop; }
 while((elem = elem.offsetParent) != null);
 return y;
}

var calendarBlock;
var calendarDateFieldName;

function insertAfter(newChild, refChild) {
    refChild.parentNode.insertBefore(newChild,refChild.nextSibling);
}

function getCalendar(in_dateField, lang, dateFormat, divIdPrefix){

    var elevPrefix = typeof(divIdPrefix) == 'undefined' ? '' : divIdPrefix;

    calendarTarget = in_dateField;
    calendarBlock = document.getElementById(elevPrefix + "calendar_block");
    if(calendarBlock && (calendarBlock.style.display!="block" || (in_dateField.form.name + in_dateField.name!=calendarDateFieldName))){
      calendarDateFieldName = in_dateField.form.name + in_dateField.name;
      var pos = AMI.Browser.getObjectPosition(calendarTarget, true);
      var cLeft = pos[0];
      var cTop = pos[1];

      var dconfAddon = '';
      if(typeof(dateFormat) != 'undefined' && dateFormat != ''){
        dconfAddon = '&date_format='+dateFormat;
      }

      document.getElementById(elevPrefix + "calendar_block_frm").src = "calendar.php?v=2&lang="+lang+dconfAddon;
      calendarBlock.style.position = 'absolute';
      calendarBlock.style.display="block";

      calendarBlock.parentNode = null;
      insertAfter(calendarBlock, calendarTarget);

      var correctLeft = calendarTarget.offsetWidth + 10;
      var correctTop = calendarTarget.offsetHeight;

      calendarBlock.style.left = (cLeft + correctLeft) + 'px';
      calendarBlock.style.top = (cTop + correctTop) + 'px';

      document.getElementById(elevPrefix + "calendar_block_frm").contentWindow.document.body.focus();
    }else if(calendarBlock){
      calendarBlock.style.display="none";
    }
}

function replaceDateTitle(objId){
    var objObj = document.getElementById(objId);
    if(objObj){
        var curDate = objObj.innerHTML;
        var rxToday = new RegExp(DATE_CONVERTION[2].replace(/\./g, "\\."));
        var rxYesterday = new RegExp(DATE_CONVERTION[3].replace(/\./g, "\\."));
        curDate = curDate.replace(rxToday, DATE_CONVERTION[0]);
        curDate = curDate.replace(rxYesterday, DATE_CONVERTION[1]);
        objObj.innerHTML = curDate;
    }
}

/*
Пример использования календаря
<div  id="calendar_block"  style="display:none;position:absolute;background-color:#f8f8f8;width:220px;height:345px;"><table border="0" cellpadding="0" cellspacing="0" width=100% height=100%><tr><td style="padding:0px;"><iframe id="calendar_block_frm" width=100% height=100% src="calendar.php" frameborder=0 scrolling=no></iframe></td></tr></table></div>

<form name=fltform>
дата:
<input type="text" name="testday" value="01.04.2007">
<a href="javascript:getCalendar(document.fltform.testday, 'ru');">
<img src="_img/calendar.gif" border=0></a>
</form>
*/

function saveURLHistory(){
	var uh_prev_mod = amiGetCookie('uh_prev_mod');
	var uh_prev_url = amiGetCookie('uh_prev_url');
	var uh_curr_mod = amiGetCookie('uh_curr_mod');
	var uh_curr_url = amiGetCookie('uh_curr_url');

	delCookie('uh_prev_mod', "/");
	delCookie('uh_prev_url', "/");
	delCookie('uh_curr_mod', "/");
	delCookie('uh_curr_url', "/");

	if(uh_curr_mod == null){
		setCookie('uh_prev_mod', active_module, "/");
		setCookie('uh_prev_url', active_module_link, "/");
		setCookie('uh_curr_mod', active_module, "/");
		setCookie('uh_curr_url', active_module_link, "/");
	}else if(uh_curr_mod != active_module){
		setCookie('uh_prev_mod', uh_curr_mod, "/");
		setCookie('uh_prev_url', uh_curr_url, "/");
		setCookie('uh_curr_mod', active_module, "/");
		setCookie('uh_curr_url', active_module_link, "/");
	}else{
		setCookie('uh_prev_mod', uh_prev_mod, "/");
		setCookie('uh_prev_url', uh_prev_url, "/");
		setCookie('uh_curr_mod', active_module, "/");
		setCookie('uh_curr_url', active_module_link, "/");
	}
}

saveURLHistory();

function amiFrontCommonClass(){
    this.serialize = function(oData){
        var result = '';
        if(typeof(oData) == "object"){
            if(oData instanceof Array){
                result += 'a';
                for(var i = 0; i < oData.length; i++){
                    var item = oData[i].toString();
                    result += item.length.toString() + '.' + item;
                }
            }else{
                result += 'o';
                for(var oKey in oData){
                    result += oKey.length.toString() + '.' + oKey + oData[oKey].length.toString() + '.' + oData[oKey];
                }
            }
        }
        return result;
    }

    this.unserialize = function(oString){
        var oData = null;
        if(oString.charAt(0) == 'a' || oString.charAt(0) == 'o'){
            var isArray = oString.charAt(0) == 'a';
            if(isArray){
                oData = [];
            }else{
                oData = new Object();
            }
            var dataLength = '';
            var isShouldBeKey = isArray ? false : true;
            var keyValue = '';
            for(var i = 1; i < oString.length; i++){
                if(oString.charAt(i).match(/\d/)){
                    dataLength += oString.charAt(i);
                }else if(oString.charAt(i) == '.'){
                    dataLength = parseInt(dataLength);
                    if(isShouldBeKey){
                        keyValue = oString.substr(i + 1, dataLength);
                        isShouldBeKey = false;
                    }else{
                        if(isArray){
                            oData[oData.length] = decodeURIComponent(oString.substr(i + 1, dataLength));
                        }else{
                            oData[keyValue] = decodeURIComponent(oString.substr(i + 1, dataLength));
                            isShouldBeKey = true;
                        }
                        keyValue = '';
                    }
                    i = i + dataLength;
                    dataLength = '';
                }
            }
        }
        return oData;
    }
}
var amiFrontCommon = new amiFrontCommonClass();

function amiSessionClass(cookieName, sessionCookieName, cookieDays, cookieHours){
	this.sessionCookieName = sessionCookieName;
    this.cookieName = cookieName;
    this.cookieDays = cookieDays;
    this.cookieHours = cookieHours;
    this.variables = new Object();

    this.init = function(){
        this.loadVariables();
    }

    this.setCookieName = function(value){
        this.cookieName = value;
    }

    this.setCookieLifetime = function(iDays, iHours){
        this.cookieDays = iDays;
        this.cookieHours = iHours;
    }

    this.set = function(name, value){
        this.variables[name] = value;
        this.storeVariables();
    }

    this.del = function(name){
        delete this.variables[name];
        this.storeVariables();
    }

    this.get = function(name){
        if(typeof(this.variables[name]) != 'undefined'){
            return this.variables[name];
        }
        return '';
    }

    this.storeVariables = function(){
        var sVariables = amiFrontCommon.serialize(this.variables);
        setCookie(this.cookieName, sVariables, '/', this.cookieDays, this.cookieHours, true);
    }

    this.loadVariables = function(){
        var sessionCookie = amiGetCookie(this.sessionCookieName);
        if(sessionCookie != null){
            var sVariables = amiGetCookie(this.cookieName, true);
            this.variables = new Object();
            if(sVariables != null){
                this.variables = amiFrontCommon.unserialize(sVariables);
                if(typeof(this.variables) != 'object'){
                    this.variables = new Object();
                }
            }
        }else{
            delCookie(this.cookieName);
        }
    }

    this.init();
}

var amiSession = new amiSessionClass('user_session', sessionCookieName, 30, 0);
//updateCookieExpireTime('user_session', sessionTimeout);

function amiGetUsername(source){
    var res;
    switch(source){
        case 'nickname':
            res = amiSession.get('nickname_cookie');
            break;
        case 'username':
            res = amiSession.get('username_cookie');
            break;
        default:
            res = amiSession.get('firstname_cookie') + ' ' + amiSession.get('lastname_cookie');
            res = res.replace(/^\s*/, '').replace(/\s*$/, '');
    }
    return res;
}

var ratingForms = {};

function addRatingForm(formName, itemId){
    ratingForms[formName] = itemId;
}

function checkRatingForms(moduleName){
    var ratings = AMI.Browser.Cookie.get('moduleRatings');
    if(ratings){
        var modules = ratings.split(';');
        for(var i=0; i<modules.length; i++){
            var module = modules[i].split(':');
            if((module[0] == moduleName) && (module.length > 1)){
                for(var j=1; j<module.length; j++){
                    for(var formName in ratingForms){
                        if((module[j] == ratingForms[formName]) && document.getElementsByName(formName)){
                            document.getElementsByName(formName)[0].style.display = 'none';
                            if(AMI.find('#rating_value')){
                                AMI.find('#rating_value').style.display = 'none';
                            }
                        }
                    }
                }
            }
        }
    }
}

// User menu functions

function hideAllUserMenues(evt, id){
  var oTarget = AMI.Browser.Event.getTarget(evt);
  if((oTarget && oTarget.className == 'user_menu' ) || (oTarget.parentNode && oTarget.parentNode.className == 'user_menu')){
    AMI.Browser.Event.stopProcessing(evt);
    return;
  }
  var aMenues = AMI.find('.user_menu');
  for (i = 0; i < aMenues.length; i++){
    if(id && (aMenues[i].id == 'user_menu_ul_'+id || aMenues[i].id == 'forum_watching_menu_ul_'+id)){
    }else{
      //aMenues[i].style.visibility = 'hidden';
      AMI.UI.Effects.fadeOut(aMenues[i], 300);
    }
  }

  if(document.getElementById('forum_watching_menu_li_watch') && document.getElementById('forum_watching_menu_li_watch').style.visibility == 'visible'){
	AMI.UI.Effects.fadeOut(document.getElementById('forum_watching_menu_li_watch'), 300);
  }
  if(document.getElementById('forum_watching_menu_li_stop_watching') && document.getElementById('forum_watching_menu_li_stop_watching').style.visibility == 'visible'){
	  AMI.UI.Effects.fadeOut(document.getElementById('forum_watching_menu_li_stop_watching'), 300);
  }
}

function showUserMenu(evt, id) {
  var oMenu = AMI.find('#user_menu_ul_' + id);

	if(oMenu.style.visibility == 'visible'){
	  //oMenu.style.display = 'none';
    AMI.UI.Effects.fadeOut(oMenu, 300);
	} else {
    hideAllUserMenues(evt, id);
	  //oMenu.style.display = 'block';
    AMI.UI.Effects.fadeIn(oMenu, 300);
	}
  AMI.Browser.Event.stopProcessing(evt);
}

function getWatchingStatus(status, content){
	if(status == 1){
		if(content == 'watch'){
			if(document.getElementById('forum_watching_menu_li_watch')){
				document.getElementById('forum_watching_menu_li_watch').style.visibility = 'visible';
				document.getElementById('forum_watching_menu_li_watch').style.display = 'block';
			}
			if(document.getElementById('forum_watching_menu_li_stop_watching')){
				document.getElementById('forum_watching_menu_li_stop_watching').style.visibility = 'hidden';
				document.getElementById('forum_watching_menu_li_stop_watching').style.display = 'none';
			}
		}else if(content == 'stop_watching'){
			if(document.getElementById('forum_watching_menu_li_watch')){
				document.getElementById('forum_watching_menu_li_watch').style.visibility = 'hidden';
				document.getElementById('forum_watching_menu_li_watch').style.display = 'none';
			}
			if(document.getElementById('forum_watching_menu_li_stop_watching')){
				document.getElementById('forum_watching_menu_li_stop_watching').style.visibility = 'visible';
				document.getElementById('forum_watching_menu_li_stop_watching').style.display = 'block';
			}
		}
	}
}

function hideForumWatchingLinks(){
	if(document.getElementById('forum_watching_menu_li_watch')){
		document.getElementById('forum_watching_menu_li_watch').style.visibility = 'hidden';
		document.getElementById('forum_watching_menu_li_watch').style.display = 'none';
	}
	if(document.getElementById('forum_watching_menu_li_stop_watching')){
		document.getElementById('forum_watching_menu_li_stop_watching').style.visibility = 'hidden';
		document.getElementById('forum_watching_menu_li_stop_watching').style.display = 'none';
	}
}

function showForumWatchingMenu(evt, id){
	var oMenu = AMI.find('#forum_watching_menu_ul_' + id);

	if(oMenu.style.visibility == 'visible'){
		AMI.UI.Effects.fadeOut(oMenu, 300);
		AMI.UI.Effects.fadeOut(document.getElementById('forum_watching_menu_li_watch'), 300);
		AMI.UI.Effects.fadeOut(document.getElementById('forum_watching_menu_li_stop_watching'), 300);
	}else{
		hideAllUserMenues(evt, id);
		AMI.UI.Effects.fadeIn(oMenu, 300);
		AMI.HTTPRequest.getContent('GET', frontBaseHref + 'ami_service.php', 'service=forum&action=get_watching_status&id_topic=' + parseInt(id) + '&scname=' + window.sessionCookieName, getWatchingStatus);
	}
	AMI.Browser.Event.stopProcessing(evt);
}

var pageLoaded = false;
addOnLoadEvent(function(){
    window.pageLoaded = true;
    if(AMI.UI._savedAlert && !window.onloadAlerted){
        var oAlertWindow = AMI.find('#status_message');
        if (oAlertWindow){
            var statusText = oAlertWindow.innerHTML.replace(/<script>[^<\/script>]*<\/script>/g, "");
            alert(statusText);
        }
    }
});

savePreviousOnLoadEvent();

function loadMobileVersion(){
      AMI.Cookie.set('forceMobile', '1', 3600, '\\');
      AMI.Cookie.del('forceDesktop');
      window.location.reload();
}
function loadDesktopVersion(){
      if(isMobileDevice()){
          AMI.Cookie.set('forceDesktop', '1', 3600, '\\');
      }else{
          AMI.Cookie.del('forceDesktop');
      }
      AMI.Cookie.del('forceMobile');
      window.location.reload();
}

function isMobileLayout(){
    return (typeof(bMobileLayout)=='undefined')? false : bMobileLayout;
}

function isMobileDevice(){
    return ((screen.width <= 480) || ((document.body != null) && (document.body.clientWidth <= 480)));
}

function checkDeviceAndLoadVersion(){

  var forceMobile = AMI.Cookie.get('forceMobile');
  var forceDesktop = AMI.Cookie.get('forceDesktop');
  var bMobileLayout = isMobileLayout();
  var bMobileDevice = isMobileDevice();

  if((forceMobile=='1') && !bMobileLayout){
      loadMobileVersion();
      return;
  }

  if((forceDesktop=='1') && bMobileLayout){
      loadDesktopVersion();
      return;
  }

  if(bMobileDevice && !bMobileLayout && (forceDesktop==null) && (forceMobile==null)){
      loadMobileVersion();
      return;
  }
}

addOnLoadEvent(function(){
    if(typeof(amiEshopSettings) != 'undefined'){
        AMI.Eshop = AMI.Eshop || {};
        AMI.Eshop.formatMoney = function(value){
            value = AMI.Eshop.formatNumber(value);
            if(amiEshopSettings.currencyPrefix != ''){
                value = amiEshopSettings.currencyPrefix + ' ' + value;
            }
            if(amiEshopSettings.currencyPostfix != ''){
                value = value + ' ' + amiEshopSettings.currencyPostfix;
            }
            return value;
        };
        AMI.Eshop.formatNumber = function(value){
            var i, j, km, kw, kd;
            i = parseInt(value = (+value || 0).toFixed(amiEshopSettings.numberDecimals)) + "";
            j = ((j = i.length) > 3) ? j % 3 : 0;
            km = (j ? i.substr(0, j) + amiEshopSettings.thousandsSeparator : "");
            kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + amiEshopSettings.thousandsSeparator);
            kd = (amiEshopSettings.numberDecimals ? amiEshopSettings.decimalPoint + Math.abs(value - i).toFixed(amiEshopSettings.numberDecimals).replace(/-/, 0).slice(2) : "");
            return km + kw + kd;
        };
    }
});

