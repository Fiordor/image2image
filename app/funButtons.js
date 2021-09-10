exports.openNavbar = () => {
  return (event) => {
    const NAVBAR_OPEN = 'navbar-open';
    const BACKGROUND_OPEN = 'background-navbar-open';
    const navbar = document.getElementsByClassName('navbar')[0].classList;
    const background = document.getElementsByClassName('background-navbar')[0].classList;
  
    if (navbar.contains(NAVBAR_OPEN)) {
      navbar.remove(NAVBAR_OPEN);
      background.remove(BACKGROUND_OPEN);
    } else {
      navbar.add(NAVBAR_OPEN);
      background.add(BACKGROUND_OPEN);
    }
  }
}