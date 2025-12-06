import { Component, computed, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Subject as SubjectEnum, Level, Resource, User, Notification, FilterState } from './models/types';
import { ApiService } from './services/api.service';
import { ResourceCardComponent } from './components/resource-card/resource-card.component';
import { ButtonComponent } from './components/button/button.component';
import { UploadModalComponent } from './components/upload-modal/upload-modal.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { FiltersSidebarComponent } from './components/filters-sidebar/filters-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    ResourceCardComponent,
    ButtonComponent,
    UploadModalComponent,
    DetailViewComponent,
    FiltersSidebarComponent
  ],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private apiService = inject(ApiService);

  // State Signals
  resources = signal<Resource[]>([]);
  selectedResource = signal<Resource | null>(null);
  isUploadModalOpen = signal(false);
  isCreditModalOpen = signal(false);
  showFilters = signal(false);

  // User State
  currentUser = signal<User | null>(null);
  notifications = signal<Notification[]>([]);
  showNotifications = signal(false);

  // Filters State
  filters = signal<FilterState>({
    search: '',
    level: '',
    subject: ''
  });

  // Mock Users just for the mockUsersCount display which is hardcoded in design
  // We will fetch users on init
  allUsers: User[] = [];

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getResources().subscribe({
      next: (res) => {
        console.log('Resources loaded:', res.length);
        this.resources.set(res);
      },
      error: (err) => {
        console.error('Failed to load resources:', err);
      }
    });

    this.apiService.getUsers().subscribe({
      next: (users) => {
        console.log('Users loaded:', users.length);
        this.allUsers = users;
      },
      error: (err) => {
        console.error('Failed to load users:', err);
        // Fallback for demo purposes if backend is not running
        this.allUsers = [];
        alert('Impossible de se connecter au serveur (API). Vérifiez que le backend Java tourne sur le port 8080.');
      }
    });
  }

  // Derived State (Computed)
  filteredResources = computed(() => {
    const r = this.resources();
    const f = this.filters();

    return r.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(f.search.toLowerCase()) ||
        resource.description.toLowerCase().includes(f.search.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(f.search.toLowerCase()));
      const matchesLevel = f.level ? resource.level === f.level : true;
      const matchesSubject = f.subject ? resource.subject === f.subject : true;

      return matchesSearch && matchesLevel && matchesSubject;
    });
  });

  // Enums for Template
  Level = Level;
  SubjectEnum = SubjectEnum;
  Object = Object; // Helper for Object.values

  handleLogin() {
    if (this.allUsers.length > 0) {
      // Simulate logging in as the first user from API
      const user = this.allUsers[0];
      this.currentUser.set(user);
      this.notifications.update(n => [
        { id: 'n1', userId: user.id, message: 'Bienvenue sur Cartable ! Découvrez et téléchargez les séquences de la communauté.', read: false, date: new Date().toISOString(), type: 'system' },
        ...n
      ]);
    } else {
      console.error('No users found to log in.');
      alert('Erreur: Aucun utilisateur trouvé. Le backend est-il démarré ?');
    }
  }

  handleLogout() {
    this.currentUser.set(null);
    this.selectedResource.set(null);
    this.isUploadModalOpen.set(false);
  }

  handleUpload(newResource: Resource) {
    const user = this.currentUser();
    if (!user) return;

    // Update resource list locally (in real app, POST to API then refetch)
    this.resources.update(r => [newResource, ...r]);

    // Update user stats
    const updatedUser = {
      ...user,
      uploads: [...user.uploads, newResource.id]
    };
    this.currentUser.set(updatedUser);
  }

  handlePurchase(event: { resourceId: string, cost: number, authorId: string }): boolean {
    const user = this.currentUser();
    if (!user) return false;

    if (user.credits < event.cost) return false;

    // Deduct from current user
    this.currentUser.update(prev => prev ? {
      ...prev,
      credits: prev.credits - event.cost,
      purchased: [...prev.purchased, event.resourceId]
    } : null);

    return true;
  }

  handleFollow(authorId: string) {
    const user = this.currentUser();
    if (!user) return;

    const isFollowing = user.following.includes(authorId);
    let newFollowing;

    if (isFollowing) {
      newFollowing = user.following.filter(id => id !== authorId);
    } else {
      newFollowing = [...user.following, authorId];
    }

    this.currentUser.update(u => u ? { ...u, following: newFollowing } : null);
  }

  handleBuyCredits(amount: number) {
    this.currentUser.update(u => u ? { ...u, credits: u.credits + amount } : null);
    this.isCreditModalOpen.set(false);
  }

  // Helper because Object.values is not available in template directly
  get levels() { return Object.values(Level); }
  get subjects() { return Object.values(SubjectEnum); }

  // Helpers for template actions
  updateFilterSearch(term: string) {
    this.filters.update(f => ({ ...f, search: term }));
  }

  updateFilterLevel(level: Level | '') {
    this.filters.update(f => ({ ...f, level }));
  }

  updateFilterSubject(subject: SubjectEnum | '') {
    this.filters.update(f => ({ ...f, subject }));
  }

  resetFilters() {
    this.filters.set({ search: '', level: '', subject: '' });
  }

  toggleNotifications() {
    this.showNotifications.update(v => !v);
  }

  toggleFilters() {
    this.showFilters.update(v => !v);
  }

  get hasUnreadNotifications(): boolean {
    return this.notifications().some(n => !n.read);
  }

  get mockUsersCount(): number {
    return this.allUsers.length;
  }
}
