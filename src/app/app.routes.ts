import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { AdminComponent } from '../admin/admin.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersuccessComponent } from './ordersuccess/ordersuccess.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        component: HomeComponent,
    },
    {
        path: 'admin',
        title: 'Admin',
        component: AdminComponent,
    },
    {
        path: 'checkout',
        title: 'Cashout',
        component: CheckoutComponent,
    },
    {
        path: 'success',
        title: 'Successfully',
        component: OrdersuccessComponent,
    }
];
