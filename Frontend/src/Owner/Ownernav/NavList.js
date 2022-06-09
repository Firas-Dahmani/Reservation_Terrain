import Person from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';



const NavbarList = [
  {
    /* icon: Search, */
    desc: 'Search',
    secondDesc: '',
    badge: 0,
    subList: [],
    link:''
  },
  {
    icon: HomeIcon,
    desc: 'HOME',
    secondDesc: '',
    badge: 0,
    subList: [],
    link:'/'
  },
  {
    icon: Person,
    desc: 'PROFILE',
    secondDesc: '',
    badge: 0,
    subList: [],
    link:'/ownerprofile'
  },
  {
    icon: CalendarViewWeekIcon,
    desc: 'STADE',
    secondDesc: '',
    badge: 0,
    subList: [],
    link:'/ownerstade'
  },
  {
    icon: CircleNotificationsIcon,
    desc: 'Reservation',
    secondDesc: '',
    badge: 0,
    subList: [],
    link:'/showreservation'
  }
  
];

export default NavbarList;