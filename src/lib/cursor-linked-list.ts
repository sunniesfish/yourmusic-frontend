export interface LinkedListNode<T> {
  payload: T;
  prevKey: string | null;
  nextKey: string | null;
  key: string;
}

export interface SerializableLinkedListData<T> {
  nodeMap: Record<string, LinkedListNode<T>>;
  nodeHead: [string, LinkedListNode<T>] | null;
  nodeTail: [string, LinkedListNode<T>] | null;
  size: number;
}

export class LinkedList<T> {
  private nodeMap: Map<string, LinkedListNode<T>>;
  private nodeHead: [string, LinkedListNode<T>] | null;
  private nodeTail: [string, LinkedListNode<T>] | null;
  public size: number;

  constructor() {
    this.nodeMap = new Map<string, LinkedListNode<T>>();
    this.nodeHead = null;
    this.nodeTail = null;
    this.size = 0;
  }

  insertFirst(item: T, key?: string): void {
    if (this.size === 0) {
      this._initInsert(item, key);
      return;
    }
    const nodeKey = key || this.createKey();

    // 중복 키 검사
    if (this.nodeMap.has(nodeKey)) {
      throw new Error(
        `Duplicate key: ${nodeKey}. Key already exists in the linked list.`
      );
    }

    const nodeValue: LinkedListNode<T> = {
      payload: item,
      prevKey: null,
      nextKey: this.nodeHead![0],
      key: nodeKey,
    };

    const oldHeadNode = this.nodeHead![1];
    oldHeadNode.prevKey = nodeKey;
    this.nodeMap.set(this.nodeHead![0], oldHeadNode);

    this.nodeMap.set(nodeKey, nodeValue);
    this.nodeHead = [nodeKey, nodeValue];
    this.size++;
  }

  insertLast(item: T, key?: string): void {
    if (this.size === 0) {
      this._initInsert(item, key);
      return;
    }
    const nodeKey = key || this.createKey();

    // 중복 키 검사
    if (this.nodeMap.has(nodeKey)) {
      throw new Error(
        `Duplicate key: ${nodeKey}. Key already exists in the linked list.`
      );
    }

    const nodeValue: LinkedListNode<T> = {
      payload: item,
      prevKey: this.nodeTail![0],
      nextKey: null,
      key: nodeKey,
    };

    const oldTailNode = this.nodeTail![1];
    oldTailNode.nextKey = nodeKey;
    this.nodeMap.set(this.nodeTail![0], oldTailNode);

    this.nodeMap.set(nodeKey, nodeValue);
    this.nodeTail = [nodeKey, nodeValue];
    this.size++;
  }

  insertAt(item: T, idx: number, key?: string): void {
    if (idx < 0 || idx > this.size) {
      throw new Error(`Index ${idx} out of bounds. Size: ${this.size}`);
    }
    if (idx === 0) {
      this.insertFirst(item, key);
      return;
    }
    if (idx === this.size) {
      this.insertLast(item, key);
      return;
    }

    const nodeKey = key || this.createKey();

    // 중복 키 검사
    if (this.nodeMap.has(nodeKey)) {
      throw new Error(
        `Duplicate key: ${nodeKey}. Key already exists in the linked list.`
      );
    }

    const thisKey = this._getKeyAt(idx);
    const thisValue = this.nodeMap.get(thisKey)!;
    const prevKey = thisValue.prevKey!;
    const prevValue = this.nodeMap.get(prevKey)!;

    const newNode: LinkedListNode<T> = {
      payload: item,
      prevKey: prevKey,
      nextKey: thisKey,
      key: nodeKey,
    };

    prevValue.nextKey = nodeKey;
    thisValue.prevKey = nodeKey;

    this.nodeMap.set(prevKey, prevValue);
    this.nodeMap.set(nodeKey, newNode);
    this.nodeMap.set(thisKey, thisValue);

    this.size++;
  }

  deleteFirst(): void {
    if (this.size === 0) {
      throw new Error("Cannot delete from empty list");
    }
    if (this.size === 1) {
      this.clear();
      return;
    }

    const newHeadKey = this.nodeHead![1].nextKey!;
    const newHeadNode = this.nodeMap.get(newHeadKey)!;
    newHeadNode.prevKey = null;

    this.nodeMap.delete(this.nodeHead![0]);
    this.nodeHead = [newHeadKey, newHeadNode];
    this.nodeMap.set(newHeadKey, newHeadNode);
    this.size--;
  }

  deleteLast(): void {
    if (this.size === 0) {
      throw new Error("Cannot delete from empty list");
    }
    if (this.size === 1) {
      this.clear();
      return;
    }

    const newTailKey = this.nodeTail![1].prevKey!;
    const newTailNode = this.nodeMap.get(newTailKey)!;
    newTailNode.nextKey = null;

    this.nodeMap.delete(this.nodeTail![0]);
    this.nodeTail = [newTailKey, newTailNode];
    this.nodeMap.set(newTailKey, newTailNode);
    this.size--;
  }

  deleteAt(idx: number): void {
    if (idx < 0 || idx >= this.size) {
      throw new Error(`Index ${idx} out of bounds. Size: ${this.size}`);
    }
    if (idx === 0) {
      this.deleteFirst();
      return;
    }
    if (idx === this.size - 1) {
      this.deleteLast();
      return;
    }

    const thisKey = this._getKeyAt(idx);
    const thisValue = this.nodeMap.get(thisKey)!;
    const prevKey = thisValue.prevKey!;
    const prevValue = this.nodeMap.get(prevKey)!;
    const nextKey = thisValue.nextKey!;
    const nextValue = this.nodeMap.get(nextKey)!;

    // 링크 업데이트
    prevValue.nextKey = nextKey;
    nextValue.prevKey = prevKey;

    // 맵에서 노드들 업데이트
    this.nodeMap.set(prevKey, prevValue);
    this.nodeMap.set(nextKey, nextValue);
    this.nodeMap.delete(thisKey);

    this.size--;
  }

  get head(): LinkedListNode<T> | null {
    return this.nodeHead?.[1] || null;
  }

  get tail(): LinkedListNode<T> | null {
    return this.nodeTail?.[1] || null;
  }

  getNextNode(key: string): LinkedListNode<T> | undefined {
    if (!this.nodeMap.has(key)) {
      throw new Error(`Node with key ${key} not found.`);
    }
    return this.nodeMap.get(key)!.nextKey
      ? this.nodeMap.get(this.nodeMap.get(key)!.nextKey!)
      : undefined;
  }

  getPrevNode(key: string): LinkedListNode<T> | undefined {
    if (!this.nodeMap.has(key)) {
      throw new Error(`Node with key ${key} not found.`);
    }
    return this.nodeMap.get(key)!.prevKey
      ? this.nodeMap.get(this.nodeMap.get(key)!.prevKey!)
      : undefined;
  }

  deleteNode(key: string): void {
    if (!this.nodeMap.has(key)) {
      throw new Error(`Node with key ${key} not found.`);
    }
    if (this.size === 1) {
      this.clear();
      return;
    }
    const prevKey = this.nodeMap.get(key)!.prevKey;
    const nextKey = this.nodeMap.get(key)!.nextKey;
    if (prevKey) {
      const prevNode = this.nodeMap.get(prevKey)!;
      prevNode.nextKey = nextKey;
      this.nodeMap.set(prevKey, prevNode);
    }
    if (nextKey) {
      const nextNode = this.nodeMap.get(nextKey)!;
      nextNode.prevKey = prevKey;
      this.nodeMap.set(nextKey, nextNode);
    }

    if (this.nodeHead && this.nodeHead[0] === key) {
      if (nextKey) {
        const newHeadNode = this.nodeMap.get(nextKey)!;
        this.nodeHead = [nextKey, newHeadNode];
      } else {
        this.nodeHead = null;
      }
    }

    if (this.nodeTail && this.nodeTail[0] === key) {
      if (prevKey) {
        const newTailNode = this.nodeMap.get(prevKey)!;
        this.nodeTail = [prevKey, newTailNode];
      } else {
        this.nodeTail = null;
      }
    }
    this.nodeMap.delete(key);
    this.size--;
  }

  getAt(idx: number): LinkedListNode<T> {
    if (idx < 0 || idx >= this.size) {
      throw new Error(`Index ${idx} out of bounds. Size: ${this.size}`);
    }
    const key = this._getKeyAt(idx);
    return this.nodeMap.get(key)!;
  }

  clear(): void {
    this.nodeMap = new Map<string, LinkedListNode<T>>();
    this.nodeHead = null;
    this.nodeTail = null;
    this.size = 0;
  }

  reverse(): void {
    if (this.size <= 1) return;

    for (const [key, node] of this.nodeMap) {
      const temp = node.prevKey;
      node.prevKey = node.nextKey;
      node.nextKey = temp;
      this.nodeMap.set(key, node);
    }

    const temp = this.nodeHead;
    this.nodeHead = this.nodeTail;
    this.nodeTail = temp;
  }

  toArray(): T[] {
    const result: T[] = [];
    if (this.size === 0) return result;

    let currentKey = this.nodeHead![0];
    while (currentKey) {
      const node = this.nodeMap.get(currentKey)!;
      result.push(node.payload);
      currentKey = node.nextKey!;
    }
    return result;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  toJSON(): SerializableLinkedListData<T> {
    return {
      nodeMap: Object.fromEntries(this.nodeMap),
      nodeHead: this.nodeHead,
      nodeTail: this.nodeTail,
      size: this.size,
    };
  }

  static fromJSON<T>(data: SerializableLinkedListData<T>): LinkedList<T> {
    const list = new LinkedList<T>();
    list.nodeMap = new Map(Object.entries(data.nodeMap));
    list.nodeHead = data.nodeHead;
    list.nodeTail = data.nodeTail;
    list.size = data.size;
    return list;
  }

  private _initInsert(item: T, key?: string): void {
    const nodeKey = key || this.createKey();

    // 중복 키 검사 (빈 리스트에서도 안전하게)
    if (this.nodeMap.has(nodeKey)) {
      throw new Error(
        `Duplicate key: ${nodeKey}. Key already exists in the linked list.`
      );
    }

    const nodeValue: LinkedListNode<T> = {
      payload: item,
      prevKey: null,
      nextKey: null,
      key: nodeKey,
    };

    this.nodeMap.set(nodeKey, nodeValue);
    this.nodeHead = [nodeKey, nodeValue];
    this.nodeTail = [nodeKey, nodeValue];
    this.size++;
  }

  private _getKeyAt(idx: number): string {
    if (idx < 0 || idx >= this.size) {
      throw new Error(`Index ${idx} out of bounds. Size: ${this.size}`);
    }

    let i = 0;
    let key = this.nodeHead![0];
    while (i !== idx) {
      key = this.nodeMap.get(key)!.nextKey!;
      i++;
    }
    return key;
  }

  createKey(): string {
    return `node_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}
