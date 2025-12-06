import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormsModule as ReactiveForms } from '@angular/forms';
import { Resource, User, Subject, Level } from '../../models/types';
import { ButtonComponent } from '../button/button.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-upload-modal',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonComponent, LucideAngularModule],
    templateUrl: './upload-modal.component.html',
    styleUrl: './upload-modal.component.css'
})
export class UploadModalComponent {
    @Input() isOpen = false;
    @Input() currentUser: User | null = null;
    @Output() onClose = new EventEmitter<void>();
    @Output() onUpload = new EventEmitter<Resource>();
    @Output() onLoginRequest = new EventEmitter<void>();

    step: 1 | 2 = 1;
    isEnhancing = false;
    fileName = '';

    formData = {
        title: '',
        rawDescription: '',
        finalDescription: '',
        level: Level.SECONDE,
        subject: Subject.FRANCAIS,
        contentDetails: '',
        tags: [] as string[],
        price: 0
    };

    subjects = Object.values(Subject);
    levels = Object.values(Level);

    close() {
        this.onClose.emit();
    }

    handleFileChange(e: Event) {
        const input = e.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.fileName = input.files[0].name;
        }
    }

    async handleEnhance() {
        if (!this.formData.rawDescription) return;
        this.isEnhancing = true;

        this.isEnhancing = false;
        this.step = 2;
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        if (!this.fileName || !this.currentUser) return;

        const newResource: Resource = {
            id: Math.random().toString(36).substr(2, 9),
            title: this.formData.title,
            description: this.formData.finalDescription || this.formData.rawDescription,
            author: this.currentUser.name,
            authorId: this.currentUser.id,
            level: this.formData.level,
            subject: this.formData.subject,
            tags: this.formData.tags,
            likes: 0,
            downloads: 0,
            date: new Date().toISOString(),
            contentDetails: this.formData.contentDetails,
            fileUrl: '#',
            fileName: this.fileName,
            price: this.formData.price
        };
        this.onUpload.emit(newResource);
        this.close();
        // Reset
        this.step = 1;
        this.fileName = '';
        this.formData = {
            title: '',
            rawDescription: '',
            finalDescription: '',
            level: Level.SECONDE,
            subject: Subject.FRANCAIS,
            contentDetails: '',
            tags: [],
            price: 0
        };
    }

    addTag(e: Event) {
        e.preventDefault();
        const input = e.target as HTMLInputElement;
        const val = input.value;
        if (val) {
            this.formData.tags = [...this.formData.tags, val];
            input.value = '';
        }
    }

    removeTag(tagToRemove: string) {
        this.formData.tags = this.formData.tags.filter(t => t !== tagToRemove);
    }
}
