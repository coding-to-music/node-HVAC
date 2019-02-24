export type AuthMethod = 'none' | 'password' | 'publickey' | 'agent' | 'keyboard-interactive' | 'hostbased';

export type ExecOptions = {
  // An environment to use for the execution of the command.
  env?: { [x: string]: string };
  // Set to true to allocate a pseudo-tty with defaults, or an object containing specific pseudo-tty settings (see 'Pseudo-TTY settings'). Setting up a pseudo-tty can be useful when working with remote processes that expect input from an actual terminal (e.g. sudo's password prompt).
  pty?:
    | true
    | {
        // Number of rows. Default: 24
        rows?: number;
        // Number of columns. Default: 80
        cols?: number;
        // Height in pixels. Default: 480
        height?: number;
        // Width in pixels. Default: 640
        width?: number;
        // The value to use for $TERM. Default: 'vt100'
        term?: string;
      };
  // Set to true to use defaults below, set to a number to specify a specific screen number, or an object with the following valid properties:
  x11?:
    | true
    | {
        // Allow just a single connection? Default: false
        single?: boolean;
        // Screen number to use Default: 0
        screen?: number;
        // The authentication protocol name. Default: 'MIT-MAGIC-COOKIE-1'
        protocol?: string;
        // The authentication cookie. Can be a hex string or a Buffer containing the raw cookie value (which will be converted to a hex string). Default: (random 16 byte value)
        cookie?: string | Buffer;
      };
};

export type ConnectOptions = {
  // Main options for SSH2

  // Hostname or IP address of the server. Default: 'localhost'
  host?: string;
  // Port number of the server. Default: 22
  port?: number;
  // IP address of the network interface to use to connect to the server. Default: (none -- determined by OS)
  localAddress?: string;
  // The local port number to connect from. Default: (none -- determined by OS)
  localPort?: string;
  // Only connect via resolved IPv4 address for host. Default: false
  forceIPv4?: boolean;
  // Only connect via resolved IPv6 address for host. Default: false
  forceIPv6?: boolean;
  // Any valid hash algorithm supported by node. The host's key is hashed using this algorithm and passed to the hostVerifier function. Default: (none)
  hostHash?: string;
  // Function with parameters (hashedKey[, callback]) where hashedKey is a string hex hash of the host's key for verification purposes. Return true to continue with the handshake or false to reject and disconnect, or call callback() with true or false if you need to perform asynchronous verification. Default: (auto-accept if hostVerifier is not set)
  hostVerifier?: ((hashedKey: string, callback: (cont: boolean) => void) => void) | ((hashedKey: string) => boolean);
  // Username for authentication. Default: (none)
  username?: string;
  // Password for password-based user authentication. Default: (none)
  password?: string;
  // Path to ssh-agent's UNIX socket for ssh-agent-based user authentication. Windows users: set to 'pageant' for authenticating with Pageant or (actual) path to a cygwin "UNIX socket." Default: (none)
  agent?: string;
  // Set to true to use OpenSSH agent forwarding (auth-agent@openssh.com) for the life of the connection. agent must also be set to use this feature. Default: false
  agentForward?: boolean;
  // Buffer or string that contains a private key for either key-based or hostbased user authentication (OpenSSH format). Default: (none)
  privateKey?: Buffer | string;
  // For an encrypted private key, this is the passphrase used to decrypt it. Default: (none)
  passphrase?: string;
  // Along with localUsername and privateKey, set this to a non-empty string for hostbased user authentication. Default: (none)
  localHostname?: string;
  // Along with localHostname and privateKey, set this to a non-empty string for hostbased user authentication. Default: (none)
  localUsername?: string;
  // Try keyboard-interactive user authentication if primary user authentication method fails. If you set this to true, you need to handle the keyboard-interactive event. Default: false
  tryKeyboard?: boolean;
  // Function with parameters (methodsLeft, partialSuccess, callback) where methodsLeft and partialSuccess are null on the first authentication attempt, otherwise are an array and boolean respectively. Return or call callback() with the name of the authentication method to try next (pass false to signal no more methods to try). Valid method names are: 'none', 'password', 'publickey', 'agent', 'keyboard-interactive', 'hostbased'. Default: function that follows a set method order: None -> Password -> Private Key -> Agent (-> keyboard-interactive if tryKeyboard is true) -> Hostbased
  authHandler?:
    | ((methodsLeft: null | string[], partialSuccess: null | boolean, callback: (m: AuthMethod) => void) => void)
    | ((methodsLeft: null | string[], partialSuccess: null | boolean) => AuthMethod);
  // How often (in milliseconds) to send SSH-level keepalive packets to the server (in a similar way as OpenSSH's ServerAliveInterval config option). Set to 0 to disable. Default: 0
  keepaliveInterval?: number;
  // How many consecutive, unanswered SSH-level keepalive packets that can be sent to the server before disconnection (similar to OpenSSH's ServerAliveCountMax config option). Default: 3
  keepaliveCountMax?: number;
  // How long (in milliseconds) to wait for the SSH handshake to complete. Default: 20000
  readyTimeout?: number;
  // A ReadableStream to use for communicating with the server instead of creating and using a new TCP connection (useful for connection hopping).
  sock?: ReadableStream;
  // Performs a strict server vendor check before sending vendor-specific requests, etc. (e.g. check for OpenSSH server when using openssh_noMoreSessions()) Default: true
  strictVendor?: boolean;
  // This option allows you to explicitly override the default transport layer algorithms used for the connection. Each value must be an array of valid algorithms for that category. The order of the algorithms in the arrays are important, with the most favorable being first. For a list of valid and default algorithm names, please review the documentation for the version of ssh2-streams used by this module. Valid keys:
  algorithms?: {
    // Key exchange algorithms.
    kex?: string[];
    // Ciphers.
    cipher?: string[];
    // Server host key formats.
    serverHostKey?: string[];
    // (H)MAC algorithms.
    hmac?: string[];
    // Compression algorithms.
    compress?: string[];
  };
  // Set to true to enable compression if server supports it, 'force' to force compression (disconnecting if server does not support it), or false to explicitly opt out of compression all of the time. Note: this setting is overridden when explicitly setting a compression algorithm in the algorithms configuration option. Default: (only use compression if that is only what the server supports)
  compress?: true | 'forced' | false;
  // Set this to a function that receives a single string argument to get detailed (local) debug information. Default: (none)
  debug?: (info: string) => void;

  // Added by SSH2-Promise

  // to directly pass the path of private key file.
  identity?: string;
  // to reconnect automatically, once disconnected. Default: 'true'.
  reconnect?: boolean;
  // Number of reconnect tries. Default: '10'.
  reconnectTries?: number;
  // Delay after which reconnect should be done. Default: '5000'.
  reconnectDelay?: number;
};