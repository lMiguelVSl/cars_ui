import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule,
        MatMenuModule,
        MatSelectModule
    ]
})
export class MaterialModule { }