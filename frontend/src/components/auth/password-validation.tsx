import React from 'react';

import { IconButton, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
// import { Check, X } from 'lucide-react'
import { styled } from '@mui/material/styles';

const styles = {
  icon: {
    width: 24,
    height: 24,
  },
  success: {
    color: (theme) => theme.palette.primary.main,
  },
  error: {
    color: (theme) => theme.palette.error.main,
  },
};

// TODO: the size is not being respected, it's using .css-i4bv87-MuiSvgIcon-root
const iconStyles = {
  width: '0.8em',
  height: '0.8em',
  color: `${(props) => props.color}`,
};

const textStyles = {
  fontSize: '0.8rem',
  flex: '1',
  display: 'inline-block',
  marginLeft: '10px',
};

export function PasswordValidation({watch}) {
  const SPACING = '   ';
  return (
    <section className="flex flex-col gap-1 py-2">
    <div className="flex gap-2 items-center">
      {/[a-zA-Z]/.test(watch('password')) ? (
        <IconButton color="primary" style={iconStyles}>
          <CheckCircleOutlineIcon />
        </IconButton>
      ) : (
        <IconButton color="error" style={iconStyles}>
          <CloseIcon />
        </IconButton>
      )}
      <Typography variant="body2" color="textSecondary" style={textStyles}> 
        Contain at least one letter
      </Typography>
    </div>
    <div className="flex gap-2 items-center">
      {/[0-9]/.test(watch('password')) ? (
        <IconButton color="primary" style={iconStyles}>
          <CheckCircleOutlineIcon />
        </IconButton>
      ) : (
        <IconButton color="error" style={iconStyles}>
          <CloseIcon />
        </IconButton>
      )}
      <Typography variant="body2" color="textSecondary" style={textStyles}>
        Contain at least one number
      </Typography>
    </div>
    <div className="flex gap-2 items-center">
      {/[^a-zA-Z0-9]/.test(watch('password')) ? (
        <IconButton color="primary" style={iconStyles}>
          <CheckCircleOutlineIcon />
        </IconButton>
      ) : (
        <IconButton color="error" style={iconStyles}>
          <CloseIcon />
        </IconButton>
      )}
      <Typography variant="body2" color="textSecondary" style={textStyles}>
        Contain at least one special character
      </Typography>
    </div>
    <div className="flex gap-2 items-center">
      {watch('password').length >= 8 ? (
        <IconButton color="primary" style={iconStyles}>
          <CheckCircleOutlineIcon />
        </IconButton>
      ) : (
        <IconButton color="error" style={iconStyles}>
          <CloseIcon />
        </IconButton>
      )}
      <Typography variant="body2" color="textSecondary" style={textStyles}>
        Be at least 8 characters long
      </Typography>
    </div>
  </section>
  )
}