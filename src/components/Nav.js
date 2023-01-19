import { Component } from 'react';
import { themes, ThemeContext } from '../theme-context';

function Link({href, children}) {
  function handleClick(e) {
    e.preventDefault();
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.navbar').classList.remove('navbar-expanded');
    document.querySelector('body').style.overflowY = '';
  }
  
  return (
    <li className="nav-item">
      {href.startsWith('#') ?
        <a className="nav-link" href={href} onClick={handleClick}>{children}</a> :
        <a className="nav-link" href={href} target="_blank" rel="noreferrer">{children}</a>
      }
    </li>
  );
}

class Nav extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (document.documentElement.scrollTop > 0) {
      document.querySelector('.navbar').classList.add('navbar-opaque');
    } else {
      document.querySelector('.navbar').classList.remove('navbar-opaque');
    }
  }

  toggleNav(e) {
    e.preventDefault();
    document.querySelector('.navbar').classList.toggle('navbar-expanded');
    document.querySelector('body').style.overflowY = document.querySelector('.navbar').classList.contains('.navbar-expanded') ? 'hidden' : '';
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {({theme, toggleTheme}) => (
          <nav className="navbar navbar-expand-lg">
            <div className="container">
              <a className="navbar-brand" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, left: 0, behavior: 'smooth'}) }} href="/">
                <img src={theme === themes.light ? './favicon.png' : './favicon-white.png' } width="30" height="30" className="d-inline-block align-top" alt="home" />
              </a>
              <button className="nav-toggle" onClick={this.toggleNav} aria-label="menu">
                <span className="icon"></span>
              </button>
              <div className="pull-right collapse navbar-collapse d-flex flex-row-reverse">
                <ul className="navbar-nav">
                  <Link href="#about">About</Link>
                  <Link href="#projects">Projects</Link>
                  <Link href="Resume.pdf">Resume</Link>
                  <li className="nav-item theme-toggle">
                    <span className={'fa fa-lg ' + (theme === themes.light ? 'fa-sun' : 'fa-moon')} onClick={toggleTheme}></span>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Nav;