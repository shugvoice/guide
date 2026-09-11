import links from './links.json';
import type { NavConfig } from '../types';

/** The single data export: the page reads its nav config from here */
export const nav = links satisfies NavConfig;
