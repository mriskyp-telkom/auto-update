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
      console.warn('Unsupported platform.')
      process.exit(1)
    }
  }
}

export async function getAppData(): Promise<string> {
  const appPath = __dirname

  const dir = process.env.DB_PATH

  if (process.env.NODE_ENV === 'production') {
    return await getAppDataPath()
  }

  if (process.env.NODE_ENV === 'testing') {
    return path.join(await getAppDataPath(), 'Testing')
  }

  if (process.env.NODE_ENV === 'development' && fs.existsSync(dir)) {
    return dir
  } else {
    return path.join(appPath, 'AppData')
  }
}
