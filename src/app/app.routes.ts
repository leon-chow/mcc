import { Routes } from '@angular/router';
import { ScrollProbabilityPageComponent } from './pages/scroll-probability-page/scroll-probability-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { GrindingPageComponent } from './pages/grinding-page/grinding-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AccuracyPageComponent } from './pages/accuracy-page/accuracy-page.component';

export const routes: Routes = [
    {title: 'Maplestory Classic Codex', path: '', component: LandingPageComponent},
    {path: '', redirectTo: '/', pathMatch: 'full'},
    
    {title: 'Scroll Probability', path: 'scroll-probability', component: ScrollProbabilityPageComponent},
    {path: 'scrollprobability', pathMatch: 'full', redirectTo: 'scroll-probability'},
    {path: 'scrollprobabilities', pathMatch: 'full', redirectTo: 'scroll-probability'},
    {path: 'scroll', pathMatch: 'full', redirectTo: 'scroll-probability'},
    
    {title: 'grinding', path: 'grinding', component: GrindingPageComponent},
    {path: 'grind', redirectTo: 'grinding', pathMatch: 'full'},
    
    {title: 'events', path: 'events', component: EventPageComponent},
    {path: 'event', redirectTo: 'events', pathMatch: 'full'},

    {title: 'accuracy', path: 'accuracy', component: AccuracyPageComponent},
    {path: 'acc', redirectTo: 'accuracy'},
    {path: 'accuracy-calculator', redirectTo: 'accuracy'},

    {title: 'not-found', path: 'not-found', component: NotFoundPageComponent},
    {path: '**', redirectTo: 'not-found'}
];
