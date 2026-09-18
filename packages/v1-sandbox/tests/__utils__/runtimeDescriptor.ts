import type { SandboxExtensionDescriptor } from '@/scenario'

type RuntimeDescriptorOptions = {
  baseUrl: string;
  fixtureName: string;
  pages: SandboxExtensionDescriptor['pages'];
  stylesheet: boolean;
  targets: SandboxExtensionDescriptor['targets'];
}

export const createFixtureRuntimeDescriptor = ({
  baseUrl,
  fixtureName,
  pages,
  stylesheet,
  targets,
}: RuntimeDescriptorOptions): SandboxExtensionDescriptor => {
  const runtimeUrl = new URL(`/runtime/${fixtureName}/`, baseUrl)

  return {
    runner: 'worker',
    entrypoint: new URL('entrypoint.js', runtimeUrl).href,
    pages,
    stylesheet: stylesheet ? new URL('stylesheet.css', runtimeUrl).href : null,
    targets,
  }
}
