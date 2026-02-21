export async function register() {
  // only run monitor on the server side (not edge runtime)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { startSheetsMonitor } = await import('./lib/sheets-monitor')
    startSheetsMonitor()
  }
}
