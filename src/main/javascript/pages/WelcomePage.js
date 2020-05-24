/* eslint-disable react/jsx-key */
import h from '@nwtks/vnoc';
import App from '../fragments/App';

const WelcomePage = (props) => (
  <App path='#/home'>
    <section>
      <h2>Welcome</h2>
      <div class='text-center'>
        <img class='img-fluid' src='doubutsu_byouin.png' />
      </div>
    </section>
  </App>
);

export default WelcomePage;
