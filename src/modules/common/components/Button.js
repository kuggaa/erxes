import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { colors } from '../styles';
import { darken, lighten } from '../styles/color';

const types = {
  default: {
    background: colors.colorPrimary,
    color: colors.colorWhite,
    display: 'inline-block'
  },
  primary: {
    background: colors.colorSecondary,
    color: colors.colorWhite
  },
  success: {
    background: colors.colorCoreGreen,
    color: colors.colorWhite
  },
  danger: {
    background: colors.colorCoreRed,
    color: colors.colorWhite
  },
  warning: {
    background: colors.colorCoreYellow,
    color: colors.colorWhite
  },
  simple: {
    background: colors.colorWhite,
    borderColor: colors.colorShadowGray,
    color: colors.colorCoreLightGray
  },
  link: {
    background: 'transparent',
    color: colors.colorCoreGray
  }
};

const sizes = {
  large: {
    padding: '11px 29px',
    fontSize: '14px',
    lineHeight: '1.333333'
  },
  medium: {
    padding: '8px 23px',
    fontSize: '12px',
    lineHeight: '1.3'
  },
  small: {
    padding: '5px 16px',
    fontSize: '10px',
    lineHeight: '1.5'
  }
};

const ButtonStyled = styled.button`
  ${props => css`
    border-radius: 30px;
    position: relative;
    padding: ${sizes[props.size].padding};
    display: ${props.block ? 'block' : 'inline-block'};
    width: ${props.block && '100%'};
    border: ${types[props.btnStyle].borderColor ? '1px solid #DDD' : 'none'};
    background: ${types[props.btnStyle].background};
    color: ${types[props.btnStyle].color};
    font-size: ${sizes[props.size].fontSize};
    line-height: ${sizes[props.size].lineHeight};
    transition: all 0.3s ease;
    text-transform: uppercase;
    outline: 0;

    &:disabled {
      cursor: not-allowed !important;
      background: ${lighten(types[props.btnStyle].background, 30)};
      color: ${lighten(types[props.btnStyle].color, 20)};
    }

    &:hover {
      cursor: pointer;
      box-shadow: ${types[props.btnStyle] === types.link
        ? 'none'
        : '0 0 4px 0 #888'};
      color: ${types[props.btnStyle].color !== colors.colorWhite
        ? darken(colors.colorCoreGray, 24)
        : ''};
      text-decoration: none;
    }

    &.shrinked {
      padding: 8px 0;
    }

    & + button {
      margin-left: 10px;
    }
  `};
`;

const Link = ButtonStyled.withComponent('a');

const ButtonLink = Link.extend`
  text-decoration: inherit;
  text-align: center;
  background: ${props =>
    props.disabled && lighten(types[props.btnStyle].background, 30)};
  pointer-events: ${props => props.disabled && 'none'};
`;

function Button({ ...props }) {
  if (props.href) {
    return <ButtonLink {...props}>{props.children}</ButtonLink>;
  }

  return <ButtonStyled {...props}>{props.children}</ButtonStyled>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
  btnStyle: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'danger',
    'warning',
    'simple',
    'link'
  ]),
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  disabled: PropTypes.bool,
  block: PropTypes.bool
};

Button.defaultProps = {
  btnStyle: 'default',
  size: 'medium',
  block: false,
  disabled: false
};

export default Button;
