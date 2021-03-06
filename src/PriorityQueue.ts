export type Comparator<T> = (t1: T, t2: T) => -1 | 0 | 1

const DEFAULT_COMPARATOR: Comparator<any> = (a, b) => {
  return a < b ? -1 : a === b ? 0 : 1
}

export class PriorityQueue<T> {
  private items: T[] = []

  constructor(private readonly comparator: Comparator<T> = DEFAULT_COMPARATOR) {}

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length;
  }

  push(item: T): void {
    this.items.push(item)
    for (let i = this.items.length - 1; i > 0;) {
      const parent = Math.floor((i - 1) / 2)
      if (this.comparator(this.items[i], this.items[parent]) < 0) {
        this.swap(i, parent)
        i = parent
      } else {
        break
      }
    }
  }

  pop(): T | null {
    if (this.isEmpty()) {
      return null
    }

    const item = this.items[0]
    const last = this.items.pop()!
    
    if (!this.isEmpty()) {
      this.items[0] = last
      this.heapify(0)
    }

    return item
  }

  top(): T | null {
    if (this.isEmpty()) {
      return null
    }

    return this.items[0]
  }

  private heapify(i: number): void {
    const l = 2 * i + 1
    const r = 2 * i + 2
    let largest = i
    const size = this.items.length
    if (l < size && this.comparator(this.items[l], this.items[i]) < 0) {
      largest = l
    }
    if (r < size && this.comparator(this.items[r], this.items[largest]) < 0) {
      largest = r
    }
    if (largest !== i) {
      this.swap(i, largest)
      this.heapify(largest)
    }
  }

  private swap(i: number, j: number): void {
    const tmp = this.items[i]
    this.items[i] = this.items[j]
    this.items[j] = tmp
  }
}