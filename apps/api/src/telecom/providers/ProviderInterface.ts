// apps/api/src/telecom/providers/ProviderInterface.ts

export type CallStatus = 'QUEUED' | 'RINGING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'BUSY';

export interface OutboundCallPayload {
  tenantId: string;
  fromDID: string;
  toNumber: string;
  maxTimeoutSec?: number;
  callbackWebhookUrl?: string;
}

export interface ProviderCallResponse {
  providerId: string;
  providerSessionId: string;
  status: CallStatus;
  rawResponse?: Record<string, any>;
}

export interface ProviderRateInfo {
  prefix: string;
  costPerMinute: number;
  incrementSec: number;
}

export interface TelecomProvider {
  readonly id: string;
  readonly name: string;
  
  // Call Controls
  dial(payload: OutboundCallPayload): Promise<ProviderCallResponse>;
  hangup(providerSessionId: string): Promise<boolean>;
  
  // Health & Rates
  getHealth(): Promise<{ isHealthy: boolean; latencyMs: number }>;
  getRate(prefix: string): Promise<ProviderRateInfo>;
}