const thumbModules = import.meta.glob('../assets/product-thumbs/*.png', {
  eager: true,
  import: 'default'
});

/**
 * @param {string} id Product id (matches `productsCatalog` and `product-thumbs/{id}.png`)
 * @returns {string | null} Bundled image URL
 */
export function getProductThumbUrl(id) {
  const suffix = `/${id}.png`;
  const key = Object.keys(thumbModules).find((k) => k.endsWith(suffix));
  return key ? thumbModules[key] : null;
}
