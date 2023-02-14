import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Rect, Node, Text} from '@motion-canvas/2d/lib/components';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {slideTransition} from '@motion-canvas/core/lib/transitions'
import { Direction } from '@motion-canvas/core/lib/types';

export default makeScene2D(function* (view) {
  const myNode = createRef<Node>();
  const titleText = createRef<Text>();
  const complexityLabel = createRef<Text>();

  let squareSide = 240;
  let title = "INSERTION SORT";

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
          <Text fill="ffffff" text="1" fontFamily={"JetBrains Mono"}/>
        </Rect>
        <Rect
          width={squareSide}
          height={squareSide}
          stroke="white"
          lineWidth={2}
          lineCap="square"
          position={[-squareSide, 0]}>
          <Text fill="ffffff" text="2" fontFamily={"JetBrains Mono"}/>
        </Rect>
        <Rect
          width={squareSide}
          height={squareSide}
          stroke="white"
          lineWidth={2}
          lineCap="square">
          <Text fill="ffffff" text="3" fontFamily={"JetBrains Mono"}/>
        </Rect>
        <Rect
          width={squareSide}
          height={squareSide}
          stroke="white"
          lineWidth={2}
          lineCap="square"
          position={[squareSide, 0]}>
          <Text fill="ffffff" text="4" fontFamily={"JetBrains Mono"}/>
        </Rect>
        <Rect
          width={squareSide}
          height={squareSide}
          stroke="white"
          lineWidth={2}
          lineCap="square"
          position={[squareSide*2, 0]}>
          <Text fill="ffffff" text="5" fontFamily={"JetBrains Mono"}/>
        </Rect>
        <Text 
        ref={complexityLabel} 
        opacity={0} 
        text="worst case: Ω(n²)" 
        fontFamily={"JetBrains Mono"}
        fontSize={36}
        fill="#ffffff"
        y={-300}

        />
      </Node>

      <Text
      ref={titleText}
      text={title}
      fontFamily={"JetBrains Mono"}
      fontSize={48}
      y={-300}
      fill="#ffffff"
      />
    </>
  );

  yield* slideTransition(Direction.Top, 1.5);
  yield* waitFor(0.25);
  yield* all(
    titleText().position.y(-400, 0.8), 
    complexityLabel().position.y(-300, 1),
    complexityLabel().opacity(1, 1))


});