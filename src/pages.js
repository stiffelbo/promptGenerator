import Presets from './pages/Presets/Presets';
import Prompts from './pages/Prompts/Prompts';

export const Pages = [
  { label: 'Presets', link: '/presets', component: Presets },
  { label: 'Prompts', link: '/prompts', component: Prompts },
];

export const getNav = () => {
    return Pages.map(({ label, link }) => ({ label, link }));
  };