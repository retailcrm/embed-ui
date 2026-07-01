declare module '*.ts?case=*' {}
declare module '@/app/runtime/remoteBootstrap.worker.ts?case=*' {}

declare module '*?worker' {
  const workerConstructor: {
    new (options?: WorkerOptions): Worker;
  }

  export default workerConstructor
}
