import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

export const getServerTime = createServerFn().handler(async () => {
  // Wait for 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // Return the current time
  return new Date().toISOString()
})

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/about/"!</div>
}
