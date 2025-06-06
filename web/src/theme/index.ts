// theme/index.ts
export const theme = {
  // Color palette
  colors: {
    primary: {
      blue: "from-blue-500 to-cyan-500",
      purple: "from-purple-500 to-pink-500",
      green: "from-green-500 to-emerald-500",
      yellow: "from-yellow-500 to-orange-500",
      red: "from-red-500 to-orange-500",
      cyan: "from-cyan-500 to-blue-500",
    },
    background: {
      main: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
      card: "bg-gradient-to-br from-slate-800/50 to-slate-900/50",
      overlay: "bg-gradient-to-br from-slate-800/30 to-slate-900/30",
      glass: "bg-gradient-to-r from-slate-800/80 to-slate-700/80",
    },
    text: {
      primary:
        "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
      secondary: "text-gray-300",
      muted: "text-gray-400",
      white: "text-white",
    },
    border: {
      default: "border-slate-700",
      hover: "hover:border-slate-600",
      primary: "border-slate-600/50",
    },
    effects: {
      blur: "backdrop-blur-sm",
      glow: "shadow-2xl",
      glowBlue: "shadow-blue-500/25",
      glowHoverBlue: "hover:shadow-blue-500/40",
    },
  },

  // Component variants
  components: {
    // Buttons
    button: {
      primary: `
        group inline-flex items-center space-x-3 px-8 py-4 
        bg-gradient-to-r from-blue-600 to-cyan-600 
        hover:from-blue-500 hover:to-cyan-500 
        text-white rounded-2xl font-semibold text-lg 
        transition-all duration-300 shadow-2xl shadow-blue-500/25 
        hover:shadow-blue-500/40 hover:scale-105
      `,
      secondary: `
        px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-600 
        hover:from-slate-600 hover:to-slate-500 
        border border-slate-600 text-white rounded-2xl 
        font-semibold text-lg transition-all duration-300 
        shadow-xl hover:shadow-2xl hover:scale-105
      `,
      ghost: `
        px-6 py-3 bg-gradient-to-r from-slate-800/80 to-slate-700/80 
        backdrop-blur-sm border border-slate-600/50 
        text-white rounded-2xl font-medium 
        transition-all duration-300 hover:scale-105
      `,
    },

    // Cards
    card: {
      default: `
        group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 
        rounded-2xl border border-slate-700 transition-all duration-300 
        shadow-lg hover:shadow-xl hover:scale-105
      `,
      feature: `
        group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 
        p-8 rounded-2xl border border-slate-700 transition-all duration-300 
        shadow-lg hover:shadow-xl
      `,
      stat: `
        group text-center p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 
        rounded-2xl border border-slate-700 hover:border-slate-600 
        transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105
      `,
    },

    // Icon containers
    iconContainer: {
      small: "p-2 rounded-xl",
      medium: "p-3 rounded-2xl",
      large: "p-4 rounded-2xl w-fit",
    },

    // Text styles
    heading: {
      h1: "text-5xl md:text-7xl font-bold leading-tight",
      h2: "text-5xl font-bold",
      h3: "text-2xl font-bold",
      h4: "text-xl font-semibold",
    },

    // Background effects
    backgroundEffects: {
      heroGlow: `
        absolute inset-0 bg-gradient-to-br from-blue-500/10 
        via-purple-500/5 to-cyan-500/10 blur-3xl opacity-30
      `,
      cardHover: (color: string) => `
        absolute inset-0 bg-gradient-to-br ${color} 
        rounded-2xl opacity-0 group-hover:opacity-100 
        transition-opacity duration-300
      `,
      floatingOrb: (color: string, size = "w-96 h-96") => `
        absolute ${size} ${color} rounded-full blur-3xl
      `,
    },
  },

  // Animation presets
  animations: {
    hover: "transition-all duration-300 hover:scale-105",
    hoverShadow: "transition-all duration-300 hover:shadow-xl",
    slideRight: "group-hover:translate-x-1 transition-transform",
    fadeIn: "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  },

  // Layout utilities
  layout: {
    container: "max-w-7xl mx-auto",
    containerSmall: "max-w-5xl mx-auto",
    section: "py-24 px-6 relative",
    grid: {
      cols2: "grid md:grid-cols-2 gap-8",
      cols3: "grid md:grid-cols-3 gap-8",
      cols4: "grid grid-cols-2 md:grid-cols-4 gap-8",
      features: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
    },
  },
};

// Utility functions for dynamic styling
export const getCardHoverEffect = (
  color: keyof typeof theme.colors.primary,
) => {
  const colorMap = {
    blue: "from-blue-500/5 to-cyan-500/5",
    purple: "from-purple-500/5 to-pink-500/5",
    green: "from-green-500/5 to-emerald-500/5",
    yellow: "from-yellow-500/5 to-orange-500/5",
    red: "from-red-500/5 to-orange-500/5",
    cyan: "from-cyan-500/5 to-blue-500/5",
  };
  return theme.components.backgroundEffects.cardHover(colorMap[color]);
};

export const getIconGradient = (color: keyof typeof theme.colors.primary) => {
  return `bg-gradient-to-r ${theme.colors.primary[color]}`;
};

export const getHoverBorder = (color: keyof typeof theme.colors.primary) => {
  const borderMap = {
    blue: "hover:border-blue-500/50",
    purple: "hover:border-purple-500/50",
    green: "hover:border-green-500/50",
    yellow: "hover:border-yellow-500/50",
    red: "hover:border-red-500/50",
    cyan: "hover:border-cyan-500/50",
  };
  return borderMap[color];
};

// Theme context types
export type ThemeType = typeof theme;

// Pre-built component classes for common patterns
export const themeClasses = {
  // Page wrapper
  page: `${theme.colors.background.main} min-h-screen`,

  // Hero section
  heroSection: `
    relative text-center py-24 px-6 overflow-hidden
  `,

  // Feature card with hover effects
  featureCard: (color: keyof typeof theme.colors.primary) => `
    ${theme.components.card.feature} 
    ${getHoverBorder(color)} 
    hover:shadow-${color === "blue" ? "blue" : color === "green" ? "green" : color === "yellow" ? "yellow" : color === "purple" ? "purple" : color === "red" ? "red" : "cyan"}-500/10
  `,

  // Stat card
  statCard: (color: keyof typeof theme.colors.primary) => `
    ${theme.components.card.stat} 
    ${getHoverBorder(color)}
  `,

  // CTA button
  ctaButton: theme.components.button.primary,

  // Section header
  sectionHeader: `
    text-center mb-20
  `,

  // Icon badge
  iconBadge: (color: keyof typeof theme.colors.primary) => `
    ${theme.components.iconContainer.medium} 
    ${getIconGradient(color)} 
    ${theme.effects?.glow || "shadow-2xl"} 
    shadow-${color}-500/25
  `,
};

// Usage examples and documentation
export const themeUsageExamples = {
  // Basic page structure
  pageStructure: `
    <div className={themeClasses.page}>
      <section className={theme.layout.section}>
        <div className={theme.layout.container}>
          {/* Content */}
        </div>
      </section>
    </div>
  `,

  // Feature card example
  featureCardExample: `
    <div className={themeClasses.featureCard('blue')}>
      <div className={getCardHoverEffect('blue')} />
      <div className="relative">
        <div className={themeClasses.iconBadge('blue')}>
          <Icon className="w-8 h-8 text-blue-400" />
        </div>
        <h4 className={\`\${theme.components.heading.h3} \${theme.colors.text.white}\`}>
          Feature Title
        </h4>
        <p className={theme.colors.text.muted}>
          Feature description
        </p>
      </div>
    </div>
  `,

  // Button examples
  buttonExamples: `
    <button className={theme.components.button.primary}>
      Primary Button
    </button>
    <button className={theme.components.button.secondary}>
      Secondary Button
    </button>
  `,
};

export default theme;
