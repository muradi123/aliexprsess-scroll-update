
  let getJSONComponents= function(productId, aliMemberId, productDetailUrl, imageUrl, title, storeUrl, storeName, price, bigSalePrice, logisticsDesc, algoExpId, tradeDesc) {
  let itemsHTML = '<li class="list-item" hasctr="y"><div class="list product-card" style="" product-index="0" data-product-id="' + productId + '" category-id="" ali-member-id="' + aliMemberId + '" algo-exp-id="' + algoExpId +
           '"><div class="product-img"><a target="_blank" data-p4p="true" href="' +
           productDetailUrl +
           '"><img src="' + imageUrl + '" data-p4p="true" class="item-img" alt="' + title + '" width="220" height="220"></a><div class="report-btn-wrap"><span class="report-item" title="Report fraud item"></span></div><div class="atwl-btn-wrap"><a class="add-wishlist-btn" data-p4p="true"><i data-p4p="true" class="next-icon next-icon-favourite next-medium"></i></a></div></div><div class="product-info"><div class="left-zone"><div class="item-title-wrap"><a data-p4p="true" class="item-title" href="' + productDetailUrl + '" title="' + title + '" target="_blank">' + title +
           '</a></div><div class="item-sellpoint-wrap"><div class="feature-sell-point"></div></div><div class="item-store-wrap"><a class="store-name" href="' + storeUrl + '" title="' + storeName + '" target="_blank" data-spm-anchor-id="a2g0o.productlist.0.0">' + storeName + '</a></div></div><div class="right-zone"><div class="item-price-wrap"><div class="item-price-row"><span class="price-current">' + price + '</span></div><div class="item-price-row item-warm-up"><span class="product-tag graphic"><img src="//ae01.alicdn.com/kf/HTB1zyqEbyLrK1Rjy1zd761nnpXaP.png_220x220.png_.webp" data-p4p="true" class="item-img" width="49.14285714285714" height="16px"></span><span class="price-big-sale">' + bigSalePrice + '</span></div></div><div class="item-shipping-wrap"><span class="shipping-value">' + logisticsDesc + '</span></div><div class="item-sale-wrap"><div class="sale-info without-star"><span class="sale-value"> <a data-p4p="true" rel="nofollow" class="sale-value-link" href="' + productDetailUrl + '#thf" target="_blank">' + tradeDesc + '</a> </span></div></div></div></div></div></li>';
   return itemsHTML;
 }

  let searchParams = new URLSearchParams(window.location.search);
  let catId = searchParams.get('catId')
  let searchText = searchParams.get('SearchText');
  let catName = searchParams.get('catName');
  let nextPage = parseInt(searchParams.get('page'))
     
  let noPages = 0;
                               
  (nextPage) ? nextPage++ : nextPage = 2;
  let numberOfAdd = 0;
  $(window).scroll(function(event) {
  let height = $(document).height();
  let scroll = $(window).scrollTop();
    if (numberOfAdd == 1) {
        setTimeout(function() {
        numberOfAdd = 0;
    }, 2000);  }
    if (numberOfAdd === 0 && noPages === 0) {
    if (scroll > 0.6 * height) {
        numberOfAdd = 1;
  let newUrl = 'https://www.aliexpress.com/glosearch/api/product?CatId=' + catId + '&SearchText=' + searchText + '&catName=' + catName + 'SortType=default&page=' + nextPage + '&isrefine=y&';

  $.ajax({
    url: newUrl,
    type: 'GET',
    dataType: 'JSON',
    success: function(data) {
    nextPage++;
    let response = data;
    console.log(data.items)
    if (response) { 
    let list = response.items;
    for (let i = 0; i < list.length; i++) {
    
    let item = list[i];
    $('ul.list-items').append(getJSONComponents(item.productId, item.store.storeId, item.productDetailUrl, item.imageUrl, item.title, item.store.storeUrl, item.store.storeName, item.price, item.bigSalePrice, item.logisticsDesc, item.traceInfo.algo_expid, item.tradeDesc));}
    let lastPage = parseInt($('.total-page').text().match(/\d+/));
    if (nextPage == lastPage - 1) {
      noPages = 1;
    }}},

    error: function(error) {
            console.log("Error ", error);
            chrome.runtime.sendMessage({errorMessage: "error", url:newUrl})
           }
        });
      }
    }
  });




