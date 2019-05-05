const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.id;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  // console.log(req.user.cart)
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            prods: products,
            pageTitle: 'Your Cart',
            path: '/cart'
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let qty = 1;
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0){
        product = products[0];
      }
      
      if (product) {
        const oldQty = product.cartItem.quantity;
        qty = oldQty + 1;
        return product;
      }
      return Product.findByPk(prodId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: qty }
      })
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.postDeleteCartItem = ( req, res, next ) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts( { where: { id : prodId } } );
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy()
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.postOrders = ( req, res, next ) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts()
    })
    .then(products => {
      return req.user.createOrder()
      .then(order => {
        return order.addProducts(products.map(p => {
          p.orderItem = {
            quantity: p.cartItem.quantity
          }
          return p;
        }))
      })
      .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then (result => {
      res.redirect('/orders')
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next ) => {
  req.user
    .getOrders({include: ['products']})
    .then(orders => {
      res.render('shop/orders', {
        orders: orders,
        pageTitle: 'Your Order',
        path: '/orders'
      })
    })
    .catch(err => console.log(err));
}