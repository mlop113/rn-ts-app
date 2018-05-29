interface Console {
  tron: any
}

declare interface NodeModule {
  hot?: { accept: (path: string, callback: () => void) => void }
}
