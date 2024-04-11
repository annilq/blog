'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignIn() {
  const session = useSession()
  if (session.data?.user) {
    return session.data?.user.name
  }
  return (
    <div className="mt-3 space-y-1">
      <button
        onClick={() => signIn('github')}
        className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      >
        Sign in
      </button>
    </div>
  );
}