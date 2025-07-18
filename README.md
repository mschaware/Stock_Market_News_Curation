# 📈 MarketPulse — Indian Stock Market News & Portfolio Analysis Platform

MarketPulse is a responsive, AI-integrated stock market dashboard designed to curate Indian financial news, link user portfolios, and provide automated insights on how current events might impact investments.

---

## 🚀 Features

- **📰 Real-Time News Aggregation**  
  Automatically scrapes stock market news from sources like Economic Times, Moneycontrol, etc.

- **📊 Portfolio Tracking**  
  Users can link their portfolio via APIs (Zerodha/Groww) or simulate using a mock portfolio with stock symbols.

- **🔍 Filtered News Feed**  
  Displays only those news items that affect the user's portfolio holdings.

- **🤖 AI-Powered Market Impact Analysis**  
  Uses OpenAI APIs to classify news impact as `Positive`, `Neutral`, or `Negative` for each stock.

- **💡 Confidence & Reasoning**  
  Displays a confidence score and concise explanation for each insight.

- **🔔 Optional Alerts**  
  Push notifications or email alerts for impactful news.

- **📱 Responsive Design**  
  Clean UI with a modern dashboard layout, optimized for both desktop and mobile.

---

## 🛠️ Tech Stack

| Layer        | Tech                                       |
|--------------|--------------------------------------------|
| Frontend     | React, TypeScript, Tailwind CSS, Vite      |
| Backend      | Node.js, Express (optional for API routing)|
| Scraping     | Cheerio (Node.js), or BeautifulSoup (Python) |
| AI Integration | OpenAI GPT API / ChatGPT API             |
| Visualization| Chart.js or Recharts                       |

---

## 🧱 Project Structure

