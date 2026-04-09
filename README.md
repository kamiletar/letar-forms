# @letar/forms

Declarative form components for React with **56 field types**, powered by [TanStack Form](https://tanstack.com/form) and [Chakra UI v3](https://chakra-ui.com).

[![npm version](https://img.shields.io/npm/v/@letar/forms)](https://www.npmjs.com/package/@letar/forms)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@letar/forms)](https://bundlephobia.com/package/@letar/forms)
[![license](https://img.shields.io/npm/l/@letar/forms)](./LICENSE)

📖 [Documentation](https://forms.letar.best) · 🎮 [Live Examples](https://forms-example.letar.best) · 🤖 [MCP for AI](https://www.npmjs.com/package/@letar/form-mcp)

[Документация на русском](./README.ru.md)

## Quick Start

```bash
npm install @letar/forms @tanstack/react-form @chakra-ui/react zod
```

```tsx
import { Form } from '@letar/forms'
import { z } from 'zod/v4'

const Schema = z.object({
  title: z
    .string()
    .min(2)
    .meta({ ui: { title: 'Title', placeholder: 'Enter...' } }),
  rating: z
    .number()
    .min(0)
    .max(10)
    .meta({ ui: { title: 'Rating' } }),
})

function MyForm() {
  return (
    <Form schema={Schema} initialValue={{ title: '', rating: 5 }} onSubmit={save}>
      <Form.Field.String name="title" />
      <Form.Field.Number name="rating" />
      <Form.Button.Submit>Save</Form.Button.Submit>
    </Form>
  )
}
```

**Or fully auto-generated from schema:**

```tsx
<Form.FromSchema schema={Schema} initialValue={data} onSubmit={handleSubmit} submitLabel="Create" />
```

## Philosophy: Separate Layout from Logic

| Aspect          | Where defined              | How used in JSX                 |
| --------------- | -------------------------- | ------------------------------- |
| **Validation**  | Zod schema                 | `schema={Schema}`               |
| **UI metadata** | Zod `.meta({ ui: {...} })` | Auto-extracted from schema      |
| **Structure**   | TypeScript types           | `initialValue={data}`           |
| **Layout**      | JSX                        | `<HStack>`, `<VStack>`, `<Box>` |

**Result:** JSX contains only layout and field names. All logic lives in the schema.

## Features

### 56 Field Components

```tsx
// Text
<Form.Field.String name="title" />
<Form.Field.Textarea name="description" />
<Form.Field.RichText name="content" />
<Form.Field.Password name="password" />

// Numbers
<Form.Field.Number name="price" />
<Form.Field.Slider name="rating" />
<Form.Field.Currency name="amount" />

// Selection
<Form.Field.Select name="category" />
<Form.Field.Combobox name="search" />
<Form.Field.RadioGroup name="type" />
<Form.Field.Checkbox name="agree" />

// Date & Time
<Form.Field.Date name="birthday" />
<Form.Field.DateRange name="period" />
<Form.Field.Time name="time" />

// Specialized
<Form.Field.Phone name="phone" />
<Form.Field.FileUpload name="avatar" />
<Form.Field.ColorPicker name="color" />
<Form.Field.Signature name="signature" />
<Form.Field.CreditCard name="card" />
```

### Conditional Rendering

```tsx
<Form schema={Schema} initialValue={data} onSubmit={save}>
  <Form.Field.Select name="type" />

  <Form.When field="type" is="company">
    <Form.Field.String name="companyName" />
  </Form.When>

  <Form.Button.Submit />
</Form>
```

### Multi-Step Forms

```tsx
<Form schema={Schema} initialValue={data} onSubmit={save}>
  <Form.Steps animated validateOnNext>
    <Form.Steps.Step title="Personal Info">
      <Form.Field.String name="name" />
      <Form.Field.String name="email" />
    </Form.Steps.Step>

    <Form.Steps.Step title="Address">
      <Form.Field.String name="city" />
      <Form.Field.String name="street" />
    </Form.Steps.Step>

    <Form.Steps.Navigation />
  </Form.Steps>
</Form>
```

### Groups and Arrays

```tsx
// Nested object
<Form.Group name="address">
  <Form.Field.String name="city" />    {/* → address.city */}
  <Form.Field.String name="street" />  {/* → address.street */}
</Form.Group>

// Array of items
<Form.Group.List name="phones">
  <Form.Field.Phone />
  <Form.Group.List.Button.Add>Add Phone</Form.Group.List.Button.Add>
</Form.Group.List>
```

### Security

```tsx
// Honeypot — invisible bot trap (zero friction for users)
<Form honeypot initialValue={data} onSubmit={save}>
  ...
</Form>

// Rate Limiting — throttle repeated submits
<Form rateLimit={{ maxSubmits: 3, windowMs: 60000 }} initialValue={data} onSubmit={save}>
  ...
</Form>

// CAPTCHA (Cloudflare Turnstile / Google reCAPTCHA / hCaptcha)
<Form.Captcha />
```

### Offline Support (PWA)

```tsx
<Form
  initialValue={data}
  offline={{ actionType: 'SAVE_REPORT', onSynced: () => toast.success('Synced') }}
  onSubmit={save}
>
  <Form.OfflineIndicator />
  <Form.Field.String name="name" />
  <Form.Button.Submit />
</Form>
```

### Analytics

```tsx
<Form analytics={{ adapter: umamiAdapter }}>
  <Form.Analytics.Panel />  {/* Dev-only live dashboard */}
</Form>
```

### Undo / Redo

```tsx
<Form history initialValue={data} onSubmit={save}>
  <Form.History.Controls />  {/* Ctrl+Z / Ctrl+Shift+Z */}
  ...
</Form>
```

### Conversational Mode (Typeform-style)

```tsx
<Form schema={SurveySchema} initialValue={{}} onSubmit={save}>
  <ConversationalMode showProgress showQuestionNumber>
    <Form.Field.String name="name" label="What's your name?" />
    <Form.Field.Rating name="satisfaction" label="Rate the service" />
  </ConversationalMode>
</Form>
```

### Form Builder (JSON-driven)

```tsx
<FormBuilder
  config={{
    fields: [
      { name: 'title', type: 'string', label: 'Title' },
      { name: 'price', type: 'currency', label: 'Price' },
    ],
  }}
  initialValue={{}}
  onSubmit={save}
/>
```

### Form Comparison (Diff View)

```tsx
<FormComparison original={oldData} current={newData} schema={Schema} onlyChanged />
```

### Read-Only View

```tsx
<FormReadOnlyView data={values} schema={Schema} compact />
```

### Form Skeleton

```tsx
<FormSkeleton schema={Schema} showSubmit />
```

### URL Prefill

```tsx
import { useUrlPrefill, generatePrefillUrl } from '@letar/forms'

// URL: /contact?name=Ivan&email=ivan@test.com
const prefilled = useUrlPrefill({ fields: ['name', 'email'], cleanUrl: true })

// Generate marketing links
const url = generatePrefillUrl('/contact', { name: 'Ivan', email: 'ivan@test.com' })
```

### Testing Utilities

```tsx
import { renderForm, fillField, submitForm, expectFieldError } from '@letar/forms/testing'

const { onSubmit } = renderForm(ContactForm)
await fillField('name', 'Ivan')
await submitForm()
expect(onSubmit).toHaveBeenCalled()
```

### Auto Constraints from Zod

```tsx
const Schema = z.object({
  title: z.string().min(2).max(100),  // → minLength={2} maxLength={100}
  email: z.string().email(),          // → type="email"
  rating: z.number().min(1).max(10),  // → min={1} max={10}
})
```

### Address Provider

Address and city fields support pluggable geocoding providers. DaData (Russia) is built-in:

```tsx
import { createDaDataProvider, createForm } from '@letar/forms'

const AppForm = createForm({
  addressProvider: createDaDataProvider({ token: process.env.DADATA_TOKEN }),
})

<AppForm.Field.Address name="address" />
<AppForm.Field.City name="city" />
```

### createForm — App-Level Customization

```tsx
import { createForm } from '@letar/forms'

const AppForm = createForm({
  addressProvider: createDaDataProvider({ token: '...' }),
  extraSelects: { Category: SelectCategory },
})

<AppForm initialValue={data} onSubmit={save}>
  <AppForm.Field.Address name="address" />
  <AppForm.Select.Category name="categoryId" />
  <AppForm.Button.Submit />
</AppForm>
```

## Subpath Exports

```tsx
import { useOfflineForm } from '@letar/forms/offline'
import { FormI18nProvider } from '@letar/forms/i18n'
import { renderForm } from '@letar/forms/testing'
import { umamiAdapter } from '@letar/forms/analytics'
```

## Peer Dependencies

| Package                | Version   | Required                         |
| ---------------------- | --------- | -------------------------------- |
| `react`                | >= 18.0.0 | Yes                              |
| `@tanstack/react-form` | >= 1.0.0  | Yes                              |
| `@chakra-ui/react`     | >= 3.0.0  | Yes                              |
| `framer-motion`        | >= 10.0.0 | Yes                              |
| `zod`                  | >= 3.24.0 | Yes                              |
| `@dnd-kit/*`           | >= 6.0.0  | Optional (drag & drop in arrays) |
| `use-mask-input`       | >= 3.0.0  | Optional (Phone, MaskedInput)    |

## Documentation

Full documentation and live examples: **[forms.letar.best](https://forms.letar.best)**

## License

[MIT](./LICENSE)

---

**Version:** 0.85.0
