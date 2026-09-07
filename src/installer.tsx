#!/usr/bin/env node

/**
 * 💜 SmartLead MCP Server - Beautiful Interactive Installer
 *
 * The most beautiful, user-friendly MCP installer ever created!
 * Features stunning purple gradients, smooth animations, and zero-config setup.
 *
 * @author LeadMagic Team
 * @version 1.6.1
 */

import fs from 'fs';
import { Box, render, Text, useApp, useInput } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import Link from 'ink-link';
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';
import TextInput from 'ink-text-input';
import os from 'os';
import path from 'path';
import type React from 'react';
import { useEffect, useState } from 'react';
import { SmartLeadClient, SmartLeadError } from './client/index.js';

// ===== TYPES =====

interface MCPClient {
  id: string;
  name: string;
  emoji: string;
  description: string;
  configPath: string;
  detected: boolean;
}

interface InstallationResult {
  client: string;
  success: boolean;
  message: string;
  configPath?: string;
}

type Step = 'welcome' | 'apiKey' | 'clientSelection' | 'installing' | 'complete' | 'error';

// ===== UTILITIES =====

const getConfigPaths = () => {
  const platform = process.platform;
  const home = os.homedir();

  const paths = {
    darwin: {
      claude: path.join(home, 'Library/Application Support/Claude/claude_desktop_config.json'),
      cursor: path.join(home, 'Library/Application Support/Cursor/User/settings.json'),
      windsurf: path.join(home, 'Library/Application Support/Windsurf/User/settings.json'),
      continue: path.join(home, '.continue/config.json'),
      vscode: path.join(home, 'Library/Application Support/Code/User/settings.json'),
      zed: path.join(home, '.config/zed/settings.json'),
    },
    linux: {
      claude: path.join(home, '.config/claude/claude_desktop_config.json'),
      cursor: path.join(home, '.config/Cursor/User/settings.json'),
      windsurf: path.join(home, '.config/Windsurf/User/settings.json'),
      continue: path.join(home, '.continue/config.json'),
      vscode: path.join(home, '.config/Code/User/settings.json'),
      zed: path.join(home, '.config/zed/settings.json'),
    },
    win32: {
      claude: path.join(home, 'AppData/Roaming/Claude/claude_desktop_config.json'),
      cursor: path.join(home, 'AppData/Roaming/Cursor/User/settings.json'),
      windsurf: path.join(home, 'AppData/Roaming/Windsurf/User/settings.json'),
      continue: path.join(home, '.continue/config.json'),
      vscode: path.join(home, 'AppData/Roaming/Code/User/settings.json'),
      zed: path.join(home, 'AppData/Roaming/Zed/settings.json'),
    },
  };

  return paths[platform as keyof typeof paths] || paths.linux;
};

const detectClients = (): MCPClient[] => {
  const configPaths = getConfigPaths();

  return [
    {
      id: 'claude',
      name: 'Claude Desktop',
      emoji: '🤖',
      description: 'Anthropic Claude Desktop',
      configPath: configPaths.claude,
      detected: fs.existsSync(configPaths.claude),
    },
    {
      id: 'cursor',
      name: 'Cursor',
      emoji: '🎯',
      description: 'AI-powered code editor',
      configPath: configPaths.cursor,
      detected: fs.existsSync(configPaths.cursor),
    },
    {
      id: 'windsurf',
      name: 'Windsurf',
      emoji: '🏄',
      description: 'Codeium AI IDE',
      configPath: configPaths.windsurf,
      detected: fs.existsSync(configPaths.windsurf),
    },
    {
      id: 'continue',
      name: 'Continue.dev',
      emoji: '🔄',
      description: 'Open source coding assistant',
      configPath: configPaths.continue,
      detected: fs.existsSync(configPaths.continue),
    },
    {
      id: 'vscode',
      name: 'VS Code',
      emoji: '💻',
      description: 'Visual Studio Code',
      configPath: configPaths.vscode,
      detected: fs.existsSync(configPaths.vscode),
    },
    {
      id: 'zed',
      name: 'Zed',
      emoji: '⚡',
      description: 'High-performance editor',
      configPath: configPaths.zed,
      detected: fs.existsSync(configPaths.zed),
    },
  ];
};

const ensureConfigDir = (configPath: string): void => {
  const configDir = path.dirname(configPath);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
};

const readConfigSafely = (configPath: string): any => {
  try {
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, 'utf8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn(`Warning: Could not read config from ${configPath}`);
  }
  return {};
};

const smartleadConfig = (apiKey: string) => ({
  command: 'npx',
  args: ['smartlead-mcp-by-leadmagic'],
  env: {
    SMARTLEAD_API_KEY: apiKey,
    SMARTLEAD_ADVANCED_TOOLS: 'true',
    SMARTLEAD_ADMIN_TOOLS: 'true',
  },
});

const installForClient = (client: MCPClient, apiKey: string): InstallationResult => {
  try {
    ensureConfigDir(client.configPath);
    const config = readConfigSafely(client.configPath);
    const serverConfig = smartleadConfig(apiKey);

    switch (client.id) {
      case 'claude':
      case 'windsurf':
      case 'zed':
        config.mcpServers = { ...config.mcpServers, smartlead: serverConfig };
        break;
      case 'cursor':
      case 'vscode':
        config['cline.mcpServers'] = { ...config['cline.mcpServers'], smartlead: serverConfig };
        break;
      case 'continue': {
        if (!config.mcpServers) config.mcpServers = [];
        const existingIndex = config.mcpServers.findIndex((s: any) => s.name === 'smartlead');
        const serverWithName = { name: 'smartlead', ...serverConfig };
        if (existingIndex >= 0) {
          config.mcpServers[existingIndex] = serverWithName;
        } else {
          config.mcpServers.push(serverWithName);
        }
        break;
      }
    }

    fs.writeFileSync(client.configPath, JSON.stringify(config, null, 2));
    return {
      client: client.name,
      success: true,
      message: 'Successfully configured',
      configPath: client.configPath,
    };
  } catch (error) {
    return {
      client: client.name,
      success: false,
      message: error instanceof Error ? error.message : 'Configuration failed',
    };
  }
};

// ===== COMPONENTS =====

const Logo: React.FC = () => (
  <Box flexDirection="column" alignItems="center" marginBottom={2}>
    <Gradient name="mind">
      <BigText text="SmartLead" font="block" />
    </Gradient>
    <Box marginTop={-1}>
      <Gradient name="teen">
        <Text bold>💜 MCP SERVER INSTALLER 💜</Text>
      </Gradient>
    </Box>
    <Text color="magenta" dimColor>
      ✨ by LeadMagic • Official SmartLead Partner ✨
    </Text>
  </Box>
);

const WelcomeScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useInput((input, key) => {
    if (key.return || input === ' ') {
      onNext();
    }
  });

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="magenta">
      <Logo />

      <Box flexDirection="column" alignItems="center" marginBottom={2}>
        <Gradient name="passion">
          <Text bold>🚀 The Complete Cold Email Automation Suite 🚀</Text>
        </Gradient>
        <Text color="white">
          🎯{' '}
          <Text color="cyan" bold>
            116+ API Tools
          </Text>{' '}
          • 🛡️{' '}
          <Text color="green" bold>
            Production Ready
          </Text>{' '}
          • 🎨{' '}
          <Text color="yellow" bold>
            Zero Config
          </Text>
        </Text>
        <Text color="white">
          🔧{' '}
          <Text color="magenta" bold>
            TypeScript Native
          </Text>{' '}
          • 🌍{' '}
          <Text color="cyan" bold>
            Cross Platform
          </Text>{' '}
          • ⚡{' '}
          <Text color="blue" bold>
            Instant Setup
          </Text>
        </Text>
      </Box>

      <Box flexDirection="column" alignItems="center" marginBottom={2}>
        <Text color="gray" dimColor>
          🔗 Compatible with:
        </Text>
        <Text color="white">
          <Text color="cyan">Claude</Text> • <Text color="green">Cursor</Text> •
          <Text color="yellow">Windsurf</Text> • <Text color="magenta">Continue</Text> •
          <Text color="blue">VS Code</Text> • <Text color="red">Zed</Text>
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text color="blue">
          <Spinner type="dots" /> Ready to revolutionize your cold email game{dots}
        </Text>
      </Box>

      <Box borderStyle="double" borderColor="green" padding={1}>
        <Gradient name="fruit">
          <Text bold>▶️ Press ENTER or SPACE to begin the magic!</Text>
        </Gradient>
      </Box>
    </Box>
  );
};

const ApiKeyScreen: React.FC<{
  onNext: (apiKey: string) => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const validateApiKey = async (key: string) => {
    setIsValidating(true);
    setError('');

    try {
      const client = new SmartLeadClient({ apiKey: key });
      await client.testConnection();
      onNext(key);
    } catch (err) {
      if (err instanceof SmartLeadError) {
        setError(`SmartLead API Error: ${err.message}`);
      } else {
        setError('Invalid API key or connection failed');
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = () => {
    if (!input || input.length < 10) {
      setError('Please enter a valid SmartLead API key (minimum 10 characters)');
    } else {
      validateApiKey(input.trim());
    }
  };

  useInput((inputChar, key) => {
    if (key.escape) {
      onBack();
    } else if (key.return && !isValidating) {
      handleSubmit();
    }
  });

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Logo />

      <Box borderStyle="single" borderColor="red" padding={1} marginBottom={1}>
        <Box flexDirection="column">
          <Gradient name="morning">
            <Text bold>🔑 Step 1: Enter Your SmartLead API Key (REQUIRED)</Text>
          </Gradient>
          <Text color="red">⚠️ API key validation is MANDATORY for security!</Text>
        </Box>
      </Box>

      <Box borderStyle="single" borderColor="cyan" padding={1} marginBottom={1}>
        <Box flexDirection="column">
          <Gradient name="atlas">
            <Text bold>📋 How to get your API key:</Text>
          </Gradient>
          <Text>
            1. Visit: <Link url="https://app.smartlead.ai">https://app.smartlead.ai</Link>
          </Text>
          <Text>2. Go to Settings → API Keys</Text>
          <Text>3. Generate a new API key</Text>
          <Text>4. Copy and paste it below</Text>
        </Box>
      </Box>

      <Box borderStyle="single" borderColor="green" padding={1} marginBottom={1}>
        <Box flexDirection="column">
          <Gradient name="teen">
            <Text bold>Enter your API key:</Text>
          </Gradient>
          <TextInput
            value={input}
            onChange={(value) => {
              setInput(value);
              if (error) setError('');
            }}
            onSubmit={handleSubmit}
            placeholder="Paste your SmartLead API key here..."
            mask="•"
          />
          {input.length > 0 && input.length < 10 && (
            <Text color="yellow" dimColor>
              Need at least 10 characters...
            </Text>
          )}
          {input.length >= 10 && <Text color="green">✅ Key format looks good!</Text>}
        </Box>
      </Box>

      {error && (
        <Box borderStyle="single" borderColor="red" padding={1} marginBottom={1}>
          <Text color="red">❌ {error}</Text>
        </Box>
      )}

      {isValidating && (
        <Box borderStyle="single" borderColor="blue" padding={1} marginBottom={1}>
          <Text color="blue">
            <Spinner type="dots" /> Validating with SmartLead API...
          </Text>
        </Box>
      )}

      <Box borderStyle="single" borderColor="gray" padding={1}>
        <Text color="gray" dimColor>
          Press ENTER to validate • ESC to go back
        </Text>
      </Box>
    </Box>
  );
};

const ClientSelectionScreen: React.FC<{
  onNext: (clients: MCPClient[]) => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const [clients] = useState(detectClients());
  const [selectedClients, setSelectedClients] = useState<MCPClient[]>([]);

  const items = [
    { label: '🌟 All Detected Clients (Recommended)', value: 'all' },
    ...clients.map((client) => ({
      label: `${client.emoji} ${client.name} ${client.detected ? '✅ (detected)' : '📱 (not found)'}`,
      value: client.id,
    })),
    { label: '✅ Continue with selected clients', value: 'continue' },
  ];

  const handleSelect = (item: { value: string }) => {
    if (item.value === 'all') {
      const detectedClients = clients.filter((c) => c.detected);
      setSelectedClients(detectedClients);
    } else if (item.value === 'continue') {
      if (selectedClients.length === 0) {
        const detectedClients = clients.filter((c) => c.detected);
        if (detectedClients.length > 0) {
          onNext(detectedClients);
        }
      } else {
        onNext(selectedClients);
      }
    } else {
      const client = clients.find((c) => c.id === item.value);
      if (client) {
        setSelectedClients((prev) =>
          prev.includes(client) ? prev.filter((c) => c.id !== client.id) : [...prev, client]
        );
      }
    }
  };

  useInput((input, key) => {
    if (key.escape) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="yellow">
      <Logo />

      <Box borderStyle="single" borderColor="yellow" padding={1} marginBottom={1}>
        <Gradient name="passion">
          <Text bold>🎯 Step 2: Select Your AI Coding Tools</Text>
        </Gradient>
      </Box>

      <Box marginBottom={1}>
        <Text color="cyan">
          Selected: {selectedClients.map((c) => c.name).join(', ') || 'None (will auto-detect)'}
        </Text>
      </Box>

      <SelectInput items={items} onSelect={handleSelect} />

      <Box borderStyle="single" borderColor="gray" padding={1} marginTop={1}>
        <Text color="gray" dimColor>
          Use ↑↓ to navigate • ENTER to select • ESC to go back
        </Text>
      </Box>
    </Box>
  );
};

const InstallationScreen: React.FC<{
  apiKey: string;
  clients: MCPClient[];
  onComplete: (results: InstallationResult[]) => void;
  onError: (error: string) => void;
}> = ({ apiKey, clients, onComplete, onError }) => {
  const [currentClient, setCurrentClient] = useState(0);
  const [results, setResults] = useState<InstallationResult[]>([]);

  useEffect(() => {
    const install = async () => {
      const installResults: InstallationResult[] = [];

      for (let i = 0; i < clients.length; i++) {
        setCurrentClient(i);
        const client = clients[i]!;

        try {
          // Add realistic delay for better UX
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const result = installForClient(client, apiKey);
          installResults.push(result);
          setResults([...installResults]);
        } catch (error) {
          const errorResult: InstallationResult = {
            client: client.name,
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error',
          };
          installResults.push(errorResult);
          setResults([...installResults]);
        }
      }

      onComplete(installResults);
    };

    install();
  }, [apiKey, clients, onComplete]);

  const progress = Math.round(((currentClient + 1) / clients.length) * 100);

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="green">
      <Logo />

      <Box borderStyle="single" borderColor="green" padding={1} marginBottom={1}>
        <Gradient name="cristal">
          <Text bold>🔧 Installing SmartLead MCP Server Magic...</Text>
        </Gradient>
      </Box>

      <Box marginBottom={1}>
        <Text color="cyan">
          Progress: {progress}% complete ({currentClient + 1}/{clients.length} clients)
        </Text>
        <Text color="green">{'█'.repeat(Math.floor(progress / 5))}</Text>
      </Box>

      {clients.map((client, index) => (
        <Box key={client.id} marginBottom={1}>
          <Text
            color={index < currentClient ? 'green' : index === currentClient ? 'yellow' : 'gray'}
          >
            {index < currentClient ? '✅' : index === currentClient ? '⏳' : '⏸️'} {client.emoji}{' '}
            {client.name}
          </Text>
          {index < results.length && (
            <Text color={results[index]?.success ? 'green' : 'red'} dimColor>
              {' '}
              - {results[index]?.message}
            </Text>
          )}
        </Box>
      ))}

      {currentClient < clients.length && (
        <Box marginTop={1}>
          <Text color="blue">
            <Spinner type="dots" /> Configuring {clients[currentClient]?.name}...
          </Text>
        </Box>
      )}
    </Box>
  );
};

const CompletionScreen: React.FC<{
  results: InstallationResult[];
  onExit: () => void;
}> = ({ results, onExit }) => {
  const successCount = results.filter((r) => r.success).length;
  const totalCount = results.length;
  const [celebration, setCelebration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCelebration((prev) => (prev + 1) % 4);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const celebrationEmojis = ['🎉', '🚀', '✨', '🎊'];

  useInput((input, key) => {
    if (key.return || input === ' ' || key.escape) {
      onExit();
    }
  });

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="green">
      <Logo />

      <Box borderStyle="double" borderColor="green" padding={1} marginBottom={2}>
        <Gradient name="cristal">
          <Text bold>
            {celebrationEmojis[celebration]} Installation Complete! {celebrationEmojis[celebration]}
          </Text>
        </Gradient>
      </Box>

      <Box marginBottom={2}>
        <Text color="green">
          ✅ Successfully configured {successCount}/{totalCount} clients
        </Text>
      </Box>

      {results.map((result) => (
        <Box key={result.client} marginBottom={1}>
          <Text color={result.success ? 'green' : 'red'}>
            {result.success ? '✅' : '❌'} {result.client}: {result.message}
          </Text>
        </Box>
      ))}

      <Box borderStyle="single" borderColor="cyan" padding={1} marginTop={2}>
        <Box flexDirection="column">
          <Gradient name="teen">
            <Text bold>🚀 Next Steps:</Text>
          </Gradient>
          <Text>1. Restart your AI coding tool(s)</Text>
          <Text>2. Look for "smartlead" in the available tools</Text>
          <Text>3. Start automating your cold email campaigns!</Text>
          <Text>4. Enjoy 116+ powerful SmartLead tools!</Text>
        </Box>
      </Box>

      <Box borderStyle="single" borderColor="magenta" padding={1} marginTop={1}>
        <Box flexDirection="column">
          <Gradient name="passion">
            <Text bold>📚 Resources:</Text>
          </Gradient>
          <Text>
            • GitHub:{' '}
            <Link url="https://github.com/LeadMagic/smartlead-mcp-server">
              LeadMagic/smartlead-mcp-server
            </Link>
          </Text>
          <Text>
            • SmartLead: <Link url="https://smartlead.ai">smartlead.ai</Link>
          </Text>
          <Text>
            • Support: <Link url="mailto:person@example.com">person@example.com</Link>
          </Text>
        </Box>
      </Box>

      <Box borderStyle="double" borderColor="magenta" padding={1} marginTop={1}>
        <Gradient name="fruit">
          <Text bold>Press ENTER, SPACE, or ESC to finish! Thank you! 💜</Text>
        </Gradient>
      </Box>
    </Box>
  );
};

// ===== MAIN APP =====

const SmartLeadInstaller: React.FC = () => {
  const { exit } = useApp();
  const [step, setStep] = useState<Step>('welcome');
  const [apiKey, setApiKey] = useState('');
  const [selectedClients, setSelectedClients] = useState<MCPClient[]>([]);
  const [results, setResults] = useState<InstallationResult[]>([]);
  const [error, setError] = useState('');

  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return <WelcomeScreen onNext={() => setStep('apiKey')} />;
      case 'apiKey':
        return (
          <ApiKeyScreen
            onNext={(key) => {
              setApiKey(key);
              setStep('clientSelection');
            }}
            onBack={() => setStep('welcome')}
          />
        );
      case 'clientSelection':
        return (
          <ClientSelectionScreen
            onNext={(clients) => {
              setSelectedClients(clients);
              setStep('installing');
            }}
            onBack={() => setStep('apiKey')}
          />
        );
      case 'installing':
        return (
          <InstallationScreen
            apiKey={apiKey}
            clients={selectedClients}
            onComplete={(results) => {
              setResults(results);
              setStep('complete');
            }}
            onError={(error) => {
              setError(error);
              setStep('error');
            }}
          />
        );
      case 'complete':
        return <CompletionScreen results={results} onExit={() => exit()} />;
      case 'error':
        return (
          <Box flexDirection="column" padding={2} borderStyle="round" borderColor="red">
            <Text color="red">❌ Installation Error: {error}</Text>
            <Text color="gray">Press any key to exit...</Text>
          </Box>
        );
      default:
        return <Text>Unknown step</Text>;
    }
  };

  return renderStep();
};

// ===== ENTRY POINT =====

export { SmartLeadInstaller };
