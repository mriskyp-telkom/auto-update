import path from 'path'

import fs from 'fs'

export async function getAppDataPath(): Promise<string> {
  switch (process.platform) {
    case 'darwin': {
      return path.join(
        process.env.HOME,
        'Library',
        'Application Support',
        'Arkas'
      )
    }
    case 'win32': {
      return path.join(process.env.APPDATA, 'Arkas')
    }
    case 'linux': {
      return path.join(process.env.HOME, '.Arkas')
    }
    default: {
      console.log('Unsupported platform!')
      process.exit(1)
    }
  }
}

export async function getAppData(): Promise<string> {
  const appPath = __dirname
  const isManualPath = false

  const envPath =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'production'
      ? await getAppDataPath() // Live Mode
      : path.join(appPath, 'AppData') // Dev Mode

  if (isManualPath) {
    return getManualAppData()
  } else {
    if (process.env.NODE_ENV === 'testing') {
      return path.join(await getAppDataPath(), 'Testing')
    }
  }
  return envPath
}

export async function getManualAppData(): Promise<string> {
  // change as your config local exists
  const dir = '/Users/user/Downloads/dbArkas'

  if (fs.existsSync(dir)) {
    console.log('Directory exists!')
  } else {
    console.log('Directory not found.')
  }

  // return envPath
  return dir
}
