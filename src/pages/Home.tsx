import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Shield,
  Zap,
  ChevronRight,
  BarChart3,
  Target,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Deep Learning AI",
      description:
        "Advanced neural networks analyze thousands of market indicators to predict token movements with high accuracy",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Buy/Sell/Hold Signals",
      description:
        "Get clear actionable predictions: BUY for growth opportunities, SELL to secure profits, HOLD for stability",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Real-Time Market Data",
      description:
        "Live price feeds from CoinGecko API with 24/7 monitoring of Ethereum chain tokens and market movements",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Risk Assessment",
      description:
        "Each prediction includes confidence scores and risk levels to help you make informed trading decisions",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description:
        "Sub-second prediction updates with optimized ML models trained on millions of historical data points",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Ethereum Focused",
      description:
        "Specialized analysis for Ethereum mainnet tokens with deep understanding of network dynamics",
    },
  ];

  const stats = [
    { value: "98.7%", label: "Prediction Accuracy" },
    { value: "500K+", label: "Predictions Made" },
    { value: "<1s", label: "Response Time" },
    { value: "24/7", label: "Market Monitoring" },
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-glow mb-4">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">AI-Powered Crypto Intelligence</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="glow-text-primary">Deep Learning</span>
              <br />
              <span className="text-foreground">Predictions for</span>
              <br />
              <span className="glow-text-accent">Ethereum Tokens</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Harness the power of advanced neural networks to get actionable BUY, SELL, and HOLD
              signals for Ethereum-based tokens
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 text-lg px-8 py-6">
                  Launch Dashboard
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="glass-panel-glow rounded-xl p-6"
                >
                  <p className="text-3xl md:text-4xl font-bold glow-text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How <span className="glow-text-primary">Deep Learning</span> Powers Our Predictions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our advanced AI system uses state-of-the-art machine learning algorithms to analyze
              market patterns and predict token movements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel-glow rounded-xl p-8 hover:shadow-primary/20 transition-all hover:scale-105"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 text-primary mb-6 animate-float">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prediction Types Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Clear <span className="glow-text-accent">Trading Signals</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get actionable insights backed by confidence scores and risk assessment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel-glow rounded-xl p-8 text-center"
            >
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-success/10 mb-6">
                <TrendingUp className="h-10 w-10 text-success" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-success">BUY</h3>
              <p className="text-muted-foreground">
                Strong upward momentum detected. ML models predict price increase with high
                confidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-panel-glow rounded-xl p-8 text-center"
            >
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">HOLD</h3>
              <p className="text-muted-foreground">
                Stable market conditions. Best to maintain current position and wait for clearer
                signals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-panel-glow rounded-xl p-8 text-center"
            >
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-destructive/10 mb-6">
                <TrendingUp className="h-10 w-10 text-destructive rotate-180" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-destructive">SELL</h3>
              <p className="text-muted-foreground">
                Bearish indicators detected. Consider taking profits or reducing exposure to
                minimize risk.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel-glow rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start <span className="glow-text-primary">Trading Smarter?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of traders using AI-powered predictions to make better investment
              decisions
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 text-lg px-10 py-7">
                Get Started Now
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-6">
              Free to use • Real-time predictions • No credit card required
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
