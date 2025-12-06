import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'google' = 'primary';
    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Input() className: string = '';
    @Input() disabled: boolean = false;
    @Input() type: 'button' | 'submit' | 'reset' = 'button';

    get computedClass(): string {
        // Bootstrap base classes
        const baseStyles = "btn rounded-pill d-inline-flex align-items-center justify-content-center fw-medium transition-all";

        const variants = {
            primary: "btn-primary bg-gradient-primary border-0 text-white shadow-custom-md",
            secondary: "btn-light bg-white border text-body shadow-sm hover-shadow-md",
            outline: "btn-outline-secondary bg-transparent",
            ghost: "btn-link text-decoration-none text-secondary hover-bg-light text-body",
            google: "btn-light bg-white border text-body shadow-sm"
        };

        const sizes = {
            sm: "btn-sm px-3",
            md: "px-4 py-2",
            lg: "btn-lg px-5"
        };

        return `${baseStyles} ${variants[this.variant]} ${sizes[this.size]} ${this.className}`;
    }

    handleClick(event: MouseEvent) {
        // Propagate click
    }
}
