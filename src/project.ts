import {makeProject} from '@motion-canvas/core/lib';

import example from './scenes/example?scene';
import positioning from './scenes/positioning?scene';

export default makeProject({
  scenes: [example, positioning],
  background: '#141414',
});
