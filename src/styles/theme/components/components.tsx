import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

import { MuiButton } from './button';
import { MuiStack } from './stack';
import { MuiAvatar } from './avatar';


export const components = {
  MuiAvatar,
  MuiButton,
  MuiStack,
} satisfies Components<Theme>;