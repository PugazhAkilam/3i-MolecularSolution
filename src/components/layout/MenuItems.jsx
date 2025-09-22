// import FlightIcon from '@mui/icons-material/Flight';
// import HotelIcon from '@mui/icons-material/Hotel';
// import LuggageIcon from '@mui/icons-material/Luggage';
// import VisaIcon from '@mui/icons-material/DocumentScanner';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';
// import TableChartIcon from '@mui/icons-material/TableChart';
import { GoHomeFill } from "react-icons/go";
import { FaCalendarPlus } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { PiClockCounterClockwiseFill } from "react-icons/pi";


export const getMenuItems = (user,loading) => {

    // console.log("user",user);
    
   


      return [

    { text: 'Dashboard', icon: <GoHomeFill size={28}/>, path: '/admin' },
    { text: 'Appointment', icon: <FaCalendarPlus size={26}/>, path: '/admin/appointment' },
    { text: 'New Patient', icon: <MdPersonAdd size={28}/>, path: '/admin/newpatient' },
     { text: 'Registered Patient', icon: <MdPeopleAlt size={28}/>, path: '/admin/regpatient' },
     { text: 'Visitor History', icon: <PiClockCounterClockwiseFill size={28}/>, path: '/admin/visitorhistory' },
    // { text: 'consultation', icon: <BiSolidBarChartSquare size={32}/>, path: '/admin/consultation' },
      ];
    

  };