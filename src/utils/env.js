export const { MODE, DEV, PROD } = import.meta.env

export const isLocal = MODE === 'LOCAL'
export const isLocalDev = MODE === 'LOCAL_DEVELOPMENT'
export const isDev = MODE === 'DEVELOPMENT'
export const isProd = MODE === 'PRODUCTION'
