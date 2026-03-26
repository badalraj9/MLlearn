import type { Chapter } from "@/types";

const chapter: Chapter = {
  id: "time-series",
  title: "Time Series Forecasting",
  description: "Predicting future values from temporal data.",
  levels: [
    {
      tier: 1,
      title: "Foundation",
      cost: 0,
      content: {
        intro: [
          "Time series forecasting predicts future values from ordered observations. The ordering is the whole point: yesterday constrains today, and both help predict tomorrow.",
          "Most forecasting tasks are built from a few recurring patterns: trend, seasonality, shocks, and noise. A good forecaster tries to separate these components or learn them implicitly from data.",
          "The first discipline of time series work is to avoid using future information. Features, splits, and preprocessing must preserve causality, otherwise the model appears stronger than it really is."
        ],
        keyIdeas: [
          "Autocorrelation means past observations contain information about future values.",
          "Trend and seasonality should be modeled explicitly or implicitly.",
          "Forecast horizon changes the problem: one-step-ahead prediction is easier than long-range forecasting.",
          "Temporal validation must keep training data earlier than evaluation data."
        ],
        equations: [
          "\\[ y_t = T_t + S_t + \\varepsilon_t \\]",
          "\\[ y_t = c + \\sum_{i=1}^{p} \\phi_i y_{t-i} + \\varepsilon_t \\]",
          "\\[ \\text{MAE} = \\frac{1}{N} \\sum_{t=1}^{N} |y_t - \\hat{y}_t| \\]"
        ],
        references: [
          "Hyndman & Athanasopoulos - Forecasting: Principles and Practice",
          "Box, Jenkins, Reinsel - Time Series Analysis"
        ],
      },
    },
    {
      tier: 2,
      title: "Applied",
      cost: 50,
      content: {
        intro: [
          "Applied forecasting starts with baselines. Naive last-value, seasonal naive, and moving-average forecasts are essential because many real datasets are harder to beat than they look.",
          "Feature engineering often includes lags, rolling means, holiday indicators, and exogenous regressors. The best features depend on the forecast horizon and how quickly the system changes.",
          "Practical deployment also needs probabilistic thinking. Point forecasts are useful, but many decisions require prediction intervals or scenario ranges."
        ],
        keyIdeas: [
          "Rolling-origin evaluation measures stability across multiple forecast windows.",
          "Tree models, linear models, and sequence models each work well in different regimes.",
          "Multi-step forecasting can be recursive, direct, or sequence-to-sequence.",
          "Prediction intervals are critical for planning and risk-aware decision making."
        ],
        equations: [
          "\\[ x_t = [y_{t-1}, y_{t-2}, \\dots, y_{t-p}] \\]",
          "\\[ \\hat{y}_{t+h} = f_h(x_t) \\]",
          "\\[ \\text{RMSE} = \\sqrt{\\frac{1}{N} \\sum_{t=1}^{N} (y_t - \\hat{y}_t)^2} \\]"
        ],
        references: [
          "Makridakis, Spiliotis, Assimakopoulos (2020) - The M4 Competition",
          "Salinas et al. (2020) - DeepAR: Probabilistic Forecasting with Autoregressive Recurrent Networks"
        ],
      },
    },
    {
      tier: 3,
      title: "Advanced",
      cost: 100,
      content: {
        intro: [
          "Advanced forecasting deals with changing regimes, multivariate dependencies, and long-context reasoning. Demand spikes, policy changes, and sensor failures can all break a model trained on a calm historical period.",
          "Recent methods include temporal transformers, state-space models, and hierarchical forecasting methods that reconcile predictions across related time series. These aim to capture both local dynamics and cross-series structure.",
          "The frontier challenge is adaptation under shift. Online updating, probabilistic calibration, and drift detection matter because a forecast is only useful while the process generating the data remains close enough to the past."
        ],
        keyIdeas: [
          "Hierarchical forecasting enforces consistency across aggregate and disaggregate series.",
          "Probabilistic models represent uncertainty with quantiles or full predictive distributions.",
          "Regime changes can invalidate static parameter estimates.",
          "Monitoring should track forecast bias, interval coverage, and concept drift."
        ],
        equations: [
          "\\[ y_t \\sim p(y_t \\mid y_{<t}, x_{\\le t}) \\]",
          "\\[ \\hat{y}^{\\text{reconciled}} = S(S^T W^{-1} S)^{-1} S^T W^{-1} \\hat{y} \\]",
          "\\[ \\mathbb{P}(L_t \\le y_t \\le U_t) \\approx 1 - \\alpha \\]"
        ],
        references: [
          "Wen et al. (2023) - Transformers in Time Series: A Survey",
          "Hyndman et al. (2011) - Optimal combination forecasts for hierarchical time series"
        ],
      },
    },
  ],
};

export default chapter;
