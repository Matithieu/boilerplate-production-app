export class StorageService<T> {
  private readonly prefix: string

  constructor(prefix: string = '') {
    this.prefix = prefix
  }

  // Save data to localStorage
  setItem(key: LocalStorageKeys, value: T): void {
    const stringValue = JSON.stringify(value)
    localStorage.setItem(this.prefix + key, stringValue)
  }

  // Retrieve data from localStorage
  getItem(key: LocalStorageKeys): T | null {
    const value = localStorage.getItem(this.prefix + key)
    if (value === null) return null

    try {
      return JSON.parse(value) as T
    } catch (error) {
      throw new Error(
        `Failed to parse value for key "${key}": ${String(error)}`,
      )
    }
  }

  // Remove data from localStorage
  removeItem(key: LocalStorageKeys): void {
    localStorage.removeItem(this.prefix + key)
  }

  // Clear all items under the current prefix from localStorage
  clear(): void {
    const keysToRemove = Object.keys(localStorage).filter((key) =>
      key.startsWith(this.prefix),
    )

    for (const key of keysToRemove) {
      localStorage.removeItem(key)
    }
  }

  // Get all items stored with the current prefix
  getAllItems(): Record<string, T> {
    const items: Record<string, T> = {}

    for (const key of Object.keys(localStorage)) {
      if (key.startsWith(this.prefix)) {
        const value = localStorage.getItem(key)

        if (value !== null) {
          try {
            const parsedValue = JSON.parse(value) as T
            const itemKey = key.substring(this.prefix.length)
            items[itemKey] = parsedValue
          } catch (error) {
            throw new Error(
              `Failed to parse value for key "${key}": ${String(error)}`,
            )
          }
        }
      }
    }

    return items
  }

  // Check if an item exists
  hasItem(key: LocalStorageKeys): boolean {
    return localStorage.getItem(this.prefix + key) !== null
  }
}

type LocalStorageKeys = 'settings' | 'language'
