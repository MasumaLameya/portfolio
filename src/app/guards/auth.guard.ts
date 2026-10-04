import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const isAuth = await supabase.isAuthenticated();
  if (!isAuth) {
    router.navigate(['/admin/login']);
    return false;
  }
  return true;
};
