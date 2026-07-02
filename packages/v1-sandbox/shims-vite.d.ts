declare module '*.ts?case=*' {}
declare module '@/runtime/remoteBootstrap.worker.ts?case=*' {}
declare module '@/runtime/remoteBootstrap.worker.ts?worker' {
  const workerConstructor: {
    new (options?: WorkerOptions): Worker;
  }

  export default workerConstructor
}

declare module '*?worker' {
  const workerConstructor: {
    new (options?: WorkerOptions): Worker;
  }

  export default workerConstructor
}
