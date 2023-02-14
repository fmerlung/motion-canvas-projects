import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Rect, Node, Text} from '@motion-canvas/2d/lib/components';
import {createRef} from '@motion-canvas/core/lib/utils';
import {all, waitFor, loop} from '@motion-canvas/core/lib/flow';
import {slideTransition, zoomInTransition, zoomOutTransition} from '@motion-canvas/core/lib/transitions'
import {Direction, Rect as rectType} from '@motion-canvas/core/lib/types';

export default makeScene2D(function* (view) {
  const mainNode = createRef<Node>();
  const textNodes = createRef<Node>();
  const boxNodes = createRef<Node>();
  const titleText = createRef<Text>();
  const complexityLabel = createRef<Text>();
  const box1 = createRef<Rect>();
  const box2 = createRef<Rect>();
  const box3 = createRef<Rect>();
  const box4 = createRef<Rect>();
  const box5 = createRef<Rect>();

  let squareSide = 240;
  let title = "INSERTION SORT";

  view.add(
    <>
      <Node ref={mainNode} position={[0, 100]}>      
        <Node ref={boxNodes}>
          <Rect ref={box1}
            width={squareSide}
            height={squareSide}
            stroke="white"
            lineWidth={2}
            position = {[-squareSide*2, 0]}
            lineCap="square">
            <Text fill="ffffff" text="1" fontFamily={"JetBrains Mono"}/>
          </Rect>
          <Rect ref={box2}
            width={squareSide}
            height={squareSide}
            stroke="white"
            lineWidth={2}
            lineCap="square"
            position={[-squareSide, 0]}>
            <Text fill="ffffff" text="2" fontFamily={"JetBrains Mono"}/>
          </Rect>
          <Rect ref={box3}
            width={squareSide}
            height={squareSide}
            stroke="white"
            lineWidth={2}
            lineCap="square">
            <Text fill="ffffff" text="3" fontFamily={"JetBrains Mono"}/>
          </Rect>
          <Rect ref={box4}
            width={squareSide}
            height={squareSide}
            stroke="white"
            lineWidth={2}
            lineCap="square"
            position={[squareSide, 0]}>
            <Text fill="ffffff" text="4" fontFamily={"JetBrains Mono"}/>
          </Rect>
          <Rect ref={box5}
            width={squareSide}
            height={squareSide}
            stroke="white"
            lineWidth={2}
            lineCap="square"
            position={[squareSide*2, 0]}>
            <Text fill="ffffff" text="5" fontFamily={"JetBrains Mono"}/>
          </Rect>
        </Node>
        <Node ref={textNodes}>
          <Text
          ref={titleText}
          text={title}
          fontFamily={"JetBrains Mono"}
          fontSize={48}
          y={-400}
          fill="#ffffff" 
          />
          <Text 
          ref={complexityLabel} 
          opacity={0} 
          text="worst case: Ω(n²)" 
          fontFamily={"JetBrains Mono"}
          fontSize={36}
          y={-400} 
          fill="#ffffff"
          />
        </Node>
      </Node>

    </>
  );

  yield* slideTransition(Direction.Top, 1.5);
  yield* waitFor(0.25);
  yield* all(
    titleText().position.y(-400, 0.8), 
    complexityLabel().position.y(-300, 1),
    complexityLabel().opacity(1, 1));

  const swapSpeed = 0.3;
  const boxSwaps = [
    [box1, box2],
    [box1, box3],
    [box1, box4],
    [box1, box5]
  ]
  let currentSwap = 0;

  yield* loop(boxSwaps.length, 
    function* (){
      yield* all(
        boxSwaps[currentSwap][0]().position.y(boxSwaps[currentSwap][0]().position.y() + squareSide / 2, swapSpeed),
        boxSwaps[currentSwap][1]().position.y(boxSwaps[currentSwap][1]().position.y() - squareSide / 2, swapSpeed)
      )
      yield* all(
        boxSwaps[currentSwap][0]().position.x(boxSwaps[currentSwap][1]().position.x(), swapSpeed),
        boxSwaps[currentSwap][1]().position.x(boxSwaps[currentSwap][0]().position.x(), swapSpeed)
      )
      yield* all(
        boxSwaps[currentSwap][0]().position.y(boxSwaps[currentSwap][0]().position.y() - squareSide / 2, swapSpeed),
        boxSwaps[currentSwap][1]().position.y(boxSwaps[currentSwap][1]().position.y() + squareSide / 2, swapSpeed)
      )
      currentSwap++;
    }
  );

  yield* waitFor(0.5);
  yield* all(
    textNodes().position.y(-1500, 1.5),
    boxNodes().position.y(1500, 1.5)
  );

});