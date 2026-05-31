import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createCheckoutSession } from './Stripe/createCheckoutSession'
import { handleWebhook } from './Stripe/handleWebhook'

const app  = express()
const PORT = process.env.BACKEND_PORT ?? 4000

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL ?? '',
  ].filter(Boolean),
  credentials: true,
}))

// MUST be before express.json() — Stripe needs raw body for signature verification
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), handleWebhook)

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'CreatorOS Backend' })
})

app.post('/api/stripe/create-checkout-session', createCheckoutSession)

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`\nCreatorOS backend running on http://localhost:${PORT}`)
  console.log(`   Health:  http://localhost:${PORT}/api/health`)
  console.log(`   Stripe:  http://localhost:${PORT}/api/stripe/create-checkout-session`)
  console.log(`   Webhook: http://localhost:${PORT}/api/stripe/webhook\n`)
})

export default app
