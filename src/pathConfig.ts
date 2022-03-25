import path from 'path'

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
  const envPath =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'production'
      ? await getAppDataPath() // Live Mode
      : path.join(appPath, 'AppData') // Dev Mode

  if (process.env.NODE_ENV === 'testing') {
    return path.join(await getAppDataPath(), 'Testing')
  }

  return envPath
}
