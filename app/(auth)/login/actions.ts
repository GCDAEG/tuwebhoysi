'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
      console.error(error, "Ocurrio un error al intentar iniciar sesion.");
      throw { error: error.status, message: "Ocurrio un error al intentar iniciar sesion." };
    }

    revalidatePath('/', 'layout');

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const role = user?.app_metadata?.role;

    if (role === 'admin') redirect('/admin/dashboard');
    if (role === 'client') redirect('/client/dashboard');
    redirect('/account');
  
  
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}