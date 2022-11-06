import control from './modules/control.js';

const {
  modalControl,
  accordionControl,
  menuControl
} = control;

const init = () => {
  modalControl();
  accordionControl();
  menuControl();
}

init();
