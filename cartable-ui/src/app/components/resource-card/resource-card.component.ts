import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Resource, Subject } from '../../models/types';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DatePipe],
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.css'
})
export class ResourceCardComponent {
  @Input({ required: true }) resource!: Resource;
  @Output() onClick = new EventEmitter<Resource>();


  getSubjectStyles(subject: Subject): string {
    // Mapping subjects to Bootstrap color utilities where possible, or using custom styles if defined
    // For simplicity, we retrun specific classes that we might need to define or map to closest BS colors
    switch (subject) {
      case Subject.FRANCAIS: return 'bg-primary text-white border-primary shadow-sm';
      case Subject.MATHS: return 'bg-info text-white border-info shadow-sm';
      case Subject.HISTOIRE_GEO: return 'bg-success text-white border-success shadow-sm';
      case Subject.PHYSIQUE_CHIMIE: return 'bg-danger text-white border-danger shadow-sm';
      // ... fallback for others to secondary or custom classes
      default: return 'bg-secondary text-white border-secondary shadow-sm';
    }
  }
}
