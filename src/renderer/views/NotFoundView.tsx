import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@wartek-id/button'

const NotFoundView: FC = () => {
  return (
    <div>
      404 Page Not Found
      <Link to="/dashboard">
        <Button color="blue" size="md" variant="solid">
          Back to dashboard
        </Button>
      </Link>
    </div>
  )
}

export default NotFoundView