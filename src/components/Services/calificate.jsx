import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input, Rating } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Calificate({handleCalification, requestId}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const [text,setText] = React.useState('')
  const handleConfirm = () =>{
    handleCalification(value,text,requestId)
  }
  return (
    <div>
      <Button onClick={handleOpen}>Calificar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Calificar al prestador
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <p>Comentarios:</p>
          <Input style={{width:'100%'}} type={"text"} onChange={(e)=>setText(e.target.value)}/>
      <Button onClick={handleConfirm}>Enviar</Button>
        </Box>
      </Modal>
    </div>
  );
}