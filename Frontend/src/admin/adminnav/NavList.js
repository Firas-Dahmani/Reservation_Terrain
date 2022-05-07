import Person from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';


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
    link:'/profile'
  },
  {
    icon: LocationCityIcon,
    desc: 'VILLE',
    secondDesc: 'Message from andi',
    badge: 0,
    link:'/ville'
  },
  {
    icon: CalendarViewWeekIcon,
    desc: 'STADE',
    secondDesc: '',
    badge: 0,
    subList: [],
    link:'/stade'
  },
  {
    icon: PersonAddAltIcon,
    desc: 'ADD OWNER',
    secondDesc: '',
    badge: 0,
    subList: [],
    link:'/addowner'
  }
  
];

export default NavbarList;