import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MemberList } from './members/member-list/member-list';
import { MemberDetail } from './members/member-detail/member-detail';
import { Lists } from './lists/lists';
import { Messages } from './messages/messages';
import { authGuard } from './_gautds/auth-guard';
import { TestErrors } from './erros/test-errors/test-errors';
import { NOT_FOUND } from '@angular/core/primitives/di';
import { NotFound } from './errors/not-found/not-found';
import { ServerError } from './errors/server-error/server-error';

export const routes: Routes = [
    {path: '', component: Home},
    {path: '', runGuardsAndResolvers: 'always', canActivate:[authGuard],
        children: [
            {path : 'members' , component: MemberList , canActivate:[authGuard]},
            {path : 'members/:id' , component: MemberDetail , canActivate:[authGuard]},
            {path : 'messages' , component: Messages , canActivate:[authGuard]},
            {path : 'lists' , component: Lists , canActivate:[authGuard]},
        ]
    },
    {path: 'not-found' , component: NotFound},
    {path: 'server-error' , component: ServerError},
    {path: 'errors', component: TestErrors},
    {path: '**', component: Home, pathMatch:'full'}
];
