const IPCValidChannelConst = [
    "boot_up"
] as const;

export type IPCValidChannel = typeof IPCValidChannelConst[number];
