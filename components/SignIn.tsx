'use client';

import { Button, Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy';
import { LogInIcon, LogOutIcon, UserRound } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignIn() {
  const session = useSession()

  if (session.data?.user) {

    return (
      <Dropdown>
        <MenuButton variant="plain" ><UserRound /></MenuButton>
        <Menu>
          <MenuItem onClick={() => signOut()}><LogOutIcon /></MenuItem>
        </Menu>
      </Dropdown>
    )
  }
  return (
    <div className="space-y-1">
      <Button
        onClick={() => signIn('github')}
        variant="plain"
      >
        <LogInIcon />
      </Button>
    </div>
  );
}