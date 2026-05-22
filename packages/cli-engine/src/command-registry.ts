import { CISCO_BASIC_COMMANDS, CISCO_INTERFACE_COMMANDS, CISCO_MODES } from '@cisco-lab/shared';

export interface CommandRegistry {
  name: string;
  description: string;
  category: string;
  syntax: string;
  examples: string[];
  requiredMode?: string;
}

/**
 * Registry of all valid Cisco commands
 */
export class CommandRegistryService {
  private commands: Map<string, CommandRegistry> = new Map();

  constructor() {
    this.initializeCommands();
  }

  private initializeCommands(): void {
    // Basic Commands
    CISCO_BASIC_COMMANDS.forEach((cmd) => {
      this.registerCommand({
        name: cmd,
        description: `Execute ${cmd}`,
        category: 'basic',
        syntax: cmd,
        examples: [cmd],
      });
    });

    // Interface Commands
    CISCO_INTERFACE_COMMANDS.forEach((cmd) => {
      this.registerCommand({
        name: cmd,
        description: `Configure ${cmd}`,
        category: 'interface',
        syntax: cmd,
        examples: [cmd],
        requiredMode: CISCO_MODES.INTERFACE_CONFIG,
      });
    });
  }

  registerCommand(command: CommandRegistry): void {
    this.commands.set(command.name, command);
  }

  getCommand(name: string): CommandRegistry | undefined {
    return this.commands.get(name.toLowerCase());
  }

  isValidCommand(name: string): boolean {
    return this.commands.has(name.toLowerCase());
  }

  getAllCommands(): CommandRegistry[] {
    return Array.from(this.commands.values());
  }

  getCommandsByCategory(category: string): CommandRegistry[] {
    return Array.from(this.commands.values()).filter((cmd) => cmd.category === category);
  }
}

export default CommandRegistryService;
