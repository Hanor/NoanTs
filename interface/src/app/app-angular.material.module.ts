import { MatStepperModule, MatFormFieldModule, MatInputModule, MatIconModule, MatBadgeModule,
    MatIconRegistry, MatToolbarModule, MatSidenavModule, MatButtonModule, MatButtonToggleModule,
    MatSelectModule, MatProgressBarModule, MatMenuModule, MatCardModule, MatDialogModule, MatTooltipModule} from '@angular/material'
    import { NgModule } from '@angular/core';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { FormsModule, ReactiveFormsModule } from '@angular/forms';
    
    @NgModule({
      imports: [
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatBadgeModule,
        MatToolbarModule,
        MatButtonModule,
        MatButtonToggleModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressBarModule,
        MatMenuModule,
        MatCardModule,
        MatDialogModule,
        MatTooltipModule
      ],
      exports: [
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatBadgeModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatButtonToggleModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressBarModule,
        MatMenuModule,
        MatCardModule,
        MatDialogModule,
        MatTooltipModule
      ]
    })
    export class AppAngularMaterialModule {
      constructor(
        public matIconRegistry: MatIconRegistry) {
        matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
      }
    }