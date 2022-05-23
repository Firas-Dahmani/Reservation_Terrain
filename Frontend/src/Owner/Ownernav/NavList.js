import Person from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';


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
  
];

export default NavbarList;