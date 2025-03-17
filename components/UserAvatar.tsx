"use client";

import { auth } from '@/auth';
import SignIn from '@/components/SignIn';
import { cn } from "@/utils/utils";

interface Props {
  className?: string;
}

const UserAvatar = async (props: Props) => {
  const session = await auth();

  const { className } = props;
  return (
    <div className={cn(`w-8 h-8 overflow-clip rounded-full`, className)}>

      <SignIn />
    </div>
  );
};

export default UserAvatar;
