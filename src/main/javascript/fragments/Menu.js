/* eslint-disable react/jsx-key */
import h from '@nwtks/vnoc';

const MENUS = [
  { path: '#/home', label: 'Home', title: 'home page' },
  { path: '#/owners', label: 'Owners', title: 'find owners' },
  { path: '#/vets', label: 'Veterinarians', title: 'veterinarians' },
];

const Menu = (props) => {
  const { path } = props;
  return (
    <nav class='nav nav-pills nav-justified bg-secondary'>
      {MENUS.map((m) => (
        <a
          class={
            'nav-item nav-link text-white' + (path === m.path ? ' active' : '')
          }
          href={m.path}
          title={m.title}
        >
          {m.label}
        </a>
      ))}
    </nav>
  );
};

export default Menu;
