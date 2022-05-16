
import path from 'path'

export const getAbsolutePath = (route) => path.isAbsolute(route) ? route : path.resolve(route)
