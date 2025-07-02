/**
 * SmartLead MCP Server - Campaign Management Client
 *
 * Client module for campaign management API endpoints.
 * Handles all campaign-related operations including creation, updates, sequences, and analytics.
 *
 * @author LeadMagic Team
 * @version 1.5.0
 */

import { BaseSmartLeadClient } from '../../client/base.js';
import type {
  CreateCampaignRequest,
  EmailSequence,
  ExportCampaignDataRequest,
  FetchAllCampaignsUsingLeadIdRequest,
  FetchCampaignAnalyticsByDateRangeRequest,
  GetCampaignSequenceAnalyticsRequest,
  GetCampaignsWithAnalyticsRequest,
  ListCampaignsRequest,
  SuccessResponse,
  UpdateCampaignScheduleRequest,
  UpdateCampaignSettingsRequest,
} from '../../types.js';

/**
 * Campaign Management Client
 *
 * Provides methods for managing SmartLead campaigns including:
 * - Creating and updating campaigns
 * - Managing campaign schedules and settings
 * - Email sequence management
 * - Campaign analytics and reporting
 */
export class CampaignManagementClient extends BaseSmartLeadClient {
  // ================================
  // CAMPAIGN MANAGEMENT METHODS
  // ================================

  /**
   * Create a new campaign
   */
  async createCampaign(params: CreateCampaignRequest): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.post('/campaigns/create', params),
      'create campaign'
    );
    return response.data;
  }

  /**
   * Update campaign schedule
   */
  async updateCampaignSchedule(
    campaignId: number,
    params: UpdateCampaignScheduleRequest
  ): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.post(`/campaigns/${campaignId}/schedule`, params),
      'update campaign schedule'
    );
    return response.data;
  }

  /**
   * Update campaign settings
   */
  async updateCampaignSettings(
    campaignId: number,
    params: UpdateCampaignSettingsRequest
  ): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.post(`/campaigns/${campaignId}/settings`, params),
      'update campaign settings'
    );
    return response.data;
  }

  /**
   * Update campaign status
   */
  async updateCampaignStatus(campaignId: number, status: string): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.patch(`/campaigns/${campaignId}/status`, { status }),
      'update campaign status'
    );
    return response.data;
  }

  /**
   * Get campaign by ID
   */
  async getCampaign(campaignId: number): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.get(`/campaigns/${campaignId}`),
      'get campaign'
    );
    return response.data;
  }

  /**
   * List all campaigns
   */
  async listCampaigns(params?: ListCampaignsRequest): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.get('/campaigns', { params }),
      'list campaigns'
    );
    return response.data;
  }

  /**
   * Save campaign sequence
   */
  async saveCampaignSequence(
    campaignId: number,
    sequence: EmailSequence
  ): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.post(`/campaigns/${campaignId}/sequence`, sequence),
      'save campaign sequence'
    );
    return response.data;
  }

  /**
   * Get campaign sequence
   */
  async getCampaignSequence(campaignId: number): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.get(`/campaigns/${campaignId}/sequence`),
      'get campaign sequence'
    );
    return response.data;
  }

  /**
   * Get campaigns with analytics (combined endpoint)
   */
  async getCampaignsWithAnalytics(
    params?: GetCampaignsWithAnalyticsRequest
  ): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.get('/campaigns/analytics', { params }),
      'get campaigns with analytics'
    );
    return response.data;
  }

  /**
   * Delete campaign
   */
  async deleteCampaign(campaignId: number): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.delete(`/campaigns/${campaignId}`),
      'delete campaign'
    );
    return response.data;
  }

  /**
   * Export campaign data
   */
  async exportCampaignData(
    campaignId: number,
    params?: ExportCampaignDataRequest
  ): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.get(`/campaigns/${campaignId}/export`, { params }),
      'export campaign data'
    );
    return response.data;
  }

  /**
   * Get campaign analytics (simple - no date filtering)
   */
  async getCampaignAnalytics(campaignId: number): Promise<any> {
    const response = await this.withRetry(
      () => this.apiClient.get(`/campaigns/${campaignId}/analytics`),
      'get campaign analytics'
    );
    return response.data;
  }

  /**
   * Fetch campaign analytics by date range
   */
  async fetchCampaignAnalyticsByDateRange(
    campaignId: number,
    params: FetchCampaignAnalyticsByDateRangeRequest
  ): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.get(`/campaigns/${campaignId}/analytics`, { params }),
      'fetch campaign analytics by date range'
    );
    return response.data;
  }

  /**
   * Get campaign sequence analytics
   */
  async getCampaignSequenceAnalytics(
    campaignId: number,
    params?: GetCampaignSequenceAnalyticsRequest
  ): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.get(`/campaigns/${campaignId}/sequence/analytics`, { params }),
      'get campaign sequence analytics'
    );
    return response.data;
  }

  /**
   * Fetch all campaigns using lead ID
   */
  async fetchAllCampaignsUsingLeadId(
    params: FetchAllCampaignsUsingLeadIdRequest
  ): Promise<SuccessResponse> {
    const response = await this.withRetry(
      () => this.apiClient.get('/campaigns/by-lead', { params }),
      'fetch all campaigns using lead ID'
    );
    return response.data;
  }
}
