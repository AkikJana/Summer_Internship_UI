import React from "react";
import Button from '@material-ui/core/Button';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
//onClick={openNav}
export default function ProfessorBtn(props) {
  return (
    <Button autoid="professor-button" variant="contained" className="profBtn"  component="span">
      PROFESSOR
    </Button>
  );
}