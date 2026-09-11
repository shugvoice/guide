// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    // '127.0.0.1' is IPv4 only; true listens on all interfaces (IPv4+IPv6, reachable from the LAN)
    host: '127.0.0.1',
  },
});
