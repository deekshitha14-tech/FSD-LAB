import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-root',
imports: [ReactiveFormsModule, CommonModule],
templateUrl: './app.html',
styleUrl: './app.css'
})
export class App {
contactForm;

constructor(private fb: FormBuilder) {
this.contactForm = this.fb.group({
name: ['', Validators.required],
email: ['', [Validators.required, Validators.email]],
message: ['', Validators.required]
});
}

submitForm() {
if (this.contactForm.valid) {
alert('Form submitted successfully!');
}
}
}
