import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CheckCircle2, Loader2, X } from 'lucide-react'
import { submitContactForm } from '../services/contactApi'
import { EASE } from '../lib/motion'

const EMPTY_FORM = { name: '', email: '', phone: '', subject: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Mirrors the backend ContactRequest rules. Phone is optional.
function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.subject.trim().length < 3) errors.subject = 'Please add a subject (at least 3 characters).'
  if (values.message.trim().length < 10) errors.message = 'Please tell us a little more (at least 10 characters).'
  return errors
}

const inputClass =
  'mt-2 w-full rounded-control border border-line bg-ink-900/70 px-4 py-3 text-sm text-fg placeholder:text-fg-subtle transition-colors duration-200 hover:border-line-strong focus:border-brand-cyan/50 focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 disabled:opacity-60 aria-invalid:border-red-400/60'

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-xs font-medium text-fg-muted">
        {label}
        {optional && <span className="text-[10px] font-normal text-fg-subtle">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-300/90">
          {error}
        </p>
      )}
    </div>
  )
}

function Dialog({ onClose }) {
  const reducedMotion = useReducedMotion()
  const dialogRef = useRef(null)
  const sendingRef = useRef(false)
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success
  const [submitError, setSubmitError] = useState('')

  // Focus handling, background lock and Escape key.
  useEffect(() => {
    const previouslyFocused = document.activeElement
    const root = document.getElementById('root')
    const originalOverflow = document.body.style.overflow
    root?.setAttribute('inert', '')
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector('input')?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      root?.removeAttribute('inert')
      document.body.style.overflow = originalOverflow
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (sendingRef.current) return
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      dialogRef.current.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    sendingRef.current = true
    setStatus('sending')
    setSubmitError('')
    try {
      await submitContactForm({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      })
      setValues(EMPTY_FORM)
      setStatus('success')
    } catch {
      setSubmitError("We couldn't send your message right now. Please try again in a moment.")
      setStatus('idle')
    } finally {
      sendingRef.current = false
    }
  }

  const duration = reducedMotion ? 0.01 : 0.3
  const sending = status === 'sending'

  return (
    // Overlay is the scroll container; data-lenis-prevent keeps Lenis from scrolling the page behind it.
    <motion.div
      data-lenis-prevent
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-ink-950/70 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, ease: EASE }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="flex min-h-full items-end justify-center p-3 sm:items-center sm:p-6"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          aria-describedby="contact-modal-desc"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration, ease: EASE }}
          className="relative w-full max-w-2xl overflow-hidden rounded-card border border-line-strong bg-ink-900 p-6 shadow-[0_30px_120px_-30px_rgb(0_0_0/0.9),0_0_80px_-40px_rgb(79_124_255/0.5)] sm:p-9"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-brand-violet/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-cyan/40 to-transparent"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact form"
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-control border border-line text-fg-muted transition-colors duration-200 hover:border-line-strong hover:bg-white/[0.04] hover:text-fg"
          >
            <X size={18} aria-hidden="true" />
          </button>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration, ease: EASE }}
              className="relative flex flex-col items-center py-10 text-center sm:py-14"
            >
              <motion.span
                initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.5, ease: EASE, delay: 0.1 }}
                className="flex size-16 items-center justify-center rounded-2xl border border-brand-cyan/25 bg-ink-800/80 text-brand-cyan shadow-[0_0_60px_-24px_rgb(34_211_238/0.6)]"
              >
                <CheckCircle2 size={28} strokeWidth={1.5} aria-hidden="true" />
              </motion.span>
              <h2
                id="contact-modal-title"
                className="mt-7 font-display text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl"
              >
                Message sent.
              </h2>
              <p id="contact-modal-desc" role="status" className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted sm:text-base">
                Thanks for reaching out. We&apos;ll be in touch soon.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-control border border-line-strong px-6 text-sm font-medium text-fg transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.04]"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-cyan/85">Let&apos;s connect</p>
              <h2
                id="contact-modal-title"
                className="mt-4 pr-12 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-fg sm:text-4xl"
              >
                Let&apos;s build what&apos;s next.
              </h2>
              <p id="contact-modal-desc" className="mt-3 max-w-lg text-sm leading-relaxed text-fg-muted">
                Tell us what you&apos;re building, what you&apos;re trying to solve, or where AI could create an advantage.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field id="contact-name" label="Name" error={errors.name}>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange}
                    disabled={sending}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field id="contact-email" label="Email" error={errors.email}>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={values.email}
                    onChange={handleChange}
                    disabled={sending}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field id="contact-phone" label="Phone" optional>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Your phone number"
                    value={values.phone}
                    onChange={handleChange}
                    disabled={sending}
                    className={inputClass}
                  />
                </Field>
                <Field id="contact-subject" label="Subject" error={errors.subject}>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="What can we help you with?"
                    value={values.subject}
                    onChange={handleChange}
                    disabled={sending}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    className={inputClass}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field id="contact-message" label="Message" error={errors.message}>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Tell us a little about your project, challenge, or idea..."
                      value={values.message}
                      onChange={handleChange}
                      disabled={sending}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`${inputClass} resize-y`}
                    />
                  </Field>
                </div>

                <div className="flex flex-col gap-3 sm:col-span-2">
                  {submitError && (
                    <p role="alert" className="rounded-control border border-red-400/25 bg-red-400/5 px-4 py-3 text-sm text-red-200/90">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    aria-busy={sending}
                    className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-control border border-white/75 bg-fg px-6 py-3 text-sm font-semibold text-ink-950 shadow-[0_0_35px_-20px_rgb(34_211_238/0.55)] transition-[background-color,box-shadow,opacity] duration-250 hover:bg-white hover:shadow-[0_0_42px_-18px_rgb(79_124_255/0.65)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={16} aria-hidden="true" className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      'Send message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ContactFormModal({ open, onClose }) {
  return createPortal(<AnimatePresence>{open && <Dialog onClose={onClose} />}</AnimatePresence>, document.body)
}
