import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { RespondInterceptor } from './core/interceptors/respond.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DeAuthGuard } from './core/guards/de-auth.guard';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { AuthService } from './core/services/auth.service';
import { UsersService } from './core/services/users.service';
import { SharedModule } from './modules/shared/shared.module';
import { ModalsService } from './core/services/modals.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { userReducer } from './core/state/users/user.reducer';
import { UserEffects } from './core/state/users/user.effects';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent ],
  imports: [
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
    }),
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    AuthGuard,
    DeAuthGuard,
    AuthService,
    UsersService,
    ModalsService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RespondInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
