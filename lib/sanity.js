import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '4pi9d260',
  dataset: 'production',
  apiVersion: 'v1',
  token:'skMzewGlLQYaxEhoeq0m5xtIQgXyJ9iUC7rQWRIPrXIQVdEjMId0bfmCZpXlJ1DHvLgXRmNUEtNz8BMJOzlJHeHNh6YGXkgBWJagjBc9xIN05yzwWWgxmXTsjeMll1ZJWJTmjdaVf7DZErWWeFXij4CMmTU1lzhB8ocV6bmQsdkSsVIzwY0q',
  useCdn: false,
})
