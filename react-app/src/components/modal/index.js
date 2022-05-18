import Modal from '@mui/material/Modal';
import { useState } from 'react';
import './modal.css'

const ModalThing = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className='modal-container'>
      <button onClick={handleOpen}>{props.name}</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='modalThing'
      >
        {props.children}
      </Modal>
    </div>
  )
}
export default ModalThing
