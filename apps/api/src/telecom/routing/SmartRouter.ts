// apps/api/src/telecom/routing/SmartRouter.ts

import { TelecomProvider, OutboundCallPayload, ProviderCallResponse } from '../providers/ProviderInterface';

export class SmartRouter {
  private providers: Map<string, TelecomProvider> = new Map();

  registerProvider(provider: TelecomProvider): void {
    this.providers.set(provider.id, provider);
  }

  async routeOutboundCall(payload: OutboundCallPayload): Promise<ProviderCallResponse> {
    // 1. Filter healthy providers
    const healthyProviders: TelecomProvider[] = [];
    for (const provider of this.providers.values()) {
      const health = await provider.getHealth();
      if (health.isHealthy) {
        healthyProviders.push(provider);
      }
    }

    if (healthyProviders.length === 0) {
      throw new Error("No upstream telecom carriers currently available.");
    }

    // 2. Select primary & fallback routes (BD direct / Least Cost)
    const targetPrefix = payload.toNumber.startsWith("+880") ? "+880" : "GLOBAL";
    
    // Sort routes by rate
    const scoredProviders = await Promise.all(
      healthyProviders.map(async (p) => ({
        provider: p,
        rate: await p.getRate(targetPrefix),
      }))
    );

    scoredProviders.sort((a, b) => a.rate.costPerMinute - b.rate.costPerMinute);

    // 3. Execution with dynamic failover
    let lastError: any = null;
    for (const item of scoredProviders) {
      try {
        const session = await item.provider.dial(payload);
        return session;
      } catch (err) {
        lastError = err;
        console.warn(`Carrier ${item.provider.name} failed. Attempting fallback...`);
      }
    }

    throw new Error(`Call failed on all routes: ${lastError?.message || 'Route failure'}`);
  }
}