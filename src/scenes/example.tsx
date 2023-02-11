import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Rect} from '@motion-canvas/2d/lib/components';
import {Node} from '@motion-canvas/2d/lib/components';
import {Text} from '@motion-canvas/2d/lib/components';
import {createRef} from '@motion-canvas/core/lib/utils';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {slideTransition} from '@motion-canvas/core/lib/transitions'
import { Direction } from '@motion-canvas/core/lib/types';

export default makeScene2D(function* (view) {
  const myNode = createRef<Node>();
  const titleText = createRef<Text>();

  let squareSide = 240;

  let numberOfBoxes = 5
  let title = "Insertion sort!";

  view.add(
    <>
      <Node ref={myNode} position = {[0, 0]}>      
        <Rect
          width={squareSide}
          height={squareSide}
          stroke="white"
          lineWidth={2}
          position = {[-squareSide*2, 0]}
          lineCap="square">
          <Text fill="ffffff" text="1" fontFamily={"Consolas"}/>
        </Rect>
        <Rect
          width={squareSide}
          height={squareSide}
          stroke="white"
          lineWidth={2}
          lineCap="square"
          position={[-squareSide, 0]}>
          <Text fill="ffffff" text="2" fontFamily={"Consolas"}/>
        </Rect>
        <Rect
          width={squareSide}
          height={squareSide}
          stroke="white"
          lineWidth={2}
          lineCap="square">
          <Text fill="ffffff" text="3" fontFamily={"Consolas"}/>
        </Rect>
        <Rect
          width={squareSide}
          height={squareSide}
          stroke="white"
          lineWidth={2}
          lineCap="square"
          position={[squareSide, 0]}>
          <Text fill="ffffff" text="4" fontFamily={"Consolas"}/>
        </Rect>
        <Rect
          width={squareSide}
          height={squareSide}
          stroke="white"
          lineWidth={2}
          lineCap="square"
          position={[squareSide*2, 0]}>
          <Text fill="ffffff" text="5" fontFamily={"Consolas"}/>
        </Rect>
      </Node>

      <Text
      ref={titleText}
      text={title}
      fontFamily={"Consolas"}
      y={-300}
      fill="#ffffff"
      />
    </>
  );

  yield* slideTransition(Direction.Top, 1.5);
  yield* waitFor(0.25);

  yield* all(
    myNode().position.x(300, 0.5).to(-300, 1).to(0, 0.5),
    titleText().position.x(-150, 0.5).to(150, 1).to(0, 0.5),
    titleText().rotation(-45, 0.5).to(45, 1).to(0, 0.5),
    myNode().rotation(-45, 0.5).to(45, 1).to(0, 0.5),
  );
});