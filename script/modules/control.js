const modalControl = () => {
  const body = document.body;
  const button = document.querySelector('.header__button');
  const buttonClose = document.querySelector('.modal__close');
  const overlay = document.querySelector('.overlay');
  const modal = document.querySelector('.modal');

  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  const openModal = () => {
    body.classList.add('show-modal');
    body.style.paddingRight = `${scrollBarWidth}px`;
    overlay.classList.add('overlay_visible');
    modal.classList.add('modal_visible');
  }

  const closeModal = () => {
    body.classList.remove('show-modal');
    body.style.paddingRight = `0px`;
    overlay.classList.remove('overlay_visible');
    modal.classList.remove('modal_visible');
  }

  button.addEventListener('click', e => {
    openModal();
  });

  buttonClose.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.modal__close')) {
      closeModal();
    }
  });

  overlay.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.overlay')) {
      closeModal();
    }
  });
};

const accordionControl = () => {
  const buttons = document.querySelectorAll('.questions__button');
  const questionsItem = document.querySelectorAll('.questions__item');
  const questionsInformation = document.querySelectorAll('.questions__information');

  let heightWrapper = 0;

  questionsInformation.forEach(elem => {
    if (heightWrapper < elem.scrollHeight) {
      heightWrapper = elem.scrollHeight;
    }
  });

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      for(let i = 0; i < questionsItem.length; i += 1) {
        if (index === i) {
          questionsInformation[i].style.height =
            questionsItem[i].classList.contains('questions__item_active') ?
              '' : `${heightWrapper}px`;
          questionsItem[i].classList.toggle('questions__item_active');
        } else {
          questionsItem[i].classList.remove('questions__item_active');
          questionsInformation[i].style.height = '';
        }
      }
    });
  });
};

const duration = 800;
let requestId = NaN;
const buttonAnimation = (duration, callback) => {
  let buttonAnimmation = NaN;

  requestId = requestAnimationFrame(function step(timestamp) {
    buttonAnimmation ||= timestamp;

    const progress = (timestamp - buttonAnimmation) / duration;

    callback(progress);
    if (progress < 1) {
      requestId = requestAnimationFrame(step);
    }
  });
};

const menuControl = () => {
  const buttonMenu = document.querySelector('.menu-button');
  const navigation = document.querySelector('.navigation__list');
  const linksMenu = document.querySelectorAll('.navigation__link');
  const listMenu = document.querySelector('.navigation__list');

  buttonMenu.addEventListener('click', e => {
    buttonMenu.classList.toggle('menu-button_active');
    buttonAnimation(duration, (progress) => {
      const left = progress * document.documentElement.clientWidth;
      if (left > window.innerWidth) {
        listMenu.style.transform = `translateX(100%)`;
      } else {
        listMenu.style.transform = `translateX(${left}px)`;
      }
    });
    navigation.classList.toggle('navigation__list_active');
  });

  linksMenu.forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('navigation__list_active');
      buttonMenu.classList.toggle('menu-button_active');
    });
  });
}

export default {
  modalControl,
  accordionControl,
  menuControl
}
