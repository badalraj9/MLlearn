import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "financial-modeling",
  title: "Financial Modeling",
  description: "ML applications in finance and quantitative analysis.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Financial ML is about learning from noisy, non-stationary time series where labels are expensive and spurious correlations are everywhere. Unlike image tasks, the data-generating process changes as markets react to news, regulation, and other agents.",
          "A useful starting distinction is between prediction targets: direction forecasting, volatility estimation, risk scoring, anomaly detection, and execution optimization. Each target requires different labeling rules and different notions of success.",
          "The biggest beginner mistake is to treat finance like ordinary tabular prediction. Leakage through future information, survivorship bias, and improper backtests can create models that look excellent offline and fail immediately in live trading."
        ],
        keyIdeas: [
          "Temporal ordering matters: you must respect time when splitting data.",
          "Returns, volatility, spreads, and drawdowns are often more informative than raw prices.",
          "Backtesting requires realistic assumptions about latency, fees, and slippage.",
          "A mediocre model with sound risk controls is often better than a highly accurate but unstable predictor."
        ],
        equations: [
          "\\[ r_t = \\log P_t - \\log P_{t-1} \\]",
          "\\[ \\sigma_t^2 = \\mathrm{Var}(r_t \\mid \\mathcal{F}_{t-1}) \\]",
          "\\[ \\text{Sharpe} = \\frac{\\mathbb{E}[R_p - R_f]}{\\mathrm{Std}(R_p - R_f)} \\]"
        ],
        references: [
          "Lopez de Prado - Advances in Financial Machine Learning",
          "Tsay - Analysis of Financial Time Series"
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Applied financial models usually begin with feature design around horizons. You may compute lagged returns, rolling volatilities, volume imbalance, cross-asset signals, or macro features, but every feature must be available at prediction time.",
          "Evaluation is rarely just mean squared error. Finance cares about utility under constraints, so practitioners track turnover, maximum drawdown, hit rate, calibration of risk forecasts, and capital efficiency.",
          "Walk-forward validation is the operational default. Train on one historical window, evaluate on the next period, roll forward, and aggregate results to understand stability across regimes."
        ],
        keyIdeas: [
          "Feature windows should match the forecast horizon rather than being chosen arbitrarily.",
          "Class imbalance is common when predicting rare events such as defaults or crashes.",
          "Decision thresholds should be tuned with transaction costs in mind.",
          "Scenario analysis and stress tests are part of model validation, not an afterthought."
        ],
        equations: [
          "\\[ \\hat{y}_{t+h} = f(x_t) \\]",
          "\\[ \\text{PnL}_t = w_t r_{t+1} - c \\, |w_t - w_{t-1}| \\]",
          "\\[ \\text{MDD} = \\max_{t \\le u} \\frac{P_t - P_u}{P_t} \\]"
        ],
        references: [
          "Gu, Kelly, Xiu (2020) - Empirical Asset Pricing via Machine Learning",
          "Jorion - Value at Risk"
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced financial ML combines forecasting with sequential decision making. The central problem is not just predicting returns, but choosing actions under uncertainty, inventory constraints, and feedback from the market itself.",
          "Modern systems use probabilistic forecasting, regime-switching models, graph features across assets, and reinforcement learning for execution or portfolio control. These methods can help, but only when paired with careful causal reasoning and strong monitoring.",
          "The frontier challenge is robustness under distribution shift. A strategy that overfits one regime or relies on unstable microstructure patterns can collapse when volatility changes, so uncertainty estimation and adaptive retraining are essential."
        ],
        keyIdeas: [
          "Distribution shift and reflexivity make finance harder than static supervised learning.",
          "Probabilistic forecasts are often more useful than point forecasts for risk-aware decisions.",
          "Portfolio optimization should consume predictive distributions, not just expected returns.",
          "Governance, explainability, and audit trails are mandatory in regulated settings."
        ],
        equations: [
          "\\[ \\max_w \\; \\mathbb{E}[w^T r] - \\lambda w^T \\Sigma w \\]",
          "\\[ \\text{CVaR}_\\alpha(L) = \\mathbb{E}[L \\mid L \\geq \\mathrm{VaR}_\\alpha(L)] \\]",
          "\\[ p(r_{t+1} \\mid x_t) \\quad \\text{is often more actionable than } \\mathbb{E}[r_{t+1} \\mid x_t] \\]"
        ],
        references: [
          "Markowitz (1952) - Portfolio Selection",
          "Hull - Risk Management and Financial Institutions",
          "Follmer & Schied - Stochastic Finance"
        ],
      },
    },
  ],
};

export default chapter;
