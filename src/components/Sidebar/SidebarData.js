import HomeIcon from '@mui/icons-material/Home';
import RecommendIcon from '@mui/icons-material/Recommend';
import MenuIcon from '@mui/icons-material/Menu';
import PoolIcon from '@mui/icons-material/Pool';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SourceIcon from '@mui/icons-material/Source';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import EventIcon from '@mui/icons-material/Event';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PaidIcon from '@mui/icons-material/Paid';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />
    },
    {
        title: "Recommendations",
        icon: <RecommendIcon />
    },
    {
        title: "Resources",
        icon: <MenuIcon />
    },
    {
        title: "Pools",
        icon: <PoolIcon />
    },
    {
        title: "Expenses",
        icon: <PaidIcon />
    }
]

export const AdminSettings = [
    {
        title: "User Management",
        icon: <ManageAccountsIcon />
    },
    {
        title: "Data Sources",
        icon: <SourceIcon />
    },
    {
        title: "Integrations",
        icon: <IntegrationInstructionsIcon />
    },
    {
        title: "Events",
        icon: <EventIcon />
    },
    {
        title: "Settings",
        icon: <SettingsApplicationsIcon />
    }
]