export interface CursorNode<T> {
  payload: T;
  prevCursor: string | null;
  nextCursor: string | null;
}

export class CursorLinkedList<T extends { cursor: string }> {
  private nodeMap: Record<string, CursorNode<T>> = {};
  private headCursor: string | null = null;
  private tailCursor: string | null = null;
  public size = 0;

  insertLast(item: T): void {
    const cursor = item.cursor;
    if (this.size === 0) {
      this.nodeMap[cursor] = {
        payload: item,
        prevCursor: null,
        nextCursor: null,
      };
      this.headCursor = cursor;
      this.tailCursor = cursor;
    } else {
      const prevTail = this.nodeMap[this.tailCursor!];
      prevTail.nextCursor = cursor;
      this.nodeMap[this.tailCursor!] = prevTail;

      this.nodeMap[cursor] = {
        payload: item,
        prevCursor: this.tailCursor,
        nextCursor: null,
      };
      this.tailCursor = cursor;
    }
    this.size++;
  }

  delete(cursor: string): void {
    const node = this.nodeMap[cursor];
    if (!node) return;

    const { prevCursor, nextCursor } = node;

    if (prevCursor) {
      this.nodeMap[prevCursor].nextCursor = nextCursor;
    } else {
      this.headCursor = nextCursor;
    }

    if (nextCursor) {
      this.nodeMap[nextCursor].prevCursor = prevCursor;
    } else {
      this.tailCursor = prevCursor;
    }

    delete this.nodeMap[cursor];
    this.size--;
  }

  getByCursor(cursor: string): CursorNode<T> | undefined {
    return this.nodeMap[cursor];
  }

  toArray(): T[] {
    const result: T[] = [];
    let cursor = this.headCursor;
    while (cursor) {
      const node = this.nodeMap[cursor];
      result.push(node.payload);
      cursor = node.nextCursor;
    }
    return result;
  }

  clear(): void {
    this.nodeMap = {};
    this.headCursor = null;
    this.tailCursor = null;
    this.size = 0;
  }

  serialize(): {
    nodeMap: Record<string, CursorNode<T>>;
    headCursor: string | null;
    tailCursor: string | null;
    size: number;
  } {
    return {
      nodeMap: this.nodeMap,
      headCursor: this.headCursor,
      tailCursor: this.tailCursor,
      size: this.size,
    };
  }

  static deserialize<T extends { cursor: string }>(data: {
    nodeMap: Record<string, CursorNode<T>>;
    headCursor: string | null;
    tailCursor: string | null;
    size: number;
  }): CursorLinkedList<T> {
    const list = new CursorLinkedList<T>();
    list.nodeMap = data.nodeMap;
    list.headCursor = data.headCursor;
    list.tailCursor = data.tailCursor;
    list.size = data.size;
    return list;
  }
}
