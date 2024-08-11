import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProtfilloNewComponent } from './protfillo-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "", component: ProtfilloNewComponent },
];

@NgModule({
  declarations: [ProtfilloNewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ]
})
export class ProtfilloNewModule { }
