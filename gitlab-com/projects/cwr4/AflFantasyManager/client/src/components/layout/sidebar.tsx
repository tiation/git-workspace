import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home,
  BarChart2,
  List,
  Users,
  Settings,
  FileBarChart,
  Activity
} from "lucide-react";

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const NavItem = ({ href, icon, label, isActive }: NavItemProps) => {
  return (
    <Link href={href}>
      <div className={cn(
        "flex items-center px-4 py-3 text-white hover:bg-primary-light cursor-pointer",
        isActive && "bg-primary-light"
      )}>
        <div className="h-6 w-6 sidebar-icon">
          {icon}
        </div>
        <span className="ml-3 hidden sm:block">{label}</span>
      </div>
    </Link>
  );
};

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-16 sm:w-64 bg-primary flex flex-col">
      {/* Logo and App Title */}
      <div className="flex items-center p-4 text-white">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <span className="ml-3 text-lg font-semibold hidden sm:block">AFL Fantasy</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 pt-2">
        <NavItem 
          href="/" 
          icon={<Home className="h-6 w-6" />} 
          label="Dashboard" 
          isActive={location === "/"} 
        />
        <NavItem 
          href="/lineup" 
          icon={<List className="h-6 w-6" />} 
          label="Lineup" 
          isActive={location === "/lineup"} 
        />
        <NavItem 
          href="/stats" 
          icon={<FileBarChart className="h-6 w-6" />} 
          label="Statistics" 
          isActive={location === "/stats"} 
        />
        <NavItem 
          href="/leagues" 
          icon={<Users className="h-6 w-6" />} 
          label="Leagues" 
          isActive={location === "/leagues"} 
        />
        <NavItem 
          href="/tools" 
          icon={<Settings className="h-6 w-6" />} 
          label="Tools" 
          isActive={location === "/tools"} 
        />
      </nav>
    </div>
  );
}
