import React from 'react';

export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  };

  function dotFaces() {
    // Create an array to represent each face of the dice
    const faces = [
      [],
      [0, 0, 0, 0, 1, 0, 0, 0, 0], // Face 1
      [1, 0, 0, 0, 0, 0, 0, 0, 1], // Face 2
      [1, 0, 0, 0, 1, 0, 0, 0, 1], // Face 3
      [1, 0, 1, 0, 0, 0, 1, 0, 1], // Face 4
      [1, 0, 1, 0, 1, 0, 1, 0, 1], // Face 5
      [1, 0, 1, 1, 0, 1, 1, 0, 1], // Face 6
    ];

    // Get the face corresponding to the value of props.value
    const face = faces[props.value];

    // Render the dice face using the face array
    return (
      <div className="dotFaces">
        {face.map((dot, index) => (
          <span
            key={index}
            className={dot ? 'dot' : ''}></span>
        ))}
      </div>
    );
  }

  const dotFacesElement = dotFaces();

  return (
    <div
      className="die-face"
      style={style}
      onClick={props.holdDice}>
      {dotFacesElement}
    </div>
  );
}
