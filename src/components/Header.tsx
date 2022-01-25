import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@wartek-id/button'

const Header: FC = () => {
  return (
    <div className="menu">
      <Link to="/dashboard">
        <Button color="blue" size="md" variant="solid">
          Home
        </Button>
      </Link>
      <Link to="/about">
        <Button color="blue" size="md" variant="solid">
          About
        </Button>
      </Link>
      <Link to="/">
        <Button color="blue" size="md" variant="solid">
          Login
        </Button>
      </Link>
      <Link to="/registration">
        <Button color="blue" size="md" variant="solid">
          Registration
        </Button>
      </Link>
    </div>
  )
}

export default Header
