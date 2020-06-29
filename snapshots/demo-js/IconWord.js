/* eslint-disable */

import React from 'react';
import { GProps, SvgXml } from 'react-native-svg';


const IconWord = ({ size, color, ...rest }) => {
  return (
    <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="44.068" height="40.676" viewBox="0 0 44.068 40.676">
  <defs>
    <linearGradient id="linear-gradient" x1="0.537" y1="0.969" x2="0.5" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#68a2f1"/>
      <stop offset="1" stop-color="#73bffe"/>
    </linearGradient>
    <filter id="交叉_4" x="21.336" y="0" width="22.731" height="23.695" filterUnits="userSpaceOnUse">
      <feOffset dy="5" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feFlood flood-color="#4aaaff"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="组_222" data-name="组 222" transform="translate(-54 -996)">
    <g id="组_85" data-name="组 85" transform="translate(35.936 979.341)">
      <g id="组_81" data-name="组 81" transform="translate(18.064 17.66)">
        <g id="组_79" data-name="组 79" transform="translate(0 0)">
          <path id="路径_20" data-name="路径 20" d="M5.746,0,27.338.044,38.068,11.71V33.9a5.759,5.759,0,0,1-5.746,5.771H5.746A5.759,5.759,0,0,1,0,33.9V5.771A5.759,5.759,0,0,1,5.746,0Z" transform="translate(0 0)" fill="url(#linear-gradient)"/>
          <g transform="matrix(1, 0, 0, 1, 0, -1)" filter="url(#交叉_4)">
            <path id="交叉_4-2" data-name="交叉 4" d="M0,0H2.732a8,8,0,0,1,8,8v3.7C7.6,8.271,3.047,3.3,0,0Z" transform="translate(38.07 12.7) rotate(180)" fill="#b1defe"/>
          </g>
        </g>
      </g>
    </g>
    <g id="组_92" data-name="组 92" transform="translate(-17.857 -58)">
      <rect id="矩形_159" data-name="矩形 159" width="2.5" height="15.449" rx="1.25" transform="translate(82 1069.887)" fill="#fff"/>
      <rect id="矩形_160" data-name="矩形 160" width="2.5" height="15.449" rx="1.25" transform="translate(97 1069.887)" fill="#fff"/>
      <path id="路径_23" data-name="路径 23" d="M1.25,0A1.4,1.4,0,0,1,2.5,1.509V11.573a1.4,1.4,0,0,1-1.25,1.509A1.4,1.4,0,0,1,0,11.573V1.509A1.4,1.4,0,0,1,1.25,0Z" transform="translate(90.611 1074.34) rotate(42)" fill="#fff"/>
      <rect id="矩形_162" data-name="矩形 162" width="2.5" height="13" rx="1.25" transform="translate(99.582 1084.079) rotate(138)" fill="#fff"/>
    </g>
  </g>
</svg>`}  width={size} height={size} {...rest} />
  );
};

IconWord.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconWord) : IconWord;
