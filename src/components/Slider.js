import React from 'react';
import SliderSlick from 'react-slick';

export const Slider = (props) => {
  const { children } = props;
  let ch = [];
  const { length } = children;
  if (length === 1) {
    ch = [...children, ...children];
    ch = [...ch, ...ch, ...children];
  } else if (length === 2) {
    ch = [...children, ...children, ...children];
  } else if (length === 3) {
    ch = [...children, ...children];
  } else if (length === 4) {
    ch = [...children, ...children];
  } else {
    ch = [...children];
  }
  return <SliderSlick {...props}>{ch}</SliderSlick>;
};
