export enum ConsoleColors {
  Reset = "\x1b[0m",

  // Text Colors
  Black = "\x1b[30m",
  Red = "\x1b[31m",
  Green = "\x1b[32m",
  Yellow = "\x1b[33m",
  Blue = "\x1b[34m",
  Magenta = "\x1b[35m",
  Cyan = "\x1b[36m",
  White = "\x1b[37m",
  Default = "\x1b[39m",

  // Bright Text Colors
  BrightBlack = "\x1b[90m",
  BrightRed = "\x1b[91m",
  BrightGreen = "\x1b[92m",
  BrightYellow = "\x1b[93m",
  BrightBlue = "\x1b[94m",
  BrightMagenta = "\x1b[95m",
  BrightCyan = "\x1b[96m",
  BrightWhite = "\x1b[97m",

  // Background Colors
  BgBlack = "\x1b[40m",
  BgRed = "\x1b[41m",
  BgGreen = "\x1b[42m",
  BgYellow = "\x1b[43m",
  BgBlue = "\x1b[44m",
  BgMagenta = "\x1b[45m",
  BgCyan = "\x1b[46m",
  BgWhite = "\x1b[47m",
  BgDefault = "\x1b[49m",

  // Bright Background Colors
  BrightBgBlack = "\x1b[100m",
  BrightBgRed = "\x1b[101m",
  BrightBgGreen = "\x1b[102m",
  BrightBgYellow = "\x1b[103m",
  BrightBgBlue = "\x1b[104m",
  BrightBgMagenta = "\x1b[105m",
  BrightBgCyan = "\x1b[106m",
  BrightBgWhite = "\x1b[107m",

  // Text Effects
  Bold = "\x1b[1m",
  Dim = "\x1b[2m",
  Italic = "\x1b[3m",
  Underline = "\x1b[4m",
  Blink = "\x1b[5m",
  Inverse = "\x1b[7m",
  Hidden = "\x1b[8m",
  Strikethrough = "\x1b[9m",

  // Reset Specific Properties
  ResetBoldDim = "\x1b[22m",
  ResetUnderline = "\x1b[24m",
  ResetBlink = "\x1b[25m",
  ResetInverse = "\x1b[27m",
  ResetHidden = "\x1b[28m",
}
