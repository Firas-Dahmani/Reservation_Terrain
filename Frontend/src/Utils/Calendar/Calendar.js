import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useRef } from 'react';
import EventModal from './EventModal';
import axios from "axios"
import moment from 'moment';
import AlertCompnenet from './../../Error/Alert/AlertCompnenet';
import './CalendarStyle.css'

function Calendar({UserId, OwnerId}) {
    const [modalOpen, setModalOpen] = useState(false);
    const calendarRef = useRef(null)
    const [events, setEvents] = useState([])
    const [ErrorMessage, setErrorMessage] = useState("");

    const onEventAded = (event) => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        })
    }

    async function handleEventAdd (data) {
        const postResponse = await axios.post('http://localhost:5000/user/createEvent', {
            userid:UserId,
            ownerid:OwnerId,
            start: moment(data.event.start).toDate(),
            end: moment(data.event.end).toDate(),
            title: data.event.title
        })

        if(postResponse.data.status === 'FAILED'){
            setErrorMessage(postResponse.data.message)
        } 

    }

    async function handleDateSet (data) {
        const response = await axios.post('http://localhost:5000/user/getEvent?start='+
        moment(data.start).toISOString() + '&end='+ moment(data.end).toISOString(), 
        {
            userid:UserId,
            ownerid:OwnerId
        })

        setEvents(response.data.event)
    }


  return (
    <section className='rootCalendar'>
        {ErrorMessage && <AlertCompnenet error={ErrorMessage}/>}
        <button className='btn' onClick={()=> setModalOpen(true)}>ADD EVENT</button>
        <div style={{position:'relative', zIndex: 0}} className='scheduler'>
            <FullCalendar
                ref={calendarRef}
                events={events}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                  }}
                initialView="dayGridMonth"
                eventAdd={event => handleEventAdd(event)}
                datesSet={(date)=> handleDateSet(date)}
            />
        </div>

        <EventModal isOpen={modalOpen} onClose= {()=> setModalOpen(false)} onEventAded={event => onEventAded(event)} UserId={UserId} OwnerId={OwnerId}/>
    </section>
  )
}

export default Calendar