import React, { useState, useRef } from "react";
import { getHandleValue } from './utils';
import { usePicker } from "./context";
import PropTypes from 'prop-types'

const GradientBar = () => {
  const { currentColor, addPoint, colors, value, handleGradient } = usePicker()
  const [dragging, setDragging] = useState(false)
  const barRef = useRef(null);

  const stopDragging = () => {
    setDragging(false)
  }

  const handleDown = (e) => {
    if (!dragging) {
      addPoint(e);
    }
  }

  const handleMove = (e) => {
    let result;
    if (typeof e.pageX !== 'number') {
      const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX

      const left = x - (barRef.current.getBoundingClientRect().left + window.pageXOffset)
  
      result = Math.round(left/barRef.current.getBoundingClientRect().width * 100);
  
      result = result > 100 ? 100 : result;
      result = result < 0 ? 0 : result;
    } else {
      result = getHandleValue(e);
    }

    if (dragging) {
      handleGradient(currentColor, result);
    }
  }

  return(
    <div className='bar-wrap' onMouseEnter={stopDragging} onMouseLeave={stopDragging}>
      <div className='ps-rl bar-wrap-inner' onMouseUp={stopDragging} onTouchEnd={stopDragging}>
        <div
          onMouseDown={(e) => handleDown(e)}
          onMouseMove={(e) => handleMove(e)}
          style={{paddingTop: 6, paddingBottom: 6}}
          // onTouchStart={(e) => handleDown(e)}
          onTouchMove={(e) => handleMove(e)}
        >
          <div style={{width: 294, height: 14, backgroundImage: value, borderRadius: 10}} ref={barRef} />
        </div>
        {colors?.map((c, i) => (<Handle left={c.left} key={`${i}-${c}`} i={i} setDragging={setDragging} handleMove={handleMove} />))}
      </div>
    </div>
  )
}

export default GradientBar

export const Handle = ({ left, i, setDragging, handleMove}) => {
  const { setSelectedColor, selectedColor } = usePicker();
  const isSelected = selectedColor === i

  const handleDown = (e) => {
    e.stopPropagation();
    setSelectedColor(i);
    setDragging(true)
  }

  return(
    <div style={{left: left * 2.76 + 13 }}
      onMouseDown={(e) => handleDown(e)}
      onTouchStart={(e) => handleDown(e)}
      onTouchMove={handleMove}
      className='gradient-handle-wrap'
    >
      <div style={handleStyle(isSelected)} className='gradient-handle df jc ac'>{isSelected && <div style={{width: 5, height:5, borderRadius: '50%', background: 'white'}} />}</div>
    </div>
  )
}

const handleStyle = (isSelected) => {
  return {
    boxShadow: isSelected ? '0px 0px 5px 1px rgba(86, 140, 245,.95)' : '',
    border: isSelected ? '2px solid white' : '2px solid rgba(255,255,255,.75)',
  }
}

Handle.propTypes = {
  left: PropTypes.number,
  i: PropTypes.number,
  setDragging: PropTypes.func,
}
