
## API Details:-
POST https://catalog-management-system-dev-ak3ogf6zeauc.a.run.app/cms/product/v2/filter/product
Content-Type: application/json

## APK Link:-
https://drive.google.com/file/d/14hRmuShqHV6vYLhK3DgX-1C-raQrv5oJ/view?usp=drive_link

## Video Link:-
https://drive.google.com/file/d/1A0PMU50E-_rnTyTv_uLZAZEwKwW3pWZp/view?usp=drive_link

## GitHub Repositories Link:-
https://github.com/manojnalla098/pallet_assignment.git

## Setup & run instructions
Prerequisites
Node.js (>= 16)
npm or yarn
Android Studio (with SDK installed)
Java 11 or higher
React Native CLI (optional if using npx)

## Step 1: Clean Previous Builds
Before reinstalling dependencies, manually delete the following folders to ensure a clean environment:
android/.cxx/
android/app/.cxx/
android/app/build/
android/build/
node_modules/

## Step 2: Install Dependencies
npm install or npm install --force

## Step 3: Rebuild Android Project
After dependencies are installed, rebuild native code:
cd android
./gradlew clean
cd ..

## Step 4: Run the App
Run the app on an emulator or connected device:

npx react-native run-android

## Environment setup (Google OAuth config)
I tried to implement authentication using @react-native-google-signin/google-signin, but unfortunately, I couldn’t complete it because I don’t have Google Console login credentials.

**Note**: I implemented authentication using local login credentials with a Redux slice and AsyncStorage, using userName and password.

## Login Credentials:-
Username :- manojkumar
Password :- 98765

## Product Listing Features Implemented:-
**FlatList Optimization —** Implemented getItemLayout, removeClippedSubviews,onEndReached fetch and maxToRenderPerBatch for better performance.
**Grid Layout —** Displayed products in a 2-column grid format.
**Lazy Image Loading —** Used react-native-fast-image for optimized image loading.
**Search with Debouncing —** Added a debounced search feature for smoother user experience.
**Quick Add/Remove to Cart & Wishlist —** Enabled instant product addition or removal.
**Infinite Scroll with Pagination —** Implemented seamless scrolling with data pagination. (Mandatory feature)
**Pull-to-Refresh —** Added pull-to-refresh functionality for product updates.
**Floating Cart Button with Badge —** Displayed a floating cart icon showing item count.
**Loading & Error States —** Handled loading indicators and API error scenarios gracefully.

## Product Details Features Implemented:-
**Image Carousel —** Implemented a swipeable image carousel for product images.
**Product Information —** Displayed product name, price, description, and specifications.
**Quantity Selector —** Added functionality to select and update product quantity.
**Add/Update Cart —** Enabled adding products to the cart and updating quantities dynamically.
**Social Sharing —** Integrated product sharing via social platforms.

## Cart Features Implemented:-
**Item Listing with Images —** Displayed all cart items with product images.
**Quantity Controls (+/-) —** Added increase and decrease quantity functionality.
**Remove Item Functionality —** Enabled users to remove products from the cart.
**Price Breakdown —** Displayed subtotal and total price dynamically.
**Checkout Button —** Integrated a checkout option for order placement.
**Empty State —** Shown a “Continue Shopping” button when the cart is empty.
**Cart Persistence (react-native-mmkv - Mandatory) —** I attempted to implement cart persistence using react-native-mmkv as required, but encountered recurring errors despite multiple attempts. I spent an entire day troubleshooting, and decided to move forward with the remaining features to ensure overall project progress.

## Barcode Scanner Features Implemented:-
**Real-Time Scanning —** Implemented using react-native-vision-camera v4 with the Code Scanner plugin.
**Multi-Format Support —** Supported various barcode formats including EAN-13, UPC-A, QR Code, and Code-128.
**Camera Permission Handling —** Added runtime camera permission request and validation.
**Test API Integration —** Used a testing API to simulate barcode-to-product matching (actual product matching API not implemented).
**Flashlight Toggle —** Enabled flashlight control for low-light scanning environments.
**Manual Barcode Entry —** Provided an option for users to manually enter barcode values.
**Scanned Barcode Alert —** Displayed scanned barcode results using an alert popup.
**Error Handling —** Implemented proper error handling for camera and scanning failures.


## Working Flow (Screens & Features):-

1.Splase Screen
2.Login Screen
3.Home Sreen
4.Product Info Screen
5.Cart Screen
6.Barcode Scanner Screen

<!-- -------------------------------------- -->
## Splase Screen :-
Check whether the user is authenticated or not.
If the user is not logged in, navigate to the Login screen.
If the user is already logged in, navigate to the Home screen.
On successful login, restore cart and wishlist data from local storage to maintain user session continuity.

## Login Screen:-
Includes input fields for Username and Password.
Added Password Show/Hide Toggle functionality for better user experience.
Validates user credentials — only valid username and password combinations allow successful login.
On successful login, the user is navigated to the Home screen.
If credentials are invalid, an error message is displayed to inform the user.

## Home Sreen:-
 
## Header :-
**Cart Icon with Badge —** Displays the cart item count; visible only when there are items in the cart.
**User Icon —** On press, shows a popup alert that allows the user to log out, navigate back to the Login screen, and clear the cart and wishlist data.
**Search Bar —** Enables users to search products by title with real-time filtering.
**Barcode Icon —** Provides quick navigation to the Barcode Scanning screen.

## Product Listing FlatList Features Implemented :-

**Grid View Layout —** Displays products in a 2-column grid using numColumns={2} and columnWrapperStyle.
**Optimized Rendering —** Implemented performance optimizations with:
**removeClippedSubviews –** Improves memory usage by unmounting items outside the viewport.
maxToRenderPerBatch, initialNumToRender, and windowSize – Controls rendering batches for smoother scrolling.
**getItemLayout –** Enables faster scroll-to-index operations and improves performance.
**Pull-to-Refresh —** Added using RefreshControl to reload product data when the user swipes down.
**Infinite Scrolling / Pagination —** Implemented with onEndReached and onEndReachedThreshold to load more products dynamically when scrolling near the bottom.
**Loading Indicator —** Displays an ActivityIndicator in ListFooterComponent while fetching more products.
**Smooth Scrolling Experience —** Disabled vertical scroll indicator for a clean UI and added bottom padding for better spacing.
**Quick Add to Wishlist —** Allows users to instantly add or remove products from their wishlist directly from the product grid.
**Quick Add to Cart —** Enables users to add or remove items from the cart without navigating to the product details page.

## Product Info Screen Features Implemented:-
**Image Carousel —** Integrated a swipeable image carousel to showcase multiple product images smoothly.
**Product Details Display —** Shows complete product information including title, category, price, and description.
**Add to Cart Functionality —** Allows users to add the selected product to the cart.
**Add to Wishlist —** Enables users to quickly add or remove products from their wishlist.
**Social Sharing —** Added a share icon that lets users share product details via various social media platforms.
**Cart Summary —** Displays the total cart amount at the bottom of the screen for quick reference.
**View Cart Option —** Includes a “View Cart” button that navigates the user directly to the Cart Screen.

## Cart Screen Features Implemented:-
**Cart Items List —** Displays all added products with their images, titles, prices, and quantities.
**Quantity Controls —** Provides increment (+) and decrement (−) buttons to adjust item quantities dynamically.
**Remove Item Function —** Allows users to remove specific products from the cart.
**Address Display —** Shows the user’s delivery address for quick review before checkout.
**Price Summary —** Displays a detailed price breakdown, including subtotal, discounts (if any), and net payable amount.
**View Bill Summary —** Includes a “View Bill Summary” option at the bottom to review all billing details.
**Checkout Option —** Provides a Checkout button.

## Barcode Scanner Screen Features Implemented:-
**Real-Time Scanning —** Implemented using react-native-vision-camera v4 with the Code Scanner plugin.
**Multi-Format Support —** Supported various barcode formats including EAN-13, UPC-A, QR Code, and Code-128.
**Camera Permission Handling —** Added runtime camera permission request and validation.
**Test API Integration —** Used a testing API to simulate barcode-to-product matching (actual product matching API not implemented).
**Flashlight Toggle —** Enabled flashlight control for low-light scanning environments.
**Manual Barcode Entry —** Provided an option for users to manually enter barcode values .
**Scanned Barcode Alert —** Displayed scanned barcode results using an alert popup.
**Error Handling —** Implemented proper error handling for camera and scanning failures.