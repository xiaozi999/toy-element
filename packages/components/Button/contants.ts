import type {InjectionKey} from 'vue';
import type { ButtonGroupProps } from './types';

export const BUTTON_GROUP_CTX_KEY:InjectionKey<ButtonGroupProps> = Symbol('BUTTON_GROUP_CTX_KEY')