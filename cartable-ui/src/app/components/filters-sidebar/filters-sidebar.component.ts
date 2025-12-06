import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { FilterState, Level, Subject } from '../../models/types';

@Component({
    selector: 'app-filters-sidebar',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    templateUrl: './filters-sidebar.component.html',
    styleUrl: './filters-sidebar.component.css'
})
export class FiltersSidebarComponent {
    @Input({ required: true }) isMobile = false; // Not used yet but good for future
    @Input({ required: true }) filters!: FilterState;
    @Input({ required: true }) levels: (Level | string)[] = [];
    @Input({ required: true }) subjects: (Subject | string)[] = [];

    @Output() onUpdateLevel = new EventEmitter<Level | ''>();
    @Output() onUpdateSubject = new EventEmitter<Subject | ''>();
}
