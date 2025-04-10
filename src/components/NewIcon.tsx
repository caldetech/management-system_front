import React, { type JSX } from "react";
import {
  StickyNote,
  Users,
  Drill,
  Package,
  WalletMinimal,
  HardHat,
  Puzzle,
} from "lucide-react";

const routeIcons: Record<string, JSX.Element> = {
  StickyNote: <StickyNote />,
  Users: <Users />,
  Drill: <Drill />,
  Package: <Package />,
  WalletMinimal: <WalletMinimal />,
  HardHat: <HardHat />,
  Puzzle: <Puzzle />,
};

interface IconProps {
  iconName: keyof typeof routeIcons;
}

const NewIcon: React.FC<IconProps> = ({ iconName }) => {
  return routeIcons[iconName] || null;
};

export default NewIcon;
