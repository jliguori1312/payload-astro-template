import type { SanitizedConfig } from "payload";


interface UIRegistry {
  config: SanitizedConfig
}

let registry: UIRegistry | null = null;

// Function to set the payload config and save it globally
export function setupUI( payloadConfig: SanitizedConfig ): void {
  registry.config = payloadConfig;
}

// Function to get the payload config in a component
export function getPayloadConfig(): SanitizedConfig {
  if (!registry) {
    throw new Error("UI library not initialized. Please call setupUI first.");
  }
  return registry.config as SanitizedConfig;
}
