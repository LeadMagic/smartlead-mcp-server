# 💜 SmartLead MCP Server - Cold Email Automation for AI

<div align="center">

**🚀 The #1 Model Context Protocol Server for SmartLead Cold Email Platform**

[![NPM](https://img.shields.io/npm/v/smartlead-mcp-by-leadmagic?style=for-the-badge&color=7c3aed&logo=npm)](https://www.npmjs.com/package/smartlead-mcp-by-leadmagic)
[![Downloads](https://img.shields.io/npm/dt/smartlead-mcp-by-leadmagic?style=for-the-badge&color=7c3aed)](https://www.npmjs.com/package/smartlead-mcp-by-leadmagic)
[![GitHub](https://img.shields.io/github/stars/LeadMagic/smartlead-mcp-server?style=for-the-badge&color=7c3aed&logo=github)](https://github.com/LeadMagic/smartlead-mcp-server)
[![License](https://img.shields.io/badge/License-MIT-7c3aed?style=for-the-badge)](LICENSE)

**✨ 116+ API Tools • 🎨 Beautiful Installer • ⚡ 1-Click Setup • 🛡️ Enterprise Ready ✨**

*Seamlessly integrate SmartLead's industry-leading cold email automation with Claude, Cursor, Windsurf, Continue.dev, VS Code, and all AI coding assistants*

</div>

---

## 🎯 **Why Choose SmartLead MCP Server?**

Transform your AI coding workflow with the **most comprehensive cold email automation suite** available. Built by [LeadMagic](https://leadmagic.io) (official SmartLead partner), this server delivers **complete SmartLead API access** through a **gorgeous React Ink installer**.

### **🔥 Key Benefits**
- **💜 Beautiful Setup Experience** - Stunning purple gradient installer that users love
- **🚀 Complete API Coverage** - All 116+ SmartLead endpoints in one package  
- **⚡ Zero Configuration** - Auto-detects and configures all MCP clients instantly
- **🛡️ Production Ready** - TypeScript, error handling, security best practices
- **🎯 AI-Optimized** - Perfect integration with Claude, Cursor, and all AI tools

---

## 🚀 **Quick Start (30 seconds)**

### **Option 1: NPX (Recommended)**
```bash
# Beautiful interactive installer
npx smartlead-mcp-by-leadmagic install

# Or direct usage
SMARTLEAD_API_KEY=your-key npx smartlead-mcp-by-leadmagic
```

### **Option 2: Global Install**
```bash
npm install -g smartlead-mcp-by-leadmagic
smartlead-mcp-by-leadmagic install
```

**🔑 Get your SmartLead API key**: [app.smartlead.ai](https://app.smartlead.ai) → Settings → API Keys

---

## 💜 **Beautiful Interactive Installer**

Our **React Ink installer** is a masterpiece of UX design:

- 💜 **Stunning purple gradients** matching SmartLead's brand
- 🔍 **Smart auto-detection** of Claude, Cursor, Windsurf, Continue, VS Code, Zed
- 🔑 **Real-time API validation** with SmartLead servers
- ⚡ **One-click configuration** for all MCP clients
- 🎯 **Intelligent error handling** with helpful guidance
- 📱 **Cross-platform** support (macOS, Linux, Windows)

---

## 🔗 **Supported AI Tools**

| Tool | Status | Auto-Config | Notes |
|------|--------|-------------|-------|
| **🤖 Claude Desktop** | ✅ Full | ✅ Yes | Anthropic's flagship |
| **🎯 Cursor** | ✅ Full | ✅ Yes | AI code editor |
| **🏄 Windsurf** | ✅ Full | ✅ Yes | Codeium IDE |
| **🔄 Continue.dev** | ✅ Full | ✅ Yes | Open source |
| **💻 VS Code** | ✅ Full | ✅ Yes | With MCP extensions |
| **⚡ Zed** | ✅ Full | ✅ Yes | High-performance |

---

## 🛠️ **Complete SmartLead API (116+ Tools)**

> **🎯 The most comprehensive cold email automation toolkit available for AI assistants**

| Category | Tools | Description | Key Features |
|----------|-------|-------------|--------------|
| **🎯 Campaign Management** | 14 | Create, manage, optimize campaigns | Sequences, scheduling, A/B testing |
| **👥 Lead Management** | 17 | Import, track, engage prospects | CSV import, categorization, CRM sync |
| **📧 Email Accounts** | 15 | Configure sending & warmup | SMTP setup, reputation building |
| **📊 Analytics** | 18 | Performance & ROI tracking | Real-time metrics, conversion funnels |
| **📈 Statistics** | 18 | Detailed performance metrics | Campaign stats, warmup tracking |
| **🚀 Smart Delivery** | 11 | Optimize timing & placement | Spam testing, deliverability scoring |
| **🤖 Smart Senders** | 12 | Domain & deliverability management | Domain health, sender rotation |
| **🔗 Webhooks** | 9 | Real-time integrations | Event notifications, CRM updates |
| **👤 Client Management** | 8 | Team & API key management | User roles, API access control |

### **📋 Complete Tool Reference**

<details>
<summary><strong>🎯 Campaign Management Tools (14 tools)</strong></summary>

**Core Campaign Operations:**
- `smartlead_create_campaign` - Create new email campaigns with sequences and settings
- `smartlead_list_campaigns` - List all campaigns with filtering and pagination
- `smartlead_get_campaign_by_id` - Fetch specific campaign details and configuration
- `smartlead_update_campaign_settings` - Modify campaign configuration and parameters
- `smartlead_get_campaigns_with_analytics` - Get campaigns with performance data included
- `smartlead_delete_campaign` - Remove campaigns from your account

**Campaign Control:**
- `smartlead_pause_campaign` - Pause active campaigns temporarily
- `smartlead_resume_campaign` - Resume paused campaigns
- `smartlead_update_campaign_schedule` - Modify sending schedules and timing
- `smartlead_clone_campaign` - Duplicate successful campaigns

**Advanced Campaign Features:**
- `smartlead_update_campaign_sequences` - Modify email sequences and content
- `smartlead_set_campaign_limits` - Configure daily sending limits
- `smartlead_update_campaign_tracking` - Enable/disable open and click tracking
- `smartlead_schedule_campaign` - Set up advanced campaign scheduling

</details>

<details>
<summary><strong>👥 Lead Management Tools (17 tools)</strong></summary>

**Lead Import & Management:**
- `smartlead_add_leads_to_campaign` - Import prospects to campaigns (supports bulk CSV)
- `smartlead_list_leads_by_campaign` - Get all prospects in a specific campaign
- `smartlead_fetch_lead_by_email` - Find specific prospect by email address
- `smartlead_remove_lead_from_campaign` - Remove prospects from campaigns
- `smartlead_get_lead_details` - Fetch detailed prospect information and history
- `smartlead_import_leads_from_csv` - Bulk import prospects from CSV files

**Lead Tracking & Analytics:**
- `smartlead_update_lead_category` - Categorize prospects (interested, not_interested, etc.)
- `smartlead_get_lead_activity_history` - View complete prospect interaction timeline
- `smartlead_fetch_lead_email_history` - Get all emails sent to a prospect
- `smartlead_get_lead_response_data` - Analyze prospect responses and engagement
- `smartlead_track_lead_engagement` - Monitor engagement metrics per prospect
- `smartlead_get_lead_conversion_data` - Track conversion funnel performance

**Advanced Lead Features:**
- `smartlead_bulk_update_leads` - Update multiple prospects simultaneously
- `smartlead_auto_categorize_leads` - AI-powered lead categorization
- `smartlead_schedule_lead_followup` - Set up automated follow-up sequences
- `smartlead_sync_leads_with_crm` - Integrate with CRM systems
- `smartlead_export_leads_data` - Export prospect data in various formats

</details>

<details>
<summary><strong>📧 Email Account Management Tools (15 tools)</strong></summary>

**Account Setup & Configuration:**
- `smartlead_create_email_account` - Add new sending email accounts
- `smartlead_fetch_all_email_accounts` - List all configured email accounts
- `smartlead_update_email_account` - Modify account settings and configuration
- `smartlead_delete_email_account` - Remove email accounts from your setup
- `smartlead_test_email_account` - Verify account connectivity and authentication
- `smartlead_get_email_account_details` - Fetch detailed account information

**Email Warmup & Reputation:**
- `smartlead_add_update_warmup_to_email_account` - Configure warmup settings for accounts
- `smartlead_get_warmup_status` - Check current warmup progress and status
- `smartlead_pause_warmup` - Temporarily pause warmup process
- `smartlead_resume_warmup` - Resume paused warmup process
- `smartlead_get_warmup_statistics` - View detailed warmup performance metrics
- `smartlead_optimize_warmup_settings` - AI-powered warmup optimization

**Account Performance:**
- `smartlead_get_account_sending_stats` - View sending statistics per account
- `smartlead_fetch_account_deliverability` - Check deliverability metrics and scores
- `smartlead_get_account_reputation_score` - Monitor sender reputation health

</details>

<details>
<summary><strong>📊 Analytics Tools (18 tools)</strong></summary>

**Campaign Analytics:**
- `smartlead_get_analytics_campaign_list` - List campaigns with analytics data
- `smartlead_get_analytics_overall_stats_v2` - Overall performance statistics
- `smartlead_get_analytics_day_wise_overall_stats` - Daily performance breakdown
- `smartlead_get_campaign_performance_summary` - Campaign-specific performance metrics
- `smartlead_get_sequence_performance_analytics` - Email sequence analysis
- `smartlead_get_campaign_conversion_funnel` - Conversion tracking and analysis

**Team & Client Analytics:**
- `smartlead_get_analytics_client_list` - Client analytics overview
- `smartlead_get_team_performance_analytics` - Team productivity metrics
- `smartlead_get_user_activity_analytics` - Individual user performance tracking
- `smartlead_get_client_campaign_analytics` - Client-specific campaign data

**Advanced Reporting:**
- `smartlead_get_deliverability_analytics` - Email deliverability insights
- `smartlead_get_engagement_analytics` - Open, click, and response rate analysis
- `smartlead_get_time_based_analytics` - Performance trends over time
- `smartlead_get_geographic_analytics` - Location-based performance insights
- `smartlead_get_device_analytics` - Device and email client performance data
- `smartlead_export_analytics_report` - Export comprehensive analytics reports
- `smartlead_get_real_time_analytics` - Live performance dashboard data
- `smartlead_get_comparative_analytics` - Compare campaigns and time periods

</details>

<details>
<summary><strong>📈 Statistics Tools (18 tools)</strong></summary>

**Campaign Statistics:**
- `smartlead_fetch_campaign_statistics` - Comprehensive campaign performance stats
- `smartlead_fetch_campaign_top_level_analytics` - High-level campaign metrics
- `smartlead_get_campaign_sending_stats` - Sending volume and timing statistics
- `smartlead_get_campaign_response_rates` - Response and engagement rate analysis
- `smartlead_get_campaign_bounce_analysis` - Bounce rate analysis and trends
- `smartlead_get_campaign_unsubscribe_stats` - Unsubscribe tracking and analysis

**Warmup Statistics:**
- `smartlead_fetch_warmup_stats_by_email_account` - Account-specific warmup data
- `smartlead_get_warmup_progress_statistics` - Warmup progression tracking
- `smartlead_get_warmup_engagement_stats` - Warmup engagement metrics
- `smartlead_get_warmup_reputation_trends` - Reputation improvement tracking

**Performance Metrics:**
- `smartlead_download_campaign_data` - Export detailed campaign data
- `smartlead_get_deliverability_statistics` - Inbox placement rates and analysis
- `smartlead_get_sender_reputation_stats` - Domain and IP reputation tracking
- `smartlead_get_time_zone_performance` - Performance analysis by time zone
- `smartlead_get_subject_line_performance` - Subject line A/B testing results
- `smartlead_get_email_client_statistics` - Performance by email client
- `smartlead_get_seasonal_performance_trends` - Seasonal performance analysis
- `smartlead_get_competitive_benchmarks` - Industry comparison data

</details>

<details>
<summary><strong>🚀 Smart Delivery Tools (11 tools)</strong></summary>

**Deliverability Testing:**
- `smartlead_create_manual_placement_test` - Manual spam folder testing
- `smartlead_create_automated_placement_test` - Automated deliverability testing
- `smartlead_get_spam_test_details` - View detailed test results and recommendations
- `smartlead_get_placement_test_history` - Historical deliverability test data
- `smartlead_schedule_recurring_tests` - Set up automated testing schedules

**Deliverability Optimization:**
- `smartlead_get_provider_wise_report` - Performance analysis by email provider
- `smartlead_get_deliverability_score` - Overall deliverability rating and insights
- `smartlead_get_inbox_placement_rates` - Inbox vs spam folder placement rates
- `smartlead_get_domain_reputation_analysis` - Domain health and reputation check
- `smartlead_get_ip_reputation_monitoring` - IP address reputation tracking
- `smartlead_optimize_delivery_settings` - AI-powered delivery optimization

</details>

<details>
<summary><strong>🤖 Smart Senders Tools (12 tools)</strong></summary>

**Domain Management:**
- `smartlead_search_domain` - Domain reputation lookup and analysis
- `smartlead_get_domain_list` - List all owned and configured domains
- `smartlead_add_domain` - Add new domains to your account
- `smartlead_verify_domain` - Domain verification and DNS setup
- `smartlead_get_domain_health_score` - Domain reputation and health scoring
- `smartlead_configure_domain_settings` - Advanced domain configuration

**Mailbox Management:**
- `smartlead_get_vendors` - List available email service providers
- `smartlead_auto_generate_mailboxes` - Automatically generate email accounts
- `smartlead_bulk_create_accounts` - Create multiple email accounts simultaneously
- `smartlead_configure_mailbox_settings` - Configure individual mailbox settings
- `smartlead_test_mailbox_connectivity` - Verify mailbox setup and connectivity
- `smartlead_optimize_sender_rotation` - Smart sender rotation optimization

</details>

<details>
<summary><strong>🔗 Webhook Tools (9 tools)</strong></summary>

**Webhook Configuration:**
- `smartlead_fetch_webhooks_by_campaign` - Get all webhooks for a campaign
- `smartlead_upsert_campaign_webhook` - Create or update campaign webhooks
- `smartlead_delete_campaign_webhook` - Remove webhooks from campaigns
- `smartlead_test_webhook_endpoint` - Verify webhook connectivity and response
- `smartlead_get_webhook_logs` - View webhook delivery logs and history

**Webhook Analytics & Management:**
- `smartlead_get_webhooks_publish_summary` - Webhook delivery statistics
- `smartlead_get_webhook_failure_analysis` - Analyze failed webhook deliveries
- `smartlead_retry_failed_webhooks` - Retry failed webhook deliveries
- `smartlead_configure_webhook_retry_policy` - Set webhook retry behavior

</details>

<details>
<summary><strong>👤 Client Management Tools (8 tools)</strong></summary>

**Team Management:**
- `smartlead_create_client` - Add new team members and clients
- `smartlead_get_all_clients` - List all clients and team members
- `smartlead_update_client_permissions` - Modify user roles and permissions
- `smartlead_delete_client` - Remove team members from account
- `smartlead_get_team_details` - Get team information and metrics

**API & Access Management:**
- `smartlead_create_client_api_key` - Generate API keys for team members
- `smartlead_revoke_client_api_key` - Remove API access for users
- `smartlead_get_client_usage_statistics` - Monitor API usage by team member

</details>

---

## 📋 **Configuration Examples**

### **Claude Desktop**
```json
{
  "mcpServers": {
    "smartlead": {
      "command": "npx",
      "args": ["smartlead-mcp-by-leadmagic"],
      "env": {
        "SMARTLEAD_API_KEY": "your_api_key",
        "SMARTLEAD_ADVANCED_TOOLS": "true"
      }
    }
  }
}
```

### **Cursor/VS Code**
```json
{
  "cline.mcpServers": {
    "smartlead": {
      "command": "npx",
      "args": ["smartlead-mcp-by-leadmagic"],
      "env": { "SMARTLEAD_API_KEY": "your_api_key" }
    }
  }
}
```

---

## 🔒 **Enterprise Security**

- ✅ **API Key Validation** - Real-time verification
- ✅ **Environment Variables** - No hardcoded secrets
- ✅ **Rate Limiting** - Respects API limits
- ✅ **Error Sanitization** - No data leaks
- ✅ **HTTPS Only** - Encrypted communications

---

## 🚀 **Performance**

- **⚡ Lightning Fast** - TypeScript + Bun optimized
- **🎯 Smart Caching** - Reduced API calls
- **📊 Monitoring** - Built-in performance tracking
- **🔄 Auto-Retry** - Resilient error handling
- **📱 Cross-Platform** - Works everywhere

---

## 🆘 **Quick Troubleshooting**

| Issue | Solution |
|-------|----------|
| **API Key Error** | Verify key at [app.smartlead.ai](https://app.smartlead.ai) |
| **Tools Missing** | Restart your AI client completely |
| **Connection Failed** | Check internet & firewall settings |
| **Slow Performance** | Use global install vs npx |

---

## 🔄 **Updates**

```bash
# Check version
npx smartlead-mcp-by-leadmagic --version

# Update
npm update -g smartlead-mcp-by-leadmagic

# Reinstall
npm uninstall -g smartlead-mcp-by-leadmagic
npm install -g smartlead-mcp-by-leadmagic
```

---

## 🤝 **Support & Links**

- 📧 **Support**: [person@example.com](mailto:person@example.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/LeadMagic/smartlead-mcp-server/issues)
- 📚 **Docs**: [Full Documentation](https://github.com/LeadMagic/smartlead-mcp-server/wiki)
- 🌐 **SmartLead**: [smartlead.ai](https://smartlead.ai)
- 🔧 **LeadMagic**: [leadmagic.io](https://leadmagic.io)

---

## 📄 **License & Contributing**

MIT License - see [LICENSE](LICENSE) file. Contributions welcome via [GitHub](https://github.com/LeadMagic/smartlead-mcp-server).

---

<div align="center">

**🚀 Ready to automate your cold email campaigns with AI?**

```bash
npx smartlead-mcp-by-leadmagic install
```

**Made with 💜 by [LeadMagic](https://leadmagic.io) • Official SmartLead Partner**

[![NPM](https://img.shields.io/badge/NPM-smartlead--mcp--by--leadmagic-7c3aed?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/smartlead-mcp-by-leadmagic)
[![GitHub](https://img.shields.io/badge/GitHub-LeadMagic%2Fsmartlead--mcp--server-7c3aed?style=for-the-badge&logo=github)](https://github.com/LeadMagic/smartlead-mcp-server)

**Keywords**: SmartLead, MCP, Model Context Protocol, Cold Email, Email Marketing, AI Tools, Claude, Cursor, Windsurf, Continue, VS Code, Campaign Management, Lead Generation, Email Automation, Sales Automation, TypeScript, React Ink

</div>

## Public examples and publication

Examples are fictional unless an explicit public source is cited. See [PUBLICATION.md](PUBLICATION.md) for data, claims, attribution, and disclosure requirements.
