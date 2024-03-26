

import UserAvatar from "./UserAvatar";
import { cn } from "@/utils/utils";

const UserBanner = () => {
  return (
    <div className="relative w-auto h-auto px-1 shrink-0">
      <div
        className={cn(
          "py-1 my-1 w-auto flex flex-row justify-start items-center rounded-2xl border border-transparent text-gray-800 dark:text-gray-300",
          "px-3",
        )}
      >
        <UserAvatar className="shadow shrink-0" avatarUrl={"/images/profile.jpg"} />
      </div>
    </div>
  );
};

export default UserBanner;
