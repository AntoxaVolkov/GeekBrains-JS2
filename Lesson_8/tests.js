describe('Тестирование API', () => {

   ///////////////////
  // 'Тестирование API /shop
  //////////////////
  describe('Тестирование API /shop', () => {
    const
      product = {
        product: "Phone",
        price: "12000"
      };
    
    let 
      result,
      userID,
      newProduct;

    before(async () => {
      result = await shopAPI.getProductsOfCart();
      userID = result["user_id"];
    });

    after(() => {
      result = undefined;
      userID = undefined;
    });
  
    it('Ответ от сервера пришел', () => {
      assert.isDefined(result);
    })
  
    it('Сервер вернул успешный ответ', () => {
      assert.equal(shopAPI.res.status, '200');
    })
  
    it('ID пользователя получено', () => {
      assert.isDefined(userID);
    })
  
    it('Новый продукт добавлен в карзину', async () => {
      
      let 
        res = await shopAPI.addProductInCart(userID, product);
      newProduct = res;
      assert.exists(res["product_id"]);
    })

    it('Новый продукт есть в карзине', async () => {
      
      let 
        res = await shopAPI.getProductsOfCart(userID);
      assert.deepInclude(res.cart, newProduct);
    })

    it('Новый продукт удалён из карзины', async () => {
      
      let 
        res = await shopAPI.removeProductFromCart(userID, newProduct["product_id"]);
      
      assert.notDeepInclude(res.cart, newProduct);
    })

  });

  ///////////////////
  // 'Тестирование API /comments
  //////////////////
  describe('Тестирование API /comments', () => {
    const
      comment = {
        text: "My comment"
      };
    
    let 
      result,
      newComment;

    before(async () => {
      result = await shopAPI.getComments();
    });

    after(() => {
      result = undefined;
    });
  
    it('Ответ от сервера пришел', () => {
      assert.isDefined(result);
    })
  
    it('Сервер вернул успешный ответ', () => {
      assert.equal(shopAPI.res.status, '200');
    })
  
    it('В качестве ответа получен массив', () => {
      assert.isArray(result);
    })
  
    it('Новый комментарий добавлен', async () => {
      
      let 
        res = await shopAPI.addComment(comment.text);
      newComment = res;
      assert.exists(res["comment_id"]);
    })

    it('Новый комментарий есть в списке', async () => {
      
      let 
        res = await shopAPI.getComments();
      assert.deepInclude(res, newComment);
    })


    it('Лайк поставлен', async () => {
      
      let 
        res = await shopAPI.likeComment(newComment["comment_id"]);
      newComment = res;
      assert.equal(res.likes, 1);
    })

    it('Новый продукт удалён из карзины', async () => {
      
      let 
        res = await shopAPI.removeComment(newComment["comment_id"]);
      assert.equal(res["comment_id"], newComment["comment_id"]);
    })

  });
});
