import Modal from 'react-modal';
import { useState } from 'react';
import Datetime from 'react-datetime';

function EventModal({isOpen, onClose, onEventAded}) {
    const [title, setTitle] = useState("")
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())

    const onSubmit = (event) => {
        event.preventDefault()

        onEventAded({
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
        >
        <form onSubmit={onSubmit} style={{overflow:'visible'}}>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          <div>
                <label >Start Date</label>
                <Datetime value={start} onChange= {date => setStart(date)}/>
          </div>
          <div>
                <label >End Date</label>
                <Datetime value={end} onChange= {date => setEnd(date)}/>
          </div>

          <button type="submit">Add Event</button>
        </form>
      </Modal>
    </div>
  )
}

export default EventModal