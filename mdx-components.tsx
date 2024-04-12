import type { MDXComponents } from 'mdx/types'
import MdxLink from './components/MdxLink'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: MdxLink
  }
}