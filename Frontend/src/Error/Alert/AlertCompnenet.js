import { Stack, Alert } from '@mui/material'
import React from 'react'
import './Alert.css'

export default function AlertCompnenet({error}) {
  return (
    <p className="social-text" >{error}</p>
  )
}
