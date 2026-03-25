type ProductLike = {
  name?: string
  slug?: string
  category?: { name?: string } | null
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export const buildProductSearchText = (product: ProductLike) =>
  normalize([product.name, product.slug, product.category?.name].filter(Boolean).join(' '))

export const matchesAlias = (product: ProductLike, aliases: string[]) => {
  const text = buildProductSearchText(product)
  return aliases.some((alias) => {
    const terms = normalize(alias).split(' ').filter(Boolean)
    return terms.every((term) => text.includes(term))
  })
}

export const belongsToCollection = (product: ProductLike, collection: 'gemstones' | 'rudraksha' | 'yantra') => {
  if (collection === 'gemstones') {
    return matchesAlias(product, [
      'gemstone',
      'ruby',
      'emerald',
      'yellow sapphire',
      'blue sapphire',
      'pearl',
      'coral',
      'hessonite',
      'cats eye',
      'panna',
      'manik',
      'pukhraj',
      'neelam',
      'moti',
      'moonga',
      'gomed',
      'lehsunia',
    ])
  }

  if (collection === 'rudraksha') {
    return matchesAlias(product, ['rudraksha', 'mukhi', 'gauri shankar', 'garbha gauri'])
  }

  return matchesAlias(product, ['yantra'])
}
