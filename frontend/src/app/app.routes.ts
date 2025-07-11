import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {ShopComponent} from './components/shop/shop.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {OffersComponent} from './components/offers/offers.component';
import {BlogComponent} from './components/blog/blog.component';
import {BlogDetailComponent} from './components/blog-detail/blog-detail.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import {OrderSummaryComponent} from './components/order-summary/order-summary.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';
import {FaqComponent} from './components/faq/faq.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {ProfileComponent} from './components/profile/profile.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {AdminProductsComponent} from './components/admin-products/admin-products.component';
import {AdminOrdersComponent} from './components/admin-orders/admin-orders.component';
import {AdminUsersComponent} from './components/admin-users/admin-users.component';
import {ColorHarmonyComponent} from './components/color-harmony/color-harmony.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {AdminCategoryComponent} from './components/admin-category/admin-category.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'about',component: AboutComponent},
  { path: 'contact',component: ContactComponent},
  { path: 'offers', component: OffersComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogDetailComponent},
  { path: 'wishlist', component: WishlistComponent },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/orders', component: AdminOrdersComponent},
  { path: 'admin/users',component: AdminUsersComponent },
  { path: 'admin/category',component: AdminCategoryComponent },
  { path: 'color-harmony', component: ColorHarmonyComponent},
  {path:'change-password',component:ChangePasswordComponent}
];
