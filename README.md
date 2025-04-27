<!-- How to run app -->

npm install
json-server --watch db/product.json --port 5000
npm run dev
Pages
Auth Pages
Login: http://localhost:3000/auth/login

Register: http://localhost:3000/auth/register

Cart Pages
Cart: http://localhost:3000/cart

Category Pages
Category (ID: 123): http://localhost:3000/category/123/

Checkout Pages
Checkout (Order ID: 123): http://localhost:3000/checkout/123/

Product Details Pages
Detail Product (Product ID: 123): http://localhost:3000/detailproduct/123

Order Pages
Order: http://localhost:3000/order

Purchase Pages
Purchase: http://localhost:3000/purchase

Flow
Product Flow
Click on a Product to go to the Detail Product page.

On the Detail Product page, you can either:

Add the product to the Cart

Directly Purchase the product.

Checkout page: Proceed to the checkout.

Order page: View your order.

Detail Order: Check the details of the order.

Cart Flow
Click on the Cart to go to the Cart page.

From the Cart page, proceed to Checkout.

Order page: View your order.

Detail Order: Check the details of your order.

Auth Flow
Login or Register to access the app.
