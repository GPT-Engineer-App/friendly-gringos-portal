import { Home, User, Gift, PlaySquare } from "lucide-react";
import Index from "./pages/Index.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Promotions from "./pages/Promotions.jsx";
import CardGame from "./pages/CardGame.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Promotions",
    to: "/promotions",
    icon: <Gift className="h-4 w-4" />,
    page: <Promotions />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: <User className="h-4 w-4" />,
    page: <UserProfile />,
  },
  {
    title: "Card Game",
    to: "/card-game",
    icon: <PlaySquare className="h-4 w-4" />,
    page: <CardGame />,
  },
];
