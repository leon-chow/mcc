import { Routes } from '@angular/router';
import { ScrollProbabilityPageComponent } from './pages/scroll-probability-page/scroll-probability-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { GrindingPageComponent } from './pages/grinding-page/grinding-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AccuracyPageComponent } from './pages/accuracy-page/accuracy-page.component';

export const routes: Routes = [
    {title: '/', path: '', component: LandingPageComponent},
    {path: '', redirectTo: '/', pathMatch: 'full'},
    
    {title: 'scroll-probability', path: 'scroll-probability', component: ScrollProbabilityPageComponent},
    {title: 'scroll-probability', path: 'scrollprobability', pathMatch: 'full', redirectTo: 'scroll-probability'},
    {title: 'scroll-probability', path: 'scrollprobabilities', pathMatch: 'full', redirectTo: 'scroll-probability'},
    {title: 'scroll-probability', path: 'scroll', pathMatch: 'full', redirectTo: 'scroll-probability'},
    
    {title: 'grinding', path: 'grinding', component: GrindingPageComponent},
    {title: 'grinding', path: 'grind', redirectTo: 'grinding', pathMatch: 'full'},
    
    {title: 'events', path: 'events', component: EventPageComponent},
    {title: 'events', path: 'event', redirectTo: 'events', pathMatch: 'full'},

    {title: 'accuracy', path: 'accuracy', component: AccuracyPageComponent},
    {title: 'accuracy', path: 'acc', redirectTo: 'accuracy'},
    {title: 'accuracy', path: 'accuracy-calculator', redirectTo: 'accuracy'},

    {title: 'not-found', path: 'not-found', component: NotFoundPageComponent},
    {title: 'not-found', path: '**', redirectTo: 'not-found'}
];
