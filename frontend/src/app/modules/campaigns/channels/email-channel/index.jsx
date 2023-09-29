import { Icon } from './icon';
import  Edit  from './edit';

export const step = {
    key: 'email',
    type: 'email_channel',
    title: 'Email',
    delay: 1,
    foreground: '#7F54B3',
    background: '#f7edf7',
    description: 'Wait some time before proceeding with the steps below',
    subtitle: (data)=> {
      console.log(data)
    },
    icon: Icon,
    edit: Edit,
};
