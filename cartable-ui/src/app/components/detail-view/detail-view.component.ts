import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Resource, User } from '../../models/types';
import { ButtonComponent } from '../button/button.component';
import { MarkdownModule } from 'ngx-markdown';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-detail-view',
    standalone: true,
    imports: [CommonModule, ButtonComponent, MarkdownModule, LucideAngularModule, DatePipe],
    templateUrl: './detail-view.component.html',
    styleUrl: './detail-view.component.css'
})
export class DetailViewComponent {
    @Input({ required: true }) resource!: Resource;
    @Input() currentUser: User | null = null;
    @Output() onClose = new EventEmitter<void>();
    @Output() onLoginRequest = new EventEmitter<void>();
    @Output() onPurchase = new EventEmitter<{ resourceId: string, cost: number, authorId: string }>();
    @Output() onFollow = new EventEmitter<string>();

    activeTab: 'details' = 'details';
    aiContent: string | null = null;
    purchaseStatus: 'idle' | 'success' | 'failed' = 'idle';

    get isOwner(): boolean {
        return this.currentUser?.id === this.resource.authorId;
    }

    get hasPurchased(): boolean {
        return this.currentUser?.purchased.includes(this.resource.id) || this.isOwner || false;
    }

    get isFollowing(): boolean {
        return this.currentUser?.following.includes(this.resource.authorId) || false;
    }

    handleDownload() {
        if (!this.currentUser) {
            this.onLoginRequest.emit();
            return;
        }

        if (this.resource.price > 0 && !this.hasPurchased) {
            this.onPurchase.emit({
                resourceId: this.resource.id,
                cost: this.resource.price,
                authorId: this.resource.authorId
            });

            if (this.currentUser.credits >= this.resource.price) {
                this.purchaseStatus = 'success';
                setTimeout(() => this.purchaseStatus = 'idle', 3000);
            } else {
                this.purchaseStatus = 'failed';
                setTimeout(() => this.purchaseStatus = 'idle', 3000);
            }

        } else {
            alert(`Téléchargement lancé : ${this.resource.fileName}`);
        }
    }

    copyToClipboard(text: string | null) {
        if (text) navigator.clipboard.writeText(text);
    }
}
