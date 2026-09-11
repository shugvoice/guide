/** A single link */
export interface NavLink {
  /** Site name (required) */
  name: string;
  /** Site URL (required) */
  url: string;
  /** One-line description (optional, card subtitle) */
  description?: string;
  /** Icon (optional): emoji or image URL; defaults to the site favicon, falling back to a first-letter avatar on load failure */
  icon?: string;
}

/** A category */
export interface NavCategory {
  /** Category name (required) */
  name: string;
  /** Category icon, an emoji (optional) */
  icon?: string;
  /** Links in this category (required) */
  links: NavLink[];
}

/** Top-level structure of links.json */
export interface NavConfig {
  /** Site title */
  title: string;
  /** Site description (optional) */
  description?: string;
  /** All categories */
  categories: NavCategory[];
}
