import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);
import {
  LucideAngularModule,
  BookOpen, Coins, Bell, Plus, LogOut, Mail, Stars, Search, PanelLeftClose, PanelLeftOpen,
  Heart, Download, Calendar, ChevronRight, User, Sparkles, Tag, Lock, AlertTriangle, CheckCircle,
  BrainCircuit, MessageSquare, UploadCloud, FileText, Wand2, Loader2, Filter
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({
      BookOpen, Coins, Bell, Plus, LogOut, Mail, Stars, Search, PanelLeftClose, PanelLeftOpen,
      Heart, Download, Calendar, ChevronRight, User, Sparkles, Tag, Lock, AlertTriangle, CheckCircle,
      BrainCircuit, MessageSquare, UploadCloud, FileText, Wand2, Loader2, Filter
    }))
  ]
};
