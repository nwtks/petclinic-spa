import createEmitter from '@nwtks/temi';
import createRouter from '@nwtks/hashedpath';
import createScheduler from '@nwtks/rafsch';
import patch from '@nwtks/patch2dom';
import start from './app';

const createRender = (entry, emit) => (view, state) =>
  scheduler(() => patch(entry, view({ state: state, emit: emit })));

const emitter = createEmitter();
const router = createRouter();
const scheduler = createScheduler();
const render = createRender(document.getElementById('app'), emitter.emit);
start(render, emitter, router);
