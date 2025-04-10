import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProfile } from "@/http/get-profile";
import { LogOut } from "lucide-react";

export default async function UserMenu({ slug }: { slug: string }) {
  const user = await getProfile();

  return (
    <div className="hidden sm:flex ms-4 absolute right-0 z-11 sm:static">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-8 rounded-full">
            <AvatarImage
              src={`/${slug}/images/avatars/1.png`}
              alt="shadcn ui kit"
            />
            <AvatarFallback className="rounded-lg">TB</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={`/${slug}/images/avatars/1.png`}
                  alt="shadcn ui kit"
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          {/* <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles className="me-2 size-4" />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck className="me-2 size-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="me-2 size-4" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="me-2 size-4" />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup> */}

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <LogOut className="me-2 size-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
