import Modal from 'react-modal';
import { useState } from 'react';
import Datetime from 'react-datetime';
import './CalendarStyle.css'

function EventModal({isOpen, onClose, onEventAded,UserId, OwnerId}) {
    const [title, setTitle] = useState("")
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())

    const onSubmit = (event) => {
        event.preventDefault()

        onEventAded({
            userid:UserId,
            ownerid:OwnerId,
            title,
            start,
            end
        })

        onClose()
    }

  return (
    <div>
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            style={{
              overlay: {
                zIndex: 1020,
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(255, 255, 255, 0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              content: {
                background: 'white',
                width: '50rem',
                maxWidth: 'calc(100vw - 2rem)',
                maxHeight: 'calc(100vh - 2rem)',
                border: '1px solid #ccc',
                borderRadius: '0.3rem',
              }}}
        >
        <form onSubmit={onSubmit} style={{overflow:'visible', width:"100%"}}>
          <div>
          <label >Title</label>
            <input type="text" className="form-control col mb-3" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
                <label >Start Date</label>
                <Datetime className="form-control mb-3" value={start} onChange= {date => setStart(date)}/>
          </div>
          <div>
                <label >End Date</label>
                <Datetime className="form-control mb-3" value={end} onChange= {date => setEnd(date)}/>
          </div>

          <button type="submit" className='btn'>Add Event</button>
        </form>
      </Modal>
    </div>
  )
}

export default EventModal