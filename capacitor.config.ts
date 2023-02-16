import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.guayoyo.palcarro',
  appName: 'Pal Carro',
  webDir: 'www',
  bundledWebRuntime: true,
  server: {
    cleartext: true,
    url: 'http://192.168.251.126:8101',
  },
};

export default config;
