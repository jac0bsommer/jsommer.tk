import React, { Component } from 'react';
import Typist from 'react-typist';
import { Redirect } from 'react-router-dom';
import { NavToggle, Link, AnchorLink } from './Nav';
import { parallax } from './Parallax';
import Footer from './Footer';
import me from '../images/me.jpg';
import '../css/animate.min.css';

function SendBtn() {
  function handleClick(e) {
    if(document.querySelector('input[type=text]').value.length > 0 && document.querySelector('input[type=email]').value.length > 0 && document.querySelector('input[type=email]').value.includes("@")) document.querySelector('.send-btn').classList.add('sending');
  }

  return <button type="submit" className="send-btn button btn-red" onClick={handleClick}>Send <span className="fa fa-paper-plane"></span></button>;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.transition = this.transition.bind(this);
    this.state = { redirect: false }
  }

  componentDidMount() {
    document.title = 'Jacob Sommer';

    if (window.location.href.includes('?')) document.getElementById(window.location.href.split('?')[1]).scrollIntoView({ behavior: 'smooth' });

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.updateDimensions);

    this.arrow = document.querySelector('.fa-chevron-down');
    this.mainBanner = document.querySelector('.banner');
    this.resumeBanner = document.querySelector('.resume-bg');
    this.projectsBanner = document.querySelector('.projects-bg');
    this.profilePic = document.querySelector('.profile-picture');
    this.aboutH1 = document.querySelector('#about h1');
    this.aboutMeP = document.querySelector('#about-me-p');
    this.contactH1 = document.querySelector('#contact h1');
    this.form = document.querySelector('form');

    document.querySelector('.transition .icon').style.opacity = 0;
    document.querySelector('.transition').style.top = 'auto';
    document.querySelector('.transition').style.bottom = '-50px';
    document.querySelector('.transition').style.height = 0;

    parallax(this.mainBanner); // align banner on load
    this.arrow.style.opacity = document.documentElement.scrollTop > 0 ? 0 : 1;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    parallax(this.mainBanner);
    parallax(this.resumeBanner, -500, false);
    parallax(this.projectsBanner, -800, false);
  }

  handleScroll() {
    var scrollTop = document.documentElement.scrollTop;
    var scrollBottom = scrollTop + window.innerHeight;

    this.arrow.style.opacity = scrollTop > 0 ? 0 : 1;

    if (scrollBottom >= this.profilePic.offsetTop) this.profilePic.classList.add('animated', 'zoomIn');
    if (scrollBottom >= this.aboutH1.offsetTop) this.aboutH1.classList.add('animated', 'fadeInDown');
    if (scrollBottom >= this.aboutMeP.offsetTop) this.aboutMeP.classList.add('animated', 'fadeInLeft');
    if (scrollBottom >= this.contactH1.offsetTop) this.contactH1.classList.add('animated', 'fadeInDown');
    if (scrollBottom >= this.form.offsetTop) this.form.classList.add('animated', 'fadeInLeft');

    parallax(this.mainBanner);
    parallax(this.resumeBanner, -500, false);
    parallax(this.projectsBanner, -800, false);
  }

  transition(to) {
    setTimeout(() => { this.setState({ redirect: to }) }, 300);
  }

  render() {
    if (this.state.redirect) return <Redirect push to={this.state.redirect} />;

    return (
      <div>
        <NavToggle />
        <nav className="menu">
          <ul>
            <li>
              <AnchorLink>Home</AnchorLink>
            </li>
            <li>
              <AnchorLink to="#about">About Me</AnchorLink>
            </li>
            <li>
              <a href="Resume.pdf" target="_blank">Resume</a>
            </li>
            <li>
              <Link to="work-experience" transition={this.transition}>Work Experience</Link>
            </li>
            <li>
              <Link to="projects" transition={this.transition}>Projects</Link>
            </li>
            <li>
              <AnchorLink to="#contact">Contact</AnchorLink>
            </li>
          </ul>
        </nav>
        <header className="jumbotron banner home-bg">
          <h1>
            <Typist cursor={
              {
                show: true,
                blink: true,
                element: '',
                hideWhenDone: true,
                hideWhenDoneDelay: 100,
              }
            } stdTypingDelay={0} >
              <Typist.Delay ms={550} />
              <span>Hi. </span>
              <Typist.Delay ms={400} />
              I'm Jacob.
            </Typist>
          </h1>
          <AnchorLink to="#about" className="fas fa-chevron-down"></AnchorLink>
        </header>
        <section id="about" className="container">
          <div className="col-md-12">
            <div className="row">
              <img className="profile-picture center" src={me} />
            </div>
            <div className="row">
              <h1 className="center">About Me</h1>
              <div id="about-me-p">
                <p>Hello, I am Jacob, a student with a passion for technology. I plan to be a Software Developer. I am currently a sophomore in high school and I have been taking as many computer science related electives at my school as I can and plan to take more. I am eager to learn more about computers. I plan on taking AP Computer Science Applications next year (my junior year). I am interested in majoring in Computer Science in college. I am also a part of Dublin High School’s Engineering and Design Academy.</p>
                <p>I have been coding for five years. I am a full-stack developer. I know several different coding languages. I have experience with graphics design, animation, and video editing. I built my own computer two years ago and I built a computer for my brother last year. I am a Principal’s Honor Roll student with a 4.33 GPA. I am currently taking Honors Principles of Engineering and Honors Chemistry.</p>
                <p>I am innovative and always working on new projects individually. Some of the languages I know include Java, JavaScript, SQL, Python, and C#. I also have experience developing games. I have created a few websites. Last year I took the Computer Science/Software Engineering class at my school and I completed several projects in that course where I collaborated with other people to code a game or program. Some of my extracurricular activities include participating in the GameDev club, participating in the Enviro-Tech club, and playing soccer.</p>
                <p>Coding is one of my favorite activities. I am constantly exploring new languages and working on personal projects in my free time. Feel free to explore the rest of my website and/or contact me if you have any offers or requests. Thank you for visiting my portfolio.</p>
              </div>
            </div>
          </div>
        </section>
        <div className="jumbotron small-banner resume-bg">
          <div>
            <h2>Resume</h2>
            <a href="files/Resume.pdf" target="_blank" className="view-btn button btn-white">Click to View</a>
          </div>
        </div>
        <div className="slant">
          <div></div>
          <div></div>
        </div>
        <div className="jumbotron small-banner projects-bg">
          <div>
            <h2>Projects</h2>
            <Link to="projects" className="view-btn button btn-white" transition={this.transition}>Click to View</Link>
          </div>
        </div>
        <section id="contact" className="container flex-center">
          <h1>Contact</h1>
          <form className="flex-center" action="https://formspree.io/jacob.sommer@comcast.net" method="POST">
            <div>
              <input type="text" name="Name" placeholder="Your name" required />
              <span className="underline"></span>
            </div>
            <div>
              <input type="email" name="Mail" placeholder="Your email" required />
              <span className="underline"></span>
            </div>
            <div>
              <textarea name="Message" placeholder="Your message"></textarea>
              <span className="underline"></span>
            </div>
            <SendBtn />
          </form>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Home;