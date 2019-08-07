import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import NextLink, { LinkProps } from 'next/link';

interface IPmmButtonProps {
  children: string | Element;
  buttonOpts?: ButtonProps;
  linkOpts?: LinkProps;
}

const getChild = (children) => {
  switch (typeof children) {
    case 'string':
      return <span>{children}</span>;
    case 'object':
      return children;
    default:
      return children;
  }
};

export default function PmmButton({
  children,
  buttonOpts,
  linkOpts,
}: IPmmButtonProps) {
  return (
    <Button {...buttonOpts}>
      <NextLink {...linkOpts}>{getChild(children)}</NextLink>
    </Button>
  );
}
