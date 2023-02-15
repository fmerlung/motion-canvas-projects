import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Rect, Node, Text, Line} from '@motion-canvas/2d/lib/components';
import {createRef} from '@motion-canvas/core/lib/utils';
import {all, waitFor, loop} from '@motion-canvas/core/lib/flow';
import {slideTransition} from '@motion-canvas/core/lib/transitions'
import {Direction} from '@motion-canvas/core/lib/types';

export default makeScene2D(function* (view) {
  const mainNode = createRef<Node>();
  const textNodes = createRef<Node>();
  const boxNodes = createRef<Node>();
  const titleText = createRef<Text>();
  const complexityText = createRef<Text>();
  const descriptionText1 = createRef<Text>();
  const descriptionText2 = createRef<Text>();
  const box1 = createRef<Rect>();
  const box2 = createRef<Rect>();
  const box3 = createRef<Rect>();
  const box4 = createRef<Rect>();
  const box5 = createRef<Rect>();
  const arrow = createRef<Line>();

  const squareSide = 240;
  const title = "INSERTION SORT";
  const description1 = "Compare with forward neighbour. If greater, swap positions, else set index to forward neighbour.";
  const description2 = "Swapped neighbour compares backwards and continues swapping backwards until no backward neighbour is greater.";
  const boxStyle = {
    width: squareSide,
    height: squareSide,
    stroke: "white",
    lineWidth: 4
  };


  view.add(
    <>
      <Node ref={mainNode} position={[0, 100]}>      
        <Node ref={boxNodes}>
          <Rect ref={box5} 
            {...boxStyle}
            position = {[-squareSide*2, 0]}>
            <Text fill="ffffff" text="5" fontFamily={"JetBrains Mono"}/>
          </Rect>
          <Rect ref={box4}
            {...boxStyle}
            position={[-squareSide, 0]}>
            <Text fill="ffffff" text="4" fontFamily={"JetBrains Mono"}/>
          </Rect>
          <Rect ref={box3}
            {...boxStyle}>
            <Text fill="ffffff" text="3" fontFamily={"JetBrains Mono"}/>
          </Rect>
          <Rect ref={box2}
            {...boxStyle}
            position={[squareSide, 0]}>
            <Text fill="ffffff" text="2" fontFamily={"JetBrains Mono"}/>
          </Rect>
          <Rect ref={box1}
            {...boxStyle}
            position={[squareSide*2, 0]}>
            <Text fill="ffffff" text="1" fontFamily={"JetBrains Mono"}/>
          </Rect>
          <Line ref={arrow}
          lineWidth={12}
          startArrow
          stroke= "#ffffff"
          points={[
          [0, 0],
          [70, 0],
        ]}
          rotation={90}
          position={[box5().position.x(), squareSide + 20]}
          lineCap={'square'}
          />
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
          ref={complexityText} 
          opacity={0} 
          text="worst case: Ω(n²)" 
          fontFamily={"JetBrains Mono"}
          fontSize={36}
          y={-400} 
          fill="#ffffff"
          />
          <Text 
          ref={descriptionText1} 
          opacity={0} 
          text= {description1} 
          fontFamily={"JetBrains Mono"}
          fontSize={24}
          y={-300} 
          fill="#ffffff"
          />
          <Text 
          ref={descriptionText2} 
          opacity={0} 
          text= {description2} 
          fontFamily={"JetBrains Mono"}
          fontSize={24}
          y={-260} 
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
    complexityText().position.y(-300, 1),
    complexityText().opacity(1, 1)
  );
  yield* all(
    descriptionText1().position.y(-220, 1),
    descriptionText1().opacity(1, 1),
    descriptionText2().position.y(-180, 1),
    descriptionText2().opacity(1, 1)
  );

  yield* waitFor(7);
  yield* all(
    descriptionText1().opacity(0, 1),
    descriptionText2().opacity(0, 1)
  )

  const swapSpeed = 0.45;
  const boxSwaps = [
    [box5, box4],
    [box5, box3],
    [box4, box3],
    [box5, box2],
    [box4, box2],
    [box3, box2],
    [box5, box1],
    [box4, box1],
    [box3, box1],
    [box2, box1]
  ]

  let currentSwap = 0;
  let boxBeingSwapped = boxSwaps[0][1];

  yield* loop(boxSwaps.length, 
    function* (){
      if (boxBeingSwapped != boxSwaps[currentSwap][1])
      {
        boxBeingSwapped = boxSwaps[currentSwap][1];
        yield* arrow().position.x(arrow().position.x() + squareSide, swapSpeed)
      }
      yield* all(
        boxSwaps[currentSwap][0]().position.y(boxSwaps[currentSwap][0]().position.y() + squareSide / 2, swapSpeed),
        boxSwaps[currentSwap][1]().position.y(boxSwaps[currentSwap][1]().position.y() - squareSide / 2, swapSpeed)
      );
      yield* all(
        boxSwaps[currentSwap][0]().position.x(boxSwaps[currentSwap][1]().position.x(), swapSpeed),
        boxSwaps[currentSwap][1]().position.x(boxSwaps[currentSwap][0]().position.x(), swapSpeed)
      );
      yield* all(
        boxSwaps[currentSwap][0]().position.y(boxSwaps[currentSwap][0]().position.y() - squareSide / 2, swapSpeed),
        boxSwaps[currentSwap][1]().position.y(boxSwaps[currentSwap][1]().position.y() + squareSide / 2, swapSpeed)
      );
      yield* waitFor(0.2);
      currentSwap++;
    }
  );

  yield* waitFor(0.5);
  yield* all(
    textNodes().position.y(-1500, 1.5),
    boxNodes().position.y(1500, 1.5)
  );

});