import Modal from '@mui/material/Modal';
import { useState } from 'react';

const ModalThing = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <button onClick={handleOpen}>Open modal</button>
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
