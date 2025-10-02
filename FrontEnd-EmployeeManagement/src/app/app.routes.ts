import { Routes } from '@angular/router';
import { ListEmployee } from './list-employee/list-employee';
import { CreateEmployeeComponent } from './create-employee/create-employee';
import { UpdateEmployee } from './update-employee/update-employee';

export const routes: Routes = [
    {path:'employees',component: ListEmployee},
    {path: 'create-employee', component: CreateEmployeeComponent},
    {path: 'update-employee/:id', component: UpdateEmployee},
    {path:'',redirectTo:'employees',pathMatch:'full'}
];
