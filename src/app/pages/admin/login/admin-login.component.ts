import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-wrapper">
      
      <!-- Ambient Glows -->
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>

      <!-- Main Login Container -->
      <div class="login-card">
        
        <!-- Logo & Header -->
        <div class="header-section">
          <div class="logo-icon">
            <i class="bi bi-shield-lock-fill"></i>
          </div>
          <h1 class="title">Admin Portal</h1>
          <p class="subtitle">{{ isSignUp() ? 'Create a new admin account' : 'Sign in to access dashboard' }}</p>
        </div>

        <!-- Mode Toggle Tabs -->
        <div class="tab-container">
          <button
            type="button"
            (click)="setMode(false)"
            [class.active-tab]="!isSignUp()"
            class="tab-btn"
          >
            Sign In
          </button>
          <button
            type="button"
            (click)="setMode(true)"
            [class.active-tab]="isSignUp()"
            class="tab-btn"
          >
            Create Admin
          </button>
        </div>

        <!-- Alert Error Message -->
        <div *ngIf="errorMessage()" class="alert-box error">
          <i class="bi bi-exclamation-circle-fill"></i>
          <span>{{ errorMessage() }}</span>
        </div>

        <!-- Alert Success Message -->
        <div *ngIf="successMessage()" class="alert-box success">
          <i class="bi bi-check-circle-fill"></i>
          <span>{{ successMessage() }}</span>
        </div>

        <!-- Form -->
        <form (ngSubmit)="handleSubmit()" class="form-container">
          
          <!-- Email Input -->
          <div class="input-group">
            <label for="admin-email" class="field-label">Email Address</label>
            <div class="input-wrapper">
              <i class="bi bi-envelope leading-icon"></i>
              <input
                id="admin-email"
                type="email"
                name="email"
                [(ngModel)]="email"
                required
                autocomplete="email"
                placeholder="admin@example.com"
                class="form-input"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="input-group">
            <label for="admin-password" class="field-label">Password</label>
            <div class="input-wrapper">
              <i class="bi bi-lock leading-icon"></i>
              <input
                id="admin-password"
                [type]="showPassword() ? 'text' : 'password'"
                name="password"
                [(ngModel)]="password"
                required
                autocomplete="current-password"
                placeholder="••••••••"
                class="form-input with-trailing"
              />
              <button
                type="button"
                (click)="togglePassword()"
                class="trailing-btn"
                aria-label="Toggle password visibility"
              >
                <i [class]="showPassword() ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="isLoading()"
            class="submit-btn"
          >
            <span *ngIf="isLoading()" class="spinner"></span>
            <span>{{ isLoading() ? 'Processing...' : (isSignUp() ? 'Create Admin Account' : 'Sign In') }}</span>
          </button>
        </form>

        <!-- Return to Portfolio -->
        <div class="footer-section">
          <a routerLink="/" class="back-link">
            <i class="bi bi-arrow-left"></i>
            <span>Return to Portfolio</span>
          </a>
        </div>

      </div>

    </div>
  `,
  styles: [`
    .login-wrapper {
      min-height: 100vh;
      background-color: #090a0f;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .glow {
      position: absolute;
      width: 24rem;
      height: 24rem;
      border-radius: 9999px;
      filter: blur(120px);
      pointer-events: none;
    }
    .glow-1 {
      top: -8rem;
      left: -8rem;
      background-color: rgba(99, 102, 241, 0.15);
    }
    .glow-2 {
      bottom: -8rem;
      right: -8rem;
      background-color: rgba(59, 130, 246, 0.15);
    }

    .login-card {
      width: 100%;
      max-width: 440px;
      background: #14161f;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.5rem;
      padding: 2.25rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
      position: relative;
      z-index: 10;
    }

    .header-section {
      text-align: center;
      margin-bottom: 1.75rem;
    }

    .logo-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 1rem;
      background: linear-gradient(135deg, #6366f1, #3b82f6);
      color: #ffffff;
      font-size: 1.5rem;
      box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
      margin-bottom: 1rem;
    }

    .title {
      font-size: 1.65rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.025em;
    }

    .subtitle {
      font-size: 0.85rem;
      color: #94a3b8;
      margin-top: 0.35rem;
      margin-bottom: 0;
    }

    .tab-container {
      display: flex;
      background-color: #0c0d14;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 0.75rem;
      padding: 0.25rem;
      margin-bottom: 1.5rem;
    }

    .tab-btn {
      flex: 1;
      padding: 0.55rem;
      font-size: 0.8rem;
      font-weight: 600;
      border-radius: 0.6rem;
      border: none;
      background: transparent;
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .tab-btn.active-tab {
      background-color: #232736;
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .alert-box {
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 1.25rem;
    }
    .alert-box.error {
      background-color: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #fca5a5;
    }
    .alert-box.success {
      background-color: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #6ee7b7;
    }

    .form-container {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .field-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #cbd5e1;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .leading-icon {
      position: absolute;
      left: 1rem;
      color: #64748b;
      font-size: 1rem;
      pointer-events: none;
    }

    .form-input {
      width: 100%;
      background-color: #0c0d14 !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      border-radius: 0.75rem !important;
      padding: 0.85rem 1rem 0.85rem 2.75rem !important;
      color: #ffffff !important;
      font-size: 0.9rem !important;
      transition: all 0.15s ease !important;
      outline: none !important;
      box-sizing: border-box !important;
      caret-color: #6366f1 !important;
    }

    .form-input::placeholder {
      color: #475569 !important;
    }

    .form-input:focus {
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25) !important;
      background-color: #10121a !important;
    }

    .form-input.with-trailing {
      padding-right: 3rem !important;
    }

    .form-input:-webkit-autofill,
    .form-input:-webkit-autofill:hover, 
    .form-input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 1000px #0c0d14 inset !important;
      -webkit-text-fill-color: #ffffff !important;
      caret-color: #ffffff !important;
    }

    .trailing-btn {
      position: absolute;
      right: 0.75rem;
      background: transparent;
      border: none;
      color: #64748b;
      cursor: pointer;
      padding: 0.25rem;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      transition: color 0.15s ease;
    }
    .trailing-btn:hover {
      color: #ffffff;
    }

    .submit-btn {
      width: 100%;
      margin-top: 0.5rem;
      padding: 0.85rem 1.5rem;
      border-radius: 0.75rem;
      background: linear-gradient(135deg, #6366f1, #3b82f6);
      color: #ffffff;
      font-size: 0.9rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.15s ease;
    }

    .submit-btn:hover:not(:disabled) {
      opacity: 0.95;
      transform: translateY(-1px);
      box-shadow: 0 12px 24px -5px rgba(99, 102, 241, 0.5);
    }

    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .spinner {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid #ffffff;
      border-top-color: transparent;
      border-radius: 9999px;
      animation: spin 0.6s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .footer-section {
      margin-top: 2rem;
      padding-top: 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      text-align: center;
    }

    .back-link {
      font-size: 0.8rem;
      color: #64748b;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: color 0.15s ease;
    }
    .back-link:hover {
      color: #ffffff;
    }
  `]
})
export class AdminLoginComponent {
  email = '';
  password = '';
  isSignUp = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  showPassword = signal(false);

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  setMode(signUp: boolean): void {
    this.isSignUp.set(signUp);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  async handleSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      this.errorMessage.set('Please provide both email address and password.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      const trimmedEmail = this.email.trim();

      if (this.isSignUp()) {
        // Sign Up Mode
        const { data, error } = await this.supabase.signUp(trimmedEmail, this.password);
        if (error) {
          this.errorMessage.set(error.message);
        } else if (data.session) {
          this.successMessage.set('Account created successfully! Redirecting to dashboard...');
          setTimeout(() => this.router.navigate(['/admin']), 800);
        } else {
          this.successMessage.set('Admin account created! Please sign in with your credentials.');
          this.isSignUp.set(false);
        }
      } else {
        // Sign In Mode
        const { error } = await this.supabase.signIn(trimmedEmail, this.password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            this.errorMessage.set('Invalid email or password. If you have not created your admin account yet, click "Create Admin" tab above.');
          } else {
            this.errorMessage.set(error.message);
          }
        } else {
          this.successMessage.set('Login successful! Loading dashboard...');
          setTimeout(() => this.router.navigate(['/admin']), 500);
        }
      }
    } catch (err: any) {
      this.errorMessage.set(err?.message || 'Authentication failed. Please check your connection.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
