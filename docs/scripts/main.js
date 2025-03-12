'use strict';

document.getElementById('open-menu').addEventListener('click', OpenMenu);
document.getElementById('close-menu').addEventListener('click', CloseMenu);
function OpenMenu() {
  document.getElementById('overlay').classList.add('overlay_active');
  document.getElementById('menu').classList.add('mobile-menu_active');
}
function CloseMenu() {
  document.getElementById('overlay').classList.remove('overlay_active');
  document.getElementById('menu').classList.remove('mobile-menu_active');
}