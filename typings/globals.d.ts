interface Console {
  tron: any
}

declare interface NodeModule {
  hot?: { accept: (callback: () => void) => void }
}
