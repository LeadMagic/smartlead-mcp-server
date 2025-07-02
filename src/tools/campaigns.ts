/**
 * SmartLead MCP Server - Campaign Tools
 *
 * MCP tools for campaign management operations.
 *
 * @author LeadMagic Team
 * @version 1.5.0
 */

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { SmartLeadClient } from '../client/index.js';
import type { MCPToolResponse } from '../types/config.js';
import {
  CreateCampaignRequestSchema,
  DeleteCampaignRequestSchema,
  ExportCampaignDataRequestSchema,
  FetchAllCampaignsUsingLeadIdRequestSchema,
  FetchCampaignAnalyticsByDateRangeRequestSchema,
  GetCampaignRequestSchema,
  GetCampaignSequenceAnalyticsRequestSchema,
  GetCampaignSequenceRequestSchema,
  GetCampaignsWithAnalyticsRequestSchema,
  ListCampaignsRequestSchema,
  SaveCampaignSequenceRequestSchema,
  UpdateCampaignScheduleRequestSchema,
  UpdateCampaignSettingsRequestSchema,
  UpdateCampaignStatusRequestSchema,
} from '../types.js';

/**
 * Register all campaign management tools
 */
export function registerCampaignTools(
  server: McpServer,
  client: SmartLeadClient,
  formatSuccessResponse: (message: string, data: any, summary?: string) => MCPToolResponse,
  handleError: (error: any) => MCPToolResponse
): void {
  // Create Campaign Tool
  server.registerTool(
    'smartlead_create_campaign',
    {
      title: 'Create Campaign',
      description:
        'Create a new SmartLead campaign with specified name and optional client assignment.',
      inputSchema: CreateCampaignRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = CreateCampaignRequestSchema.parse(params);
        const result = await client.createCampaign(validatedParams);
        return formatSuccessResponse(
          `Campaign created successfully`,
          result,
          `Campaign "${validatedParams.name}" created with ID: ${(result.data as any)?.id || 'N/A'}`
        );
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // Update Campaign Schedule Tool
  server.registerTool(
    'smartlead_update_campaign_schedule',
    {
      title: 'Update Campaign Schedule',
      description:
        'Update the sending schedule for a specific campaign including timing, frequency, and delivery windows.',
      inputSchema: UpdateCampaignScheduleRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = UpdateCampaignScheduleRequestSchema.parse(params);
        const result = await client.updateCampaignSchedule(validatedParams.campaign_id, {
          ...validatedParams,
        });
        return formatSuccessResponse('Campaign schedule updated successfully', result);
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // Update Campaign Settings Tool
  server.registerTool(
    'smartlead_update_campaign_settings',
    {
      title: 'Update Campaign Settings',
      description:
        'Update various campaign settings including tracking, personalization, and delivery options.',
      inputSchema: UpdateCampaignSettingsRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = UpdateCampaignSettingsRequestSchema.parse(params);
        const result = await client.updateCampaignSettings(validatedParams.campaign_id, {
          ...validatedParams,
        });
        return formatSuccessResponse('Campaign settings updated successfully', result);
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // Update Campaign Status Tool
  server.registerTool(
    'smartlead_update_campaign_status',
    {
      title: 'Update Campaign Status',
      description: 'Update the status of a campaign (e.g., start, pause, stop, archive).',
      inputSchema: UpdateCampaignStatusRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = UpdateCampaignStatusRequestSchema.parse(params);
        const result = await client.updateCampaignStatus(
          validatedParams.campaign_id,
          validatedParams.status
        );
        return formatSuccessResponse(
          'Campaign status updated successfully',
          result,
          `Campaign ID ${validatedParams.campaign_id} status changed to: ${validatedParams.status}`
        );
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // Get Campaign Tool
  server.registerTool(
    'smartlead_get_campaign',
    {
      title: 'Get Campaign Details',
      description:
        'Retrieve detailed information about a specific campaign including settings, statistics, and configuration.',
      inputSchema: GetCampaignRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = GetCampaignRequestSchema.parse(params);
        const result = await client.getCampaign(validatedParams.campaign_id);
        return formatSuccessResponse(
          'Campaign details retrieved successfully',
          result,
          `Retrieved details for campaign: ${(result.data as any)?.name || `ID ${validatedParams.campaign_id}`}`
        );
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // List Campaigns Tool
  server.registerTool(
    'smartlead_list_campaigns',
    {
      title: 'List Campaigns',
      description:
        'Retrieve a list of all campaigns with optional filtering by status, client, or other criteria.',
      inputSchema: ListCampaignsRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = ListCampaignsRequestSchema.parse(params);
        const result = await client.listCampaigns(validatedParams);
        return formatSuccessResponse(
          'Campaigns listed successfully',
          result,
          `Found ${(result.data as any)?.campaigns?.length || 0} campaigns`
        );
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // Save Campaign Sequence Tool
  server.registerTool(
    'smartlead_save_campaign_sequence',
    {
      title: 'Save Campaign Sequence',
      description:
        'Save or update the email sequence for a campaign including follow-up emails and timing.',
      inputSchema: SaveCampaignSequenceRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = SaveCampaignSequenceRequestSchema.parse(params);
        if (!validatedParams.sequence || validatedParams.sequence.length === 0) {
          return handleError(new Error('Sequence data is required and cannot be empty'));
        }
        
        const firstSequence = validatedParams.sequence[0];
        if (!firstSequence) {
          return handleError(new Error('First sequence item is invalid'));
        }
        
        const result = await client.saveCampaignSequence(
          validatedParams.campaign_id,
          firstSequence
        );
        return formatSuccessResponse('Campaign sequence saved successfully', result);
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // Get Campaign Sequence Tool
  server.registerTool(
    'smartlead_get_campaign_sequence',
    {
      title: 'Get Campaign Sequence',
      description: 'Retrieve the email sequence configuration for a specific campaign.',
      inputSchema: GetCampaignSequenceRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = GetCampaignSequenceRequestSchema.parse(params);
        const result = await client.getCampaignSequence(validatedParams.campaign_id);
        return formatSuccessResponse(
          'Campaign sequence retrieved successfully',
          result,
          `Retrieved sequence for campaign ID: ${validatedParams.campaign_id}`
        );
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // Get Campaigns with Analytics Tool
  server.registerTool(
    'smartlead_get_campaigns_with_analytics',
    {
      title: 'Get Campaigns with Analytics',
      description: 'Retrieve campaigns list with embedded analytics data for performance overview.',
      inputSchema: GetCampaignsWithAnalyticsRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = GetCampaignsWithAnalyticsRequestSchema.parse(params);
        const result = await client.getCampaignsWithAnalytics(validatedParams);
        return formatSuccessResponse(
          'Campaigns with analytics retrieved successfully',
          result,
          `Retrieved ${(result.data as any)?.campaigns?.length || 0} campaigns with analytics data`
        );
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // Delete Campaign Tool
  server.registerTool(
    'smartlead_delete_campaign',
    {
      title: 'Delete Campaign',
      description:
        'Permanently delete a campaign and all associated data. This action cannot be undone.',
      inputSchema: DeleteCampaignRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = DeleteCampaignRequestSchema.parse(params);
        const result = await client.deleteCampaign(validatedParams.campaign_id);
        return formatSuccessResponse(
          'Campaign deleted successfully',
          result,
          `Campaign ID ${validatedParams.campaign_id} has been permanently deleted`
        );
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // Export Campaign Data Tool
  server.registerTool(
    'smartlead_export_campaign_data',
    {
      title: 'Export Campaign Data',
      description:
        'Export campaign data in various formats (CSV, Excel, JSON) for analysis or backup purposes.',
      inputSchema: ExportCampaignDataRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = ExportCampaignDataRequestSchema.parse(params);
        const result = await client.exportCampaignData(validatedParams.campaign_id, {
          ...validatedParams,
        });
        return formatSuccessResponse('Campaign data exported successfully', result);
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // Fetch Campaign Analytics by Date Range Tool
  server.registerTool(
    'smartlead_fetch_campaign_analytics_by_date_range',
    {
      title: 'Fetch Campaign Analytics by Date Range',
      description: 'Retrieve detailed analytics for a campaign within a specific date range.',
      inputSchema: FetchCampaignAnalyticsByDateRangeRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = FetchCampaignAnalyticsByDateRangeRequestSchema.parse(params);
        const result = await client.fetchCampaignAnalyticsByDateRange(validatedParams.campaign_id, {
          ...validatedParams,
        });
        return formatSuccessResponse('Campaign analytics fetched successfully', result);
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // Get Campaign Sequence Analytics Tool
  server.registerTool(
    'smartlead_get_campaign_sequence_analytics',
    {
      title: 'Get Campaign Sequence Analytics',
      description:
        'Retrieve analytics data for each step in a campaign sequence to optimize performance.',
      inputSchema: GetCampaignSequenceAnalyticsRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = GetCampaignSequenceAnalyticsRequestSchema.parse(params);
        const result = await client.getCampaignSequenceAnalytics(validatedParams.campaign_id, {
          ...validatedParams,
        });
        return formatSuccessResponse('Campaign sequence analytics fetched successfully', result);
      } catch (error) {
        return handleError(error);
      }
    }
  );

  // Fetch All Campaigns Using Lead ID Tool
  server.registerTool(
    'smartlead_fetch_all_campaigns_using_lead_id',
    {
      title: 'Fetch Campaigns by Lead ID',
      description:
        'Retrieve all campaigns that contain a specific lead for cross-campaign analysis.',
      inputSchema: FetchAllCampaignsUsingLeadIdRequestSchema.shape,
    },
    async (params) => {
      try {
        const validatedParams = FetchAllCampaignsUsingLeadIdRequestSchema.parse(params);
        const result = await client.fetchAllCampaignsUsingLeadId(validatedParams.lead_id);
        return formatSuccessResponse(
          'Campaigns fetched successfully',
          result,
          `Found ${(result.data as any)?.campaigns?.length || 0} campaigns containing lead ID: ${validatedParams.lead_id}`
        );
      } catch (error) {
        return handleError(error);
      }
    }
  );
}
