const modalControl = () => {
  const body = document.body;
  const buttons = document.querySelectorAll('.header__button');
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

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        openModal();
    });
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

const duration = 600;
let requestId = NaN;

const startAnimation = (duration, callback) => {
  let startAnimation = NaN;

  requestId = requestAnimationFrame(function step(timestamp) {
    startAnimation ||= timestamp;

    const progress = (timestamp - startAnimation) / duration;

    callback(progress);
    if (progress < 1) {
      requestId = requestAnimationFrame(step);
    }
  });
};

const menuControl = () => {
  const overlay = document.querySelector('.overlay');
  const buttonMenu = document.querySelector('.menu-button');
  const navigation = document.querySelector('.navigation__list');
  const linksMenu = document.querySelectorAll('.navigation__link');
  const button = document.querySelector('.header__button_nav');

  const classControl = () => {
    buttonMenu.classList.toggle('menu-button_active');
    navigation.classList.toggle('navigation__list_active');
  }

  buttonMenu.addEventListener('click', () => {
    classControl();
    overlay.classList.toggle('overlay_visible');
    startAnimation(duration, (progress) => {
      const left = progress * document.documentElement.clientWidth;
      if (left > window.innerWidth) {
        navigation.style.transform = `translateX(100%)`;
      } else {
        navigation.style.transform = `translateX(${left}px)`;
      }
    });
  });

  linksMenu.forEach((link) => {
    link.addEventListener('click', () => {
      classControl();
      overlay.classList.remove('overlay_visible');
    });
  });

  button.addEventListener('click', e => {
    classControl();
  });

  overlay.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.overlay')) {
      classControl();
      overlay.classList.remove('overlay_visible');
    }
  });
};

export default {
  modalControl,
  accordionControl,
  menuControl,
}
