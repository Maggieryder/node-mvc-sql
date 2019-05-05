const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const desc = req.body.desc;
  const price = req.body.price;
  const imageURL = req.body.imageURL;
  req.user.createProduct({
  // Product.create({
    title: title,
    price: price,
    imageURL: imageURL,
    desc: desc
  })
  .then(result => {
    console.log('Created Product');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
    // Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      })
    })
    .catch(err => console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.id;
  req.user.getProducts({where: {id: prodId}})
  // Product.findByPk(prodId)
  .then(products => {
    const product = products[0];
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      product: product,
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true
    })
  })
  .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.id;
  const updatedTitle = req.body.title;
  const updatedImageURL = req.body.imageURL;
  const updatedDesc = req.body.desc;
  const updatedPrice = req.body.price;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.imageURL = updatedImageURL;
      product.desc = updatedDesc;
      product.price = updatedPrice;
      return product.save()
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  Product.findByPk(prodId)
  .then(product => {
    return product.destroy();
  })
  .then(result => {
    console.log('DESTROYED PRODUCT');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
  
};