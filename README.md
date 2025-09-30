# Trench Prediction Market

A decentralized prediction market platform built on the Base network that allows users to bet on future events using cryptocurrency. Users can buy shares in different outcomes, and if their prediction is correct, they can claim rewards when the market resolves.

## 🎯 What is a Prediction Market?

A prediction market is a platform where people can bet on the outcome of future events. Think of it like a stock market, but instead of buying shares in companies, you're buying shares in predictions about what will happen.

**How it works:**
1. **Create Markets**: Anyone can create a market asking a yes/no question about a future event
2. **Buy Shares**: Users buy shares in either "Yes" or "No" using PREDICT tokens
3. **Market Dynamics**: The price of shares reflects the collective wisdom of participants
4. **Resolution**: When the event happens, the market resolves and winners can claim their rewards

## 🚀 Features

### Core Functionality
- **Market Creation**: Create prediction markets with custom questions and end times
- **Share Trading**: Buy shares in different outcomes using PREDICT tokens
- **Real-time Updates**: Live progress bars showing current market sentiment
- **Reward Claims**: Automatic reward distribution for correct predictions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### User Experience
- **Intuitive Interface**: Clean, modern UI with smooth animations
- **Wallet Integration**: Connect with any Web3 wallet via Thirdweb
- **Transaction Management**: Automatic token approvals and transaction handling
- **Market Filtering**: View active, pending, and resolved markets separately
- **Progress Tracking**: Visual indicators showing market sentiment and time remaining

## 🏗️ Technical Architecture

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom components
- **Radix UI**: Accessible component primitives
- **Thirdweb**: Web3 integration and wallet management

### Blockchain
- **Base Network**: Layer 2 Ethereum scaling solution
- **Smart Contracts**: Custom prediction market and ERC20 token contracts
- **Thirdweb SDK**: Simplified blockchain interactions

### Key Components
- `PredictionMarketDashboard`: Main application interface
- `MarketCard`: Individual market display with buy/sell functionality
- `MarketBuyInterface`: Multi-step purchase flow with approvals
- `MarketProgress`: Visual representation of market sentiment
- `MarketResolved`: Reward claiming interface for resolved markets

## 🛠️ Getting Started

### Prerequisites

1. **Node.js**: Version 18 or higher
2. **Thirdweb Account**: Get your Client ID from [thirdweb.com/dashboard](https://thirdweb.com/dashboard)
3. **Base Network**: Ensure you have some ETH on Base for gas fees
4. **PREDICT Tokens**: You'll need PREDICT tokens to participate in markets

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd predictionmarket
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💡 How to Use

### For Participants

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the top navigation
   - Choose your preferred wallet (MetaMask, WalletConnect, etc.)

2. **Get PREDICT Tokens**
   - You'll need PREDICT tokens to buy shares
   - Each share costs 1 PREDICT token

3. **Browse Markets**
   - View active markets in the "Active" tab
   - Check pending markets awaiting resolution
   - See resolved markets in the "Resolved" tab

4. **Make Predictions**
   - Click on a market card to see details
   - Choose your prediction (Option A or Option B)
   - Enter the amount of shares you want to buy
   - Approve token spending if needed
   - Confirm your transaction

5. **Claim Rewards**
   - When a market resolves, winners can claim their rewards
   - Click "Claim Rewards" on resolved markets where you have winning shares

### Market States

- **Active**: Markets that are still accepting predictions
- **Pending**: Markets that have ended but haven't been resolved yet
- **Resolved**: Markets with determined outcomes where rewards can be claimed

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── marketCard.tsx    # Individual market display
│   ├── marketBuyInterface.tsx # Purchase flow
│   └── ...               # Other market components
├── constants/            # Configuration and contracts
│   └── contracts.ts      # Smart contract addresses
└── lib/                  # Utility functions
    └── utils.ts          # Helper functions
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variable: `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`
   - Deploy automatically on every push

### Environment Variables

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`: Your Thirdweb client ID

## 🔗 Smart Contracts

The application interacts with two main smart contracts on Base:

- **Prediction Market Contract**: `0x7ed35FbA8735B74e51E0d98DB240c678e8DF60AC`
- **PREDICT Token Contract**: `0xead62e5de3b8E7f21301D4e662bde4bCB57aE64A`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🔮 Future Enhancements

- **Market Creation UI**: Allow users to create new prediction markets
- **Advanced Analytics**: Detailed market statistics and user performance
- **Social Features**: Follow other traders and share predictions
- **Mobile App**: Native mobile application
- **Cross-chain Support**: Expand to other blockchain networks

---

**Built with ❤️ using Next.js, Thirdweb, and the Base network**