const got = require('got');
let accessToken = ''; /* TODO: Fill it */
let category = 'MLA431427' /* TODO: Fill it */
let installments = true /* TODO: Fill it */
let itemNew = true /* TODO: Fill it */

(async () => {
  let offset = 0;
  let loop = true;
  let url = `https://api.mercadolibre.com/sites/MLA/search?category=${category}${installments ? '&installments=yes' : ''}${itemNew ? '&ITEM_CONDITION=2230284' : ''}&access_token=${accessToken}&offset=${offset}`;
  let itemsOrderedBySoldQuantity = [];
  
  while(loop) {
    try {
      console.log(offset);
      let call = await got(url);
      let json = JSON.parse(call.body);

      // Lets check if response is ok to continue loop
      if (!json.paging || !json.paging.total || offset > json.paging.total) {
        loop = false;
        break;
      }
      
      json.results.forEach(item => {
        if (item.sold_quantity && item.id) {
          itemsOrderedBySoldQuantity.push({sold_quantity: item.sold_quantity, id: item.id, permalink: item.permalink});
        }
      });
      offset += 50;
      url = `https://api.mercadolibre.com/sites/MLA/search?category=${category}${installments ? '&installments=yes' : ''}${itemNew ? '&ITEM_CONDITION=2230284' : ''}&access_token=${accessToken}&offset=${offset}`;
    } catch (error) {
      console.log(error);
      console.log(error.response.body);
      loop = false;
    }
  }
  itemsOrderedBySoldQuantity.sort((a,b) => b.sold_quantity - a.sold_quantity);
  console.log(itemsOrderedBySoldQuantity.map((item) => item.permalink));
})();